package make.myworld;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

import net.minecraft.core.BlockPos;
import net.minecraft.core.Holder;
import net.minecraft.core.registries.BuiltInRegistries;
import net.minecraft.network.chat.Component;
import net.minecraft.resources.Identifier;
import net.minecraft.server.level.ServerLevel;
import net.minecraft.server.level.ServerPlayer;
import net.minecraft.sounds.SoundEvent;
import net.minecraft.sounds.SoundSource;
import net.minecraft.world.InteractionHand;
import net.minecraft.world.InteractionResult;
import net.minecraft.world.effect.MobEffect;
import net.minecraft.world.effect.MobEffectInstance;
import net.minecraft.world.entity.Entity;
import net.minecraft.world.entity.EntitySpawnReason;
import net.minecraft.world.entity.EntityType;
import net.minecraft.world.entity.EntityTypes;
import net.minecraft.world.entity.EquipmentSlot;
import net.minecraft.world.entity.LightningBolt;
import net.minecraft.world.entity.LivingEntity;
import net.minecraft.world.entity.player.Player;
import net.minecraft.world.item.Item;
import net.minecraft.world.item.ItemStack;
import net.minecraft.world.level.Level;
import net.minecraft.world.phys.Vec3;
import net.neoforged.neoforge.event.entity.player.PlayerInteractEvent;

/**
 * Runs the logic blocks a kid built in the hub's studio for an item. The blocks arrive as a small JSON program
 * ({"on":{"use":[...],"hit":[...],"use_mob":[...],"hold":[...]}}); this class reads it step by step. Kids never edit this file.
 * Anything unknown or broken is skipped, so a kid's blocks can't crash the game. Limits keep a loop from lagging it.
 * The game calls follow MCreator's NeoForge 26.1.2 procedure templates (GPL-3.0), moved to 26.2 (EntityTypes holds the
 * entity constants in 26.2).
 */
public final class StudioPower {
    private StudioPower() {}

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
            if (world instanceof ServerLevel level) run(on.get("use"), new Ctx(level, player, null, stack));
            return InteractionResult.SUCCESS;
        }

        @Override
        public void hurtEnemy(ItemStack stack, LivingEntity target, LivingEntity attacker) {
            super.hurtEnemy(stack, target, attacker);
            if (on.has("hit") && attacker instanceof Player player && player.level() instanceof ServerLevel level
                    && !player.getCooldowns().isOnCooldown(stack)) {
                run(on.get("hit"), new Ctx(level, player, target, stack));
            }
        }

        @Override
        public void inventoryTick(ItemStack stack, ServerLevel level, Entity entity, EquipmentSlot slot) {
            super.inventoryTick(stack, level, entity, slot);
            if (on.has("hold") && slot == EquipmentSlot.MAINHAND && entity instanceof Player player
                    && level.getGameTime() % 20 == 0 && !player.getCooldowns().isOnCooldown(stack)) {
                run(on.get("hold"), new Ctx(level, player, null, stack));
            }
        }
    }

    /**
     * Right-click on a creature with a studio item: runs "use_mob", with that creature as "the creature".
     * A game event (MCreator's player_right_click_entity trigger), registered in Kit.register.
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
        if (event.getLevel() instanceof ServerLevel level) run(item.on.get("use_mob"), new Ctx(level, player, target, stack));
    }

    /** Who and where, for one run of a program. */
    private static final class Ctx {
        final ServerLevel level; final Player me; final LivingEntity target; final ItemStack stack;
        int steps = 0, spawned = 0;
        Ctx(ServerLevel level, Player me, LivingEntity target, ItemStack stack) { this.level = level; this.me = me; this.target = target; this.stack = stack; }
        Entity who(JsonObject s) { return "target".equals(str(s, "who")) ? target : me; }
    }

    private static void run(JsonElement list, Ctx c) {
        if (list == null || !list.isJsonArray()) return;
        for (JsonElement e : (JsonArray) list) {
            if (++c.steps > 64) return;
            if (!e.isJsonObject()) continue;
            try { step(e.getAsJsonObject(), c); }
            catch (RuntimeException bad) { System.err.println("[myworld] studio block skipped: " + bad); }
        }
    }

    private static void step(JsonObject s, Ctx c) {
        if (s.has("if")) {
            run(test(s.get("if"), c) ? s.get("then") : s.get("else"), c);
            return;
        }
        if (s.has("repeat")) {
            int n = clamp(num(s, "repeat", 1), 1, 10);
            for (int i = 0; i < n; i++) run(s.get("do"), c);
            return;
        }
        Entity who = c.who(s);
        switch (str(s, "a")) {
            case "effect" -> {
                Holder<MobEffect> effect = BuiltInRegistries.MOB_EFFECT.get(Identifier.parse("minecraft:" + str(s, "e"))).map(h -> (Holder<MobEffect>) h).orElse(null);
                if (effect != null && who instanceof LivingEntity living)
                    living.addEffect(new MobEffectInstance(effect, clamp(num(s, "s", 5), 1, 120) * 20, clamp(num(s, "l", 1), 1, 5) - 1));
            }
            case "heal" -> { if (who instanceof LivingEntity living) living.heal(clamp(num(s, "n", 2), 1, 20) * 2f); }
            case "damage" -> { if (who != null) who.hurtServer(c.level, c.level.damageSources().generic(), clamp(num(s, "n", 2), 1, 25) * 2f); }
            case "fire" -> { if (who != null) who.igniteForSeconds(clamp(num(s, "s", 3), 1, 30)); }
            case "lightning" -> {
                if (who == null) return;
                LightningBolt bolt = EntityTypes.LIGHTNING_BOLT.create(c.level, EntitySpawnReason.TRIGGERED);
                if (bolt != null) { bolt.snapTo(Vec3.atBottomCenterOf(who.blockPosition())); c.level.addFreshEntity(bolt); }
            }
            case "explode" -> {
                if (who == null) return;
                c.level.explode(null, who.getX(), who.getY(), who.getZ(), clamp(num(s, "p", 2), 1, 6),
                        bool(s, "brk") ? Level.ExplosionInteraction.TNT : Level.ExplosionInteraction.NONE);
            }
            case "launch" -> { if (who != null) { who.push(0, clamp(num(s, "p", 1), 1, 5) * 0.6, 0); who.hurtMarked = true; } }
            case "push" -> {
                if (who == null) return;
                Vec3 look = c.me.getLookAngle();
                double p = clamp(num(s, "p", 1), 1, 5) * 0.8;
                who.push(look.x * p, 0.25, look.z * p);
                who.hurtMarked = true;
            }
            case "tp" -> {
                Vec3 look = c.me.getLookAngle();
                double len = Math.sqrt(look.x * look.x + look.z * look.z);
                if (len < 0.01) return;
                int n = clamp(num(s, "n", 8), 1, 30);
                c.me.teleportTo(c.me.getX() + look.x / len * n, c.me.getY(), c.me.getZ() + look.z / len * n);
                c.me.resetFallDistance();
            }
            case "spawn" -> {
                Identifier id = Identifier.parse("minecraft:" + str(s, "m"));
                if (who == null || !BuiltInRegistries.ENTITY_TYPE.containsKey(id)) return;
                EntityType<?> type = BuiltInRegistries.ENTITY_TYPE.getValue(id);
                BlockPos at = who.blockPosition();
                for (int i = clamp(num(s, "n", 1), 1, 5); i > 0 && c.spawned < 15; i--, c.spawned++)
                    type.spawn(c.level, at.offset(c.level.getRandom().nextInt(3) - 1, 0, c.level.getRandom().nextInt(3) - 1), EntitySpawnReason.MOB_SUMMONED);
            }
            case "sound" -> {
                Identifier id = Identifier.parse("minecraft:" + str(s, "snd"));
                if (!BuiltInRegistries.SOUND_EVENT.containsKey(id)) return;
                SoundEvent sound = BuiltInRegistries.SOUND_EVENT.getValue(id);
                c.level.playSound(null, c.me.blockPosition(), sound, SoundSource.PLAYERS, 1f, 1f);
            }
            case "msg" -> { if (c.me instanceof ServerPlayer sp) sp.sendSystemMessage(Component.literal(str(s, "t")), true); }
            case "cooldown" -> c.me.getCooldowns().addCooldown(c.stack, clamp(num(s, "s", 5), 1, 120) * 20);
            case "consume" -> { if (!c.me.getAbilities().instabuild) c.stack.shrink(1); }
            case "hunger" -> c.me.getFoodData().setFoodLevel(Math.max(0, c.me.getFoodData().getFoodLevel() - clamp(num(s, "n", 2), 1, 20)));
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
            case "sneak" -> c.me.isShiftKeyDown();
            case "chance" -> c.level.getRandom().nextInt(100) < clamp(num(q, "p", 50), 1, 100);
            case "health" -> c.me.getHealth() < clamp(num(q, "n", 5), 1, 10) * 2f;
            case "target" -> c.target != null && BuiltInRegistries.ENTITY_TYPE.getKey(c.target.getType()).getPath().equals(str(q, "m"));
            case "dim" -> switch (str(q, "d")) {
                case "nether" -> c.level.dimension() == Level.NETHER;
                case "end" -> c.level.dimension() == Level.END;
                default -> c.level.dimension() == Level.OVERWORLD;
            };
            default -> false;
        };
    }

    private static String str(JsonObject o, String k) { return o.has(k) && o.get(k).isJsonPrimitive() ? o.get(k).getAsString() : ""; }
    private static int num(JsonObject o, String k, int def) {
        try { return o.has(k) ? o.get(k).getAsInt() : def; } catch (RuntimeException e) { return def; }
    }
    private static boolean bool(JsonObject o, String k) {
        try { return o.has(k) && o.get(k).getAsBoolean(); } catch (RuntimeException e) { return false; }
    }
    private static int clamp(int v, int lo, int hi) { return Math.max(lo, Math.min(hi, v)); }
}
