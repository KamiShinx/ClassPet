# One icon, "Minecraft", which opens the hub (lessons + the Minecraft buttons) in the browser.
# It goes in the Start menu (survives a desktop clean-up: press Win, type Minecraft) and on the desktop. Run by install.bat and install-from-usb.bat.
param([string]$root)
$root = $root.TrimEnd('\', '/')
$desk = [Environment]::GetFolderPath('Desktop')
$shell = New-Object -ComObject WScript.Shell
foreach ($old in @('Minecraft - Play', 'Minecraft - Paste & Play', 'Minecraft - Undo', 'Minecraft - Pictures', 'Minecraft - Code', 'Minecraft - Hub')) {
    $p = Join-Path $desk "$old.lnk"
    if (Test-Path $p) { Remove-Item $p }
}
$start = Join-Path ([Environment]::GetFolderPath('Programs')) 'Minecraft.lnk'
foreach ($where in @($start, (Join-Path $desk 'Minecraft.lnk'))) {
    $link = $shell.CreateShortcut($where)
    $link.TargetPath = Join-Path $env:SystemRoot 'System32\WindowsPowerShell\v1.0\powershell.exe'
    $link.Arguments = "-NoProfile -STA -WindowStyle Hidden -Command `"& ([ScriptBlock]::Create([IO.File]::ReadAllText('$root\mod\tools\server.ps1', [Text.Encoding]::UTF8))) '$root'`""
    $link.WorkingDirectory = $root
    $link.IconLocation = "$root\mod\tools\make.ico"
    $link.Save()
}
Write-Host '  Icon "Minecraft": in the Start menu (press Win, type Minecraft) and on the desktop'
