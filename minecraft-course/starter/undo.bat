@echo off
title Minecraft - Undo
powershell -NoProfile -Command "& ([ScriptBlock]::Create([IO.File]::ReadAllText('%~dp0mod\tools\undo.ps1', [Text.Encoding]::UTF8))) '%~dp0'"
pause
