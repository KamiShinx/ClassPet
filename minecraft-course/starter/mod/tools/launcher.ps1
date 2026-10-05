# The kids' one desktop icon: a small Hebrew window with big buttons.
# Play / paste from Gemini and play / undo / pictures / today's lesson. The build runs here, without a black window.
param([string]$root)
Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing
[System.Windows.Forms.Application]::EnableVisualStyles()

$mod = Join-Path $root 'mod'
$log = Join-Path $mod 'build/last-play.log'
. ([ScriptBlock]::Create([IO.File]::ReadAllText((Join-Path $mod 'tools/common.ps1'), [Text.Encoding]::UTF8)))

$script:proc = $null
$script:online = $false
$script:logPos = 0
$script:lastError = ''

# ---------- window ----------
$green  = [System.Drawing.Color]::FromArgb(59, 135, 53)
$ink    = [System.Drawing.Color]::FromArgb(29, 39, 31)
$paper  = [System.Drawing.Color]::FromArgb(241, 244, 236)
$yellow = [System.Drawing.Color]::FromArgb(250, 240, 212)
$soft   = [System.Drawing.Color]::FromArgb(223, 240, 217)

$form = New-Object System.Windows.Forms.Form
$form.Text = 'העולם שלי · מיינקראפט'
$form.RightToLeft = 'Yes'
$form.RightToLeftLayout = $true
$form.StartPosition = 'CenterScreen'
$form.FormBorderStyle = 'FixedSingle'
$form.MaximizeBox = $false
$form.ClientSize = New-Object System.Drawing.Size(460, 600)
$form.BackColor = $paper
$form.Font = New-Object System.Drawing.Font('Segoe UI', 11)
$icon = Join-Path $mod 'tools/make.ico'
if (Test-Path $icon) { $form.Icon = New-Object System.Drawing.Icon($icon) }

$flow = New-Object System.Windows.Forms.FlowLayoutPanel
$flow.Dock = 'Fill'
$flow.FlowDirection = 'TopDown'
$flow.WrapContents = $false
$flow.Padding = New-Object System.Windows.Forms.Padding(20, 16, 20, 16)
$flow.AutoScroll = $true
$form.Controls.Add($flow)

$title = New-Object System.Windows.Forms.Label
$title.Text = 'העולם שלי'
$title.Font = New-Object System.Drawing.Font('Segoe UI', 20, [System.Drawing.FontStyle]::Bold)
$title.ForeColor = $ink
$title.AutoSize = $true
$flow.Controls.Add($title)

function New-BigButton($text, $primary) {
    $b = New-Object System.Windows.Forms.Button
    $b.Text = $text
    $b.Width = 410
    $b.Height = 56
    $b.Font = New-Object System.Drawing.Font('Segoe UI', 14, [System.Drawing.FontStyle]::Bold)
    $b.FlatStyle = 'Flat'
    $b.FlatAppearance.BorderSize = 2
    $b.FlatAppearance.BorderColor = $(if ($primary) { $green } else { $ink })
    $b.BackColor = $(if ($primary) { $green } else { [System.Drawing.Color]::White })
    $b.ForeColor = $(if ($primary) { [System.Drawing.Color]::White } else { $ink })
    $b.Margin = New-Object System.Windows.Forms.Padding(0, 6, 0, 6)
    $b.Cursor = 'Hand'
    $flow.Controls.Add($b)
    return $b
}

$btnPaste  = New-BigButton 'הדבקה מג׳מיני ושחק' $true
$btnPlay   = New-BigButton 'שחק' $false
$btnUndo   = New-BigButton 'ביטול ההדבקה האחרונה' $false
$btnPics   = New-BigButton 'תמונות' $false
$btnLesson = New-BigButton 'השיעור' $false

$status = New-Object System.Windows.Forms.Label
$status.Width = 410
$status.Height = 56
$status.Font = New-Object System.Drawing.Font('Segoe UI', 12)
$status.ForeColor = $ink
$status.Text = 'מוכן.'
$status.Margin = New-Object System.Windows.Forms.Padding(0, 10, 0, 4)
$flow.Controls.Add($status)

$errBox = New-Object System.Windows.Forms.Panel
$errBox.Width = 410
$errBox.Height = 96
$errBox.BackColor = $yellow
$errBox.Visible = $false
$errText = New-Object System.Windows.Forms.Label
$errText.Text = "משהו לא עבד. השגיאה הועתקה.`r`nעוברים לג׳מיני, Ctrl+V, ואז Enter."
$errText.Font = New-Object System.Drawing.Font('Segoe UI', 12, [System.Drawing.FontStyle]::Bold)
$errText.Location = New-Object System.Drawing.Point(10, 8)
$errText.Size = New-Object System.Drawing.Size(390, 50)
$errBox.Controls.Add($errText)
$btnCopyAgain = New-Object System.Windows.Forms.Button
$btnCopyAgain.Text = 'העתקה שוב'
$btnCopyAgain.Location = New-Object System.Drawing.Point(10, 58)
$btnCopyAgain.Size = New-Object System.Drawing.Size(130, 30)
$errBox.Controls.Add($btnCopyAgain)
$flow.Controls.Add($errBox)

$details = New-Object System.Windows.Forms.LinkLabel
$details.Text = 'פרטים'
$details.AutoSize = $true
$flow.Controls.Add($details)

$logBox = New-Object System.Windows.Forms.TextBox
$logBox.Multiline = $true
$logBox.ReadOnly = $true
$logBox.ScrollBars = 'Vertical'
$logBox.RightToLeft = 'No'
$logBox.Font = New-Object System.Drawing.Font('Consolas', 8)
$logBox.Width = 410
$logBox.Height = 150
$logBox.Visible = $false
$flow.Controls.Add($logBox)

# ---------- behaviour ----------
function Set-Busy($busy) {
    foreach ($b in @($btnPaste, $btnPlay, $btnUndo)) { $b.Enabled = -not $busy }
}
function Show-Status($text, $good) {
    $status.Text = $text
    $status.BackColor = $(if ($good) { $soft } else { $paper })
}

function Start-Game([bool]$online) {
    $errBox.Visible = $false
    try { [void](Invoke-Prepare $mod) } catch { $logBox.AppendText("prepare: $($_.Exception.Message)`r`n") }
    New-Item -ItemType Directory -Force (Split-Path $log) | Out-Null
    if (Test-Path $log) { Remove-Item $log -Force -ErrorAction SilentlyContinue }
    $script:logPos = 0
    $script:online = $online
    $psi = New-Object System.Diagnostics.ProcessStartInfo
    $psi.FileName = $env:ComSpec
    $flag = $(if ($online) { '' } else { '--offline' })
    $psi.Arguments = "/c gradlew.bat runClient $flag > `"$($log -replace '/', '\')`" 2>&1"
    $psi.WorkingDirectory = $mod
    $psi.UseShellExecute = $false
    $psi.CreateNoWindow = $true
    $psi.EnvironmentVariables['JAVA_HOME'] = (Join-Path $root 'jdk')
    $psi.EnvironmentVariables['GRADLE_USER_HOME'] = (Join-Path $root 'gradle-home')
    $psi.EnvironmentVariables['PATH'] = ((Join-Path $root 'jdk/bin') -replace '/', '\') + ';' + $psi.EnvironmentVariables['PATH']
    $script:proc = [System.Diagnostics.Process]::Start($psi)
    Set-Busy $true
    Show-Status 'בונה את המוד ופותח את מיינקראפט. זה לוקח בערך דקה...' $false
}

function Read-NewLog {
    if (-not (Test-Path $log)) { return '' }
    try {
        $fs = New-Object System.IO.FileStream($log, 'Open', 'Read', 'ReadWrite')
        [void]$fs.Seek($script:logPos, 'Begin')
        $sr = New-Object System.IO.StreamReader($fs)
        $text = $sr.ReadToEnd()
        $script:logPos = $fs.Position
        $sr.Close()
        return $text
    } catch { return '' }
}

function Complete-Game($code) {
    $all = ''
    if (Test-Path $log) { $all = [IO.File]::ReadAllText($log) }
    if ($code -ne 0 -and -not $script:online -and $all -match 'offline') {
        $logBox.AppendText("`r`n--- trying again with the internet ---`r`n")
        Start-Game $true
        return
    }
    Set-Busy $false
    if ($code -eq 0) {
        Show-Status 'מוכן. אפשר ללחוץ שוב על שחק.' $false
        return
    }
    $script:lastError = Get-ErrorForGemini $log
    try { [System.Windows.Forms.Clipboard]::SetText($script:lastError) } catch {}
    Show-Status '' $false
    $errBox.Visible = $true
}

$timer = New-Object System.Windows.Forms.Timer
$timer.Interval = 500
$timer.Add_Tick({
    if (-not $script:proc) { return }
    $new = Read-NewLog
    if ($new) {
        $logBox.AppendText($new)
        if ($logBox.TextLength -gt 60000) { $logBox.Text = $logBox.Text.Substring($logBox.TextLength - 30000) }
        if ($new -match 'Backend library|Setting user|Created: \d+x\d+') { Show-Status 'מיינקראפט פתוח. כשסוגרים אותו, אפשר להדביק שוב.' $true }
    }
    if ($script:proc.HasExited) {
        $code = $script:proc.ExitCode
        $script:proc = $null
        $logBox.AppendText((Read-NewLog))
        Complete-Game $code
    }
})
$timer.Start()

$btnPlay.Add_Click({ Start-Game $false })

$btnPaste.Add_Click({
    $text = ''
    try { $text = [System.Windows.Forms.Clipboard]::GetText() } catch {}
    $r = Invoke-Paste $root $text
    if (-not $r.Ok) { $errBox.Visible = $false; Show-Status $r.Message $false; return }
    Start-Game $false
    Show-Status ($r.Message + '. בונה ופותח את מיינקראפט...') $false
})

$btnUndo.Add_Click({
    $r = Invoke-Undo $root
    $errBox.Visible = $false
    Show-Status $r.Message $r.Ok
})

$btnPics.Add_Click({
    $dir = Join-Path $mod 'src/main/resources/assets/myworld/textures/item'
    New-Item -ItemType Directory -Force $dir | Out-Null
    Start-Process explorer.exe ($dir -replace '/', '\')
})

$btnLesson.Add_Click({
    $hub = Join-Path $root 'hub/index.html'
    if (Test-Path $hub) { Start-Process ($hub -replace '/', '\') } else { Show-Status 'השיעור עוד לא מותקן במחשב הזה.' $false }
})

$btnCopyAgain.Add_Click({ try { [System.Windows.Forms.Clipboard]::SetText($script:lastError) } catch {} })
$details.Add_LinkClicked({ $logBox.Visible = -not $logBox.Visible })

$form.Add_FormClosing({
    if ($script:proc -and -not $script:proc.HasExited) {
        $answer = [System.Windows.Forms.MessageBox]::Show('מיינקראפט עדיין פתוח. לסגור את החלון הזה בכל זאת?', 'העולם שלי', 'YesNo')
        if ($answer -ne 'Yes') { $_.Cancel = $true }
    }
})

[void]$form.ShowDialog()
