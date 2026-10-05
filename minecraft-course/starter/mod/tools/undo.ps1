# Minecraft - Undo: bring back the file as it was before the last paste. Press again to go further back.
param([string]$root)
$saves = Join-Path $root 'saves'
$last = Get-ChildItem $saves -Filter '*_My*.java' -ErrorAction SilentlyContinue | Sort-Object Name -Descending | Select-Object -First 1
if (-not $last) { Write-Host ''; Write-Host '  Nothing to undo.' -ForegroundColor Yellow; exit 1 }
$name = ($last.Name -split '_')[-1]
Copy-Item $last.FullName (Join-Path $root "mod/src/main/java/make/myworld/$name") -Force
Remove-Item $last.FullName
Write-Host ''
Write-Host "  Undone: $name is back to how it was before the last paste." -ForegroundColor Green
Write-Host '  Press Minecraft - Play to check.'
exit 0
