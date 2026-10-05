@echo off
setlocal
title MAKE Minecraft - install - DO NOT CLOSE
echo.
echo  ===============================================
echo   MAKE - Minecraft modding - install
echo   Do NOT close this window. 20-60 minutes.
echo  ===============================================
echo.
echo  Started at %TIME%
set "T0=%TIME%"

rem ---- this computer ----
for /f %%R in ('powershell -NoProfile -Command "[math]::Round((Get-CimInstance Win32_ComputerSystem).TotalPhysicalMemory/1GB)"') do set "RAMGB=%%R"
for /f %%F in ('powershell -NoProfile -Command "[math]::Round((Get-PSDrive C).Free/1GB)"') do set "FREEGB=%%F"
echo  RAM: %RAMGB% GB    Free on C: %FREEGB% GB
if defined RAMGB if %RAMGB% LSS 8 echo  WARNING: under 8 GB RAM. Minecraft may be very slow.
echo.

where curl >nul 2>nul || (echo  ERROR: curl not found. Windows 10 1803 or newer is needed. & goto :fail)
where tar  >nul 2>nul || (echo  ERROR: tar not found. Windows 10 1803 or newer is needed. & goto :fail)

rem ---- where everything goes: C:\MAKE, or the user folder if C:\ is locked ----
set "ROOT=C:\MAKE"
mkdir "%ROOT%" 2>nul
if not exist "%ROOT%\" set "ROOT=%USERPROFILE%\MAKE"
mkdir "%ROOT%" 2>nul
cd /d "%ROOT%" || (echo  ERROR: cannot create the MAKE folder. & goto :fail)
echo  Installing into %ROOT%
echo.

rem ---- 1. Java 25 ----
if exist "%ROOT%\jdk\bin\java.exe" goto :java_ok
echo  [1/4] Downloading Java 25 ...
curl -L --fail --retry 3 -o jdk.zip "https://api.adoptium.net/v3/binary/latest/25/ga/windows/x64/jdk/hotspot/normal/eclipse?project=jdk"
if errorlevel 1 (echo  ERROR: Java download failed. Is api.adoptium.net blocked? & goto :fail)
if exist jdk-tmp rmdir /s /q jdk-tmp
mkdir jdk-tmp
tar -xf jdk.zip -C jdk-tmp
if errorlevel 1 (echo  ERROR: could not unpack Java. & goto :fail)
for /d %%D in ("jdk-tmp\*") do move "%%D" "%ROOT%\jdk" >nul
rmdir /s /q jdk-tmp
del jdk.zip
:java_ok
if not exist "%ROOT%\jdk\bin\java.exe" (echo  ERROR: Java is not where it should be. & goto :fail)
echo  [1/4] Java 25 OK
echo.

rem ---- 2. VS Code, portable, no admin ----
if exist "%ROOT%\vscode\Code.exe" goto :code_ok
echo  [2/4] Downloading VS Code ...
curl -L --fail --retry 3 -o vscode.zip "https://update.code.visualstudio.com/latest/win32-x64-archive/stable"
if errorlevel 1 (echo  ERROR: VS Code download failed. & goto :fail)
mkdir vscode 2>nul
tar -xf vscode.zip -C vscode
if errorlevel 1 (echo  ERROR: could not unpack VS Code. & goto :fail)
mkdir vscode\data 2>nul
del vscode.zip
:code_ok
echo  [2/4] VS Code OK
echo.

rem ---- 3. the mod project: official NeoForge 26.2 template, pinned ----
if exist "%ROOT%\mod\gradlew.bat" goto :mod_ok
echo  [3/4] Downloading the mod project ...
curl -L --fail --retry 3 -o mdk.zip "https://github.com/NeoForgeMDKs/MDK-26.2-ModDevGradle/archive/746ddecae50e0c4e64643cfe548cb265c0be08fb.zip"
if errorlevel 1 (echo  ERROR: project download failed. Is github.com blocked? & goto :fail)
tar -xf mdk.zip
if errorlevel 1 (echo  ERROR: could not unpack the project. & goto :fail)
for /d %%D in ("MDK-26.2-ModDevGradle-*") do move "%%D" "%ROOT%\mod" >nul
del mdk.zip
:mod_ok
echo  [3/4] Mod project OK
echo.

rem ---- the buttons: play.bat, code.bat, desktop shortcuts ----
> "%ROOT%\play.bat" (
  echo @echo off
  echo title Minecraft - DO NOT CLOSE
  echo set "JAVA_HOME=%%~dp0jdk"
  echo set "PATH=%%~dp0jdk\bin;%%PATH%%"
  echo set "GRADLE_USER_HOME=%%~dp0gradle-home"
  echo cd /d "%%~dp0mod"
  echo call gradlew.bat runClient --offline
  echo if errorlevel 1 call gradlew.bat runClient
  echo if errorlevel 1 pause
)
> "%ROOT%\code.bat" (
  echo @echo off
  echo start "" "%%~dp0vscode\Code.exe" "%%~dp0mod"
)
powershell -NoProfile -Command "$d=[Environment]::GetFolderPath('Desktop'); $s=New-Object -ComObject WScript.Shell; $l=$s.CreateShortcut(\"$d\Minecraft - Play.lnk\"); $l.TargetPath='%ROOT%\play.bat'; $l.WorkingDirectory='%ROOT%'; $l.Save(); $l=$s.CreateShortcut(\"$d\Minecraft - Code.lnk\"); $l.TargetPath='%ROOT%\code.bat'; $l.WorkingDirectory='%ROOT%'; $l.Save()"
echo  Desktop buttons: "Minecraft - Play" and "Minecraft - Code"
echo.

rem ---- 4. first start: downloads Minecraft and builds. The long part. ----
echo  [4/4] Downloading Minecraft and building the mod.
echo        This is the long part. Minecraft opens by itself at the end.
echo.
set "JAVA_HOME=%ROOT%\jdk"
set "PATH=%ROOT%\jdk\bin;%PATH%"
set "GRADLE_USER_HOME=%ROOT%\gradle-home"
cd /d "%ROOT%\mod"
call gradlew.bat runClient
if errorlevel 1 (echo  ERROR: the build or the game failed. Scroll up for the first red ERROR line. & goto :fail)

echo.
echo  ===============================================
echo   DONE. Started %T0%, finished %TIME%
echo   Next time: double-click "Minecraft - Play"
echo  ===============================================
pause
exit /b 0

:fail
echo.
echo  ---- Install stopped. Started %T0%, stopped %TIME% ----
echo  Take a photo of this window. Running install again continues where it stopped.
pause
exit /b 1
