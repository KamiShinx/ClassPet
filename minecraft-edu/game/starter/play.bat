@echo off
rem Fallback when the hub won't open: plays a lesson in a visible window, so any error stays on screen.
rem "play.bat" = lesson 1, "play.bat 20" = the space demo.
set "ROOT=%~dp0"
set "ROOT=%ROOT:~0,-1%"
mkdir "%ROOT%\mod\run\islands" 2>nul
set "LESSON=%~1"
if "%LESSON%"=="" set "LESSON=1"
> "%ROOT%\mod\run\islands\lesson.txt" echo %LESSON%
set "JAVA_HOME=%ROOT%\jdk"
set "PATH=%ROOT%\jdk\bin;%PATH%"
set "GRADLE_USER_HOME=%ROOT%\gradle-home"
cd /d "%ROOT%\mod"
call "%ROOT%\mod\gradlew.bat" runClient --offline
pause
