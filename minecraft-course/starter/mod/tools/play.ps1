# Minecraft - Play: prepare names and models, build, start the game.
# If the build or the game fails, the error is copied to the clipboard for Gemini.
param([string]$root)
$mod = Join-Path $root 'mod'
$env:JAVA_HOME = Join-Path $root 'jdk'
$env:PATH = (Join-Path $root 'jdk/bin') + ';' + $env:PATH
$env:GRADLE_USER_HOME = Join-Path $root 'gradle-home'
Set-Location $mod

try {
    & ([ScriptBlock]::Create([IO.File]::ReadAllText((Join-Path $mod 'tools/prepare.ps1'), [Text.Encoding]::UTF8))) $mod
} catch {
    Write-Host "  (names and models were not updated: $($_.Exception.Message))" -ForegroundColor Yellow
}

$log = Join-Path $mod 'build/last-play.log'
New-Item -ItemType Directory -Force (Split-Path $log) | Out-Null
Write-Host ''
Write-Host '  Building and starting Minecraft. Do not close this window.' -ForegroundColor Green
Write-Host ''
cmd /c "gradlew.bat runClient --offline 2>&1" | Tee-Object -FilePath $log
$code = $LASTEXITCODE
if ($code -ne 0 -and (Select-String -Path $log -Pattern 'offline' -Quiet)) {
    Write-Host '  Trying again with the internet...' -ForegroundColor Yellow
    cmd /c "gradlew.bat runClient 2>&1" | Tee-Object -FilePath $log
    $code = $LASTEXITCODE
}
if ($code -eq 0) { exit 0 }

# Collect the useful part of the error.
$lines = @(Get-Content $log)
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

$text = "המוד שלי לא עובד. זאת השגיאה:`r`n" + ($picked -join "`r`n")
try { Set-Clipboard -Value $text } catch {}
Write-Host ''
Write-Host '  ===============================================' -ForegroundColor Yellow
Write-Host '   Something went wrong. The error is COPIED.' -ForegroundColor Yellow
Write-Host '   Go to Gemini and press Ctrl+V, then Enter.' -ForegroundColor Yellow
Write-Host '  ===============================================' -ForegroundColor Yellow
exit 1
