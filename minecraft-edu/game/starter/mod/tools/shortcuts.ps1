# One icon, "Science Islands", which opens the hub (the lessons and the Play button) in the browser.
# It goes in the Start menu (survives a desktop clean-up: press Win, type Science) and on the desktop.
param([string]$root)
$root = $root.TrimEnd('\', '/')
$desk = [Environment]::GetFolderPath('Desktop')
$shell = New-Object -ComObject WScript.Shell
$start = Join-Path ([Environment]::GetFolderPath('Programs')) 'Science Islands.lnk'
foreach ($where in @($start, (Join-Path $desk 'Science Islands.lnk'))) {
    $link = $shell.CreateShortcut($where)
    $link.TargetPath = Join-Path $env:SystemRoot 'System32\WindowsPowerShell\v1.0\powershell.exe'
    $link.Arguments = "-NoProfile -STA -WindowStyle Hidden -Command `"& ([ScriptBlock]::Create([IO.File]::ReadAllText('$root\mod\tools\server.ps1', [Text.Encoding]::UTF8))) '$root'`""
    $link.WorkingDirectory = $root
    $link.IconLocation = "$root\mod\tools\islands.ico"
    $link.Save()
}
Write-Host '  Icon "Science Islands": in the Start menu and on the desktop'
