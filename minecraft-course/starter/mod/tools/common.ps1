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
    return $items.Count
}

# Puts code copied from Gemini into the kid's file it belongs to, after backing up the old version.
function Invoke-Paste([string]$root, [string]$text) {
    $utf8 = New-Object System.Text.UTF8Encoding($false)
    $kidFiles = @('MyWorld', 'MyItems', 'MyEffects', 'MyMobs', 'MyRules')
    if (-not $text) { return New-Result $false 'לא הועתק כלום. בג׳מיני, לוחצים על כפתור ההעתקה שליד הקוד.' }
    $start = $text.IndexOf('package make.myworld;')
    $end = $text.LastIndexOf('}')
    if ($start -lt 0 -or $end -lt $start) { return New-Result $false 'מה שהעתקתם הוא לא קובץ שלם. בקשו מג׳מיני: ״שלח את הקובץ המלא״.' }
    $code = $text.Substring($start, $end - $start + 1)
    if ($code -notmatch 'public\s+(?:final\s+)?class\s+(\w+)') { return New-Result $false 'מה שהעתקתם הוא לא קובץ שלם. בקשו מג׳מיני: ״שלח את הקובץ המלא״.' }
    $name = $Matches[1]
    if ($kidFiles -notcontains $name) {
        return New-Result $false "ג׳מיני שלח קובץ בשם $name. הקבצים שלכם: MyItems, MyEffects, MyMobs, MyRules, MyWorld. בקשו ממנו לשים את הקוד באחד מהם."
    }
    $target = Join-Path $root "mod/src/main/java/make/myworld/$name.java"
    $saves = Join-Path $root 'saves'
    New-Item -ItemType Directory -Force $saves | Out-Null
    if (Test-Path $target) { Copy-Item $target (Join-Path $saves ((Get-Date -Format 'yyyy-MM-dd_HH-mm-ss') + "_$name.java")) }
    $code = $code -replace "`r`n", "`n" -replace "`n", "`r`n"
    [IO.File]::WriteAllText($target, $code + "`r`n", $utf8)
    return New-Result $true "הודבק לתוך $name.java"
}

# Brings back the file as it was before the last paste. Each press goes one paste further back.
function Invoke-Undo([string]$root) {
    $last = Get-ChildItem (Join-Path $root 'saves') -Filter '*_My*.java' -ErrorAction SilentlyContinue | Sort-Object Name -Descending | Select-Object -First 1
    if (-not $last) { return New-Result $false 'אין מה לבטל.' }
    $name = ($last.Name -split '_')[-1]
    Copy-Item $last.FullName (Join-Path $root "mod/src/main/java/make/myworld/$name") -Force
    Remove-Item $last.FullName
    return New-Result $true "$name חזר למה שהיה לפני ההדבקה האחרונה. לוחצים שחק כדי לבדוק."
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
