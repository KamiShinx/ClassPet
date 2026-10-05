@echo off
rem Opens the kids' launcher window (the same as the "Minecraft" desktop icon).
start "" powershell -NoProfile -STA -WindowStyle Hidden -Command "& ([ScriptBlock]::Create([IO.File]::ReadAllText('%~dp0mod\tools\launcher.ps1', [Text.Encoding]::UTF8))) '%~dp0'"
