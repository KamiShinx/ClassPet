# Fallback / install use: writes names and item models. The logic is in common.ps1.
param([string]$mod)
. ([ScriptBlock]::Create([IO.File]::ReadAllText((Join-Path $mod 'tools/common.ps1'), [Text.Encoding]::UTF8)))
$n = Invoke-Prepare $mod
Write-Host ("  Ready: {0} item(s)" -f $n)
