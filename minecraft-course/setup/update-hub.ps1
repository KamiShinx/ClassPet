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
  Write-Host "Course tools updated (the kid's own files are untouched)." -ForegroundColor Green
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
}
try {
  Add-Type -AssemblyName System.IO.Compression.FileSystem
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
