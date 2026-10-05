# The kids' desktop: one icon, "Minecraft", which opens the launcher window. Run by install.bat and install-from-usb.bat.
param([string]$root)
$root = $root.TrimEnd('\', '/')
$desk = [Environment]::GetFolderPath('Desktop')
$shell = New-Object -ComObject WScript.Shell
foreach ($old in @('Minecraft - Play', 'Minecraft - Paste & Play', 'Minecraft - Undo', 'Minecraft - Pictures', 'Minecraft - Code', 'Minecraft - Hub')) {
    $p = Join-Path $desk "$old.lnk"
    if (Test-Path $p) { Remove-Item $p }
}
$link = $shell.CreateShortcut((Join-Path $desk 'Minecraft.lnk'))
$link.TargetPath = Join-Path $env:SystemRoot 'System32\WindowsPowerShell\v1.0\powershell.exe'
$link.Arguments = "-NoProfile -STA -WindowStyle Hidden -Command `"& ([ScriptBlock]::Create([IO.File]::ReadAllText('$root\mod\tools\launcher.ps1', [Text.Encoding]::UTF8))) '$root\'`""
$link.WorkingDirectory = $root
$link.IconLocation = "$root\mod\tools\make.ico"
$link.Save()
Write-Host '  Desktop: Minecraft'
