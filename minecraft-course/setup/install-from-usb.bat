@echo off
setlocal
title MAKE Minecraft - install from USB - DO NOT CLOSE
set "SRC=%~dp0MAKE"
set "ROOT=C:\MAKE"
set "T0=%TIME%"
echo.
echo  ===============================================
echo   MAKE - Minecraft modding - install from USB
echo   Do NOT close this window and do NOT pull out the stick.
echo  ===============================================
echo.
if not exist "%SRC%\play.bat" (echo  ERROR: no MAKE folder on this stick. & goto :fail)

mkdir "%ROOT%" 2>nul
if not exist "%ROOT%\" (echo  ERROR: cannot create C:\MAKE on this computer. Call Ben. & goto :fail)

echo  [1/3] Copying from the stick ...
rem Everything except the kid's own work (code, pictures, worlds, versions, lock code) ...
robocopy "%SRC%" "%ROOT%" /E /MT:16 /R:1 /W:1 /NFL /NDL /NP /XD "%SRC%\mod\src\main\resources\assets\myworld" "%SRC%\mod\run" "%SRC%\saves" /XF MyWorld.java MyItems.java MyEffects.java MyMobs.java MyRules.java pin.txt
if %ERRORLEVEL% GEQ 8 (echo  ERROR: the copy failed. Is there enough free space on C:? & goto :fail)
rem ... and the kid's files only where they don't exist yet, so running this again never overwrites a kid's work.
robocopy "%SRC%\mod\src\main\java\make\myworld" "%ROOT%\mod\src\main\java\make\myworld" My*.java /XC /XN /XO /R:1 /W:1 /NFL /NDL /NP >nul
robocopy "%SRC%\mod\src\main\resources\assets\myworld" "%ROOT%\mod\src\main\resources\assets\myworld" /E /XC /XN /XO /R:1 /W:1 /NFL /NDL /NP >nul
echo  [1/3] Copy OK
echo.

echo  [2/3] Desktop buttons ...
powershell -NoProfile -Command "& ([ScriptBlock]::Create([IO.File]::ReadAllText('%ROOT%\mod\tools\shortcuts.ps1', [Text.Encoding]::UTF8))) '%ROOT%'"
echo.

echo  Copy finished at %TIME%. You can take the stick out now.
echo.
echo  [3/3] Starting Minecraft to check it works. No internet needed.
echo.
call "%ROOT%\play.bat"
echo.
echo  ===============================================
echo   DONE. Started %T0%, finished %TIME%
echo   Next time: double-click "Minecraft" on the desktop
echo  ===============================================
pause
exit /b 0

:fail
echo.
echo  ---- Install stopped. Take a photo of this window. ----
pause
exit /b 1
