@echo off
setlocal
title MAKE - school laptop check
rem Run from the USB stick (after make-usb.bat) on ONE school laptop. Takes 1-3 minutes.
set "STICK=%~dp0MAKE"
set "T=C:\MAKE-check"
echo.
echo  ===============================================
echo   MAKE - can this school laptop run the course?
echo  ===============================================
echo.
echo  [1] Command window runs ......... PASS  (you are reading this)

for /f %%R in ('powershell -NoProfile -Command "[math]::Round((Get-CimInstance Win32_ComputerSystem).TotalPhysicalMemory/1GB)" 2^>nul') do set "RAMGB=%%R"
for /f %%F in ('powershell -NoProfile -Command "[math]::Round((Get-PSDrive C).Free/1GB)" 2^>nul') do set "FREEGB=%%F"
echo  [2] RAM %RAMGB% GB, free on C: %FREEGB% GB   (need 6+ GB RAM, 10+ GB free)

if exist "%STICK%\jdk\bin\java.exe" (echo  [3] USB stick readable .......... PASS) else (echo  [3] USB stick readable .......... FAIL  no MAKE folder on the stick, run make-usb.bat first & goto :end)

mkdir "%T%" 2>nul
echo test> "%T%\test.txt" 2>nul
if exist "%T%\test.txt" (echo  [4] Can write to C:\ ............ PASS) else (echo  [4] Can write to C:\ ............ FAIL  we must use the user folder instead)

echo  [5] Copying Java to C: to test it, 30-60 seconds ...
robocopy "%STICK%\jdk" "%T%\jdk" /E /MT:16 /NFL /NDL /NJH /NJS /NP >nul
"%T%\jdk\bin\java.exe" -version >nul 2>nul
if errorlevel 1 (echo  [5] Programs run from C:\MAKE .... FAIL  IT must allow C:\MAKE in the protection system) else (echo  [5] Programs run from C:\MAKE .... PASS)

"%STICK%\jdk\bin\java.exe" -version >nul 2>nul
if errorlevel 1 (echo  [6] Programs run from the stick .. FAIL) else (echo  [6] Programs run from the stick .. PASS)

curl -s -o nul -m 10 https://gemini.google.com && (echo  [7] Gemini reachable .............. PASS) || (echo  [7] Gemini reachable .............. FAIL)
curl -s -o nul -m 10 https://maven.neoforged.net && (echo  [8] Mod download site, optional .. open) || (echo  [8] Mod download site, optional .. blocked, fine: the stick covers it)

rmdir /s /q "%T%" 2>nul
:end
echo.
echo  Take a photo of this window and send it to Claude.
pause
