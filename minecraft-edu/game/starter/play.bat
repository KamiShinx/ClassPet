@echo off
rem Fallback when the hub won't open: plays lesson 1 in a visible window, so any error stays on screen.
set "ROOT=%~dp0"
set "ROOT=%ROOT:~0,-1%"
mkdir "%ROOT%\mod\run\islands" 2>nul
> "%ROOT%\mod\run\islands\lesson.txt" echo 1
set "JAVA_HOME=%ROOT%\jdk"
set "PATH=%ROOT%\jdk\bin;%PATH%"
set "GRADLE_USER_HOME=%ROOT%\gradle-home"
cd /d "%ROOT%\mod"
call "%ROOT%\mod\gradlew.bat" runClient --offline
pause
