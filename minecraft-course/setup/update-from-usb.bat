@echo off
setlocal
title MAKE - update this laptop from the stick
rem Updates a laptop where Minecraft is already installed: the lessons (hub) and the course tools.
rem Never touches the kid's own work: code, pictures, worlds, versions, or their lock code.
set "SRC=%~dp0MAKE"
set "ROOT=C:\MAKE"
set "T0=%TIME%"
echo.
echo  ===============================================
echo   MAKE - update this laptop from the stick
echo  ===============================================
echo.
if not exist "%SRC%\hub\index.html" (echo  ERROR: no MAKE folder on this stick. Run make-usb.bat first. & goto :fail)
if not exist "%ROOT%\mod\tools\server.ps1" (echo  Minecraft is not installed on this laptop. Use install-from-usb.bat instead. & goto :fail)

rem The teacher's code opens any kid's hub and resets a forgotten code. Asked once per stick, kept only as a hash.
if exist "%~dp0teacher.txt" goto :have_teacher
echo  First time on this stick: choose the TEACHER code, 4 digits. Only you should know it.
set /p "TC=  Teacher code: "
powershell -NoProfile -Command "if ('%TC%' -notmatch '^\d{4}$') { exit 1 }; . ([ScriptBlock]::Create([IO.File]::ReadAllText('%SRC%\mod\tools\common.ps1', [Text.Encoding]::UTF8))); Set-Code '%~dp0teacher.txt' '%TC%'"
if errorlevel 1 (echo  The teacher code must be exactly 4 digits. Run this again. & goto :fail)
echo  Teacher code saved on the stick.
echo.
:have_teacher

echo  Updating the lessons and the course tools ...
robocopy "%SRC%\hub" "%ROOT%\hub" /E /R:1 /W:1 /NFL /NDL /NP /NJH /NJS /XF teacher.html >nul
if %ERRORLEVEL% GEQ 8 (echo  ERROR: could not copy the lessons. & goto :fail)
robocopy "%SRC%\mod\tools" "%ROOT%\mod\tools" /E /R:1 /W:1 /NFL /NDL /NP /NJH /NJS >nul
if %ERRORLEVEL% GEQ 8 (echo  ERROR: could not copy the course tools. & goto :fail)
copy /y "%SRC%\mod\src\main\java\make\myworld\Kit.java" "%ROOT%\mod\src\main\java\make\myworld\Kit.java" >nul
copy /y "%SRC%\mod\src\main\java\make\myworld\StudioPower.java" "%ROOT%\mod\src\main\java\make\myworld\StudioPower.java" >nul
copy /y "%SRC%\mod\src\main\java\make\myworld\MyDimension.java" "%ROOT%\mod\src\main\java\make\myworld\MyDimension.java" >nul
copy /y "%SRC%\mod\src\main\java\make\myworld\ModeButton.java" "%ROOT%\mod\src\main\java\make\myworld\ModeButton.java" >nul
copy /y "%SRC%\mod\src\main\java\make\myworld\MyPortal.java" "%ROOT%\mod\src\main\java\make\myworld\MyPortal.java" >nul
copy /y "%~dp0teacher.txt" "%ROOT%\teacher.txt" >nul
rem The teacher's laptop (it already has the teacher page) gets the newest slides page too. Kid laptops never get it.
if not exist "%ROOT%\hub\teacher.html" goto :no_teacher
if not exist "%~dp0teacher-page\teacher.html" goto :no_teacher
copy /y "%~dp0teacher-page\teacher.html" "%ROOT%\hub\teacher.html" >nul
echo  The teacher page and its slides are updated too.
:no_teacher

echo.
echo  ===============================================
echo   DONE. Started %T0%, finished %TIME%
echo   The kid's items, pictures and worlds are untouched.
echo   Open Minecraft from the Start menu: the hub asks
echo   the kid to choose a 4-digit code the first time.
echo  ===============================================
if /i "%~1"=="nopause" exit /b 0
pause
exit /b 0

:fail
echo.
echo  ---- Stopped. Take a photo of this window. ----
if /i "%~1"=="nopause" exit /b 1
pause
exit /b 1
