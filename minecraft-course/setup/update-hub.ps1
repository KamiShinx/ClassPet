# Updates the hub pages in C:\MAKE\hub to one exact commit, and copies the Minecraft pictures the slides use
# out of the game that is already installed in C:\MAKE. Run from Win+R:
#   powershell -NoExit -c "[Net.ServicePointManager]::SecurityProtocol='Tls12';$s='<commit>';irm https://raw.githubusercontent.com/KamiShinx/ClassPet/$s/minecraft-course/setup/update-hub.ps1|iex"
# Touches only C:\MAKE\hub. No Java, no reinstall. The pictures never leave this computer and are not in the repo.
$ErrorActionPreference = 'Stop'
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
if (-not $s) { Write-Host 'No commit given.' -ForegroundColor Red; return }
if (-not $makeRoot) { $makeRoot = 'C:\MAKE' }          # tests set $makeRoot / $mcSearch first
$hub = Join-Path $makeRoot 'hub'
if (-not (Test-Path $hub)) { Write-Host "$hub not found. Run install.bat first." -ForegroundColor Red; return }

# ---------- 1. the hub pages ----------
$raw = "https://raw.githubusercontent.com/KamiShinx/ClassPet/$s/minecraft-course/hub"
$utf8 = New-Object System.Text.UTF8Encoding($false)
$head = '<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">' + "`r`n"
$web = New-Object System.Net.WebClient
$files = @{}
foreach ($n in 'content.js', 'index.html', 'teacher.html', 'print.html') { $files[$n] = $utf8.GetString($web.DownloadData("$raw/$n")) }   # all four, or nothing
[IO.File]::WriteAllText("$hub\content.js", $files['content.js'], $utf8)
[IO.File]::WriteAllText("$hub\index.html", $head + $files['index.html'], $utf8)
[IO.File]::WriteAllText("$hub\teacher.html", $head + $files['teacher.html'], $utf8)
[IO.File]::WriteAllText("$hub\print.html", $files['print.html'], $utf8)
Write-Host "Hub pages updated to $s." -ForegroundColor Green

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
  'entity_ghast_ghast' = 'entity/ghast/ghast'; 'entity_pig_pig' = 'entity/pig/temperate_pig|entity/pig/pig'
  'entity_zombie_zombie' = 'entity/zombie/zombie'; 'entity_skeleton_skeleton' = 'entity/skeleton/skeleton'
  'entity_blaze' = 'entity/blaze|entity/blaze/blaze'; 'entity_piglin_piglin' = 'entity/piglin/piglin'
  'entity_warden_warden' = 'entity/warden/warden'
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
Write-Host 'Now: close the hub tab and double-click the Minecraft icon again.'
Write-Host "Print page: http://localhost:47811/print.html  (or open $hub\print.html)"
Write-Host 'Then run make-usb.bat again for every stick.'
