@echo off
echo Setting up Chrome extension and React...

:: Change to the directory containing this script
cd /d "%~dp0" || (echo ERROR: Failed to navigate to script directory & exit /b 1)

if not exist "react-app\package.json" (
    echo ERROR: react-app\package.json not found.
    exit /b 1
)

cd react-app || exit /b 1

:: Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ERROR: Node.js not installed.
    exit /b 1
)

if not exist "node_modules" (
    echo Installing dependencies...
    call npm install --legacy-peer-deps || (echo ERROR: npm install failed & exit /b 1)
)

echo.
pause
echo Building app...
call npm run build || (echo ERROR: Build failed & exit /b 1)

if not exist "build" (
    echo ERROR: Build directory not found.
    exit /b 1
)

echo Copying build files...
if exist "..\static" rd /s /q "..\static"
xcopy "build\static" "..\static" /s /e /y /Q /I /C /H
if errorlevel 1 (
    echo ERROR: Failed to copy static files.
    exit /b 1
)

copy "build\index.html" "..\popup.html" || (echo ERROR: Failed to copy index.html & exit /b 1)

echo Done! Reload your extension.
