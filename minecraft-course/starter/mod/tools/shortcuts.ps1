# Desktop buttons for the kids. Run by install.bat and install-from-usb.bat.
param([string]$root)
$desk = [Environment]::GetFolderPath('Desktop')
$shell = New-Object -ComObject WScript.Shell
function Add-Link($name, $target) {
    $link = $shell.CreateShortcut((Join-Path $desk "$name.lnk"))
    $link.TargetPath = $target
    $link.WorkingDirectory = $root
    $link.Save()
}
Add-Link 'Minecraft - Play' (Join-Path $root 'play.bat')
Add-Link 'Minecraft - Paste & Play' (Join-Path $root 'paste-and-play.bat')
Add-Link 'Minecraft - Undo' (Join-Path $root 'undo.bat')
Add-Link 'Minecraft - Pictures' (Join-Path $root 'mod/src/main/resources/assets/myworld/textures/item')
$hub = Join-Path $root 'hub/index.html'
if (Test-Path $hub) { Add-Link 'Minecraft - Hub' $hub }
$old = Join-Path $desk 'Minecraft - Code.lnk'
if (Test-Path $old) { Remove-Item $old }
Write-Host '  Desktop: Minecraft - Play, Paste & Play, Undo, Pictures'
