# Updates the hub pages in C:\MAKE\hub to one exact commit. Run from Win+R:
#   powershell -c "$s='<commit>';irm https://raw.githubusercontent.com/KamiShinx/ClassPet/$s/minecraft-course/setup/update-hub.ps1|iex"
# Touches only the hub pages (content.js, index.html, teacher.html, print.html). No Java, no reinstall.
$ErrorActionPreference = 'Stop'
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
if (-not $s) { Write-Host 'No commit given.' -ForegroundColor Red; return }
$hub = 'C:\MAKE\hub'
if (-not (Test-Path $hub)) { Write-Host "$hub not found. Run install.bat first." -ForegroundColor Red; return }
$raw = "https://raw.githubusercontent.com/KamiShinx/ClassPet/$s/minecraft-course/hub"
$utf8 = New-Object System.Text.UTF8Encoding($false)
$head = '<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">' + "`r`n"
$web = New-Object System.Net.WebClient
function Get-Text($name) { return $utf8.GetString($web.DownloadData("$raw/$name")) }
$files = @{}
foreach ($n in 'content.js', 'index.html', 'teacher.html', 'print.html') { $files[$n] = Get-Text $n }   # all four, or nothing
[IO.File]::WriteAllText("$hub\content.js", $files['content.js'], $utf8)
[IO.File]::WriteAllText("$hub\index.html", $head + $files['index.html'], $utf8)
[IO.File]::WriteAllText("$hub\teacher.html", $head + $files['teacher.html'], $utf8)
[IO.File]::WriteAllText("$hub\print.html", $files['print.html'], $utf8)
Write-Host "Hub updated to $s. Close the hub tab and double-click the Minecraft icon again." -ForegroundColor Green
Write-Host "Print page: http://localhost:47811/print.html  (or open C:\MAKE\hub\print.html)"
Write-Host "Then run make-usb.bat again for every stick."
