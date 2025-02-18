@echo off
echo Setting up Chrome extension and React...

cd /d "%~dp0"

if not exist "react-app\package.json" (
    echo ERROR: react-app\package.json not found.
    exit /b 1
)

cd react-app

where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ERROR: Node.js not installed.
    exit /b 1
)

if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
)

echo.
echo Press any key to build the app...
:: pause

echo Building app...
call npm run build

echo Copying build files...
xcopy "build\static" "..\static" /s /e /y /Q /I /C /H

copy "build\index.html" "..\popup.html"

echo Done! Reload your extension.
