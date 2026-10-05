# Runs before every Play. Writes the language files (names in the game) and the item model files
# from the first two strings of each Kit.item / Kit.effect / Kit.mob call in the kid's files.
param([string]$mod)
$ErrorActionPreference = 'Stop'
$utf8 = New-Object System.Text.UTF8Encoding($false)
$java = Join-Path $mod 'src/main/java/make/myworld'
$assets = Join-Path $mod 'src/main/resources/assets/myworld'

function Read-Java($file) {
    $p = Join-Path $java $file
    if (Test-Path $p) { return [IO.File]::ReadAllText($p, [Text.Encoding]::UTF8) } else { return '' }
}
$str = '"((?:[^"\\]|\\.)*)"'
$gap = '(?:\s|//[^\r\n]*)*'   # spaces, new lines and // comments between the arguments
$lang = [ordered]@{}
$items = New-Object System.Collections.ArrayList

foreach ($m in [regex]::Matches((Read-Java 'MyItems.java'), 'Kit\.item\(' + $gap + '"([a-z0-9_]+)"' + $gap + ',' + $gap + $str)) {
    $id = $m.Groups[1].Value
    [void]$items.Add($id)
    $lang["item.myworld.$id"] = $m.Groups[2].Value.Replace('\"', '"')
}
foreach ($m in [regex]::Matches((Read-Java 'MyEffects.java'), 'Kit\.effect\(' + $gap + '"([a-z0-9_]+)"' + $gap + ',' + $gap + $str)) {
    $lang["effect.myworld.$($m.Groups[1].Value)"] = $m.Groups[2].Value.Replace('\"', '"')
}
foreach ($m in [regex]::Matches((Read-Java 'MyMobs.java'), 'Kit\.mob\(' + $gap + '"([a-z0-9_]+)"' + $gap + ',' + $gap + $str)) {
    $lang["entity.myworld.$($m.Groups[1].Value)"] = $m.Groups[2].Value.Replace('\"', '"')
}

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
Write-Host ("  Ready: {0} item(s)" -f $items.Count)
