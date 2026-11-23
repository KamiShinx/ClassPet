# Shared logic for the launcher (launcher.ps1) and the fallback scripts (play/paste/undo/prepare.ps1).
# Loaded with:  . ([ScriptBlock]::Create([IO.File]::ReadAllText('...\common.ps1', [Text.Encoding]::UTF8)))
# Paths use '/', which Windows accepts too.

function New-Result($ok, $message) { [pscustomobject]@{ Ok = $ok; Message = $message } }

# Writes the language files (names in the game) and item model files from the first two strings of each
# Kit.item / Kit.effect / Kit.mob call. Runs before every Play.
function Invoke-Prepare([string]$mod) {
    $utf8 = New-Object System.Text.UTF8Encoding($false)
    $java = Join-Path $mod 'src/main/java/make/myworld'
    $assets = Join-Path $mod 'src/main/resources/assets/myworld'
    $read = { param($f) $p = Join-Path $java $f; if (Test-Path $p) { [IO.File]::ReadAllText($p, [Text.Encoding]::UTF8) } else { '' } }
    $str = '"((?:[^"\\]|\\.)*)"'
    $gap = '(?:\s|//[^\r\n]*)*'   # spaces, new lines and // comments between the arguments
    $lang = [ordered]@{}
    $items = New-Object System.Collections.ArrayList
    $kinds = @(@('MyItems.java', 'item', 'item'), @('MyEffects.java', 'effect', 'effect'), @('MyMobs.java', 'mob', 'entity'))
    foreach ($k in $kinds) {
        foreach ($m in [regex]::Matches((& $read $k[0]), 'Kit\.' + $k[1] + '\(' + $gap + '"([a-z0-9_]+)"' + $gap + ',' + $gap + $str)) {
            $id = $m.Groups[1].Value
            if ($k[1] -eq 'item') { [void]$items.Add($id) }
            $lang["$($k[2]).myworld.$id"] = $m.Groups[2].Value.Replace('\"', '"')
        }
    }
    # Items made in the studio (design/world.json, copied into the mod's resources).
    $studio = Join-Path $assets 'studio/world.json'
    $w = $null
    if (Test-Path $studio) {
        try { $w = [IO.File]::ReadAllText($studio, [Text.Encoding]::UTF8) | ConvertFrom-Json } catch { $w = $null }
        foreach ($it in @($w.items)) {
            $id = [string]$it.id
            if ($id -notmatch '^[a-z][a-z0-9_]{0,39}$' -or $lang.Contains("item.myworld.$id")) { continue }
            [void]$items.Add($id)
            $lang["item.myworld.$id"] = [string]$it.name
        }
    }
    # The kid's own blocks (names, pictures, what drops), before the names are written.
    $blockIds = @()
    if ($w) { $blockIds = @(Invoke-PrepareBlocks $mod $w $lang @($items)) }
    $langDir = Join-Path $assets 'lang'
    New-Item -ItemType Directory -Force $langDir | Out-Null
    $json = if ($lang.Count -gt 0) { $lang | ConvertTo-Json } else { '{}' }
    [IO.File]::WriteAllText((Join-Path $langDir 'en_us.json'), $json, $utf8)
    [IO.File]::WriteAllText((Join-Path $langDir 'he_il.json'), $json, $utf8)

    $itemsDir = Join-Path $assets 'items'
    $modelsDir = Join-Path $assets 'models/item'
    New-Item -ItemType Directory -Force $itemsDir, $modelsDir | Out-Null
    foreach ($id in $items) {
        $client = '{ "model": { "type": "minecraft:model", "model": "myworld:item/' + $id + '" } }'
        [IO.File]::WriteAllText((Join-Path $itemsDir "$id.json"), $client, $utf8)
        # A model from Blockbench with the same name wins: only write a flat one if none exists.
        $model = Join-Path $modelsDir "$id.json"
        if (-not (Test-Path $model)) {
            $flat = '{ "parent": "minecraft:item/generated", "textures": { "layer0": "myworld:item/' + $id + '" } }'
            [IO.File]::WriteAllText($model, $flat, $utf8)
        }
    }

    # Recipes made in the studio: how each item is made in a Crafting Table. Written fresh before every Play.
    $recipeDir = Join-Path $mod 'src/main/resources/data/myworld/recipe'
    New-Item -ItemType Directory -Force $recipeDir | Out-Null
    Get-ChildItem $recipeDir -Filter 'studio_*.json' -ErrorAction SilentlyContinue | Remove-Item -Force -ErrorAction SilentlyContinue
    if ($w) {
        foreach ($it in @($w.items)) {
            $id = [string]$it.id
            if ($id -notmatch '^[a-z][a-z0-9_]{0,39}$' -or -not $it.recipe) { continue }
            try { $r = ConvertTo-StudioRecipe $it.recipe $id (@($items) + $blockIds) } catch { $r = $null }
            if ($r) { [IO.File]::WriteAllText((Join-Path $recipeDir "studio_$id.json"), $r, $utf8) }
        }
    }
    # The kid's own dimension: its ground, sky and plants, as data files the game reads when the world opens.
    # A half-written dimension would stop the world from opening, so after any problem there is no dimension at all.
    try { [void](Invoke-PrepareDim $mod $w) } catch { Write-Host "  (no dimension this time: $($_.Exception.Message))"; try { [void](Invoke-PrepareDim $mod $null) } catch {} }
    return $items.Count
}

# ---------- the kid's own blocks and own dimension (lesson 5) ----------
# Every block id the game knows, from the hub's item list (update-hub.ps1 makes it from the game jar), plus the kid's own.
# A dimension file that names a block the game doesn't have stops the whole world from loading, so every name is checked.
function Get-KnownBlocks([string]$mod, $w) {
    $known = @{}
    $f = Join-Path (Split-Path $mod) 'hub/mc_items.json'
    if (Test-Path $f) {
        try { foreach ($e in ([IO.File]::ReadAllText($f, [Text.Encoding]::UTF8) | ConvertFrom-Json)) { if ($e[4]) { $known['minecraft:' + $e[0]] = $true } } } catch {}
    }
    if ($known.Count -eq 0) { foreach ($b in 'stone','dirt','grass_block','sand','obsidian','netherrack','end_stone','glass','bedrock','diamond_ore') { $known["minecraft:$b"] = $true } }
    foreach ($b in @($w.blocks)) { if ([string]$b.id -match '^[a-z][a-z0-9_]{0,39}$') { $known['myworld:' + $b.id] = $true } }
    return $known
}
# The kid's blocks: a picture on all six sides (the studio saves it with the item pictures), a block model, and what drops.
function Invoke-PrepareBlocks([string]$mod, $w, $lang, [string[]]$itemIds) {
    $utf8 = New-Object System.Text.UTF8Encoding($false)
    $assets = Join-Path $mod 'src/main/resources/assets/myworld'
    $loot = Join-Path $mod 'src/main/resources/data/myworld/loot_table/blocks'
    $dirs = @((Join-Path $assets 'blockstates'), (Join-Path $assets 'models/block'), (Join-Path $assets 'textures/block'), (Join-Path $assets 'items'), $loot)
    New-Item -ItemType Directory -Force $dirs | Out-Null
    Get-ChildItem $loot -Filter '*.json' -ErrorAction SilentlyContinue | Remove-Item -Force -ErrorAction SilentlyContinue
    $ids = New-Object System.Collections.ArrayList
    $mcItems = @{}
    $f = Join-Path (Split-Path $mod) 'hub/mc_items.json'
    if (Test-Path $f) { try { foreach ($e in ([IO.File]::ReadAllText($f, [Text.Encoding]::UTF8) | ConvertFrom-Json)) { $mcItems['minecraft:' + $e[0]] = $true } } catch {} }
    $own = @($itemIds) + @(@($w.blocks) | ForEach-Object { [string]$_.id })
    foreach ($b in @($w.blocks)) {
        $id = [string]$b.id
        if ($id -notmatch '^[a-z][a-z0-9_]{0,39}$' -or $itemIds -contains $id -or $ids -contains $id) { continue }
        [void]$ids.Add($id)
        $lang["block.myworld.$id"] = [string]$b.name
        [IO.File]::WriteAllText((Join-Path $assets "blockstates/$id.json"), '{ "variants": { "": { "model": "myworld:block/' + $id + '" } } }', $utf8)
        [IO.File]::WriteAllText((Join-Path $assets "models/block/$id.json"), '{ "parent": "minecraft:block/cube_all", "textures": { "all": "myworld:block/' + $id + '" } }', $utf8)
        [IO.File]::WriteAllText((Join-Path $assets "items/$id.json"), '{ "model": { "type": "minecraft:model", "model": "myworld:block/' + $id + '" } }', $utf8)
        $pic = Join-Path $assets "textures/item/$id.png"
        if (Test-Path $pic) { Copy-Item $pic (Join-Path $assets "textures/block/$id.png") -Force }
        # What comes out when it breaks: the block itself, or something the kid picked (a Minecraft item or their own).
        $drop = [string]$b.drop
        $ok = $false
        if ($drop.StartsWith('minecraft:')) { $ok = $mcItems.ContainsKey($drop) }
        elseif ($drop.StartsWith('myworld:')) { $ok = $own -contains $drop.Substring(8) }
        if (-not $ok) { $drop = "myworld:$id" }
        $n = 1; [void][int]::TryParse([string]$b.n, [ref]$n); $n = [Math]::Max(1, [Math]::Min(9, $n))
        $count = ''
        if ($n -gt 1) { $count = ', "functions": [ { "function": "minecraft:set_count", "count": ' + $n + ' } ]' }
        $entry = '{ "type": "minecraft:item", "name": "' + $drop + '"' + $count + ' }'
        [IO.File]::WriteAllText((Join-Path $loot "$id.json"), '{ "type": "minecraft:block", "pools": [ { "rolls": 1, "entries": [ ' + $entry + ' ], "conditions": [ { "condition": "minecraft:survives_explosion" } ] } ] }', $utf8)
    }
    # The portal's inside (MyPortal.java): the kid's drawing from the studio's portal tab, or the Nether's purple. Three
    # thin panels: standing along X, standing along Z, lying on the ground.
    $tex = 'minecraft:block/nether_portal'
    $pic = Join-Path $assets 'textures/item/dimension_portal.png'
    if (Test-Path $pic) { Copy-Item $pic (Join-Path $assets 'textures/block/dimension_portal.png') -Force; $tex = 'myworld:block/dimension_portal' }
    $panel = { param($from, $to, $faces) $f = ($faces | ForEach-Object { '"' + $_ + '": { "uv": [0, 0, 16, 16], "texture": "#portal" }' }) -join ', '
        '{ "render_type": "minecraft:translucent", "ambientocclusion": false, "textures": { "particle": "' + $tex + '", "portal": "' + $tex + '" }, "elements": [ { "from": ' + $from + ', "to": ' + $to + ', "faces": { ' + $f + ' } } ] }' }
    [IO.File]::WriteAllText((Join-Path $assets 'models/block/dimension_portal_x.json'), (& $panel '[0, 0, 6]' '[16, 16, 10]' @('north', 'south')), $utf8)
    [IO.File]::WriteAllText((Join-Path $assets 'models/block/dimension_portal_z.json'), (& $panel '[6, 0, 0]' '[10, 16, 16]' @('east', 'west')), $utf8)
    [IO.File]::WriteAllText((Join-Path $assets 'models/block/dimension_portal_y.json'), (& $panel '[0, 6, 0]' '[16, 10, 16]' @('up', 'down')), $utf8)
    [IO.File]::WriteAllText((Join-Path $assets 'blockstates/dimension_portal.json'), '{ "variants": { "axis=x": { "model": "myworld:block/dimension_portal_x" }, "axis=y": { "model": "myworld:block/dimension_portal_y" }, "axis=z": { "model": "myworld:block/dimension_portal_z" } } }', $utf8)
    $lang['block.myworld.dimension_portal'] = 'Portal'
    return @($ids)
}
# One block name for a dimension file. Anything the game doesn't know becomes $fallback.
function Get-DimBlockId($code, $known, [string]$fallback) {
    $c = [string]$code
    if (-not $known.ContainsKey($c)) { $c = $fallback }
    return $c
}
# A colour from the studio, "#rrggbb", made darker ($k under 1) for a dimension where it's always night.
function Get-DimColor($c, [string]$def, [double]$k) {
    $c = [string]$c
    if ($c -notmatch '^#[0-9a-fA-F]{6}$') { $c = $def }
    $v = @(1, 3, 5 | ForEach-Object { [int][Math]::Round([Convert]::ToInt32($c.Substring($_, 2), 16) * $k) })
    return ('#{0:x2}{1:x2}{2:x2}' -f $v[0], $v[1], $v[2])
}
# One data file out of the game jar on this computer, e.g. "data/minecraft/worldgen/configured_feature/oak.json"; $null without it.
function Get-GameData([string]$mod, [string]$path) {
    $places = @((Join-Path (Split-Path $mod) 'gradle-home/caches/neoformruntime/artifacts'))
    if ($env:GRADLE_USER_HOME) { $places += (Join-Path $env:GRADLE_USER_HOME 'caches/neoformruntime/artifacts') }
    $jar = $places | ForEach-Object { Get-ChildItem $_ -Filter 'minecraft_*_client.jar' -ErrorAction SilentlyContinue } | Select-Object -First 1
    if (-not $jar) { return $null }
    Add-Type -AssemblyName System.IO.Compression.FileSystem
    $zip = [IO.Compression.ZipFile]::OpenRead($jar.FullName)
    try {
        $e = $zip.GetEntry($path)
        if (-not $e) { return $null }
        $r = New-Object IO.StreamReader($e.Open(), [Text.Encoding]::UTF8)
        try { return $r.ReadToEnd() } finally { $r.Dispose() }
    } finally { $zip.Dispose() }
}
# The kid's own tree: which of Minecraft's trees gives its shape (studio name = Minecraft's file name).
$script:DimTrees = @{ oak = 'oak'; birch = 'birch'; fancy = 'fancy_oak'; spruce = 'spruce'; cherry = 'cherry'; dark = 'dark_oak' }
# The ground shapes are Minecraft's own world shapes, read out of the game jar on this computer, with the kid's blocks
# in place of stone, grass and dirt. Without the jar the dimension is flat.
function Get-NoiseTemplate([string]$mod, [string]$preset) {
    $places = @((Join-Path (Split-Path $mod) 'gradle-home/caches/neoformruntime/artifacts'))
    if ($env:GRADLE_USER_HOME) { $places += (Join-Path $env:GRADLE_USER_HOME 'caches/neoformruntime/artifacts') }
    $jar = $places | ForEach-Object { Get-ChildItem $_ -Filter 'minecraft_*_client.jar' -ErrorAction SilentlyContinue } | Select-Object -First 1
    if (-not $jar) { return $null }
    Add-Type -AssemblyName System.IO.Compression.FileSystem
    $zip = [IO.Compression.ZipFile]::OpenRead($jar.FullName)
    try {
        $e = $zip.GetEntry("data/minecraft/worldgen/noise_settings/$preset.json")
        if (-not $e) { return $null }
        $r = New-Object IO.StreamReader($e.Open(), [Text.Encoding]::UTF8)
        try { return $r.ReadToEnd() } finally { $r.Dispose() }
    } finally { $zip.Dispose() }
}
# Plants and crystals the kid can pick, and where each goes in Minecraft's feature order (9 = plants, 2 = crystals).
$script:DimPlants = [ordered]@{
    grass = @(9, 'minecraft:patch_grass_plain'); flowers = @(9, 'minecraft:flower_plains'); oak = @(9, 'minecraft:trees_plains')
    birch = @(9, 'minecraft:trees_birch'); cherry = @(9, 'minecraft:trees_cherry'); spruce = @(9, 'minecraft:trees_taiga')
    mushrooms = @(9, 'minecraft:brown_mushroom_normal', 'minecraft:red_mushroom_normal'); crimson = @(9, 'minecraft:crimson_forest_vegetation')
    warped = @(9, 'minecraft:warped_forest_vegetation'); chorus = @(9, 'minecraft:chorus_plant'); cactus = @(9, 'minecraft:patch_cactus_desert')
    amethyst = @(2, 'minecraft:amethyst_geode'); lichen = @(9, 'minecraft:glow_lichen')
}
# The kid's dimension: data files the game reads when the world opens (data/myworld/dimension/my_dimension.json and
# what it names). Written fresh before every Play; with no dimension in the studio, none of them exist.
function Invoke-PrepareDim([string]$mod, $w) {
    $utf8 = New-Object System.Text.UTF8Encoding($false)
    $data = Join-Path $mod 'src/main/resources/data/myworld'
    $files = @{ dim = "$data/dimension/my_dimension.json"; type = "$data/dimension_type/my_dimension.json"; noise = "$data/worldgen/noise_settings/my_dimension.json"
        biome = "$data/worldgen/biome/my_dimension.json"; ore = "$data/worldgen/configured_feature/my_ore.json"; place = "$data/worldgen/placed_feature/my_ore.json"
        tree = "$data/worldgen/configured_feature/my_tree.json"; treeplace = "$data/worldgen/placed_feature/my_tree.json" }
    foreach ($p in $files.Values) { if (Test-Path $p) { Remove-Item $p -Force } }
    $d = $w.dim
    if (-not $d -or -not [string]$d.shape) { return $false }
    foreach ($p in $files.Values) { New-Item -ItemType Directory -Force (Split-Path $p) | Out-Null }
    $known = Get-KnownBlocks $mod $w
    $top = Get-DimBlockId $d.top $known 'minecraft:grass_block'
    $under = Get-DimBlockId $d.under $known 'minecraft:dirt'
    $deep = Get-DimBlockId $d.deep $known 'minecraft:stone'
    $state = { param($id) '{ "Name": "' + $id + '" }' }
    $shape = [string]$d.shape
    $preset = @{ hills = 'overworld'; mountains = 'amplified'; islands = 'floating_islands'; caves = 'caves' }[$shape]
    $noise = $null
    if ($preset) { $noise = Get-NoiseTemplate $mod $preset }
    if (-not $noise) { $shape = 'flat' }
    # How tall the world is, for each shape (the ground shapes need these exact heights).
    $h = @{ flat = @(0, 256); hills = @(-64, 384); mountains = @(-64, 384); islands = @(0, 256); caves = @(-64, 192) }[$shape]
    $roof = $shape -eq 'caves'
    $time = [string]$d.time
    $k = 1.0
    if ($time -eq 'night') { $k = 0.22 }
    $sky = Get-DimColor $d.sky '#78a7ff' $k
    $fog = Get-DimColor $d.fog '#c0d8ff' $k

    # The dimension type: height, roof, light, time, and what doesn't work there.
    $attr = New-Object System.Collections.ArrayList
    if ($d.nobed -eq $true) { [void]$attr.Add('"minecraft:gameplay/bed_rule": { "can_set_spawn": "never", "can_sleep": "never", "explodes": true }') }
    else { [void]$attr.Add('"minecraft:gameplay/bed_rule": { "can_set_spawn": "always", "can_sleep": "when_dark", "error_message": { "translate": "block.minecraft.bed.no_sleep" } }') }
    if ($d.nowater -eq $true) { [void]$attr.Add('"minecraft:gameplay/water_evaporates": true') }
    if ($time -eq 'night') {
        foreach ($a in '"minecraft:gameplay/sky_light_level": 0.27', '"minecraft:visual/sky_light_factor": 0.24', '"minecraft:visual/sky_light_color": "#7a7aff"',
                       '"minecraft:visual/star_brightness": 0.5', '"minecraft:visual/sun_angle": 180.0', '"minecraft:visual/moon_angle": 0.0', '"minecraft:gameplay/monsters_burn": false') { [void]$attr.Add($a) }
    } elseif ($time -eq 'day') {
        foreach ($a in '"minecraft:visual/sun_angle": 0.0', '"minecraft:visual/moon_angle": 180.0', '"minecraft:visual/star_brightness": 0.0') { [void]$attr.Add($a) }
    }
    $clock = '"default_clock": "minecraft:overworld", "timelines": "#minecraft:in_overworld",'
    if ($time -eq 'day' -or $time -eq 'night') { $clock = '"has_fixed_time": true,' }
    $light = '0.0'; if ($roof) { $light = '0.5' }   # a roof keeps the sky's light out: without this a cave world is pitch black
    $type = '{ "ambient_light": ' + $light + ', "attributes": { ' + ($attr -join ', ') + ' }, "coordinate_scale": 1.0, ' + $clock +
        ' "has_ceiling": ' + $roof.ToString().ToLower() + ', "has_ender_dragon_fight": false, "has_skylight": ' + (-not $roof).ToString().ToLower() +
        ', "height": ' + $h[1] + ', "logical_height": ' + $h[1] + ', "min_y": ' + $h[0] + ', "infiniburn": "#minecraft:infiniburn_overworld", "monster_spawn_block_light_limit": 0,' +
        ' "monster_spawn_light_level": { "type": "minecraft:uniform", "min_inclusive": 0, "max_inclusive": 7 } }'
    [IO.File]::WriteAllText($files.type, $type, $utf8)

    # The rare mineral: where it hides in the two lower layers, how deep and how much.
    $features = @(0..10 | ForEach-Object { , (New-Object System.Collections.ArrayList) })
    $ore = $d.ore
    if ($ore -and $known.ContainsKey([string]$ore.b)) {
        $how = @{ very = @(1, 3); rare = @(4, 5); lots = @(12, 8) }[[string]$ore.rare]
        if (-not $how) { $how = @(4, 5) }
        $ground = @{ flat = 63; hills = 128; mountains = 128; islands = 110; caves = 192 }[$shape]
        $span = @{ deep = @(0, 0.3); middle = @(0.3, 0.7); top = @(0.7, 1.0) }[[string]$ore.depth]
        if (-not $span) { $span = @(0, 0.3) }
        $lo = [int]($ground * $span[0]); $hi = [Math]::Max($lo + 4, [int]($ground * $span[1]))
        if ($shape -eq 'islands') { $lo = [Math]::Max($lo, 50); $hi = [Math]::Max($hi, $lo + 4) }
        $targets = (@($deep, $under) | Select-Object -Unique | ForEach-Object { '{ "target": { "predicate_type": "minecraft:block_match", "block": "' + $_ + '" }, "state": ' + (& $state ([string]$ore.b)) + ' }' }) -join ', '
        [IO.File]::WriteAllText($files.ore, '{ "type": "minecraft:ore", "config": { "discard_chance_on_air_exposure": 0.0, "size": ' + $how[1] + ', "targets": [ ' + $targets + ' ] } }', $utf8)
        [IO.File]::WriteAllText($files.place, '{ "feature": "myworld:my_ore", "placement": [ { "type": "minecraft:count", "count": ' + $how[0] + ' }, { "type": "minecraft:in_square" }, { "type": "minecraft:height_range", "height": { "type": "minecraft:uniform", "min_inclusive": { "above_bottom": ' + $lo + ' }, "max_inclusive": { "above_bottom": ' + $hi + ' } } }, { "type": "minecraft:biome" } ] }', $utf8)
        [void]$features[6].Add('"myworld:my_ore"')
    }
    foreach ($p in @($d.plants)) {
        $pl = $script:DimPlants[[string]$p]
        if (-not $pl) { continue }
        foreach ($f in $pl[1..($pl.Count - 1)]) { $q = '"' + $f + '"'; if (-not $features[$pl[0]].Contains($q)) { [void]$features[$pl[0]].Add($q) } }
    }
    # The kid's own tree: Minecraft's tree of that shape with the kid's trunk and leaves. It grows on any ground (the
    # block under the trunk becomes the top layer's block, not dirt). A broken tree is skipped, never the dimension.
    $t = $d.tree
    if ($t -and $script:DimTrees[[string]$t.shape]) {
        try {
            $tpl = Get-GameData $mod ('data/minecraft/worldgen/configured_feature/' + $script:DimTrees[[string]$t.shape] + '.json')
            if ($tpl) {
                $cfg = $tpl | ConvertFrom-Json
                $one = { param($id) [pscustomobject]@{ type = 'minecraft:simple_state_provider'; state = [pscustomobject]@{ Name = $id } } }
                $cfg.config.trunk_provider = & $one (Get-DimBlockId $t.trunk $known 'minecraft:oak_log')
                $cfg.config.foliage_provider = & $one (Get-DimBlockId $t.leaves $known 'minecraft:oak_leaves')
                $cfg.config.below_trunk_provider = & $one $top
                $cfg.config.decorators = @()
                $count = @{ few = 1; some = 3; lots = 8 }[[string]$t.n]
                if (-not $count) { $count = 3 }
                $where = '{ "type": "minecraft:count", "count": ' + $count + ' }, { "type": "minecraft:in_square" }, { "type": "minecraft:surface_water_depth_filter", "max_water_depth": 0 }, { "type": "minecraft:heightmap", "heightmap": "OCEAN_FLOOR" }'
                if ($roof) { $where = '{ "type": "minecraft:count_on_every_layer", "count": ' + $count + ' }' }   # under a roof: on the cave floors
                [IO.File]::WriteAllText($files.tree, ($cfg | ConvertTo-Json -Depth 40 -Compress), $utf8)
                [IO.File]::WriteAllText($files.treeplace, '{ "feature": "myworld:my_tree", "placement": [ ' + $where + ', { "type": "minecraft:biome" } ] }', $utf8)
                [void]$features[9].Add('"myworld:my_tree"')
            }
        } catch {
            foreach ($f in $files.tree, $files.treeplace) { if (Test-Path $f) { Remove-Item $f -Force } }
        }
    }
    $carvers = ''
    if ($shape -eq 'hills' -or $shape -eq 'mountains') { $carvers = '"minecraft:cave", "minecraft:cave_extra_underground", "minecraft:canyon"' }
    $spawners = (@('ambient', 'axolotls', 'creature', 'misc', 'monster', 'underground_water_creature', 'water_ambient', 'water_creature') | ForEach-Object { '"' + $_ + '": []' }) -join ', '
    $steps = ($features | ForEach-Object { '[ ' + ($_ -join ', ') + ' ]' }) -join ', '
    $biome = '{ "attributes": { "minecraft:visual/sky_color": "' + $sky + '", "minecraft:visual/fog_color": "' + $fog + '" }, "carvers": [ ' + $carvers + ' ], "downfall": 0.4,' +
        ' "effects": { "water_color": "#3f76e4" }, "features": [ ' + $steps + ' ], "has_precipitation": true,' +
        ' "spawn_costs": {}, "spawners": { ' + $spawners + ' }, "temperature": 0.8 }'
    [IO.File]::WriteAllText($files.biome, $biome, $utf8)

    # The ground: flat layers, or one of Minecraft's shapes with the kid's blocks. The kid's liquid fills the low parts.
    if ($shape -eq 'flat') {
        $layers = '{ "block": "minecraft:bedrock", "height": 1 }, { "block": "' + $deep + '", "height": 59 }, { "block": "' + $under + '", "height": 3 }, { "block": "' + $top + '", "height": 1 }'
        $gen = '{ "type": "minecraft:flat", "settings": { "biome": "myworld:my_dimension", "features": true, "lakes": false, "layers": [ ' + $layers + ' ], "structure_overrides": [] } }'
    } else {
        $fluid = @{ water = '{ "Name": "minecraft:water", "Properties": { "level": "0" } }'; lava = '{ "Name": "minecraft:lava", "Properties": { "level": "0" } }'; none = '{ "Name": "minecraft:air" }' }[[string]$d.fluid]
        if (-not $fluid) { $fluid = '{ "Name": "minecraft:water", "Properties": { "level": "0" } }' }
        $depth = { param($add, $id) '{ "type": "minecraft:condition", "if_true": { "type": "minecraft:stone_depth", "offset": 0, "surface_type": "floor", "add_surface_depth": ' + $add + ', "secondary_depth_range": 0 }, "then_run": { "type": "minecraft:block", "result_state": ' + (& $state $id) + ' } }' }
        $layer = '{ "type": "minecraft:sequence", "sequence": [ ' + (& $depth 'false' $top) + ', ' + (& $depth 'true' $under) + ' ] }'
        if ($shape -eq 'hills' -or $shape -eq 'mountains') { $layer = '{ "type": "minecraft:condition", "if_true": { "type": "minecraft:above_preliminary_surface" }, "then_run": ' + $layer + ' }' }
        $rules = @($layer)
        if ($shape -ne 'islands') { $rules = @('{ "type": "minecraft:condition", "if_true": { "type": "minecraft:vertical_gradient", "random_name": "minecraft:bedrock_floor", "true_at_and_below": { "above_bottom": 0 }, "false_at_and_above": { "above_bottom": 5 } }, "then_run": { "type": "minecraft:block", "result_state": { "Name": "minecraft:bedrock" } } }') + $rules }
        # surface_rule is the last thing in Minecraft's file: everything after it is replaced by the kid's layers.
        $cut = $noise.LastIndexOf('"surface_rule"')
        $noise = $noise.Substring(0, $cut) + '"surface_rule": { "type": "minecraft:sequence", "sequence": [ ' + ($rules -join ', ') + ' ] } }'
        $one = '"{0}"\s*:\s*\{{[^{{}}]*(\{{[^{{}}]*\}})?[^{{}}]*\}}'
        $noise = ([regex]($one -f 'default_block')).Replace($noise, ('"default_block": ' + (& $state $deep)).Replace('$', '$$'), 1)
        $noise = ([regex]($one -f 'default_fluid')).Replace($noise, ('"default_fluid": ' + $fluid).Replace('$', '$$'), 1)
        $noise = ([regex]'"ore_veins_enabled"\s*:\s*true').Replace($noise, '"ore_veins_enabled": false', 1)
        if ([string]$d.fluid -eq 'none') { $noise = ([regex]'"aquifers_enabled"\s*:\s*true').Replace($noise, '"aquifers_enabled": false', 1) }
        [IO.File]::WriteAllText($files.noise, $noise, $utf8)
        $gen = '{ "type": "minecraft:noise", "settings": "myworld:my_dimension", "biome_source": { "type": "minecraft:fixed", "biome": "myworld:my_dimension" } }'
    }
    [IO.File]::WriteAllText($files.dim, '{ "type": "myworld:my_dimension", "generator": ' + $gen + ' }', $utf8)
    return $true
}

# One studio recipe -> the text of a Minecraft recipe file, or $null if it can't be made (then the item simply has no
# recipe; the game still builds). Shaped recipes lose the empty rows and columns around them, like Minecraft's own,
# so the shape works anywhere in the grid. $known = every item code in the mod (an ingredient may be the kid's item).
function ConvertTo-StudioRecipe($r, [string]$id, $known) {
    $g = @($r.g)
    if ($g.Count -ne 9) { return $null }
    $cells = @()
    foreach ($c in $g) {
        $c = [string]$c
        if (-not $c) { $cells += ''; continue }
        if ($c -cnotmatch '^(minecraft|myworld):[a-z0-9_]{1,40}$' -or $c -eq "myworld:$id") { return $null }
        if ($c.StartsWith('myworld:') -and -not ($known -contains $c.Substring(8))) { return $null }
        $cells += $c
    }
    $used = @($cells | Where-Object { $_ })
    if ($used.Count -eq 0) { return $null }
    $n = 1; [void][int]::TryParse([string]$r.n, [ref]$n); $n = [Math]::Max(1, [Math]::Min(64, $n))
    $result = [ordered]@{ id = "myworld:$id"; count = $n }
    if ($r.any -eq $true) {
        $obj = [ordered]@{ type = 'minecraft:crafting_shapeless'; category = 'misc'; ingredients = $used; result = $result }
    } else {
        $rows = @(0, 1, 2 | Where-Object { $y = $_; @($cells[($y * 3)..($y * 3 + 2)] | Where-Object { $_ }).Count -gt 0 })
        $cols = @(0, 1, 2 | Where-Object { $x = $_; @($cells[$x], $cells[$x + 3], $cells[$x + 6] | Where-Object { $_ }).Count -gt 0 })
        $keys = [ordered]@{}
        $pattern = @()
        foreach ($y in $rows[0]..$rows[-1]) {
            $line = ''
            foreach ($x in $cols[0]..$cols[-1]) {
                $c = $cells[$y * 3 + $x]
                if (-not $c) { $line += ' '; continue }
                $k = $null
                foreach ($e in $keys.GetEnumerator()) { if ($e.Value -eq $c) { $k = $e.Key } }
                if (-not $k) { $k = [string]'ABCDEFGHI'[$keys.Count]; $keys[$k] = $c }
                $line += $k
            }
            $pattern += $line
        }
        $obj = [ordered]@{ type = 'minecraft:crafting_shaped'; category = 'misc'; key = $keys; pattern = $pattern; result = $result }
    }
    return ($obj | ConvertTo-Json -Depth 5)
}

# Weak models often forget imports. For common names used in the kid's files, add the import if it's missing.
function Add-MissingImports([string]$code) {
    $known = [ordered]@{
        'Item' = 'net.minecraft.world.item.Item'; 'ItemStack' = 'net.minecraft.world.item.ItemStack'; 'Items' = 'net.minecraft.world.item.Items'
        'Rarity' = 'net.minecraft.world.item.Rarity'; 'DeferredItem' = 'net.neoforged.neoforge.registries.DeferredItem'
        'MobEffect' = 'net.minecraft.world.effect.MobEffect'; 'MobEffectCategory' = 'net.minecraft.world.effect.MobEffectCategory'
        'MobEffectInstance' = 'net.minecraft.world.effect.MobEffectInstance'; 'MobEffects' = 'net.minecraft.world.effect.MobEffects'
        'Holder' = 'net.minecraft.core.Holder'; 'Component' = 'net.minecraft.network.chat.Component'
        'Player' = 'net.minecraft.world.entity.player.Player'; 'LivingEntity' = 'net.minecraft.world.entity.LivingEntity'
        'Level' = 'net.minecraft.world.level.Level'; 'InteractionHand' = 'net.minecraft.world.InteractionHand'
        'InteractionResult' = 'net.minecraft.world.InteractionResult'
        'EventBusSubscriber' = 'net.neoforged.fml.common.EventBusSubscriber'; 'SubscribeEvent' = 'net.neoforged.bus.api.SubscribeEvent'
    }
    $body = [regex]::Replace($code, '(?m)^\s*(package|import)\s.*$', '')
    $add = foreach ($n in $known.Keys) {
        if ($code -match ('(?m)^\s*import\s+[\w.]+\.' + $n + '\s*;')) { continue }
        if ($body -match ('(?<![\w.])' + $n + '(?!\w)')) { 'import ' + $known[$n] + ';' }
    }
    if (-not $add) { return $code }
    $m = [regex]::Match($code, '(?m)^\s*package\s+[\w.]+\s*;\s*$')
    $at = $(if ($m.Success) { $m.Index + $m.Length } else { 0 })
    return $code.Insert($at, "`n" + (@($add) -join "`n"))
}

# Puts code copied from Gemini into the kid's file it belongs to, after backing up the old version.
# Forgiving on purpose, because Gemini (especially a weak model) is sloppy:
#  - text or ``` fences around the code are ignored;
#  - a missing or wrong "package" line is fixed;
#  - if Gemini sent only item lines (Kit.item...), they are added into MyItems.java, replacing an item with the same code.
function Invoke-Paste([string]$root, [string]$text) {
    $utf8 = New-Object System.Text.UTF8Encoding($false)
    $kidFiles = @('MyWorld', 'MyItems', 'MyEffects', 'MyMobs', 'MyRules')
    $java = Join-Path $root 'mod/src/main/java/make/myworld'
    if (-not $text -or -not $text.Trim()) { return New-Result $false 'עוד לא העתקתם כלום. בג׳מיני לוחצים על כפתור ההעתקה שליד הקוד.' }
    $text = ($text -replace "`r`n", "`n") -replace '(?m)^\s*```[a-zA-Z]*\s*$', ''

    $save = {
        param($name, $code)
        $target = Join-Path $java "$name.java"
        $saves = Join-Path $root 'saves'
        New-Item -ItemType Directory -Force $saves | Out-Null
        if (Test-Path $target) { Copy-Item $target (Join-Path $saves ((Get-Date -Format 'yyyy-MM-dd_HH-mm-ss') + "_$name.java")) }
        $code = Add-MissingImports ($code -replace "`r`n", "`n")
        [IO.File]::WriteAllText($target, (($code.Trim()) -replace "`n", "`r`n") + "`r`n", $utf8)
    }

    # A whole file: it has a class.
    $cls = [regex]::Match($text, '(?m)^\s*(?:public\s+)?(?:final\s+)?class\s+(\w+)')
    if ($cls.Success) {
        $name = $cls.Groups[1].Value
        if ($kidFiles -notcontains $name) {
            return New-Result $false "ג׳מיני שלח קובץ בשם $name. הקבצים שלכם: MyItems, MyEffects, MyMobs, MyRules, MyWorld. בקשו ממנו לשים את הקוד באחד מהם."
        }
        $starts = @([regex]::Match($text, '(?m)^\s*package\s'), [regex]::Match($text, '(?m)^\s*import\s'), [regex]::Match($text, '(?m)^\s*@')) | Where-Object { $_.Success } | ForEach-Object { $_.Index }
        $start = (@($starts) + $cls.Index | Measure-Object -Minimum).Minimum
        $end = $text.LastIndexOf('}')
        if ($end -lt $cls.Index) { return New-Result $false 'הקוד נחתך באמצע. בקשו מג׳מיני: ״שלח שוב את כל הקובץ״.' }
        $code = $text.Substring($start, $end - $start + 1).Trim()
        $code = [regex]::Replace($code, '(?m)^\s*package\s+[\w.]+\s*;\s*\n?', '')
        $code = "package make.myworld;`n`n" + $code.TrimStart()
        & $save $name $code
        return New-Result $true "הקוד נכנס לקובץ $name.java"
    }

    # Only item lines: add them into MyItems.java.
    $items = New-Object System.Collections.ArrayList
    $k = 0
    while (($k = $text.IndexOf('Kit.item(', $k)) -ge 0) {
        $depth = 0; $e = -1; $inStr = $false
        for ($c = $k + 8; $c -lt $text.Length; $c++) {
            $ch = $text[$c]
            if ($ch -eq '"' -and $text[$c - 1] -ne '\') { $inStr = -not $inStr; continue }
            if ($inStr) { continue }
            if ($ch -eq '(' -or $ch -eq '{') { $depth++ } elseif ($ch -eq ')' -or $ch -eq '}') { $depth--; if ($depth -eq 0) { $e = $c; break } }
        }
        if ($e -lt 0) { return New-Result $false 'הקוד נחתך באמצע. בקשו מג׳מיני: ״שלח שוב את כל הקובץ״.' }
        $call = $text.Substring($k, $e - $k + 1)
        $id = [regex]::Match($call, 'Kit\.item\(\s*"([a-z0-9_]+)"').Groups[1].Value
        if ($id) { [void]$items.Add(@{ id = $id; call = $call }) }
        $k = $e
    }
    if ($items.Count -eq 0) { return New-Result $false 'מה שהעתקתם זה לא קוד של המוד. בקשו מג׳מיני: ״שלח את כל הקובץ״.' }
    $file = Join-Path $java 'MyItems.java'
    if (-not (Test-Path $file)) { return New-Result $false 'הקובץ MyItems.java חסר. קוראים למורה.' }
    $src = [IO.File]::ReadAllText($file, [Text.Encoding]::UTF8) -replace "`r`n", "`n"
    foreach ($it in $items) {
        $field = '    public static final DeferredItem<Item> ' + $it.id.ToUpper() + ' = ' + $it.call + ';'
        $same = [regex]::Match($src, '(?s)\n[ \t]*public static final DeferredItem<Item> \w+ = Kit\.item\(\s*"' + [regex]::Escape($it.id) + '".*?\);[^\n]*')
        if ($same.Success) {
            $src = $src.Remove($same.Index, $same.Length).Insert($same.Index, "`n" + $field)
        } else {
            $at = $src.LastIndexOf('static void load()')
            if ($at -lt 0) { return New-Result $false 'לא מצאתי איפה להוסיף את החפץ. בקשו מג׳מיני את כל הקובץ MyItems.java.' }
            $line = $src.LastIndexOf("`n", $at)
            $src = $src.Insert($line + 1, $field + "`n`n")
        }
    }
    & $save 'MyItems' $src
    $names = ($items | ForEach-Object { $_.id }) -join ', '
    return New-Result $true "ג׳מיני שלח רק חפץ, אז הוספתי אותו לקובץ MyItems.java: $names"
}

# Brings back the file as it was before the last paste. Each press goes one paste further back.
function Invoke-Undo([string]$root) {
    $last = Get-ChildItem (Join-Path $root 'saves') -Filter '*_My*.java' -ErrorAction SilentlyContinue | Sort-Object Name -Descending | Select-Object -First 1
    if (-not $last) { return New-Result $false 'אין מה לבטל.' }
    $name = ($last.Name -split '_')[-1]
    Copy-Item $last.FullName (Join-Path $root "mod/src/main/java/make/myworld/$name") -Force
    Remove-Item $last.FullName
    return New-Result $true "הקובץ $name חזר למה שהיה לפני ההדבקה האחרונה. לוחצים שחק כדי לבדוק."
}

# The useful part of a failed build or crash, ready to paste into Gemini.
function Get-ErrorForGemini([string]$log) {
    $lines = @(Get-Content $log -ErrorAction SilentlyContinue)
    $picked = New-Object System.Collections.ArrayList
    for ($i = 0; $i -lt $lines.Count; $i++) {
        if ($lines[$i] -match '\.java:\d+: error:') {
            $last = [Math]::Min($i + 2, $lines.Count - 1)
            [void]$picked.AddRange(@($lines[$i..$last]))
        }
    }
    if ($picked.Count -eq 0) {
        $crash = @($lines | Where-Object { $_ -match 'Exception|Caused by:|Error:' } | Select-Object -First 12)
        if ($crash.Count -gt 0) { [void]$picked.AddRange($crash) }
    }
    if ($picked.Count -eq 0) { [void]$picked.AddRange(@($lines | Select-Object -Last 30)) }
    return "המוד שלי לא עובד. זאת השגיאה:`r`n" + ($picked -join "`r`n")
}

# ---------- versions ----------
# saves/ holds two kinds: "<time>_MyItems.java" (made before every paste) and "<time>_all/" (a version the kid saved,
# with every code file and picture). Restoring always backs up the current state first, so it can be undone too.
function Invoke-SaveAll([string]$root, [string]$label = 'all') {
    $dir = Join-Path $root ('saves/' + (Get-Date -Format 'yyyy-MM-dd_HH-mm-ss') + "_$label")
    New-Item -ItemType Directory -Force (Join-Path $dir 'java'), (Join-Path $dir 'textures') | Out-Null
    Copy-Item (Join-Path $root 'mod/src/main/java/make/myworld/*.java') (Join-Path $dir 'java')
    $tex = Join-Path $root 'mod/src/main/resources/assets/myworld/textures'
    if (Test-Path $tex) { Copy-Item (Join-Path $tex '*') (Join-Path $dir 'textures') -Recurse }
    $st = Get-StudioFile $root
    if (Test-Path $st) { Copy-Item $st (Join-Path $dir 'world.json') }
    return New-Result $true 'הגרסה נשמרה.'
}

function Get-Versions([string]$root) {
    $saves = Join-Path $root 'saves'
    if (-not (Test-Path $saves)) { return @() }
    $today = Get-Date -Format 'yyyy-MM-dd'
    $list = foreach ($e in (Get-ChildItem $saves | Where-Object { $_.Name -match '^\d{4}-\d{2}-\d{2}_\d{2}-\d{2}-\d{2}_' -and $_.Name -notlike '*.png' } | Sort-Object Name -Descending | Select-Object -First 40)) {
        $date = $e.Name.Substring(0, 10)
        $time = $e.Name.Substring(11, 5).Replace('-', ':')
        $rest = $e.Name.Substring(20)
        $what = $(if ($e.PSIsContainer -and $rest -eq 'all') { 'גרסה ששמרתם' }
                  elseif ($e.PSIsContainer) { 'לפני שהחזרתם גרסה' }
                  elseif ($rest -eq 'studio.json') { 'הסטודיו, לפני שינוי' }
                  else { 'לפני הדבקה ל־' + ($rest -replace '\.java$', '') })
        [pscustomobject]@{ id = $e.Name; day = $(if ($date -eq $today) { 'היום' } else { $date }); time = $time; what = $what }
    }
    return @($list)
}

function Invoke-Restore([string]$root, [string]$id) {
    if ($id -notmatch '^\d{4}-\d{2}-\d{2}_\d{2}-\d{2}-\d{2}_[A-Za-z]+(\.java|\.json)?$') { return New-Result $false 'הגרסה לא נמצאה.' }
    $src = Join-Path $root "saves/$id"
    if (-not (Test-Path $src)) { return New-Result $false 'הגרסה לא נמצאה.' }
    [void](Invoke-SaveAll $root 'before')
    $java = Join-Path $root 'mod/src/main/java/make/myworld'
    if (Test-Path $src -PathType Container) {
        Copy-Item (Join-Path $src 'java/*.java') $java -Force
        $tex = Join-Path $root 'mod/src/main/resources/assets/myworld/textures'
        if (Test-Path (Join-Path $src 'textures')) { Copy-Item (Join-Path $src 'textures/*') $tex -Recurse -Force }
        if (Test-Path (Join-Path $src 'world.json')) { New-Item -ItemType Directory -Force (Split-Path (Get-StudioFile $root)) | Out-Null; Copy-Item (Join-Path $src 'world.json') (Get-StudioFile $root) -Force; Copy-StudioToMod $root }
    } elseif ($id.EndsWith('_studio.json')) {
        New-Item -ItemType Directory -Force (Split-Path (Get-StudioFile $root)) | Out-Null
        Copy-Item $src (Get-StudioFile $root) -Force; Copy-StudioToMod $root
    } else {
        Copy-Item $src (Join-Path $java (($id -split '_')[-1])) -Force
    }
    return New-Result $true 'הגרסה חזרה. לוחצים שחק כדי לבדוק.'
}

# ---------- the studio: the kid's world as data ----------
# design/world.json is what the kid builds in the hub's studio (items now; creatures, rules and places later).
# A copy goes into the mod's resources, where Kit.java reads it when the game starts. No code is written,
# so nothing the kid does in the studio can break the build.
function Get-StudioFile([string]$root) { Join-Path $root 'design/world.json' }
function Get-Studio([string]$root) {
    $f = Get-StudioFile $root
    if (Test-Path $f) { return [IO.File]::ReadAllText($f, [Text.Encoding]::UTF8) }
    return '{"version":1,"items":[]}'
}
# Checks a whole design; returns $null if it's fine, or a message for the kid.
function Test-Studio($w, [string]$root) {
    if ($null -eq $w) { return 'העיצוב לא נקרא.' }
    $taken = @{}
    foreach ($it in @(Get-ItemList $root | Where-Object { -not $_.studio })) { $taken[$it.id] = 'MyItems' }
    $seen = @{}
    foreach ($it in @($w.items)) {
        if ($null -eq $it) { continue }
        $id = [string]$it.id
        # An item without a code yet is saved, and stays out of the game until it gets one.
        if (-not $id) { continue }
        $who = if ([string]$it.name) { [string]$it.name } else { 'בלי שם' }
        if ($id -notmatch '^[a-z][a-z0-9_]{0,39}$') { return "בחפץ ״$who״ הקוד באנגלית לא תקין: רק אותיות קטנות, מספרים וקו תחתון, ומתחיל באות." }
        if ($seen.ContainsKey($id)) { return "יש שני חפצים עם הקוד $id. בחפץ ״$who״ בוחרים קוד אחר." }
        if ($taken.ContainsKey($id)) { return "כבר יש חפץ עם הקוד $id, שג׳מיני כתב בקובץ MyItems.java. בוחרים קוד אחר." }
        $seen[$id] = $true
        if (([string]$it.name).Length -gt 40) { return 'השם ארוך מדי: עד 40 אותיות.' }
        if (([string]$it.lore).Length -gt 80) { return 'המשפט מתחת לשם ארוך מדי: עד 80 אותיות.' }
    }
    if (@($w.items).Count -gt 60) { return 'יותר מדי חפצים: עד 60.' }
    foreach ($b in @($w.blocks)) {
        if ($null -eq $b -or -not [string]$b.id) { continue }
        $id = [string]$b.id
        if ($id -notmatch '^[a-z][a-z0-9_]{0,39}$') { return "בקובייה ״$([string]$b.name)״ הקוד באנגלית לא תקין: רק אותיות קטנות, מספרים וקו תחתון, ומתחיל באות." }
        if ($seen.ContainsKey($id) -or $taken.ContainsKey($id)) { return "כבר יש חפץ או קובייה עם הקוד $id. בוחרים קוד אחר." }
        $seen[$id] = $true
        if (([string]$b.name).Length -gt 40) { return 'השם ארוך מדי: עד 40 אותיות.' }
    }
    if (@($w.blocks).Count -gt 30) { return 'יותר מדי קוביות: עד 30.' }
    return $null
}
function Save-Studio([string]$root, [string]$json) {
    $utf8 = New-Object System.Text.UTF8Encoding($false)
    try { $w = $json | ConvertFrom-Json } catch { return New-Result $false 'העיצוב לא נקרא. נסו שוב.' }
    $bad = Test-Studio $w $root
    if ($bad) { return New-Result $false $bad }
    $f = Get-StudioFile $root
    New-Item -ItemType Directory -Force (Split-Path $f) | Out-Null
    if (Test-Path $f) {
        $old = [IO.File]::ReadAllText($f, [Text.Encoding]::UTF8)
        if ($old -eq $json) { return New-Result $true 'נשמר.' }
        # One version per minute at most, so typing doesn't flood the versions list.
        $saves = Join-Path $root 'saves'; New-Item -ItemType Directory -Force $saves | Out-Null
        $stamp = Get-Date -Format 'yyyy-MM-dd_HH-mm'
        if (-not (Get-ChildItem $saves -Filter "${stamp}-*_studio.json" -ErrorAction SilentlyContinue)) {
            Copy-Item $f (Join-Path $saves ((Get-Date -Format 'yyyy-MM-dd_HH-mm-ss') + '_studio.json'))
        }
    }
    [IO.File]::WriteAllText($f, $json, $utf8)
    Copy-StudioToMod $root
    return New-Result $true 'נשמר.'
}
function Copy-StudioToMod([string]$root) {
    $f = Get-StudioFile $root
    if (-not (Test-Path $f)) { return }
    $dir = Join-Path $root 'mod/src/main/resources/assets/myworld/studio'
    New-Item -ItemType Directory -Force $dir | Out-Null
    Copy-Item $f (Join-Path $dir 'world.json') -Force
}

# ---------- an item straight from the card, without Gemini ----------
# The fallback for a day Gemini doesn't work: the card's code, name, line and stack size become one Kit.item line,
# added to MyItems.java the same way a pasted item line is (backup first, so "ביטול ההדבקה" undoes it).
function Invoke-AddItem([string]$root, [string]$id, [string]$name, [string]$lore, [string]$stack) {
    $id = $id.Trim().ToLower() -replace '\s+', '_'
    if ($id -notmatch '^[a-z][a-z0-9_]{0,39}$') { return New-Result $false 'הקוד באנגלית: רק אותיות קטנות, מספרים וקו תחתון, ומתחיל באות. למשל honey_coin.' }
    $name = ($name -replace '[\r\n]+', ' ').Trim()
    $lore = ($lore -replace '[\r\n]+', ' ').Trim()
    if (-not $name) { return New-Result $false 'חסר שם לחפץ. כותבים אותו בכרטיס.' }
    $n = 0
    if (-not [int]::TryParse(($stack -replace '\D', ''), [ref]$n) -or $n -lt 1) { $n = 64 }
    if ($n -gt 64) { $n = 64 }
    $q = { param($t) '"' + ($t.Replace('\', '\\').Replace('"', '\"')) + '"' }
    $line = 'Kit.item(' + (& $q $id) + ', ' + (& $q $name) + ', ' + (& $q $lore) + ', p -> p.stacksTo(' + $n + '))'
    $r = Invoke-Paste $root $line
    if ($r.Ok) { $r.Message = "החפץ $name נכנס לקובץ MyItems.java, בלי ג׳מיני" }
    return $r
}

# ---------- the kid's code lock ----------
# pin.txt holds "salt:hash" of the kid's 4 digits; teacher.txt the same for the teacher's code (set once by
# update-from-usb.bat, never in the repo). Not a safe: it keeps other kids from opening someone's hub by accident.
function Get-CodeHash([string]$salt, [string]$code) {
    $sha = [Security.Cryptography.SHA256]::Create()
    $bytes = $sha.ComputeHash([Text.Encoding]::UTF8.GetBytes($salt + ':' + $code))
    return -join ($bytes | ForEach-Object { $_.ToString('x2') })
}
function Test-Code([string]$file, [string]$code) {
    if (-not (Test-Path $file)) { return $false }
    $parts = ([IO.File]::ReadAllText($file)).Trim().Split(':')
    if ($parts.Count -ne 2) { return $false }
    return (Get-CodeHash $parts[0] $code) -eq $parts[1]
}
function Set-Code([string]$file, [string]$code) {
    $salt = [Guid]::NewGuid().ToString('N').Substring(0, 12)
    [IO.File]::WriteAllText($file, $salt + ':' + (Get-CodeHash $salt $code))
}

# ---------- backup file, for the kid's Google Drive ----------
# One zip with everything that is the kid's: the five code files, pictures and models, the Minecraft worlds and the
# hub's own notes (world card, item card, progress). It goes to the kid's Drive, so it survives a laptop reset and
# moves with the kid to any laptop.
function Add-ZipFile($zip, [string]$path, [string]$name) {
    try {
        # Minecraft may hold a world file open while the game runs, so read it with sharing on.
        $fs = [IO.File]::Open($path, 'Open', 'Read', 'ReadWrite, Delete')
        try { $es = $zip.CreateEntry($name).Open(); $fs.CopyTo($es); $es.Close() } finally { $fs.Close() }
    } catch {}
}

function Get-BackupZip([string]$root, [string]$hubJson) {
    Add-Type -AssemblyName System.IO.Compression
    $mem = New-Object IO.MemoryStream
    $zip = New-Object IO.Compression.ZipArchive($mem, [IO.Compression.ZipArchiveMode]::Create, $true)
    $e = $zip.CreateEntry('myworld-backup.txt').Open()
    $b = [Text.Encoding]::UTF8.GetBytes("MAKE myworld backup 1`r`n" + (Get-Date -Format 'yyyy-MM-dd HH:mm')); $e.Write($b, 0, $b.Length); $e.Close()
    $e = $zip.CreateEntry('hub.json').Open()
    $b = [Text.Encoding]::UTF8.GetBytes($hubJson); $e.Write($b, 0, $b.Length); $e.Close()
    $java = Join-Path $root 'mod/src/main/java/make/myworld'
    foreach ($n in @('MyWorld', 'MyItems', 'MyEffects', 'MyMobs', 'MyRules')) {
        $p = Join-Path $java "$n.java"
        if (Test-Path $p) { Add-ZipFile $zip $p "code/$n.java" }
    }
    $st = Get-StudioFile $root
    if (Test-Path $st) { Add-ZipFile $zip $st 'design/world.json' }
    $assets = Join-Path $root 'mod/src/main/resources/assets/myworld'
    foreach ($sub in @('textures', 'models')) {
        $dir = Join-Path $assets $sub
        if (-not (Test-Path $dir)) { continue }
        $base = (Resolve-Path $assets).Path.Length
        foreach ($f in Get-ChildItem $dir -Recurse -File) { Add-ZipFile $zip $f.FullName ('assets' + $f.FullName.Substring($base).Replace('\', '/')) }
    }
    # Worlds: all of them, or only the newest one if together they are too big for a school upload.
    $saves = Join-Path $root 'mod/run/saves'
    if (Test-Path $saves) {
        $worlds = @(Get-ChildItem $saves -Directory | Sort-Object LastWriteTime -Descending)
        $size = (Get-ChildItem $saves -Recurse -File -ErrorAction SilentlyContinue | Measure-Object Length -Sum).Sum
        if ($size -gt 150MB) { $worlds = @($worlds | Select-Object -First 1) }
        $base = (Resolve-Path $saves).Path.Length
        foreach ($w in $worlds) {
            foreach ($f in Get-ChildItem $w.FullName -Recurse -File) {
                if ($f.Name -eq 'session.lock') { continue }
                Add-ZipFile $zip $f.FullName ('worlds' + $f.FullName.Substring($base).Replace('\', '/'))
            }
        }
    }
    $zip.Dispose()
    return $mem.ToArray()
}

# Puts a backup file back. Saves a version of the current state first, so this can be undone from "גרסאות".
function Invoke-LoadBackup([string]$root, [byte[]]$bytes) {
    Add-Type -AssemblyName System.IO.Compression
    $fail = New-Result $false 'זה לא קובץ גיבוי של הקורס. בוחרים את הקובץ שמתחיל ב־myworld.'
    try { $zip = New-Object IO.Compression.ZipArchive((New-Object IO.MemoryStream(, $bytes)), [IO.Compression.ZipArchiveMode]::Read) } catch { return $fail }
    try {
        if (-not $zip.GetEntry('myworld-backup.txt')) { return $fail }
        [void](Invoke-SaveAll $root 'before')
        $targets = @{
            'code/'   = Join-Path $root 'mod/src/main/java/make/myworld'
            'assets/' = Join-Path $root 'mod/src/main/resources/assets/myworld'
            'worlds/' = Join-Path $root 'mod/run/saves'
            'design/' = Join-Path $root 'design'
        }
        $kid = @('MyWorld.java', 'MyItems.java', 'MyEffects.java', 'MyMobs.java', 'MyRules.java')
        $hubJson = ''
        foreach ($en in $zip.Entries) {
            $name = $en.FullName.Replace('\', '/')
            if ($name -eq 'hub.json') { $r = New-Object IO.StreamReader($en.Open(), [Text.Encoding]::UTF8); $hubJson = $r.ReadToEnd(); $r.Close(); continue }
            if ($name.EndsWith('/') -or $name.Contains('..') -or $name.Contains(':') -or $name.StartsWith('/')) { continue }
            $top = ($name -split '/')[0] + '/'
            if (-not $targets.ContainsKey($top)) { continue }
            $rest = $name.Substring($top.Length)
            if ($top -eq 'code/' -and $kid -notcontains $rest) { continue }
            if ($top -eq 'assets/' -and $rest -notmatch '^(textures|models)/') { continue }
            if ($top -eq 'design/' -and $rest -ne 'world.json') { continue }
            $dest = Join-Path $targets[$top] $rest
            New-Item -ItemType Directory -Force (Split-Path $dest) | Out-Null
            $in = $en.Open(); $out = [IO.File]::Create($dest)
            try { $in.CopyTo($out) } finally { $out.Close(); $in.Close() }
        }
    } finally { $zip.Dispose() }
    Copy-StudioToMod $root
    $r = New-Result $true 'העולם שלכם חזר: הקוד, הציורים והעולמות. לוחצים שחק.'
    $r | Add-Member Hub $hubJson
    return $r
}

# ---------- for Gemini and the picture editor ----------
# The course rules plus all of the kid's code, to paste into any Gemini chat. Every message carries its own rules,
# so nothing depends on Gems (replaced by 18+ Skills on 17 Nov 2026) or on Gemini remembering anything.
function Get-KidCode([string]$root) {
    $java = Join-Path $root 'mod/src/main/java/make/myworld'
    $parts = foreach ($n in @('MyWorld', 'MyItems', 'MyEffects', 'MyMobs', 'MyRules')) {
        $p = Join-Path $java "$n.java"
        if (Test-Path $p) { "===== $n.java =====`r`n" + [IO.File]::ReadAllText($p, [Text.Encoding]::UTF8).TrimEnd() }
    }
    $rulesFile = Join-Path $root 'mod/tools/rules.txt'
    $rules = $(if (Test-Path $rulesFile) { [IO.File]::ReadAllText($rulesFile, [Text.Encoding]::UTF8).Trim() + "`r`n`r`n" } else { '' })
    return $rules + "===== הקוד שלי =====`r`n`r`n" + ($parts -join "`r`n`r`n") + "`r`n`r`n===== מה אני רוצה =====`r`n"
}

# The items in MyItems.java: code name and Hebrew name, for the picture editor's list.
function Get-ItemList([string]$root) {
    $p = Join-Path $root 'mod/src/main/java/make/myworld/MyItems.java'
    if (-not (Test-Path $p)) { return @() }
    $src = [IO.File]::ReadAllText($p, [Text.Encoding]::UTF8)
    $gap = '(?:\s|//[^\r\n]*)*'
    $tex = Join-Path $root 'mod/src/main/resources/assets/myworld/textures/item'
    $list = foreach ($m in [regex]::Matches($src, 'Kit\.item\(' + $gap + '"([a-z0-9_]+)"' + $gap + ',' + $gap + '"((?:[^"\\]|\\.)*)"')) {
        $id = $m.Groups[1].Value
        [pscustomobject]@{ id = $id; name = $m.Groups[2].Value.Replace('\"', '"'); hasPicture = (Test-Path (Join-Path $tex "$id.png")); studio = $false }
    }
    $st = Get-StudioFile $root
    if (Test-Path $st) {
        try { $w = [IO.File]::ReadAllText($st, [Text.Encoding]::UTF8) | ConvertFrom-Json } catch { $w = $null }
        foreach ($it in @($w.items)) { if ($it.id) { $list = @($list) + [pscustomobject]@{ id = [string]$it.id; name = [string]$it.name; hasPicture = (Test-Path (Join-Path $tex "$($it.id).png")); studio = $true } } }
    }
    return @($list)
}

# Saves a 16x16 PNG drawn in the hub as the item's picture.
function Save-ItemPicture([string]$root, [string]$id, [string]$base64) {
    if ($id -notmatch '^[a-z0-9_]{1,40}$') { return New-Result $false 'הקוד של החפץ: רק אותיות קטנות באנגלית, מספרים וקו תחתון.' }
    try { $bytes = [Convert]::FromBase64String($base64) } catch { return New-Result $false 'הציור לא נשמר. נסו שוב.' }
    if ($bytes.Length -lt 8 -or $bytes[0] -ne 0x89 -or $bytes[1] -ne 0x50) { return New-Result $false 'הציור לא נשמר. נסו שוב.' }
    $dir = Join-Path $root 'mod/src/main/resources/assets/myworld/textures/item'
    New-Item -ItemType Directory -Force $dir | Out-Null
    $file = Join-Path $dir "$id.png"
    if (Test-Path $file) {
        $saves = Join-Path $root 'saves'
        New-Item -ItemType Directory -Force $saves | Out-Null
        # One backup per picture per minute: the studio saves the picture after every stroke.
        if (-not (Get-ChildItem $saves -Filter ((Get-Date -Format 'yyyy-MM-dd_HH-mm') + "-*_$id.png") -ErrorAction SilentlyContinue)) {
            Copy-Item $file (Join-Path $saves ((Get-Date -Format 'yyyy-MM-dd_HH-mm-ss') + "_$id.png"))
        }
    }
    [IO.File]::WriteAllBytes($file, $bytes)
    return New-Result $true "הציור נשמר בשם $id.png. לוחצים שחק כדי לראות אותו במשחק."
}
