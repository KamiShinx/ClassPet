# Updates the hub pages in C:\MAKE\hub and the course tools in C:\MAKE\mod\tools to one exact commit, and copies the
# Minecraft pictures the slides use out of the game that is already installed in C:\MAKE.
# Run: double-click C:\MAKE\update.bat (it runs the copy of this file in C:\MAKE\mod\tools, which downloads only data
# and the course files, never a script to run on the spot). With no commit given, it takes the newest one on the branch.
# The old Win+R line (irm ... | iex) is gone: Windows Defender flags that pattern as Trojan:Win32/Commando (6 Oct 2026).
# Never touches the kid's own files (MyWorld/MyItems/MyEffects/MyMobs/MyRules.java, pictures, worlds). No reinstall.
# The pictures never leave this computer and are not in the repo.
$ErrorActionPreference = 'Stop'
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
if (-not $s -and $args.Count) { $s = [string]$args[0] }
if (-not $s) {
  try { $s = (Invoke-RestMethod 'https://api.github.com/repos/KamiShinx/ClassPet/commits/claude/make-courses' -Headers @{ 'User-Agent' = 'make-course' }).sha }
  catch { Write-Host "Can't reach GitHub ($($_.Exception.Message)). Check the internet and try again." -ForegroundColor Red; return }
}
# This updater as it is now, to tell below whether the download brought a newer one.
$selfOld = if ($PSCommandPath -and (Test-Path $PSCommandPath)) { [IO.File]::ReadAllBytes($PSCommandPath) } else { $null }
if (-not $makeRoot) { $makeRoot = 'C:\MAKE' }          # tests set $makeRoot / $mcSearch first
$hub = Join-Path $makeRoot 'hub'
if (-not (Test-Path $hub)) { Write-Host "$hub not found. Run install.bat first." -ForegroundColor Red; return }

# ---------- 1. the hub pages ----------
$raw = "https://raw.githubusercontent.com/KamiShinx/ClassPet/$s/minecraft-course/hub"
$utf8 = New-Object System.Text.UTF8Encoding($false)
$head = '<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">' + "`r`n"
$web = New-Object System.Net.WebClient
Write-Host "Downloading the hub ($s). This takes about a minute; don't click inside this window." -ForegroundColor Cyan
$files = @{}
foreach ($n in 'content.js', 'slides.js', 'en.js', 'studio.js', 'blocks.js', 'index.html', 'teacher.html', 'print.html') { $files[$n] = $utf8.GetString($web.DownloadData("$raw/$n")) }   # all, or nothing
[IO.File]::WriteAllText("$hub\content.js", $files['content.js'], $utf8)
[IO.File]::WriteAllText("$hub\slides.js", $files['slides.js'], $utf8)
[IO.File]::WriteAllText("$hub\en.js", $files['en.js'], $utf8)
[IO.File]::WriteAllText("$hub\studio.js", $files['studio.js'], $utf8)
[IO.File]::WriteAllText("$hub\blocks.js", $files['blocks.js'], $utf8)
# The block editor's library (Blockly, Apache 2.0), byte for byte.
New-Item -ItemType Directory -Force "$hub\blockly\media" | Out-Null
$bk = @('blockly_compressed.js', 'msg_he.js', 'msg_en.js', 'LICENSE.txt', 'README.txt') + (@('1x1.gif', 'click.mp3', 'delete-icon.svg', 'delete.mp3', 'disconnect.mp3', 'drop.mp3', 'dropdown-arrow.svg', 'foldout-icon.svg', 'handclosed.cur', 'handdelete.cur', 'handopen.cur', 'pilcrow.png', 'quote0.png', 'quote1.png', 'resize-handle.svg', 'sprites.svg') | ForEach-Object { "media/$_" })
foreach ($n in $bk) { [IO.File]::WriteAllBytes((Join-Path "$hub\blockly" ($n -replace '/', '\')), $web.DownloadData("$raw/blockly/$n")) }
[IO.File]::WriteAllText("$hub\index.html", $head + $files['index.html'], $utf8)
[IO.File]::WriteAllText("$hub\teacher.html", $head + $files['teacher.html'], $utf8)
[IO.File]::WriteAllText("$hub\print.html", $files['print.html'], $utf8)
Write-Host "Hub pages updated to $s." -ForegroundColor Green

# ---------- 1b. the course tools (the hub's buttons, the code lock, the rules for Gemini) ----------
$tools = Join-Path $makeRoot 'mod\tools'
if (Test-Path $tools) {
  $st = "https://raw.githubusercontent.com/KamiShinx/ClassPet/$s/minecraft-course/starter/mod"
  $get = @{}
  foreach ($n in 'common.ps1', 'server.ps1', 'shortcuts.ps1', 'prepare.ps1', 'play.ps1', 'paste.ps1', 'undo.ps1', 'rules.txt') { $get["tools\$n"] = $web.DownloadData("$st/tools/$n") }
  $get['src\main\java\make\myworld\Kit.java'] = $web.DownloadData("$st/src/main/java/make/myworld/Kit.java")
  $get['src\main\java\make\myworld\StudioPower.java'] = $web.DownloadData("$st/src/main/java/make/myworld/StudioPower.java")
  # This updater itself, and the double-click file that runs it next time.
  $get['tools\update-hub.ps1'] = $web.DownloadData("https://raw.githubusercontent.com/KamiShinx/ClassPet/$s/minecraft-course/setup/update-hub.ps1")
  $bat = $web.DownloadData("https://raw.githubusercontent.com/KamiShinx/ClassPet/$s/minecraft-course/setup/update.bat")
  foreach ($k in $get.Keys) { [IO.File]::WriteAllBytes((Join-Path (Join-Path $makeRoot 'mod') $k), $get[$k]) }
  [IO.File]::WriteAllBytes((Join-Path $makeRoot 'update.bat'), $bat)
  # The stick's files, ready to copy onto the USB stick (make-usb, install-from-usb, update-from-usb).
  $sf = Join-Path $makeRoot 'stick-files'; New-Item -ItemType Directory -Force $sf | Out-Null
  foreach ($n in 'make-usb.bat', 'install-from-usb.bat', 'update-from-usb.bat') { [IO.File]::WriteAllBytes((Join-Path $sf $n), $web.DownloadData("https://raw.githubusercontent.com/KamiShinx/ClassPet/$s/minecraft-course/setup/$n")) }
  Write-Host "Course tools updated (the kid's own files are untouched)." -ForegroundColor Green
  # A newer updater came down (new pictures for a new lesson, say): run it once now, so one double-click is enough.
  $new = $get['tools\update-hub.ps1']
  if ($selfOld -and -not $env:MAKE_UPDATED_ONCE -and [Convert]::ToBase64String($selfOld) -ne [Convert]::ToBase64String($new)) {
    $env:MAKE_UPDATED_ONCE = '1'
    Write-Host "The updater itself is new. Running the new one once more ..." -ForegroundColor Cyan
    & (Join-Path $tools 'update-hub.ps1') $s
    return
  }
}

# ---------- 2. Minecraft pictures for the slides, from the installed game ----------
# hub\mc_<name>.png  =  where it is inside the game (first one that exists wins).
# Flat names, no subfolder: the hub's local server only serves files that sit directly in hub\.
$want = [ordered]@{
  'item_ender_pearl' = 'item/ender_pearl'; 'item_golden_apple' = 'item/golden_apple'; 'item_totem_of_undying' = 'item/totem_of_undying'
  'item_elytra' = 'item/elytra'; 'item_bow' = 'item/bow'; 'item_poisonous_potato' = 'item/poisonous_potato'
  'item_diamond_sword' = 'item/diamond_sword'; 'item_iron_pickaxe' = 'item/iron_pickaxe'
  'block_dirt' = 'block/dirt'; 'block_netherrack' = 'block/netherrack'; 'block_glowstone' = 'block/glowstone'
  'block_lava_still' = 'block/lava_still'; 'block_magma' = 'block/magma'; 'block_end_stone' = 'block/end_stone'
  'block_obsidian' = 'block/obsidian'; 'block_deepslate' = 'block/deepslate'; 'block_sculk' = 'block/sculk'
  'block_sculk_catalyst_side' = 'block/sculk_catalyst_side'; 'block_sculk_shrieker_side' = 'block/sculk_shrieker_side'
  'block_sculk_sensor_side' = 'block/sculk_sensor_side'; 'block_grass_block_side' = 'block/grass_block_side'
  'block_oak_log' = 'block/oak_log'; 'block_oak_leaves' = 'block/oak_leaves'
  'entity_creeper_creeper' = 'entity/creeper/creeper'; 'entity_enderman_enderman' = 'entity/enderman/enderman'
  'entity_enderman_enderman_eyes' = 'entity/enderman/enderman_eyes'; 'entity_spider_spider' = 'entity/spider/spider'
  'entity_ghast_ghast' = 'entity/ghast/ghast'; 'entity_pig_pig' = 'entity/pig/pig_temperate|entity/pig/temperate_pig|entity/pig/pig'
  'entity_zombie_zombie' = 'entity/zombie/zombie'; 'entity_skeleton_skeleton' = 'entity/skeleton/skeleton'
  'entity_blaze' = 'entity/blaze|entity/blaze/blaze'; 'entity_piglin_piglin' = 'entity/piglin/piglin'
  'entity_warden_warden' = 'entity/warden/warden'
  # lesson 2 deck (slides.js): 3D blocks and mobs, day and night, the portal, the item slides
  'block_grass_block_top' = 'block/grass_block_top'; 'block_stone' = 'block/stone'; 'block_cobblestone' = 'block/cobblestone'
  'block_oak_log_top' = 'block/oak_log_top'; 'block_oak_planks' = 'block/oak_planks'; 'block_sand' = 'block/sand'
  'block_diamond_ore' = 'block/diamond_ore'; 'block_tnt_side' = 'block/tnt_side'; 'block_tnt_top' = 'block/tnt_top'; 'block_tnt_bottom' = 'block/tnt_bottom'
  'block_crafting_table_front' = 'block/crafting_table_front'; 'block_crafting_table_side' = 'block/crafting_table_side'; 'block_crafting_table_top' = 'block/crafting_table_top'
  'block_mossy_cobblestone' = 'block/mossy_cobblestone'; 'block_stone_bricks' = 'block/stone_bricks'; 'block_cracked_stone_bricks' = 'block/cracked_stone_bricks'
  'block_crying_obsidian' = 'block/crying_obsidian'; 'block_nether_portal' = 'block/nether_portal'; 'block_reinforced_deepslate_side' = 'block/reinforced_deepslate_side'
  'entity_player_wide_steve' = 'entity/player/wide/steve|entity/steve'
  'environment_celestial_sun' = 'environment/celestial/sun|environment/sun'; 'environment_celestial_moon_full_moon' = 'environment/celestial/moon/full_moon'
  'item_bread' = 'item/bread'; 'item_compass_00' = 'item/compass_00'; 'item_cooked_beef' = 'item/cooked_beef'; 'item_diamond' = 'item/diamond'
  'item_emerald' = 'item/emerald'; 'item_fishing_rod' = 'item/fishing_rod'; 'item_iron_sword' = 'item/iron_sword'; 'item_mace' = 'item/mace'
  'item_netherite_sword' = 'item/netherite_sword'; 'item_trident' = 'item/trident'
  # lesson 3 (crafting): the studio's ingredients, and the Torch in the recipe examples
  'item_stick' = 'item/stick'; 'item_string' = 'item/string'; 'item_feather' = 'item/feather'; 'item_leather' = 'item/leather'
  'item_paper' = 'item/paper'; 'item_flint' = 'item/flint'; 'item_bone' = 'item/bone'; 'item_coal' = 'item/coal'
  'item_copper_ingot' = 'item/copper_ingot'; 'item_iron_ingot' = 'item/iron_ingot'; 'item_gold_ingot' = 'item/gold_ingot'; 'item_redstone' = 'item/redstone'
  'item_lapis_lazuli' = 'item/lapis_lazuli'; 'item_amethyst_shard' = 'item/amethyst_shard'; 'item_netherite_ingot' = 'item/netherite_ingot'; 'item_apple' = 'item/apple'
  'item_wheat' = 'item/wheat'; 'item_sugar' = 'item/sugar'; 'item_egg' = 'item/egg'; 'item_honeycomb' = 'item/honeycomb'
  'item_slime_ball' = 'item/slime_ball'; 'item_gunpowder' = 'item/gunpowder'; 'item_rotten_flesh' = 'item/rotten_flesh'; 'item_spider_eye' = 'item/spider_eye'
  'item_glowstone_dust' = 'item/glowstone_dust'; 'item_blaze_rod' = 'item/blaze_rod'; 'item_ghast_tear' = 'item/ghast_tear'; 'item_prismarine_shard' = 'item/prismarine_shard'
  'item_phantom_membrane' = 'item/phantom_membrane'; 'item_echo_shard' = 'item/echo_shard'; 'item_nether_star' = 'item/nether_star'; 'block_glass' = 'block/glass'; 'block_torch' = 'block/torch'
}
# ---------- 3. every Minecraft item, for the studio's ingredient menu ----------
# hub\mc_items.json = [[id, English name, Hebrew name, picture number, 1 if it's a block], ...] and hub\mc_items.png =
# all the pictures in one sheet, 16 x 16 each, 40 to a row. Read out of the installed game, so they match it exactly.
function Write-McCatalog($zip, $assets, $hubDir) {
  $text = { param($p) $e = $zip.GetEntry($p); if (-not $e) { return $null }; $r = New-Object IO.StreamReader($e.Open(), [Text.Encoding]::UTF8); $t = $r.ReadToEnd(); $r.Dispose(); $t }
  $json = { param($p) $t = & $text $p; if ($t) { $t | ConvertFrom-Json } else { $null } }
  $en = & $json 'assets/minecraft/lang/en_us.json'
  $he = $null
  if ($assets) {   # Hebrew names: in the game's downloaded assets, not in the jar
    foreach ($ix in Get-ChildItem (Join-Path $assets 'indexes') -Filter *.json -ErrorAction SilentlyContinue) {
      $o = (Get-Content $ix.FullName -Raw | ConvertFrom-Json).objects.'minecraft/lang/he_il.json'
      if ($o) { $f = Join-Path $assets "objects\$($o.hash.Substring(0,2))\$($o.hash)"; if (Test-Path $f) { $he = [IO.File]::ReadAllText($f, [Text.Encoding]::UTF8) | ConvertFrom-Json; break } }
    }
  }
  # Operator-only things a kid can't use in a recipe.
  $skip = '^(air|command_block|chain_command_block|repeating_command_block|command_block_minecart|structure_block|structure_void|jigsaw|barrier|light|debug_stick|knowledge_book|test_block|test_instance_block|petrified_oak_slab)$'
  # The first model an item shows (items/<id>.json can switch between models; any one is fine for a picture).
  $firstModel = $null
  $firstModel = { param($n)
    if ($null -eq $n) { return $null }
    if ($n -is [array]) { foreach ($x in $n) { $m = & $firstModel $x; if ($m) { return $m } }; return $null }
    if ($n -isnot [pscustomobject]) { return $null }
    if ($n.type -eq 'minecraft:model' -and $n.model -is [string]) { return $n.model }
    if ($n.type -eq 'minecraft:special' -and $n.base -is [string]) { return $n.base }
    foreach ($k in 'fallback', 'model', 'models', 'cases', 'entries', 'on_true', 'on_false') { if ($n.PSObject.Properties[$k]) { $m = & $firstModel $n.$k; if ($m) { return $m } } }
    return $null }
  $tint = @{ oak_leaves = '#48b518'; jungle_leaves = '#48b518'; acacia_leaves = '#48b518'; dark_oak_leaves = '#48b518'; mangrove_leaves = '#48b518'
    spruce_leaves = '#619961'; birch_leaves = '#80a755'; short_grass = '#79c05a'; tall_grass = '#79c05a'; fern = '#79c05a'; large_fern = '#79c05a'
    vine = '#48b518'; lily_pad = '#208030'; grass_block = '#79c05a'; bush = '#79c05a' }
  $ids = $zip.Entries | Where-Object { $_.FullName -match '^assets/minecraft/items/([a-z0-9_]+)\.json$' } | ForEach-Object { $Matches[1] } | Where-Object { $_ -notmatch $skip } | Sort-Object
  $cols = 40; $rows = [Math]::Ceiling($ids.Count / $cols)
  $sheet = New-Object Drawing.Bitmap ($cols * 16), ($rows * 16), ([Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $g = [Drawing.Graphics]::FromImage($sheet); $g.InterpolationMode = 'NearestNeighbor'; $g.PixelOffsetMode = 'Half'; $g.CompositingMode = 'SourceOver'
  $models = @{}; $list = New-Object Collections.ArrayList; $n = 0
  foreach ($id in $ids) {
    $name = $en."item.minecraft.$id"; if (-not $name) { $name = $en."block.minecraft.$id" }; if (-not $name) { $name = $id }
    $hn = ''; if ($he) { $hn = $he."item.minecraft.$id"; if (-not $hn) { $hn = $he."block.minecraft.$id" }; if (-not $hn) { $hn = '' } }
    $model = & $firstModel ((& $json "assets/minecraft/items/$id.json").model)
    $isBlock = [int]($model -like 'minecraft:block/*' -or $model -like 'block/*')
    # The model's textures, parents first, then pick the one that best shows the thing.
    $tex = @{}; $layers = @(); $m = $model; $guard = 0
    while ($m -and $guard++ -lt 8) {
      $p = ($m -replace '^minecraft:', '')
      if (-not $models.ContainsKey($p)) { $models[$p] = & $json "assets/minecraft/models/$p.json" }
      $mj = $models[$p]; if (-not $mj) { break }
      if ($mj.textures) { foreach ($t in $mj.textures.PSObject.Properties) { if (-not $tex.ContainsKey($t.Name)) { $tex[$t.Name] = if ($t.Value -is [string]) { $t.Value } else { [string]$t.Value.sprite } } } }
      $m = $mj.parent
    }
    $res = { param($v) $k = 0; while ($v -and $v.StartsWith('#') -and $k++ -lt 6) { $v = $tex[$v.Substring(1)] }; $v }
    if ($tex.ContainsKey('layer0')) { foreach ($i in 0..4) { if ($tex.ContainsKey("layer$i")) { $layers += (& $res $tex["layer$i"]) } } }
    else { foreach ($k in 'all', 'front', 'side', 'texture', 'cross', 'plant', 'end', 'top', 'particle') { if ($tex.ContainsKey($k)) { $v = & $res $tex[$k]; if ($v) { $layers = @($v); break } } } }
    if (-not $layers.Count -and $tex.Count) { foreach ($v in $tex.Values) { $v = & $res $v; if ($v) { $layers = @($v); break } } }
    $pic = -1; $x = ($n % $cols) * 16; $y = [Math]::Floor($n / $cols) * 16; $drawn = $false
    foreach ($l in $layers) {
      $e = $zip.GetEntry("assets/minecraft/textures/$(($l -replace '^minecraft:', '')).png"); if (-not $e) { continue }
      $s = $e.Open(); $ms = New-Object IO.MemoryStream; $s.CopyTo($ms); $s.Dispose()
      try { $img = [Drawing.Image]::FromStream($ms) } catch { continue }
      $w = $img.Width   # animated textures are a tall strip: the first square is the picture
      if ($tint.ContainsKey($id) -and -not $drawn) {
        $c = [Drawing.ColorTranslator]::FromHtml($tint[$id])
        $cm = New-Object Drawing.Imaging.ColorMatrix; $cm.Matrix00 = $c.R / 255; $cm.Matrix11 = $c.G / 255; $cm.Matrix22 = $c.B / 255
        $ia = New-Object Drawing.Imaging.ImageAttributes; $ia.SetColorMatrix($cm)
        $g.DrawImage($img, (New-Object Drawing.Rectangle $x, $y, 16, 16), 0, 0, $w, $w, [Drawing.GraphicsUnit]::Pixel, $ia)
      } else {
        $g.DrawImage($img, (New-Object Drawing.Rectangle $x, $y, 16, 16), (New-Object Drawing.Rectangle 0, 0, $w, $w), [Drawing.GraphicsUnit]::Pixel)
      }
      $img.Dispose(); $ms.Dispose(); $drawn = $true
    }
    if ($drawn) { $pic = $n }
    [void]$list.Add(@($id, [string]$name, [string]$hn, $pic, $isBlock)); $n++
  }
  $g.Dispose()
  $sheet.Save((Join-Path $hubDir 'mc_items.png'), [Drawing.Imaging.ImageFormat]::Png); $sheet.Dispose()
  [IO.File]::WriteAllText((Join-Path $hubDir 'mc_items.json'), (ConvertTo-Json -Compress -Depth 3 -InputObject $list.ToArray()), (New-Object Text.UTF8Encoding($false)))
  return @($list.Count, @($list | Where-Object { $_[3] -lt 0 }).Count)
}

try {
  Add-Type -AssemblyName System.IO.Compression.FileSystem, System.Drawing
  if (-not $mcSearch) { $mcSearch = @((Join-Path $makeRoot 'gradle-home'), (Join-Path $makeRoot 'mod\build')) }
  Write-Host 'Looking for the Minecraft pictures in the installed game ...'
  $jars = Get-ChildItem $mcSearch -Recurse -Filter *.jar -ErrorAction SilentlyContinue | Where-Object { $_.Length -gt 3MB } | Sort-Object Length -Descending
  $zip = $null
  foreach ($j in $jars) {
    try { $z = [IO.Compression.ZipFile]::OpenRead($j.FullName) } catch { continue }
    if ($z.GetEntry('assets/minecraft/textures/item/ender_pearl.png')) { $zip = $z; Write-Host "  from $($j.Name)"; break }
    $z.Dispose()
  }
  if (-not $zip) { Write-Host 'Minecraft pictures not found. The slides will show drawings instead. Tell Claude.' -ForegroundColor Yellow }
  else {
    $missing = @()
    foreach ($name in $want.Keys) {
      $e = $null
      foreach ($p in $want[$name].Split('|')) { $e = $zip.GetEntry("assets/minecraft/textures/$p.png"); if ($e) { break } }
      if (-not $e) { $missing += $name; continue }
      $in = $e.Open(); $out = [IO.File]::Create((Join-Path $hub "mc_$name.png")); $in.CopyTo($out); $out.Dispose(); $in.Dispose()
    }
    try {
      $idx = Get-ChildItem (Join-Path $makeRoot 'gradle-home') -Recurse -Directory -Filter indexes -ErrorAction SilentlyContinue | Select-Object -First 1
      $r = Write-McCatalog $zip $(if ($idx) { $idx.Parent.FullName }) $hub
      Write-Host "All Minecraft items for the recipe menu: $($r[0]), $($r[1]) without a picture" -ForegroundColor Green
    } catch { Write-Host "The recipe menu keeps its short list ($($_.Exception.Message)). Tell Claude." -ForegroundColor Yellow }
    $zip.Dispose()
    Write-Host "Minecraft pictures: $($want.Count - $missing.Count) of $($want.Count) copied to $hub" -ForegroundColor Green
    if ($missing.Count) { Write-Host "  Missing (a drawing shows instead). Tell Claude: $($missing -join ', ')" -ForegroundColor Yellow }
  }
} catch { Write-Host "Minecraft pictures: failed ($($_.Exception.Message)). The slides will show drawings instead. Tell Claude." -ForegroundColor Yellow }

Write-Host ''
Write-Host 'Now: close the hub tab and open Minecraft from Start again.'
Write-Host "Next update: double-click $makeRoot\update.bat" -ForegroundColor Cyan
Write-Host "Print page: http://localhost:47811/print.html  (or open $hub\print.html)"
Write-Host 'Then run make-usb.bat again for every stick.'
