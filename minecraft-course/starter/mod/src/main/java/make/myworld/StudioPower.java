package make.myworld;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

import net.minecraft.core.BlockPos;
import net.minecraft.core.Holder;
import net.minecraft.core.particles.SimpleParticleType;
import net.minecraft.core.registries.BuiltInRegistries;
import net.minecraft.network.chat.Component;
import net.minecraft.resources.Identifier;
import net.minecraft.resources.ResourceKey;
import net.minecraft.server.MinecraftServer;
import net.minecraft.server.level.ServerLevel;
import net.minecraft.server.level.ServerPlayer;
import net.minecraft.sounds.SoundEvent;
import net.minecraft.sounds.SoundSource;
import net.minecraft.world.InteractionHand;
import net.minecraft.world.InteractionResult;
import net.minecraft.world.effect.MobEffect;
import net.minecraft.world.effect.MobEffectInstance;
import net.minecraft.world.effect.MobEffects;
import net.minecraft.world.entity.Entity;
import net.minecraft.world.entity.EntitySpawnReason;
import net.minecraft.world.entity.EntityType;
import net.minecraft.world.entity.EntityTypes;
import net.minecraft.world.entity.EquipmentSlot;
import net.minecraft.world.entity.LightningBolt;
import net.minecraft.world.entity.LivingEntity;
import net.minecraft.world.entity.player.Player;
import net.minecraft.world.entity.projectile.Projectile;
import net.minecraft.world.entity.projectile.arrow.AbstractArrow;
import net.minecraft.world.item.Item;
import net.minecraft.world.item.ItemStack;
import net.minecraft.world.item.context.UseOnContext;
import net.minecraft.world.level.Level;
import net.minecraft.world.level.block.Blocks;
import net.minecraft.world.level.block.state.BlockState;
import net.minecraft.world.level.levelgen.Heightmap;
import net.minecraft.world.phys.BlockHitResult;
import net.minecraft.world.phys.EntityHitResult;
import net.minecraft.world.phys.HitResult;
import net.minecraft.world.phys.Vec3;
import net.neoforged.neoforge.common.NeoForge;
import net.neoforged.neoforge.event.entity.ProjectileImpactEvent;
import net.neoforged.neoforge.event.entity.living.LivingDeathEvent;
import net.neoforged.neoforge.event.entity.living.LivingIncomingDamageEvent;
import net.neoforged.neoforge.event.entity.player.PlayerInteractEvent;
import net.neoforged.neoforge.event.level.block.BreakBlockEvent;
import net.neoforged.neoforge.event.tick.ServerTickEvent;

/**
 * Runs the logic blocks a kid built in the hub's studio for an item. The blocks arrive as a small JSON program
 * ({"on":{"use":[...],"hit":[...],"use_mob":[...],"use_block":[...],"break":[...],"kill":[...],"hurt":[...],"hold":[...]}});
 * this class reads it step by step. Kids never edit this file.
 * Anything unknown or broken is skipped, so a kid's blocks can't crash the game. Limits keep a loop from lagging it.
 * The game calls follow MCreator's NeoForge 26.1.2 procedure templates (GPL-3.0), moved to 26.2 (EntityTypes holds the
 * entity constants in 26.2). Weather and time go through the game's own commands, which stay the same between versions.
 */
public final class StudioPower {
    private StudioPower() {}

    /** Projectiles in the air whose "when it hits" blocks still have to run. The oldest go first if there are too many. */
    private static final Map<UUID, Shot> SHOTS = new LinkedHashMap<>() {
        @Override protected boolean removeEldestEntry(Map.Entry<UUID, Shot> e) { return size() > 200; }
    };
    private record Shot(JsonElement hit, Player me, ItemStack stack) {}
    /** The rest of a program, waiting after a "wait" block. */
    private record Later(long due, Runnable next) {}
    private static final List<Later> LATER = new ArrayList<>();
    /** The last time "when something hurts me" ran, per player, so fire or lava don't run it every tick. */
    private static final Map<UUID, Long> LAST_HURT = new HashMap<>();
    /** Above 0 while a program runs, so its own damage, kills and hits don't start another program. */
    private static int running = 0;

    static void register() {
        NeoForge.EVENT_BUS.addListener(StudioPower::onEntityInteract);   // right-click on a creature with a studio item
        NeoForge.EVENT_BUS.addListener(StudioPower::onBreak);
        NeoForge.EVENT_BUS.addListener(StudioPower::onKill);
        NeoForge.EVENT_BUS.addListener(StudioPower::onHurt);
        NeoForge.EVENT_BUS.addListener(StudioPower::onImpact);
        NeoForge.EVENT_BUS.addListener(StudioPower::onServerTick);
    }

    /** An item whose powers come from the studio's blocks. */
    public static class PowerItem extends Item {
        private final JsonObject on;

        public PowerItem(Item.Properties props, JsonObject power) {
            super(props);
            this.on = power != null && power.has("on") && power.get("on").isJsonObject() ? power.getAsJsonObject("on") : new JsonObject();
        }

        @Override
        public InteractionResult use(Level world, Player player, InteractionHand hand) {
            if (!on.has("use")) return super.use(world, player, hand);
            ItemStack stack = player.getItemInHand(hand);
            if (player.getCooldowns().isOnCooldown(stack)) return InteractionResult.FAIL;
            if (world instanceof ServerLevel level) start(on.get("use"), new Ctx(level, player, null, stack));
            return InteractionResult.SUCCESS;
        }

        /** Right-click on a block. Without "use_block" blocks, the game goes on to "use". */
        @Override
        public InteractionResult useOn(UseOnContext context) {
            Player player = context.getPlayer();
            if (!on.has("use_block") || player == null) return super.useOn(context);
            ItemStack stack = context.getItemInHand();
            if (player.getCooldowns().isOnCooldown(stack)) return InteractionResult.FAIL;
            if (context.getLevel() instanceof ServerLevel level) {
                Ctx c = new Ctx(level, player, null, stack);
                c.at(context.getClickedPos(), context.getClickedPos().relative(context.getClickedFace()));
                start(on.get("use_block"), c);
            }
            return InteractionResult.SUCCESS;
        }

        @Override
        public void hurtEnemy(ItemStack stack, LivingEntity target, LivingEntity attacker) {
            super.hurtEnemy(stack, target, attacker);
            if (on.has("hit") && attacker instanceof Player player && player.level() instanceof ServerLevel level
                    && !player.getCooldowns().isOnCooldown(stack)) {
                start(on.get("hit"), new Ctx(level, player, target, stack));
            }
        }

        @Override
        public void inventoryTick(ItemStack stack, ServerLevel level, Entity entity, EquipmentSlot slot) {
            super.inventoryTick(stack, level, entity, slot);
            if (on.has("hold") && slot == EquipmentSlot.MAINHAND && entity instanceof Player player
                    && level.getGameTime() % 20 == 0 && !player.getCooldowns().isOnCooldown(stack)) {
                start(on.get("hold"), new Ctx(level, player, null, stack));
            }
        }
    }

    /** The studio item in the main hand, if it has blocks under that "when". */
    private static PowerItem held(Player player, String trigger) {
        ItemStack stack = player.getMainHandItem();
        return stack.getItem() instanceof PowerItem item && item.on.has(trigger) && !player.getCooldowns().isOnCooldown(stack) ? item : null;
    }

    /**
     * Right-click on a creature with a studio item: runs "use_mob", with that creature as "the creature".
     * A game event (MCreator's player_right_click_entity trigger).
     */
    public static void onEntityInteract(PlayerInteractEvent.EntityInteract event) {
        if (event.getHand() != InteractionHand.MAIN_HAND) return;
        ItemStack stack = event.getItemStack();
        if (!(stack.getItem() instanceof PowerItem item) || !item.on.has("use_mob")) return;
        if (!(event.getTarget() instanceof LivingEntity target)) return;
        Player player = event.getEntity();
        event.setCanceled(true);
        event.setCancellationResult(InteractionResult.SUCCESS);
        if (player.getCooldowns().isOnCooldown(stack)) return;
        if (event.getLevel() instanceof ServerLevel level) start(item.on.get("use_mob"), new Ctx(level, player, target, stack));
    }

    /**
     * "When you break a block with the item". A game event, not Item.mineBlock: in Creative the game never calls mineBlock.
     * Runs at the end of the tick, after the block is really gone, so the blocks can change the world around it.
     */
    public static void onBreak(BreakBlockEvent event) {
        Player player = event.getPlayer();
        if (running > 0 || player == null || !(player.level() instanceof ServerLevel level)) return;
        PowerItem item = held(player, "break"); if (item == null) return;
        Ctx c = new Ctx(level, player, null, player.getMainHandItem());
        c.at(event.getPos(), event.getPos());
        if (LATER.size() < 500) LATER.add(new Later(level.getServer().getTickCount(), () -> runList(arr(item.on.get("break")), 0, c, null)));
    }

    /** "When you kill a creature with the item": the creature (already dead) and the spot where it died. */
    public static void onKill(LivingDeathEvent event) {
        if (running > 0 || !(event.getSource().getEntity() instanceof Player player) || !(player.level() instanceof ServerLevel level)) return;
        PowerItem item = held(player, "kill"); if (item == null) return;
        LivingEntity dead = event.getEntity();
        Ctx c = new Ctx(level, player, dead, player.getMainHandItem());
        c.at(dead.blockPosition(), dead.blockPosition());
        start(item.on.get("kill"), c);
    }

    /** "When something hurts me while the item is in my hand": whoever hurt me is "the creature". */
    public static void onHurt(LivingIncomingDamageEvent event) {
        if (running > 0 || !(event.getEntity() instanceof Player player) || !(player.level() instanceof ServerLevel level)) return;
        PowerItem item = held(player, "hurt"); if (item == null) return;
        long now = level.getGameTime();
        Long last = LAST_HURT.get(player.getUUID());
        if (last != null && now - last < 10) return;
        LAST_HURT.put(player.getUUID(), now);
        LivingEntity by = event.getSource().getEntity() instanceof LivingEntity le && le != player ? le : null;
        start(item.on.get("hurt"), new Ctx(level, player, by, player.getMainHandItem()));
    }

    /** A projectile from a "shoot" block hit something: run its "when it hits" blocks there. */
    public static void onImpact(ProjectileImpactEvent event) {
        Projectile p = event.getProjectile();
        if (!(p.level() instanceof ServerLevel level)) return;
        Shot shot = SHOTS.remove(p.getUUID());
        if (shot == null || shot.me().isRemoved()) return;
        HitResult hr = event.getRayTraceResult();
        LivingEntity hit = hr instanceof EntityHitResult eh && eh.getEntity() instanceof LivingEntity le && le != shot.me() ? le : null;
        Ctx c = new Ctx(level, shot.me(), hit, shot.stack());
        if (hr instanceof BlockHitResult bh) c.at(bh.getBlockPos(), bh.getBlockPos().relative(bh.getDirection()));
        else c.at(BlockPos.containing(hr.getLocation()), BlockPos.containing(hr.getLocation()));
        start(shot.hit(), c);
    }

    /** Runs whatever waited long enough after a "wait" block. */
    public static void onServerTick(ServerTickEvent.Post event) {
        if (LATER.isEmpty()) return;
        long now = event.getServer().getTickCount();
        List<Later> due = new ArrayList<>();
        LATER.removeIf(l -> { if (l.due() <= now) { due.add(l); return true; } return false; });
        for (Later l : due) {
            running++;
            try { l.next().run(); } catch (RuntimeException bad) { System.err.println("[myworld] studio block skipped: " + bad); }
            finally { running--; }
        }
    }

    /** Who and where, for one run of a program. */
    private static final class Ctx {
        final ServerLevel level; final Player me; final LivingEntity target; final ItemStack stack;
        int steps = 0, spawned = 0, shots = 0, blocks = 0;
        /** "The spot": the block that was clicked or broken, or where a projectile hit; otherwise where the player aims. */
        BlockPos spotBlock; Vec3 spotPos;
        Ctx(ServerLevel level, Player me, LivingEntity target, ItemStack stack) { this.level = level; this.me = me; this.target = target; this.stack = stack; }

        void at(BlockPos block, BlockPos air) { spotBlock = block; spotPos = Vec3.atBottomCenterOf(air); }
        private void aim() {
            if (spotPos != null) return;
            HitResult hr = me.pick(40, 0, false);
            if (hr instanceof BlockHitResult bh && hr.getType() == HitResult.Type.BLOCK) at(bh.getBlockPos(), bh.getBlockPos().relative(bh.getDirection()));
            else { spotPos = hr.getLocation(); spotBlock = BlockPos.containing(spotPos); }
        }
        Vec3 spot() { aim(); return spotPos; }

        /** The living things a block works on: me, the creature, or every creature within 5 blocks of me. */
        List<LivingEntity> who(JsonObject s) {
            return switch (str(s, "who")) {
                case "target" -> target != null && target.isAlive() ? List.of(target) : List.of();
                case "around" -> level.getEntitiesOfClass(LivingEntity.class, me.getBoundingBox().inflate(5), e -> e != me && e.isAlive()).stream().limit(20).toList();
                default -> List.of(me);
            };
        }
        /** Where a world block happens: at me, at the creature, or at the spot. Null when there's no creature. */
        Vec3 where(JsonObject s) {
            return switch (str(s, "who")) {
                case "target" -> target != null ? target.position() : null;
                case "spot" -> spot();
                default -> me.position();
            };
        }
        /** The block a block-changing block starts from. */
        BlockPos whereBlock(JsonObject s) {
            return switch (str(s, "who")) {
                case "target" -> target != null ? target.blockPosition() : null;
                case "spot" -> { aim(); yield spotBlock; }
                default -> me.blockPosition();
            };
        }
    }

    private static void start(JsonElement list, Ctx c) {
        if (running > 0) return;
        running++;
        try { runList(arr(list), 0, c, null); }
        finally { running--; }
    }

    /** Runs list[i...], then "then". An "if", a "repeat" or a "wait" hands the rest of the list on, so a wait inside them holds it up too. */
    private static void runList(JsonArray list, int i, Ctx c, Runnable then) {
        for (; i < list.size(); i++) {
            if (++c.steps > 200 || c.me.isRemoved()) return;
            if (!list.get(i).isJsonObject()) continue;
            JsonObject s = list.get(i).getAsJsonObject();
            final int next = i + 1;
            try {
                if (s.has("wait")) {
                    int ticks = clamp((int) Math.round(dbl(s, "wait", 1) * 20), 10, 600);
                    if (LATER.size() < 500) LATER.add(new Later(c.level.getServer().getTickCount() + ticks, () -> runList(list, next, c, then)));
                    return;
                }
                if (s.has("if")) {
                    runList(arr(test(s.get("if"), c) ? s.get("then") : s.get("else")), 0, c, () -> runList(list, next, c, then));
                    return;
                }
                if (s.has("repeat")) {
                    repeat(arr(s.get("do")), clamp(num(s, "repeat", 1), 1, 20), c, () -> runList(list, next, c, then));
                    return;
                }
                step(s, c);
            } catch (RuntimeException bad) { System.err.println("[myworld] studio block skipped: " + bad); }
        }
        if (then != null) then.run();
    }

    private static void repeat(JsonArray body, int times, Ctx c, Runnable then) {
        if (times <= 0) { then.run(); return; }
        runList(body, 0, c, () -> repeat(body, times - 1, c, then));
    }

    private static void step(JsonObject s, Ctx c) {
        switch (str(s, "a")) {
            // to me and to creatures
            case "effect" -> {
                Holder<MobEffect> effect = effect(str(s, "e"));
                if (effect != null) for (LivingEntity e : c.who(s))
                    e.addEffect(new MobEffectInstance(effect, clamp(num(s, "s", 5), 1, 120) * 20, clamp(num(s, "l", 1), 1, 5) - 1));
            }
            case "clear" -> c.who(s).forEach(LivingEntity::removeAllEffects);
            case "heal" -> c.who(s).forEach(e -> e.heal(clamp(num(s, "n", 2), 1, 20) * 2f));
            case "damage" -> c.who(s).forEach(e -> e.hurtServer(c.level, c.level.damageSources().generic(), clamp(num(s, "n", 2), 1, 25) * 2f));
            case "fire" -> c.who(s).forEach(e -> e.igniteForSeconds(clamp(num(s, "s", 3), 1, 30)));
            case "freeze" -> {
                int sec = clamp(num(s, "s", 3), 1, 20);
                for (LivingEntity e : c.who(s)) {
                    e.setTicksFrozen(Math.max(e.getTicksFrozen(), 140 + sec * 40));   // thaws 2 a tick out of powder snow
                    e.addEffect(new MobEffectInstance(MobEffects.SLOWNESS, sec * 20, 3));
                }
            }
            case "launch" -> c.who(s).forEach(e -> { e.push(0, clamp(num(s, "p", 1), 1, 5) * 0.6, 0); e.hurtMarked = true; });
            case "push", "pull" -> {
                double p = clamp(num(s, "p", 1), 1, 5) * ("pull".equals(str(s, "a")) ? -0.6 : 0.8);
                for (LivingEntity e : c.who(s)) {
                    Vec3 d = e == c.me ? c.me.getLookAngle() : e.position().subtract(c.me.position());
                    double len = Math.sqrt(d.x * d.x + d.z * d.z);
                    if (len < 0.01) continue;
                    e.push(d.x / len * p, 0.25, d.z / len * p);
                    e.hurtMarked = true;
                }
            }
            case "tp" -> {
                Vec3 look = c.me.getLookAngle();
                double len = Math.sqrt(look.x * look.x + look.z * look.z);
                if (len < 0.01) return;
                int n = clamp(num(s, "n", 8), 1, 30);
                c.me.teleportTo(c.me.getX() + look.x / len * n, c.me.getY(), c.me.getZ() + look.z / len * n);
                c.me.resetFallDistance();
            }
            case "tpspot" -> { Vec3 v = c.spot(); c.me.teleportTo(v.x, v.y, v.z); c.me.resetFallDistance(); }
            case "ride" -> { if (c.target != null && c.target.isAlive()) c.me.startRiding(c.target); }
            case "give" -> {
                Identifier id = Identifier.parse("minecraft:" + str(s, "i"));
                if (!BuiltInRegistries.ITEM.containsKey(id)) return;
                ItemStack give = new ItemStack(BuiltInRegistries.ITEM.getValue(id), clamp(num(s, "n", 1), 1, 64));
                if (!c.me.getInventory().add(give)) c.me.drop(give, false);
            }
            case "xp" -> c.me.giveExperiencePoints(clamp(num(s, "n", 10), 1, 500));
            case "sound" -> {
                Identifier id = Identifier.parse("minecraft:" + str(s, "snd"));
                if (!BuiltInRegistries.SOUND_EVENT.containsKey(id)) return;
                SoundEvent sound = BuiltInRegistries.SOUND_EVENT.getValue(id);
                c.level.playSound(null, c.me.blockPosition(), sound, SoundSource.PLAYERS, 1f, 1f);
            }
            case "msg" -> { if (c.me instanceof ServerPlayer sp) sp.sendSystemMessage(Component.literal(str(s, "t")), true); }
            // projectiles
            case "shoot" -> {
                Projectile p = projectile(str(s, "pr"), c);
                if (p == null) return;
                Vec3 look = c.me.getLookAngle(), eye = c.me.getEyePosition();
                p.setPos(eye.x + look.x, eye.y + look.y - 0.1, eye.z + look.z);
                p.shoot(look.x, look.y, look.z, clamp(num(s, "v", 2), 1, 5) * 0.8f, 1f);
                c.level.addFreshEntity(p);
                if (arr(s.get("hit")).size() > 0) SHOTS.put(p.getUUID(), new Shot(s.get("hit"), c.me, c.stack));
            }
            case "rain" -> {
                Vec3 at = c.where(s);
                if (at == null) return;
                for (int i = clamp(num(s, "n", 5), 1, 20); i > 0; i--) {
                    Projectile p = projectile(str(s, "pr"), c);
                    if (p == null) return;
                    p.setPos(at.x + c.level.getRandom().nextInt(7) - 3, at.y + 12, at.z + c.level.getRandom().nextInt(7) - 3);
                    p.shoot(0, -1, 0, 1f, 4f);
                    c.level.addFreshEntity(p);
                }
            }
            // the world
            case "lightning" -> {
                Vec3 at = c.where(s);
                if (at == null) return;
                LightningBolt bolt = EntityTypes.LIGHTNING_BOLT.create(c.level, EntitySpawnReason.TRIGGERED);
                if (bolt != null) { bolt.snapTo(Vec3.atBottomCenterOf(BlockPos.containing(at))); c.level.addFreshEntity(bolt); }
            }
            case "explode" -> {
                Vec3 at = c.where(s);
                if (at == null) return;
                c.level.explode(null, at.x, at.y, at.z, clamp(num(s, "p", 2), 1, 6),
                        bool(s, "brk") ? Level.ExplosionInteraction.TNT : Level.ExplosionInteraction.NONE);
            }
            case "spawn" -> {
                Identifier id = Identifier.parse("minecraft:" + str(s, "m"));
                Vec3 at = c.where(s);
                if (at == null || !BuiltInRegistries.ENTITY_TYPE.containsKey(id)) return;
                EntityType<?> type = BuiltInRegistries.ENTITY_TYPE.getValue(id);
                BlockPos base = BlockPos.containing(at);
                for (int i = clamp(num(s, "n", 1), 1, 5); i > 0 && c.spawned < 15; i--, c.spawned++)
                    type.spawn(c.level, base.offset(c.level.getRandom().nextInt(3) - 1, 0, c.level.getRandom().nextInt(3) - 1), EntitySpawnReason.MOB_SUMMONED);
            }
            case "setblock" -> {
                BlockState st = block(str(s, "b"));
                BlockPos at = "spot".equals(str(s, "who")) ? BlockPos.containing(c.spot()) : c.whereBlock(s);
                if (st == null || at == null) return;
                put(c, "me".equals(str(s, "who")) || str(s, "who").isEmpty() ? at.below() : at, st, true);
            }
            case "fill" -> {
                BlockState st = block(str(s, "b"));
                BlockPos o = "spot".equals(str(s, "who")) ? BlockPos.containing(c.spot()) : c.whereBlock(s);
                if (st == null || o == null) return;
                int r = clamp(num(s, "r", 2), 1, 5);
                String shape = str(s, "sh");
                double in = (r - 0.5) * (r - 0.5), out = (r + 0.5) * (r + 0.5);
                boolean aroundMe = "me".equals(str(s, "who"));
                for (int dx = -r; dx <= r; dx++) for (int dy = -r; dy <= r; dy++) for (int dz = -r; dz <= r; dz++) {
                    double d = dx * dx + dy * dy + dz * dz;
                    boolean yes = switch (shape) {
                        case "shell" -> d > in && d <= out;
                        case "floor" -> dy == -1 && dx * dx + dz * dz <= out;
                        default -> d <= out;
                    };
                    if (!yes || (aroundMe && dx == 0 && dz == 0 && (dy == 0 || dy == 1))) continue;   // never fill the player's own two blocks
                    put(c, o.offset(dx, dy, dz), st, st.isAir() || "floor".equals(shape));   // a floor replaces the ground; walls and balls only fill empty space
                }
            }
            case "dig" -> {
                BlockPos o = c.whereBlock(s);
                if (o == null) return;
                int r = clamp(num(s, "r", 1), 1, 3);
                for (int dx = -r; dx <= r; dx++) for (int dy = -r; dy <= r; dy++) for (int dz = -r; dz <= r; dz++) {
                    BlockPos pos = o.offset(dx, dy, dz);
                    BlockState here = c.level.getBlockState(pos);
                    if (dx * dx + dy * dy + dz * dz > (r + 0.5) * (r + 0.5) || here.isAir() || here.getDestroySpeed(c.level, pos) < 0 || ++c.blocks > 800) continue;
                    c.level.destroyBlock(pos, true, c.me);
                }
            }
            case "particles" -> {
                Vec3 at = c.where(s);
                Identifier id = Identifier.parse("minecraft:" + str(s, "pt"));
                if (at == null || !BuiltInRegistries.PARTICLE_TYPE.containsKey(id)) return;
                if (BuiltInRegistries.PARTICLE_TYPE.getValue(id) instanceof SimpleParticleType type)
                    c.level.sendParticles(type, at.x, at.y + 1, at.z, clamp(num(s, "n", 20), 1, 100), 0.6, 0.6, 0.6, 0.05);
            }
            case "weather" -> {
                String w = switch (str(s, "w")) { case "rain" -> "rain"; case "thunder" -> "thunder"; default -> "clear"; };
                command(c, "weather " + w + " 6000");
            }
            case "time" -> {
                String t = switch (str(s, "tm")) { case "noon" -> "noon"; case "evening" -> "night"; case "midnight" -> "midnight"; default -> "day"; };
                command(c, "time set " + t);
            }
            case "dim" -> travel(c, str(s, "d"));
            // price
            case "cooldown" -> c.me.getCooldowns().addCooldown(c.stack, clamp(num(s, "s", 5), 1, 120) * 20);
            case "consume" -> { if (!c.me.getAbilities().instabuild) c.stack.shrink(1); }
            case "hunger" -> c.me.getFoodData().setFoodLevel(Math.max(0, c.me.getFoodData().getFoodLevel() - clamp(num(s, "n", 2), 1, 20)));
            case "xpcost" -> c.me.giveExperienceLevels(-clamp(num(s, "n", 1), 1, 30));
            default -> { }
        }
    }

    private static boolean test(JsonElement e, Ctx c) {
        if (e == null || !e.isJsonObject()) return false;
        JsonObject q = e.getAsJsonObject();
        if (q.has("and")) { for (JsonElement x : q.getAsJsonArray("and")) if (!test(x, c)) return false; return true; }
        if (q.has("or")) { for (JsonElement x : q.getAsJsonArray("or")) if (test(x, c)) return true; return false; }
        if (q.has("not")) return !test(q.get("not"), c);
        return switch (str(q, "c")) {
            case "night" -> !c.level.isBrightOutside();
            case "day" -> c.level.isBrightOutside();
            case "rain" -> c.level.isRaining();
            case "thunder" -> c.level.isThundering();
            case "sneak" -> c.me.isShiftKeyDown();
            case "chance" -> c.level.getRandom().nextInt(100) < clamp(num(q, "p", 50), 1, 100);
            case "health" -> c.me.getHealth() < clamp(num(q, "n", 5), 1, 10) * 2f;
            case "thealth" -> c.target != null && c.target.getHealth() < clamp(num(q, "n", 5), 1, 100) * 2f;
            case "target" -> c.target != null && BuiltInRegistries.ENTITY_TYPE.getKey(c.target.getType()).getPath().equals(str(q, "m"));
            case "effect" -> { Holder<MobEffect> h = effect(str(q, "e")); yield h != null && c.me.hasEffect(h); }
            case "water" -> c.me.isInWater();
            case "burning" -> c.me.isOnFire();
            case "air" -> !c.me.onGround();
            case "on" -> { BlockState st = block(str(q, "b")); yield st != null && c.level.getBlockState(c.me.blockPosition().below()).getBlock() == st.getBlock(); }
            case "high" -> c.me.getY() > num(q, "n", 100);
            case "biome" -> c.level.getBiome(c.me.blockPosition()).unwrapKey().map(k -> k.identifier().getPath().equals(str(q, "bi"))).orElse(false);
            case "dim" -> c.level.dimension() == dimension(str(q, "d"));
            default -> false;
        };
    }

    /** A projectile of that kind, owned by the player (so it doesn't hit them), not yet in the world. */
    private static Projectile projectile(String kind, Ctx c) {
        Identifier id = Identifier.parse("minecraft:" + kind);
        if (c.shots >= 20 || !BuiltInRegistries.ENTITY_TYPE.containsKey(id)) return null;
        Entity e = BuiltInRegistries.ENTITY_TYPE.getValue(id).create(c.level, EntitySpawnReason.TRIGGERED);
        if (!(e instanceof Projectile p)) return null;
        p.setOwner(c.me);
        if (p instanceof AbstractArrow arrow) arrow.pickup = AbstractArrow.Pickup.DISALLOWED;   // no free arrows
        c.shots++;
        return p;
    }

    /** Puts a block, never over an unbreakable one (bedrock, portals). Only into empty space unless "any" is true. */
    private static void put(Ctx c, BlockPos pos, BlockState st, boolean any) {
        BlockState here = c.level.getBlockState(pos);
        if (++c.blocks > 800 || here.getDestroySpeed(c.level, pos) < 0) return;
        if (!any && !here.canBeReplaced()) return;
        c.level.setBlockAndUpdate(pos, st);
    }

    /** To another dimension, onto a safe place: the End's obsidian platform, a ledge in the Nether, the top of the ground. */
    private static void travel(Ctx c, String d) {
        ResourceKey<Level> key = dimension(d);
        if (!(c.me instanceof ServerPlayer sp) || c.level.dimension() == key) return;
        ServerLevel to = c.level.getServer().getLevel(key);
        if (to == null) return;
        BlockPos at;
        if (key == Level.END) {
            at = new BlockPos(100, 49, 0);
            for (int dx = -2; dx <= 2; dx++) for (int dz = -2; dz <= 2; dz++) {
                to.setBlockAndUpdate(at.offset(dx, -1, dz), Blocks.OBSIDIAN.defaultBlockState());
                for (int dy = 0; dy < 3; dy++) to.setBlockAndUpdate(at.offset(dx, dy, dz), Blocks.AIR.defaultBlockState());
            }
        } else {
            double scale = key == Level.NETHER ? 1 / 8.0 : c.level.dimension() == Level.NETHER ? 8 : 0;
            int x = (int) Math.floor(c.me.getX() * scale), z = (int) Math.floor(c.me.getZ() * scale);
            if (key == Level.NETHER) {
                at = null;
                for (int y = 100; y > 32 && at == null; y--) {
                    BlockPos p = new BlockPos(x, y, z);
                    BlockState below = to.getBlockState(p.below());
                    if (to.getBlockState(p).isAir() && to.getBlockState(p.above()).isAir() && !below.isAir() && below.getFluidState().isEmpty() && !below.is(Blocks.FIRE)) at = p;
                }
                if (at == null) {   // no ledge: a small room in the rock, with an obsidian floor
                    at = new BlockPos(x, 64, z);
                    for (int dx = -1; dx <= 1; dx++) for (int dz = -1; dz <= 1; dz++) {
                        to.setBlockAndUpdate(at.offset(dx, -1, dz), Blocks.OBSIDIAN.defaultBlockState());
                        for (int dy = 0; dy < 3; dy++) to.setBlockAndUpdate(at.offset(dx, dy, dz), Blocks.AIR.defaultBlockState());
                    }
                }
            } else {
                at = new BlockPos(x, to.getHeight(Heightmap.Types.MOTION_BLOCKING_NO_LEAVES, x, z), z);
            }
        }
        sp.teleportTo(to, at.getX() + 0.5, at.getY(), at.getZ() + 0.5, Set.of(), sp.getYRot(), sp.getXRot(), true);
        sp.resetFallDistance();
    }

    /** A game command, run quietly by the server (for weather and time). */
    private static void command(Ctx c, String cmd) {
        MinecraftServer server = c.level.getServer();
        server.getCommands().performPrefixedCommand(server.createCommandSourceStack().withLevel(c.level).withSuppressedOutput(), cmd);
    }

    private static ResourceKey<Level> dimension(String d) {
        return switch (d) { case "nether" -> Level.NETHER; case "end" -> Level.END; default -> Level.OVERWORLD; };
    }
    private static Holder<MobEffect> effect(String id) {
        return BuiltInRegistries.MOB_EFFECT.get(Identifier.parse("minecraft:" + id)).map(h -> (Holder<MobEffect>) h).orElse(null);
    }
    private static BlockState block(String id) {
        Identifier key = Identifier.parse("minecraft:" + id);
        return BuiltInRegistries.BLOCK.containsKey(key) ? BuiltInRegistries.BLOCK.getValue(key).defaultBlockState() : null;
    }
    private static JsonArray arr(JsonElement e) { return e != null && e.isJsonArray() ? e.getAsJsonArray() : new JsonArray(); }
    private static String str(JsonObject o, String k) { return o.has(k) && o.get(k).isJsonPrimitive() ? o.get(k).getAsString() : ""; }
    private static int num(JsonObject o, String k, int def) {
        try { return o.has(k) ? (int) Math.round(o.get(k).getAsDouble()) : def; } catch (RuntimeException e) { return def; }
    }
    private static double dbl(JsonObject o, String k, double def) {
        try { return o.has(k) ? o.get(k).getAsDouble() : def; } catch (RuntimeException e) { return def; }
    }
    private static boolean bool(JsonObject o, String k) {
        try { return o.has(k) && o.get(k).getAsBoolean(); } catch (RuntimeException e) { return false; }
    }
    private static int clamp(int v, int lo, int hi) { return Math.max(lo, Math.min(hi, v)); }
}
