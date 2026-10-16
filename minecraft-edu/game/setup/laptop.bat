@echo off
setlocal
title Science Islands
rem Put this one file on any Windows 10/11 computer and double-click it. It downloads (the first time, 20-60 minutes)
rem or updates the game from GitHub, then opens the lesson you pick. Everything goes into C:\ISLANDS.
echo.
echo  ==========================================
echo   Science Islands
echo  ==========================================
echo.
echo    1 = Lesson 1: the living island (animals)
echo    2 = Demo: moon base, the life of a star (space + English)
echo.
choice /c 12 /n /m "  Press 1 or 2: "
if errorlevel 2 (set "ISLANDS_LESSON=20") else (set "ISLANDS_LESSON=1")
echo.
set "SETUP=%TEMP%\islands_setup"
mkdir "%SETUP%" 2>nul
echo  Getting the latest installer ...
curl -L --fail --retry 3 -s -o "%SETUP%\install.bat" "https://raw.githubusercontent.com/KamiShinx/ClassPet/claude/make-courses/minecraft-edu/game/setup/install.bat"
if errorlevel 1 (echo  ERROR: could not download the installer. Is the internet on? & pause & exit /b 1)
call "%SETUP%\install.bat"
