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
    return New-Result $true 'הגרסה נשמרה.'
}

function Get-Versions([string]$root) {
    $saves = Join-Path $root 'saves'
    if (-not (Test-Path $saves)) { return @() }
    $today = Get-Date -Format 'yyyy-MM-dd'
    $list = foreach ($e in (Get-ChildItem $saves | Where-Object { $_.Name -match '^\d{4}-\d{2}-\d{2}_\d{2}-\d{2}-\d{2}_' } | Sort-Object Name -Descending | Select-Object -First 40)) {
        $date = $e.Name.Substring(0, 10)
        $time = $e.Name.Substring(11, 5).Replace('-', ':')
        $rest = $e.Name.Substring(20)
        $what = $(if ($e.PSIsContainer -and $rest -eq 'all') { 'גרסה ששמרתם' }
                  elseif ($e.PSIsContainer) { 'לפני שהחזרתם גרסה' }
                  else { 'לפני הדבקה ל־' + ($rest -replace '\.java$', '') })
        [pscustomobject]@{ id = $e.Name; day = $(if ($date -eq $today) { 'היום' } else { $date }); time = $time; what = $what }
    }
    return @($list)
}

function Invoke-Restore([string]$root, [string]$id) {
    if ($id -notmatch '^\d{4}-\d{2}-\d{2}_\d{2}-\d{2}-\d{2}_[A-Za-z]+(\.java)?$') { return New-Result $false 'הגרסה לא נמצאה.' }
    $src = Join-Path $root "saves/$id"
    if (-not (Test-Path $src)) { return New-Result $false 'הגרסה לא נמצאה.' }
    [void](Invoke-SaveAll $root 'before')
    $java = Join-Path $root 'mod/src/main/java/make/myworld'
    if (Test-Path $src -PathType Container) {
        Copy-Item (Join-Path $src 'java/*.java') $java -Force
        $tex = Join-Path $root 'mod/src/main/resources/assets/myworld/textures'
        if (Test-Path (Join-Path $src 'textures')) { Copy-Item (Join-Path $src 'textures/*') $tex -Recurse -Force }
    } else {
        Copy-Item $src (Join-Path $java (($id -split '_')[-1])) -Force
    }
    return New-Result $true 'הגרסה חזרה. לוחצים שחק כדי לבדוק.'
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
            $dest = Join-Path $targets[$top] $rest
            New-Item -ItemType Directory -Force (Split-Path $dest) | Out-Null
            $in = $en.Open(); $out = [IO.File]::Create($dest)
            try { $in.CopyTo($out) } finally { $out.Close(); $in.Close() }
        }
    } finally { $zip.Dispose() }
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
        [pscustomobject]@{ id = $id; name = $m.Groups[2].Value.Replace('\"', '"'); hasPicture = (Test-Path (Join-Path $tex "$id.png")) }
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
        Copy-Item $file (Join-Path $saves ((Get-Date -Format 'yyyy-MM-dd_HH-mm-ss') + "_$id.png"))
    }
    [IO.File]::WriteAllBytes($file, $bytes)
    return New-Result $true "הציור נשמר בשם $id.png. לוחצים שחק כדי לראות אותו במשחק."
}
