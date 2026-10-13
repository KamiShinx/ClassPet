@echo off
setlocal
title Science Islands - install - DO NOT CLOSE
echo.
echo  ===============================================
echo   Science Islands - install
echo   Do NOT close this window. 20-60 minutes.
echo  ===============================================
echo.
echo  Started at %TIME%
set "T0=%TIME%"

rem ---- run from a downloaded copy of the repo? Then starter.zip sits next to this file and the hub in ..\hub\ ----
set "HERE=%~dp0"
if exist "%HERE%starter.zip" (echo  Using the course files next to this script.) else (echo  Course files will be downloaded from GitHub.)
echo.

for /f %%R in ('powershell -NoProfile -Command "[math]::Round((Get-CimInstance Win32_ComputerSystem).TotalPhysicalMemory/1GB)"') do set "RAMGB=%%R"
for /f %%F in ('powershell -NoProfile -Command "[math]::Round((Get-PSDrive C).Free/1GB)"') do set "FREEGB=%%F"
echo  RAM: %RAMGB% GB    Free on C: %FREEGB% GB
if defined RAMGB if %RAMGB% LSS 8 echo  WARNING: under 8 GB RAM. Minecraft may be slow.
echo.

where curl >nul 2>nul || (echo  ERROR: curl not found. Windows 10 1803 or newer is needed. & goto :fail)
where tar  >nul 2>nul || (echo  ERROR: tar not found. Windows 10 1803 or newer is needed. & goto :fail)

rem ---- where everything goes: C:\ISLANDS, or the user folder if C:\ is locked. Separate from C:\MAKE. ----
set "ROOT=C:\ISLANDS"
mkdir "%ROOT%" 2>nul
if not exist "%ROOT%\" set "ROOT=%USERPROFILE%\ISLANDS"
mkdir "%ROOT%" 2>nul
cd /d "%ROOT%" || (echo  ERROR: cannot create the ISLANDS folder. & goto :fail)
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

rem ---- 1b. Java 21: one NeoForge build tool (downloadAssets) still runs on 21 ----
if exist "%ROOT%\jdk21\bin\java.exe" goto :java21_ok
echo  [1/4] Downloading Java 21 for the build tools ...
curl -L --fail --retry 3 -o jdk21.zip "https://api.adoptium.net/v3/binary/latest/21/ga/windows/x64/jdk/hotspot/normal/eclipse?project=jdk"
if errorlevel 1 (echo  ERROR: Java 21 download failed. Is api.adoptium.net blocked? & goto :fail)
if exist jdk-tmp rmdir /s /q jdk-tmp
mkdir jdk-tmp
tar -xf jdk21.zip -C jdk-tmp
if errorlevel 1 (echo  ERROR: could not unpack Java 21. & goto :fail)
for /d %%D in ("jdk-tmp\*") do move "%%D" "%ROOT%\jdk21" >nul
rmdir /s /q jdk-tmp
del jdk21.zip
:java21_ok
if not exist "%ROOT%\jdk21\bin\java.exe" (echo  ERROR: Java 21 is not where it should be. & goto :fail)
echo  [1/4] Java 21 OK
echo.

rem ---- 2. the mod project: official NeoForge 26.2 template, pinned (the same one the MAKE course uses) ----
if exist "%ROOT%\mod\gradlew.bat" goto :mod_ok
echo  [2/4] Downloading the mod project ...
curl -L --fail --retry 3 -o mdk.zip "https://github.com/NeoForgeMDKs/MDK-26.2-ModDevGradle/archive/746ddecae50e0c4e64643cfe548cb265c0be08fb.zip"
if errorlevel 1 (echo  ERROR: project download failed. Is github.com blocked? & goto :fail)
tar -xf mdk.zip
if errorlevel 1 (echo  ERROR: could not unpack the project. & goto :fail)
for /d %%D in ("MDK-26.2-ModDevGradle-*") do move "%%D" "%ROOT%\mod" >nul
del mdk.zip
:mod_ok
echo  [2/4] Mod project OK
echo.

rem ---- 3. the course on top of the template, and the icon ----
set "STARTER_VER=1"
if exist "%ROOT%\mod\starter-v%STARTER_VER%.txt" goto :starter_ok
echo  [3/4] Adding the course ...
if exist "%HERE%starter.zip" goto :starter_local
curl -L --fail --retry 3 -o starter.zip "https://raw.githubusercontent.com/KamiShinx/ClassPet/claude/make-courses/minecraft-edu/game/setup/starter.zip"
if errorlevel 1 (echo  ERROR: course download failed. & goto :fail)
goto :starter_have
:starter_local
copy /y "%HERE%starter.zip" "%ROOT%\starter.zip" >nul
if errorlevel 1 (echo  ERROR: could not copy starter.zip. & goto :fail)
:starter_have
if exist "%ROOT%\mod\src\main\java\com" rmdir /s /q "%ROOT%\mod\src\main\java\com"
if exist "%ROOT%\mod\src\main\resources\assets\examplemod" rmdir /s /q "%ROOT%\mod\src\main\resources\assets\examplemod"
if exist "%ROOT%\mod\src\main\resources\data\islands" rmdir /s /q "%ROOT%\mod\src\main\resources\data\islands"
tar -xf starter.zip -C "%ROOT%"
if errorlevel 1 (echo  ERROR: could not unpack the course. & goto :fail)
del starter.zip
> "%ROOT%\mod\starter-v%STARTER_VER%.txt" echo starter v%STARTER_VER%
:starter_ok
echo  [3/4] Course OK
powershell -NoProfile -Command "& ([ScriptBlock]::Create([IO.File]::ReadAllText('%ROOT%\mod\tools\shortcuts.ps1', [Text.Encoding]::UTF8))) '%ROOT%'"
echo.

rem ---- the hub page (runs offline) ----
mkdir "%ROOT%\hub" 2>nul
if exist "%HERE%..\hub\index.html" (copy /y "%HERE%..\hub\index.html" "%ROOT%\hub\index.src" >nul) else (curl -L --fail -s -o "%ROOT%\hub\index.src" "https://raw.githubusercontent.com/KamiShinx/ClassPet/claude/make-courses/minecraft-edu/game/hub/index.html")
if errorlevel 1 (echo  ERROR: the hub page did not download. & goto :fail)
> "%ROOT%\hub\index.html" echo ^<!doctype html^>^<meta charset="utf-8"^>^<meta name="viewport" content="width=device-width,initial-scale=1"^>
type "%ROOT%\hub\index.src" >> "%ROOT%\hub\index.html"
del "%ROOT%\hub\index.src"

rem ---- tell Gradle exactly where Java is, so it never searches or downloads one ----
set "ROOTF=%ROOT:\=/%"
mkdir "%ROOT%\gradle-home" 2>nul
> "%ROOT%\gradle-home\gradle.properties" (
  echo org.gradle.java.installations.paths=%ROOTF%/jdk,%ROOTF%/jdk21
  echo org.gradle.java.installations.auto-download=false
)

rem ---- 4. first start: downloads Minecraft and builds, then opens lesson 1. The long part. ----
echo  [4/4] Downloading Minecraft and building the mod.
echo        This is the long part. Minecraft opens lesson 1 by itself at the end.
echo.
mkdir "%ROOT%\mod\run\islands" 2>nul
> "%ROOT%\mod\run\islands\lesson.txt" echo 1
set "JAVA_HOME=%ROOT%\jdk"
set "PATH=%ROOT%\jdk\bin;%PATH%"
set "GRADLE_USER_HOME=%ROOT%\gradle-home"
cd /d "%ROOT%\mod"
call gradlew.bat runClient --no-configuration-cache
if errorlevel 1 (echo  ERROR: the build or the game failed. Scroll up for the first red ERROR line. & goto :fail)

echo.
echo  ===============================================
echo   DONE. Started %T0%, finished %TIME%
echo   Next time: the "Science Islands" icon on the desktop
echo  ===============================================
pause
exit /b 0

:fail
echo.
echo  ---- Install stopped. Started %T0%, stopped %TIME% ----
echo  Take a photo of this window. Running install again continues where it stopped.
pause
exit /b 1
