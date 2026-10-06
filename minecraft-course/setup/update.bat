@echo off
title MAKE - update the course on this computer
rem Teacher's laptop: updates the lessons (hub) and the course tools to the newest version on GitHub.
rem Runs the updater on this computer (C:\MAKE\mod\tools\update-hub.ps1). Never touches the kid's own work.
rem Kids' laptops are updated from the stick (update-from-usb.bat).
set "ROOT=C:\MAKE\"
if not exist "%ROOT%mod\tools" (echo  Minecraft is not installed in C:\MAKE. & pause & exit /b 1)
if exist "%ROOT%mod\tools\update-hub.ps1" goto :run
echo  First time: downloading the updater ...
curl.exe -fsSL -o "%ROOT%mod\tools\update-hub.ps1" "https://raw.githubusercontent.com/KamiShinx/ClassPet/claude/make-courses/minecraft-course/setup/update-hub.ps1"
if errorlevel 1 (echo  Download failed. Check the internet and try again. & pause & exit /b 1)
:run
echo.
echo  Updating the course. About a minute. Don't click inside this window.
echo.
powershell -NoProfile -ExecutionPolicy Bypass -File "%ROOT%mod\tools\update-hub.ps1" %1
echo.
pause
