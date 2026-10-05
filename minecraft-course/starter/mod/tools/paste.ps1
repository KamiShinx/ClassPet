# Minecraft - Paste & Play, step 1: put the file copied from Gemini into the right place.
# Backs up the old version first, so Minecraft - Undo can bring it back.
param([string]$root)
$utf8 = New-Object System.Text.UTF8Encoding($false)
$java = Join-Path $root 'mod/src/main/java/make/myworld'
$allowed = @('MyWorld', 'MyItems', 'MyEffects', 'MyMobs', 'MyRules')

function Stop-With($msg) {
    Write-Host ''
    Write-Host "  $msg" -ForegroundColor Yellow
    Write-Host ''
    exit 1
}

$text = Get-Clipboard -Raw
if (-not $text) { Stop-With 'Nothing is copied. In Gemini, click the copy button on the code first.' }
$start = $text.IndexOf('package make.myworld;')
$end = $text.LastIndexOf('}')
if ($start -lt 0 -or $end -lt $start) { Stop-With 'What you copied is not a whole file. Ask Gemini: "send the whole file".' }
$code = $text.Substring($start, $end - $start + 1)
if ($code -notmatch 'public\s+(?:final\s+)?class\s+(\w+)') { Stop-With 'What you copied is not a whole file. Ask Gemini: "send the whole file".' }
$name = $Matches[1]
if ($allowed -notcontains $name) {
    Stop-With "Gemini sent a file called $name. Your files are MyItems, MyEffects, MyMobs, MyRules and MyWorld. Ask Gemini to put it in one of them."
}

$target = Join-Path $java "$name.java"
$saves = Join-Path $root 'saves'
New-Item -ItemType Directory -Force $saves | Out-Null
if (Test-Path $target) {
    Copy-Item $target (Join-Path $saves ((Get-Date -Format 'yyyy-MM-dd_HH-mm-ss') + "_$name.java"))
}
$code = $code -replace "`r`n", "`n" -replace "`n", "`r`n"
[IO.File]::WriteAllText($target, $code + "`r`n", $utf8)
Write-Host ''
Write-Host "  Pasted into $name.java" -ForegroundColor Green
exit 0
