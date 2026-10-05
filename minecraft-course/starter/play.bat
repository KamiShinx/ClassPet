@echo off
title Minecraft - DO NOT CLOSE
powershell -NoProfile -Command "& ([ScriptBlock]::Create([IO.File]::ReadAllText('%~dp0mod\tools\play.ps1', [Text.Encoding]::UTF8))) '%~dp0'"
if errorlevel 1 pause
