# The "Science Islands" icon runs this. It serves the hub on http://localhost:47812 and does what its buttons ask:
# play a lesson (Minecraft opens straight into that lesson's map), start a lesson over, close Minecraft.
# Listens on this computer only. Quits by itself after 20 minutes with no page open and no game running.
# Based on the MAKE course's hub server (minecraft-course/starter/mod/tools/server.ps1), without the code tools.
param([string]$root)
$root = $root.TrimEnd('\', '/')
$port = 47812
$url = "http://localhost:$port/"
$mod = Join-Path $root 'mod'
$hub = Join-Path $root 'hub'
$run = Join-Path $mod 'run'
$log = Join-Path $mod 'build/last-play.log'
$onWindows = [Environment]::OSVersion.Platform -eq 'Win32NT'

# ---------- start, or hand over to the copy that is already running ----------
try {
    $listener = New-Object System.Net.Sockets.TcpListener([Net.IPAddress]::Loopback, $port)
    $listener.Start()
} catch {
    $alive = $false
    try { $r = [Net.WebRequest]::Create("${url}api/status"); $r.Timeout = 3000; $r.GetResponse().Close(); $alive = $true } catch [Net.WebException] { if ($_.Exception.Response) { $alive = $true } } catch {}
    if ($alive) { if ($onWindows) { Start-Process $url } }
    elseif ($onWindows) {
        Add-Type -AssemblyName PresentationFramework -ErrorAction SilentlyContinue
        try { [void][System.Windows.MessageBox]::Show("The hub can't start: an old Minecraft builder is still running.`nRestart the computer.", 'Science Islands') } catch {}
    }
    exit 0
}
if ($onWindows -and -not $env:ISLANDS_NO_BROWSER) { Start-Process $url }

# ---------- game state ----------
$state = @{ phase = 'idle'; message = 'מוכן.'; error = ''; online = $false; proc = $null; lesson = 0 }

function New-Result($ok, $message) { [pscustomobject]@{ Ok = $ok; Message = $message } }
function Get-WorldDir([int]$lesson) { Join-Path $run "saves/islands_lesson_$lesson" }

function Start-Game([bool]$online) {
    # Tell the mod which lesson to open (LessonBoot.java reads run/islands/lesson.txt).
    $dir = Join-Path $run 'islands'
    New-Item -ItemType Directory -Force $dir | Out-Null
    [IO.File]::WriteAllText((Join-Path $dir 'lesson.txt'), [string]$state.lesson)
    New-Item -ItemType Directory -Force (Split-Path $log) | Out-Null
    if (Test-Path $log) { Remove-Item $log -Force -ErrorAction SilentlyContinue }
    $psi = New-Object System.Diagnostics.ProcessStartInfo
    $flag = $(if ($online) { '' } else { '--offline' })
    if ($env:ISLANDS_FAKE_BUILD) {
        # Tests only: a stand-in for Gradle.
        $psi.FileName = '/bin/sh'
        $psi.Arguments = "-c `"$($env:ISLANDS_FAKE_BUILD) > '$log' 2>&1`""
        $psi.WorkingDirectory = $mod
        $psi.UseShellExecute = $false
        $psi.CreateNoWindow = $true
    } else {
        # Started through the shell, so Gradle inherits nothing from us (an inherited socket once kept the MAKE hub's
        # port taken forever). The shell can't pass environment variables, so cmd sets them itself.
        $w = { param($p) $p -replace '/', '\' }
        $psi.FileName = $env:ComSpec
        $psi.Arguments = "/c set ""JAVA_HOME=$(& $w (Join-Path $root 'jdk'))"" && set ""GRADLE_USER_HOME=$(& $w (Join-Path $root 'gradle-home'))"" && set ""PATH=$(& $w (Join-Path $root 'jdk/bin'));%PATH%"" && .\gradlew.bat runClient $flag > ""$(& $w $log)"" 2>&1"
        $psi.WorkingDirectory = (& $w $mod)
        $psi.UseShellExecute = $true
        $psi.WindowStyle = 'Hidden'
    }
    $state.proc = [System.Diagnostics.Process]::Start($psi)
    $state.phase = 'building'; $state.online = $online; $state.error = ''
    $state.message = "פותחים את שיעור $($state.lesson). זה לוקח דקה או שתיים..."
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
                $state.phase = 'running'; $state.message = "שיעור $($state.lesson) פתוח במיינקראפט."
            }
        }
        return
    }
    $code = $state.proc.ExitCode
    $state.proc = $null
    $all = ''
    if (Test-Path $log) { $all = [IO.File]::ReadAllText($log) }
    if ($code -ne 0 -and -not $state.online -and $all -match 'offline') { Start-Game $true; return }
    if ($code -eq 0) { $state.phase = 'idle'; $state.message = 'מיינקראפט נסגר. אפשר לבחור שיעור.'; return }
    # Keep the useful part of the log for the teacher: the first error lines.
    $lines = $all -split "`n" | Where-Object { $_ -match 'ERROR|error:|Exception|FAILED|What went wrong' } | Select-Object -First 25
    $state.error = ($lines -join "`n")
    $state.phase = 'error'; $state.message = 'המשחק לא נפתח. צלמו את המסך ושלחו לבן.'
}

# "Close Minecraft": asks Gradle itself to stop (gradlew --stop). The hub never kills processes: Windows Defender
# flagged the MAKE hub when it did.
function Stop-Game {
    if ($env:ISLANDS_FAKE_BUILD) {
        if ($state.proc -and -not $state.proc.HasExited) { try { $state.proc.Kill() } catch {} }
    } else {
        $w = { param($p) $p -replace '/', '\' }
        $psi = New-Object System.Diagnostics.ProcessStartInfo
        $psi.FileName = $env:ComSpec
        $psi.Arguments = "/c set ""JAVA_HOME=$(& $w (Join-Path $root 'jdk'))"" && set ""GRADLE_USER_HOME=$(& $w (Join-Path $root 'gradle-home'))"" && .\gradlew.bat --stop"
        $psi.WorkingDirectory = (& $w $mod)
        $psi.UseShellExecute = $true
        $psi.WindowStyle = 'Hidden'
        try { [void]([System.Diagnostics.Process]::Start($psi)).WaitForExit(30000) } catch {}
    }
    $state.proc = $null
    $state.phase = 'idle'; $state.error = ''; $state.message = 'מיינקראפט נסגר. אפשר לבחור שיעור.'
}

function Get-Lesson([string]$query) {
    $n = 0
    if ($query -match '(^|&)lesson=(\d{1,3})(&|$)') { $n = [int]$Matches[2] }
    return $n
}

function Invoke-Action([string]$name, [string]$query) {
    $busy = $state.phase -eq 'building' -or $state.phase -eq 'running'
    $n = Get-Lesson $query
    switch ($name) {
        'play' {
            if ($busy) { return New-Result $false 'מיינקראפט כבר פתוח. כדי לעבור שיעור, לוחצים ״לסגור את מיינקראפט״.' }
            if ($n -lt 1) { return New-Result $false 'לא נבחר שיעור.' }
            $state.lesson = $n
            Start-Game $false
            return New-Result $true $state.message
        }
        'restart' {
            # Start a lesson over: delete that lesson's world. The next Play builds it fresh.
            if ($busy) { return New-Result $false 'קודם סוגרים את מיינקראפט.' }
            if ($n -lt 1) { return New-Result $false 'לא נבחר שיעור.' }
            $dir = Get-WorldDir $n
            if (Test-Path $dir) { Remove-Item $dir -Recurse -Force -ErrorAction SilentlyContinue }
            $state.message = "שיעור $n יתחיל מההתחלה בפעם הבאה שלוחצים שחק."
            return New-Result $true $state.message
        }
        'stop' {
            Stop-Game
            return New-Result $true $state.message
        }
        default { return New-Result $false 'unknown' }
    }
}

# ---------- tiny HTTP server ----------
$types = @{ '.html' = 'text/html; charset=utf-8'; '.js' = 'text/javascript; charset=utf-8'; '.css' = 'text/css; charset=utf-8';
            '.png' = 'image/png'; '.ico' = 'image/x-icon'; '.json' = 'application/json; charset=utf-8'; '.svg' = 'image/svg+xml' }

function Send($stream, [int]$code, [string]$type, [byte[]]$body) {
    $reason = @{ 200 = 'OK'; 403 = 'Forbidden'; 404 = 'Not Found' }[$code]
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

    if ($path -eq '/api/status') {
        $worlds = @()
        $saves = Join-Path $run 'saves'
        if (Test-Path $saves) { $worlds = @(Get-ChildItem $saves -Directory | Where-Object { $_.Name -match '^islands_lesson_\d+$' } | ForEach-Object { [int]($_.Name -replace '\D', '') }) }
        Send-Json $stream @{ phase = $state.phase; message = $state.message; error = $state.error; lesson = $state.lesson; started = $worlds }
        return
    }
    if ($path.StartsWith('/api/')) {
        # Buttons only from our own page: a custom header can't be sent cross-site without a CORS preflight we never allow.
        if ($method -ne 'POST' -or $headers['x-islands'] -ne '1') { Send $stream 403 'text/plain' ([byte[]]@()); return }
        $r = Invoke-Action $path.Substring(5) $query
        Send-Json $stream @{ ok = $r.Ok; result = $r.Message; phase = $state.phase; message = $state.message; error = $state.error }
        return
    }
    # Static files from the hub folder: flat names only.
    $name = $(if ($path -eq '/') { 'index.html' } else { $path.TrimStart('/') })
    if ($name -notmatch '^[A-Za-z0-9_.-]+$') { Send $stream 404 'text/plain' ([byte[]]@()); return }
    $file = Join-Path $hub $name
    if (-not (Test-Path $file -PathType Leaf)) { Send $stream 404 'text/plain' ([byte[]]@()); return }
    $ext = [IO.Path]::GetExtension($file).ToLower()
    $type = $(if ($types.ContainsKey($ext)) { $types[$ext] } else { 'application/octet-stream' })
    Send $stream 200 $type ([IO.File]::ReadAllBytes($file))
}

# ---------- main loop ----------
$lastSeen = Get-Date
while ($true) {
    if ($listener.Pending()) {
        $client = $listener.AcceptTcpClient()
        try { Invoke-Request $client; $lastSeen = Get-Date } catch {} finally { $client.Close() }
    } else {
        Start-Sleep -Milliseconds 50
    }
    Update-Game
    if ($state.proc) { $lastSeen = Get-Date }
    if ($env:ISLANDS_EXIT_AFTER -and ((Get-Date) - $lastSeen).TotalSeconds -gt [int]$env:ISLANDS_EXIT_AFTER) { break }
    if (((Get-Date) - $lastSeen).TotalMinutes -gt 20) { break }
}
$listener.Stop()
