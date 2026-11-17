@echo off
setlocal
title MAKE - fix this laptop
rem Run from the USB stick on a laptop where something broke. It closes what is stuck, updates from the stick,
rem checks the usual causes, and saves a report on the stick (reports\<computer name>) for Claude to read.
rem Never touches the kid's own work: code, pictures, worlds, versions, or their lock code.
set "ROOT=C:\MAKE"
set "REP=%~dp0reports\%COMPUTERNAME%"
echo.
echo  ===============================================
echo   MAKE - fix this laptop
echo  ===============================================
echo.
if not exist "%ROOT%\mod\tools\server.ps1" (echo  Minecraft is not installed on this laptop. Use install-from-usb.bat instead. & goto :fail)

echo  1/5  Closing Minecraft and the lesson page's helper ...
taskkill /f /im java.exe >nul 2>nul
taskkill /f /im javaw.exe >nul 2>nul
powershell -NoProfile -Command "Get-CimInstance Win32_Process -Filter \"Name='powershell.exe'\" | Where-Object { $_.CommandLine -like '*server.ps1*' } | ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }"

echo  2/5  Updating the lessons and the game files from the stick ...
call "%~dp0update-from-usb.bat" nopause
if errorlevel 1 goto :fail

echo  3/5  Saving a report on the stick ...
if not exist "%REP%" mkdir "%REP%"
copy /y "%ROOT%\mod\run\logs\latest.log" "%REP%\latest.log" >nul 2>nul
copy /y "%ROOT%\mod\build\last-play.log" "%REP%\last-play.log" >nul 2>nul
copy /y "%ROOT%\design\world.json" "%REP%\world.json" >nul 2>nul
copy /y "%ROOT%\mod\run\options.txt" "%REP%\options.txt" >nul 2>nul
powershell -NoProfile -Command "$c = Get-ChildItem '%ROOT%\mod\run\crash-reports' -Filter *.txt -ErrorAction SilentlyContinue | Sort-Object LastWriteTime | Select-Object -Last 1; if ($c) { Copy-Item $c.FullName '%REP%\last-crash.txt' }"
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0fix-laptop.ps1" "%REP%"

echo  4/5  The browser ...
choice /c YN /n /m "       Did the lesson page open broken on this laptop? Press Y (yes) or N (no): "
if errorlevel 2 goto :browser_done
set "BR="
if exist "%ProgramFiles%\Google\Chrome\Application\chrome.exe" set "BR=%ProgramFiles%\Google\Chrome\Application\chrome.exe"
if not defined BR if exist "%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe" set "BR=%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe"
if not defined BR if exist "%LOCALAPPDATA%\Google\Chrome\Application\chrome.exe" set "BR=%LOCALAPPDATA%\Google\Chrome\Application\chrome.exe"
if not defined BR (echo        Chrome is not on this laptop, so the lessons stay in the default browser.& goto :browser_done)
> "%ROOT%\browser.txt" echo %BR%
echo        From now on the lessons open in Chrome. The kid's items, pictures and dimension are the same there.
:browser_done

echo  5/5  Done.
echo.
echo  ===============================================
echo   FIXED what could be fixed. The report is on the stick:
echo   reports\%COMPUTERNAME%\report.txt
echo   Open Minecraft from the Start menu and try again.
echo   Still broken? Bring the stick to Claude.
echo  ===============================================
pause
exit /b 0

:fail
echo.
echo  ---- Stopped. Take a photo of this window. ----
pause
exit /b 1
