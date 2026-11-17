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

rem Never copy an older laptop over a newer stick (17 Nov: an old laptop turned the stick back to last week).
if not exist "%DST%\hub\content.js" goto :newer_ok
powershell -NoProfile -Command "if ((Get-Item '%DST%\hub\content.js').LastWriteTime -gt (Get-Item '%SRC%\hub\content.js').LastWriteTime.AddMinutes(1)) { exit 1 }"
if errorlevel 1 (echo  STOP: the stick is NEWER than this laptop. Nothing was copied.& echo  To update this laptop, run update-from-usb.bat instead.& goto :fail)
:newer_ok

echo  Stopping the build tool so no file is locked ...
set "JAVA_HOME=%SRC%\jdk"
set "PATH=%SRC%\jdk\bin;%PATH%"
set "GRADLE_USER_HOME=%SRC%\gradle-home"
cd /d "%SRC%\mod"
call gradlew.bat --stop >nul 2>nul
cd /d "%~dp0"

echo  Copying. This takes a while on a slow stick ...
robocopy "%SRC%" "%DST%" /MIR /MT:16 /R:1 /W:1 /NFL /NDL /NP /XD "%SRC%\mod\run" "%SRC%\gradle-home\daemon" "%SRC%\saves" "%SRC%\design" "%SRC%\stick-files" /XF teacher.html pin.txt
if %ERRORLEVEL% GEQ 8 (echo  ERROR: the copy failed. Is the stick full, or formatted FAT32? Use exFAT or NTFS. & goto :fail)
rem The teacher page goes in its own folder, outside MAKE, so kid laptops never get it; update-from-usb.bat updates it
rem only on a laptop that already has it (the teacher's).
if not exist "%SRC%\hub\teacher.html" goto :no_teacher
if not exist "%~dp0teacher-page" mkdir "%~dp0teacher-page"
copy /y "%SRC%\hub\teacher.html" "%~dp0teacher-page\teacher.html" >nul
:no_teacher

for /f %%S in ('powershell -NoProfile -Command "[math]::Round((Get-ChildItem -LiteralPath '%DST%' -Recurse -File | Measure-Object Length -Sum).Sum/1GB,1)"') do set "SIZEGB=%%S"
echo.
echo  ===============================================
echo   DONE. %SIZEGB% GB on the stick. The teacher page is in teacher-page, not in MAKE.
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
