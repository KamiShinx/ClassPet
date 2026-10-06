# The "Minecraft" desktop icon runs this. It serves the kids' hub on http://localhost:47811 and does what the hub's
# buttons ask: paste from Gemini and play, play, undo, open the pictures folder, make a backup file for Google Drive
# and load it back. Listens on this computer only.
# Quits by itself after 20 minutes with no page open and no game running.
param([string]$root)
$root = $root.TrimEnd('\', '/')
$port = 47811
$url = "http://localhost:$port/"
$mod = Join-Path $root 'mod'
$hub = Join-Path $root 'hub'
$log = Join-Path $mod 'build/last-play.log'
$onWindows = [Environment]::OSVersion.Platform -eq 'Win32NT'
. ([ScriptBlock]::Create([IO.File]::ReadAllText((Join-Path $mod 'tools/common.ps1'), [Text.Encoding]::UTF8)))

# ---------- start, or hand over to the copy that is already running ----------
try {
    $listener = New-Object System.Net.Sockets.TcpListener([Net.IPAddress]::Loopback, $port)
    $listener.Start()
} catch {
    # Another copy is running: hand over to it. If it doesn't answer (an old process holding the address), say what to do.
    $alive = $false
    try { $r = [Net.WebRequest]::Create("${url}api/lock"); $r.Timeout = 3000; $r.GetResponse().Close(); $alive = $true } catch [Net.WebException] { if ($_.Exception.Response) { $alive = $true } } catch {}
    if ($alive) { if ($onWindows) { Start-Process $url } }
    elseif ($onWindows) {
        Add-Type -AssemblyName PresentationFramework -ErrorAction SilentlyContinue
        try { [void][System.Windows.MessageBox]::Show("The hub can't start: an old Minecraft builder is still running.`nRestart the computer, or run:  taskkill /f /im java.exe", 'Minecraft') } catch {}
    }
    exit 0
}
# Child processes (cmd, Gradle's Java daemon, Minecraft) must not inherit our sockets: Gradle's daemon outlives us, and an
# inherited listening socket keeps this address taken by a process that never answers, so the hub hangs forever.
$noInherit = { param($sock) }
if ($onWindows) {
    try {
        Add-Type -Namespace MakeNative -Name Handle -MemberDefinition '[System.Runtime.InteropServices.DllImport("kernel32.dll", SetLastError = true)] public static extern bool SetHandleInformation(System.IntPtr h, uint mask, uint flags);'
        $noInherit = { param($sock) try { [void][MakeNative.Handle]::SetHandleInformation($sock.Handle, 1, 0) } catch {} }
    } catch {}
}
& $noInherit $listener.Server
if ($onWindows -and -not $env:MAKE_NO_BROWSER) { Start-Process $url }

# ---------- game state ----------
$state = @{ phase = 'idle'; message = 'מוכן.'; error = ''; online = $false; proc = $null; tokens = @{}; fails = 0; waitUntil = [DateTime]::MinValue }
$pinFile = Join-Path $root 'pin.txt'
$teacherFile = Join-Path $root 'teacher.txt'
function New-Token { $t = [Guid]::NewGuid().ToString('N'); $state.tokens[$t] = $true; return $t }

function Read-Clip {
    if ($env:MAKE_CLIP_FILE) { return [IO.File]::ReadAllText($env:MAKE_CLIP_FILE, [Text.Encoding]::UTF8) }
    try { return (Get-Clipboard -Raw) } catch { return '' }
}
function Write-Clip([string]$text) {
    if ($env:MAKE_CLIP_FILE) { [IO.File]::WriteAllText($env:MAKE_CLIP_FILE, $text, [Text.Encoding]::UTF8); return }
    try { Set-Clipboard -Value $text } catch {}
}

function Start-Game([bool]$online) {
    try { Copy-StudioToMod $root } catch {}
    try { [void](Invoke-Prepare $mod) } catch {}
    New-Item -ItemType Directory -Force (Split-Path $log) | Out-Null
    if (Test-Path $log) { Remove-Item $log -Force -ErrorAction SilentlyContinue }
    $psi = New-Object System.Diagnostics.ProcessStartInfo
    $flag = $(if ($online) { '' } else { '--offline' })
    if ($env:MAKE_FAKE_BUILD) {
        # Tests only: a stand-in for Gradle.
        $psi.FileName = '/bin/sh'
        $psi.Arguments = "-c `"$($env:MAKE_FAKE_BUILD) > '$log' 2>&1`""
    } else {
        $psi.FileName = $env:ComSpec
        $psi.Arguments = "/c gradlew.bat runClient $flag > `"$($log -replace '/', '\')`" 2>&1"
        $psi.EnvironmentVariables['JAVA_HOME'] = (Join-Path $root 'jdk')
        $psi.EnvironmentVariables['GRADLE_USER_HOME'] = (Join-Path $root 'gradle-home')
        $psi.EnvironmentVariables['PATH'] = ((Join-Path $root 'jdk/bin') -replace '/', '\') + ';' + $psi.EnvironmentVariables['PATH']
    }
    $psi.WorkingDirectory = $mod
    $psi.UseShellExecute = $false
    $psi.CreateNoWindow = $true
    $state.proc = [System.Diagnostics.Process]::Start($psi)
    $state.phase = 'building'; $state.online = $online; $state.error = ''
    $state.message = 'המחשב בונה את המוד ופותח את מיינקראפט. זה לוקח דקה או שתיים...'
}

function Update-Game {
    if (-not $state.proc) { return }
    if (-not $state.proc.HasExited) {
        if ($state.phase -eq 'building' -and (Test-Path $log)) {
            $text = ''
            try {
                $fs = New-Object System.IO.FileStream($log, 'Open', 'Read', 'ReadWrite')
                $sr = New-Object System.IO.StreamReader($fs); $text = $sr.ReadToEnd(); $sr.Close()
            } catch {}
            if ($text -match 'Backend library|Setting user|Created: \d+x\d+') {
                $state.phase = 'running'; $state.message = 'מיינקראפט פתוח. כשסוגרים אותו, אפשר להדביק שוב.'
            }
        }
        return
    }
    $code = $state.proc.ExitCode
    $state.proc = $null
    $all = ''
    if (Test-Path $log) { $all = [IO.File]::ReadAllText($log) }
    if ($code -ne 0 -and -not $state.online -and $all -match 'offline') { Start-Game $true; return }
    if ($code -eq 0) { $state.phase = 'idle'; $state.message = 'מוכן. אפשר ללחוץ שוב על שחק.'; return }
    $state.error = Get-ErrorForGemini $log
    Write-Clip $state.error
    $state.phase = 'error'; $state.message = 'משהו לא עבד. השגיאה הועתקה.'
}

function Invoke-Action([string]$name, [string]$query) {
    $busy = $state.phase -eq 'building' -or $state.phase -eq 'running'
    switch ($name) {
        'paste' {
            if ($busy) { return New-Result $false 'קודם סוגרים את מיינקראפט.' }
            $r = Invoke-Paste $root (Read-Clip)
            if (-not $r.Ok) { $state.phase = 'idle'; $state.message = $r.Message; return $r }
            Start-Game $false
            $state.message = $r.Message + '. המחשב בונה ופותח את מיינקראפט...'
            return $r
        }
        'play' {
            if ($busy) { return New-Result $false 'מיינקראפט כבר פתוח.' }
            Start-Game $false
            return New-Result $true 'המחשב בונה ופותח את מיינקראפט...'
        }
        'undo' {
            if ($busy) { return New-Result $false 'קודם סוגרים את מיינקראפט.' }
            $r = Invoke-Undo $root
            $state.phase = 'idle'; $state.error = ''; $state.message = $r.Message
            return $r
        }
        'pictures' {
            $dir = Join-Path $mod 'src/main/resources/assets/myworld/textures/item'
            New-Item -ItemType Directory -Force $dir | Out-Null
            if ($onWindows) { Start-Process explorer.exe ($dir -replace '/', '\') }
            return New-Result $true 'תיקיית התמונות נפתחה.'
        }
        'save' {
            $r = Invoke-SaveAll $root
            $state.message = $r.Message
            return $r
        }
        'restore' {
            if ($busy) { return New-Result $false 'קודם סוגרים את מיינקראפט.' }
            $id = [Uri]::UnescapeDataString(($query -replace '^id=', ''))
            $r = Invoke-Restore $root $id
            $state.phase = 'idle'; $state.error = ''; $state.message = $r.Message
            return $r
        }
        'copy-code' {
            Write-Clip (Get-KidCode $root)
            return New-Result $true 'הועתקו החוקים והקוד שלכם. בג׳מיני לוחצים Ctrl + V, ומתחת כותבים מה אתם רוצים.'
        }
        'copy-error' {
            if ($state.error) { Write-Clip $state.error }
            return New-Result $true 'השגיאה הועתקה שוב.'
        }
        default { return New-Result $false 'unknown' }
    }
}

# ---------- tiny HTTP server ----------
$types = @{ '.html' = 'text/html; charset=utf-8'; '.js' = 'text/javascript; charset=utf-8'; '.css' = 'text/css; charset=utf-8';
            '.png' = 'image/png'; '.ico' = 'image/x-icon'; '.json' = 'application/json; charset=utf-8'; '.svg' = 'image/svg+xml';
            '.gif' = 'image/gif'; '.cur' = 'image/x-icon'; '.mp3' = 'audio/mpeg'; '.txt' = 'text/plain; charset=utf-8' }

function Send($stream, [int]$code, [string]$type, [byte[]]$body) {
    $reason = @{ 200 = 'OK'; 401 = 'Unauthorized'; 403 = 'Forbidden'; 404 = 'Not Found'; 405 = 'Method Not Allowed' }[$code]
    $head = "HTTP/1.1 $code $reason`r`nContent-Type: $type`r`nContent-Length: $($body.Length)`r`nCache-Control: no-store`r`nConnection: close`r`n`r`n"
    $h = [Text.Encoding]::ASCII.GetBytes($head)
    $stream.Write($h, 0, $h.Length)
    if ($body.Length) { $stream.Write($body, 0, $body.Length) }
}
function Send-Json($stream, $obj) {
    Send $stream 200 $types['.json'] ([Text.Encoding]::UTF8.GetBytes(($obj | ConvertTo-Json -Compress)))
}

function Invoke-Request($client) {
    $client.ReceiveTimeout = 2000
    $stream = $client.GetStream()
    $reader = New-Object System.IO.StreamReader($stream, [Text.Encoding]::ASCII)
    $first = $reader.ReadLine()
    if (-not $first) { return }
    $headers = @{}
    while ($true) {
        $line = $reader.ReadLine()
        if ([string]::IsNullOrEmpty($line)) { break }
        $i = $line.IndexOf(':')
        if ($i -gt 0) { $headers[$line.Substring(0, $i).Trim().ToLower()] = $line.Substring($i + 1).Trim() }
    }
    $parts = $first.Split(' ')
    $method = $parts[0]; $path = ($parts[1] -split '\?')[0]
    $query = $(if ($parts[1].Contains('?')) { $parts[1].Substring($parts[1].IndexOf('?') + 1) } else { '' })
    $body = ''
    $len = 0
    # A backup file comes in as base64 text, so that one request may be big.
    $max = $(if ($path -eq '/api/load-backup') { 300000000 } else { 200000 })
    if ($headers.ContainsKey('content-length')) { [void][int]::TryParse($headers['content-length'], [ref]$len) }
    if ($len -gt 0 -and $len -le $max) {
        $client.ReceiveTimeout = 20000
        $buf = New-Object char[] $len
        $got = 0
        while ($got -lt $len) { $n = $reader.Read($buf, $got, $len - $got); if ($n -le 0) { break }; $got += $n }
        $body = New-Object string($buf, 0, $got)
    }

    # ---------- the code lock: everything below needs the token the page got by typing the kid's code ----------
    if ($path -eq '/api/lock') {
        Send-Json $stream @{ set = (Test-Path $pinFile); teacher = (Test-Path $teacherFile) }
        return
    }
    if ($path -in '/api/unlock', '/api/pin-new', '/api/pin-reset') {
        if ($method -ne 'POST' -or $headers['x-make'] -ne '1') { Send $stream 403 'text/plain' ([byte[]]@()); return }
        $code = ''; try { $code = [string](($body | ConvertFrom-Json).code) } catch {}
        $code = $code -replace '\D', ''
        if ((Get-Date) -lt $state.waitUntil) { Send-Json $stream @{ ok = $false; wait = [int]($state.waitUntil - (Get-Date)).TotalSeconds + 1 }; return }
        $ok = $false; $token = ''
        if ($path -eq '/api/pin-new' -and -not (Test-Path $pinFile) -and $code.Length -eq 4) { Set-Code $pinFile $code; $ok = $true }
        elseif ($path -eq '/api/unlock') { $ok = (Test-Code $pinFile $code) -or (Test-Code $teacherFile $code) }
        elseif ($path -eq '/api/pin-reset' -and (Test-Code $teacherFile $code)) { Remove-Item $pinFile -Force -ErrorAction SilentlyContinue; $ok = $true }
        if ($ok) { $state.fails = 0; if ($path -ne '/api/pin-reset') { $token = New-Token } }
        else { $state.fails++; if ($state.fails -ge 5) { $state.fails = 0; $state.waitUntil = (Get-Date).AddSeconds(30) } }
        Send-Json $stream @{ ok = $ok; token = $token }
        return
    }
    if ($path.StartsWith('/api/') -and -not ($headers['x-token'] -and $state.tokens.ContainsKey($headers['x-token']))) {
        Send $stream 401 $types['.json'] ([Text.Encoding]::UTF8.GetBytes('{"locked":true}'))
        return
    }
    if ($path -eq '/api/lock-now') { $state.tokens.Remove($headers['x-token']); Send-Json $stream @{ ok = $true }; return }
    if ($path -eq '/api/status') {
        Send-Json $stream @{ phase = $state.phase; message = $state.message; error = $state.error }
        return
    }
    if ($path -eq '/api/items') {
        Send $stream 200 $types['.json'] ([Text.Encoding]::UTF8.GetBytes((ConvertTo-Json -Compress -InputObject @(Get-ItemList $root))))
        return
    }
    if ($path -match '^/picture/([a-z0-9_]{1,40})\.png$') {
        $file = Join-Path $mod "src/main/resources/assets/myworld/textures/item/$($Matches[1]).png"
        if (Test-Path $file) { Send $stream 200 $types['.png'] ([IO.File]::ReadAllBytes($file)) } else { Send $stream 404 'text/plain' ([byte[]]@()) }
        return
    }
    if ($path -eq '/api/studio') {
        Send $stream 200 $types['.json'] ([Text.Encoding]::UTF8.GetBytes((Get-Studio $root)))
        return
    }
    if ($path -eq '/api/clip') {
        Send-Json $stream @{ text = [string](Read-Clip) }
        return
    }
    if ($path -eq '/api/versions') {
        Send $stream 200 $types['.json'] ([Text.Encoding]::UTF8.GetBytes((ConvertTo-Json -Compress -InputObject @(Get-Versions $root))))
        return
    }
    if ($path.StartsWith('/api/')) {
        # Buttons only from our own page: a custom header can't be sent cross-site without a CORS preflight we never allow.
        if ($method -ne 'POST' -or $headers['x-make'] -ne '1') { Send $stream 403 'text/plain' ([byte[]]@()); return }
        if ($path -eq '/api/save-picture') {
            $r = New-Result $false 'הציור לא נשמר. נסו שוב.'
            try { $j = $body | ConvertFrom-Json; $r = Save-ItemPicture $root ([string]$j.id) ([string]$j.png) } catch {}
            Send-Json $stream @{ ok = $r.Ok; result = $r.Message; phase = $state.phase; message = $r.Message; error = $state.error }
            return
        }
        if ($path -eq '/api/studio-save') {
            $r = New-Result $false 'העיצוב לא נקרא. נסו שוב.'
            try { $r = Save-Studio $root ([Text.Encoding]::UTF8.GetString([Convert]::FromBase64String($body))) } catch {}
            Send-Json $stream @{ ok = $r.Ok; result = $r.Message }
            return
        }
        if ($path -eq '/api/copy-text') {
            $ok = $false
            try { Write-Clip ([Text.Encoding]::UTF8.GetString([Convert]::FromBase64String($body))); $ok = $true } catch {}
            Send-Json $stream @{ ok = $ok }
            return
        }
        if ($path -eq '/api/add-item') {
            $busy = $state.phase -eq 'building' -or $state.phase -eq 'running'
            $r = New-Result $false 'קודם סוגרים את מיינקראפט.'
            if (-not $busy) {
                $r = New-Result $false 'הכרטיס לא נקרא. נסו שוב.'
                try {
                    $j = [Text.Encoding]::UTF8.GetString([Convert]::FromBase64String($body)) | ConvertFrom-Json
                    $r = Invoke-AddItem $root ([string]$j.id) ([string]$j.name) ([string]$j.lore) ([string]$j.stack)
                } catch {}
                if ($r.Ok) { Start-Game $false; $state.message = $r.Message + '. המחשב בונה ופותח את מיינקראפט...' }
                else { $state.phase = 'idle'; $state.message = $r.Message }
            }
            Send-Json $stream @{ ok = $r.Ok; result = $r.Message; phase = $state.phase; message = $state.message; error = $state.error }
            return
        }
        if ($path -eq '/api/backup') {
            $notes = '{}'
            try { $notes = [Text.Encoding]::UTF8.GetString([Convert]::FromBase64String($body)) } catch {}
            $zip = Get-BackupZip $root $notes
            $state.message = 'קובץ הגיבוי ירד לתיקיית ההורדות. עכשיו מעלים אותו לדרייב.'
            Send $stream 200 'application/zip' $zip
            return
        }
        if ($path -eq '/api/load-backup') {
            $busy = $state.phase -eq 'building' -or $state.phase -eq 'running'
            $r = New-Result $false 'קודם סוגרים את מיינקראפט.'
            $hubJson = ''
            if (-not $busy) {
                $r = New-Result $false 'הקובץ לא נקרא. מורידים אותו שוב מהדרייב ומנסים שוב.'
                try { $r = Invoke-LoadBackup $root ([Convert]::FromBase64String($body)); $hubJson = [string]$r.Hub } catch {}
                if ($r.Ok) { $state.phase = 'idle'; $state.error = '' }
                $state.message = $r.Message
            }
            Send-Json $stream @{ ok = $r.Ok; result = $r.Message; hub = $hubJson; phase = $state.phase; message = $state.message; error = $state.error }
            return
        }
        $r = Invoke-Action $path.Substring(5) $query
        Send-Json $stream @{ ok = $r.Ok; result = $r.Message; phase = $state.phase; message = $state.message; error = $state.error }
        return
    }
    if ($method -ne 'GET') { Send $stream 405 'text/plain' ([byte[]]@()); return }
    $name = $(if ($path -eq '/') { 'index.html' } else { $path.TrimStart('/') })
    # Files sit directly in hub\, except the block editor's library in hub\blockly\ and hub\blockly\media\.
    if ($name -notmatch '^(blockly/(media/)?)?[A-Za-z0-9_-][A-Za-z0-9._-]*$') { Send $stream 404 'text/plain' ([byte[]]@()); return }
    $file = Join-Path $hub $name
    if (-not (Test-Path $file -PathType Leaf)) { Send $stream 404 'text/plain' ([byte[]]@()); return }
    $ext = [IO.Path]::GetExtension($file).ToLower()
    $type = $(if ($types.ContainsKey($ext)) { $types[$ext] } else { 'application/octet-stream' })
    Send $stream 200 $type ([IO.File]::ReadAllBytes($file))
}

$lastSeen = Get-Date
while ($true) {
    if ($listener.Pending()) {
        $client = $listener.AcceptTcpClient()
        & $noInherit $client.Client
        try { Invoke-Request $client; $lastSeen = Get-Date } catch {} finally { $client.Close() }
    } else {
        Start-Sleep -Milliseconds 60
    }
    Update-Game
    if (-not $state.proc -and ((Get-Date) - $lastSeen).TotalMinutes -gt 20) { break }
    if ($env:MAKE_EXIT_AFTER -and ((Get-Date) - $lastSeen).TotalSeconds -gt [int]$env:MAKE_EXIT_AFTER -and -not $state.proc) { break }
}
$listener.Stop()
