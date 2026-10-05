@echo off
setlocal
title MAKE - make the USB stick - DO NOT CLOSE
rem Run this FROM the USB stick, on the computer where install.bat already worked.
set "SRC=C:\MAKE"
set "DST=%~dp0MAKE"
set "T0=%TIME%"
echo.
echo  ===============================================
echo   MAKE - copy C:\MAKE to this USB stick
echo  ===============================================
echo.
if not exist "%SRC%\play.bat" (echo  ERROR: C:\MAKE not found. Run install.bat first. & goto :fail)
if not exist "%~dp0install-from-usb.bat" echo  NOTE: put install-from-usb.bat on the stick too, next to this file.

echo  Stopping the build tool so no file is locked ...
set "JAVA_HOME=%SRC%\jdk"
set "PATH=%SRC%\jdk\bin;%PATH%"
set "GRADLE_USER_HOME=%SRC%\gradle-home"
cd /d "%SRC%\mod"
call gradlew.bat --stop >nul 2>nul
cd /d "%~dp0"

echo  Copying. This takes a while on a slow stick ...
robocopy "%SRC%" "%DST%" /MIR /MT:16 /R:1 /W:1 /NFL /NDL /NP /XD "%SRC%\mod\run" "%SRC%\gradle-home\daemon"
if %ERRORLEVEL% GEQ 8 (echo  ERROR: the copy failed. Is the stick full, or formatted FAT32? Use exFAT or NTFS. & goto :fail)

for /f %%S in ('powershell -NoProfile -Command "[math]::Round((Get-ChildItem -LiteralPath '%DST%' -Recurse -File | Measure-Object Length -Sum).Sum/1GB,1)"') do set "SIZEGB=%%S"
echo.
echo  ===============================================
echo   DONE. %SIZEGB% GB on the stick.
echo   Started %T0%, finished %TIME%
echo   Kids: double-click install-from-usb.bat on the stick.
echo  ===============================================
pause
exit /b 0

:fail
echo.
echo  ---- Stopped. Take a photo of this window. ----
pause
exit /b 1
