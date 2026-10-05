@echo off
title Minecraft - DO NOT CLOSE
powershell -NoProfile -Command "& ([ScriptBlock]::Create([IO.File]::ReadAllText('%~dp0mod\tools\paste.ps1', [Text.Encoding]::UTF8))) '%~dp0'"
if errorlevel 1 (pause & exit /b 1)
call "%~dp0play.bat"
