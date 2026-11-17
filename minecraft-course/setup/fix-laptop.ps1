# fix-laptop.bat runs this: writes report.txt on the stick and prints the problems it found.
param([string]$rep)
$r = 'C:\MAKE'
$o = @()
$o += "Computer: $env:COMPUTERNAME   " + (Get-Date -Format 'yyyy-MM-dd HH:mm')
$o += 'Lessons version: ' + (Get-Item "$r\hub\content.js").LastWriteTime.ToString('yyyy-MM-dd HH:mm')

$free = [math]::Round((Get-PSDrive C).Free / 1GB, 1)
$o += "Free on C: $free GB"
if ($free -lt 3) { $o += 'PROBLEM: C: is almost full. Minecraft needs about 3 GB free.' }

foreach ($v in Get-CimInstance Win32_VideoController) { $o += 'Graphics: ' + $v.Name + '  driver ' + $v.DriverVersion }
if (Test-Path "$r\browser.txt") { $o += 'Browser for the lessons: ' + (Get-Content "$r\browser.txt") } else { $o += 'Browser for the lessons: the default one' }

# The dimension: a black sky with black fog looks like a broken, black world.
$d = $null
try { $d = (Get-Content -Raw -Encoding UTF8 "$r\design\world.json" | ConvertFrom-Json).dim } catch {}
function Dark([string]$h) { try { $n = [Convert]::ToInt32(($h -replace '#', ''), 16); return ((($n -shr 16) -band 255) + (($n -shr 8) -band 255) + ($n -band 255)) -lt 120 } catch { return $false } }
if ($d) {
    $o += "Dimension: shape $($d.shape), sky $($d.sky), fog $($d.fog), time $($d.time)"
    if ((Dark $d.sky) -and (Dark $d.fog)) { $o += 'PROBLEM: the dimension''s sky and fog are almost black, so it looks black. In the studio: lighter sky and fog, and Always day.' }
    elseif ($d.time -eq 'night') { $o += 'NOTE: the dimension is always night. If it looks too dark: Always day in the studio.' }
} else { $o += 'Dimension: none built yet (the door and the portal need one).' }

# The game's own log: the first errors, for Claude.
$log = "$r\mod\run\logs\latest.log"
if (Test-Path $log) {
    $e = Select-String -Path $log -Pattern 'Exception|ERROR|Missing|Failed' | Where-Object { $_.Line -notmatch 'oshi|SystemReport|Win32Exception' } | Select-Object -First 20
    if ($e) { $o += ''; $o += 'Errors in the game log:'; $o += ($e | ForEach-Object { $_.Line }) }
} else { $o += 'No game log yet: Minecraft has not opened on this laptop since it was installed.' }

$o | Set-Content -Encoding UTF8 (Join-Path $rep 'report.txt')
$o | Where-Object { $_ -like 'PROBLEM*' -or $_ -like 'NOTE*' } | ForEach-Object { Write-Host ('       ' + $_) -ForegroundColor Yellow }
