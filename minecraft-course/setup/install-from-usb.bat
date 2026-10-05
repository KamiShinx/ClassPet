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
robocopy "%SRC%" "%ROOT%" /E /MT:16 /R:1 /W:1 /NFL /NDL /NP
if %ERRORLEVEL% GEQ 8 (echo  ERROR: the copy failed. Is there enough free space on C:? & goto :fail)
echo  [1/3] Copy OK
echo.

echo  [2/3] Desktop buttons ...
powershell -NoProfile -Command "$d=[Environment]::GetFolderPath('Desktop'); $s=New-Object -ComObject WScript.Shell; $l=$s.CreateShortcut(\"$d\Minecraft - Play.lnk\"); $l.TargetPath='%ROOT%\play.bat'; $l.WorkingDirectory='%ROOT%'; $l.Save(); $l=$s.CreateShortcut(\"$d\Minecraft - Code.lnk\"); $l.TargetPath='%ROOT%\code.bat'; $l.WorkingDirectory='%ROOT%'; $l.Save()"
if exist "%ROOT%\hub\index.html" powershell -NoProfile -Command "$d=[Environment]::GetFolderPath('Desktop'); $s=New-Object -ComObject WScript.Shell; $l=$s.CreateShortcut(\"$d\Minecraft - Hub.lnk\"); $l.TargetPath='%ROOT%\hub\index.html'; $l.Save()"
echo  [2/3] "Minecraft - Play" and "Minecraft - Code" are on the desktop
echo.

echo  Copy finished at %TIME%. You can take the stick out now.
echo.
echo  [3/3] Starting Minecraft to check it works. No internet needed.
echo.
call "%ROOT%\play.bat"
echo.
echo  ===============================================
echo   DONE. Started %T0%, finished %TIME%
echo   Next time: double-click "Minecraft - Play"
echo  ===============================================
pause
exit /b 0

:fail
echo.
echo  ---- Install stopped. Take a photo of this window. ----
pause
exit /b 1
