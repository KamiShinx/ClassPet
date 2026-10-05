# Fallback for the launcher's paste button. The logic is in common.ps1.
param([string]$root)
. ([ScriptBlock]::Create([IO.File]::ReadAllText((Join-Path $root 'mod/tools/common.ps1'), [Text.Encoding]::UTF8)))
$r = Invoke-Paste $root (Get-Clipboard -Raw)
Write-Host ''; Write-Host "  $($r.Message)"; Write-Host ''
if ($r.Ok) { exit 0 } else { exit 1 }
