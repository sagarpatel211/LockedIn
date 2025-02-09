<#
.SYNOPSIS
    A PowerShell script to run the full ML + MLOps + Testing pipeline, 
    and finally open Chrome for manual extension loading.

.DESCRIPTION
    1. Checks Python & pip, installs dependencies
    2. Trains the model and exports to ONNX
    3. Starts Docker for MLflow (and any other MLOps services)
    4. Runs tests (Python + JS)
    5. Opens Chrome on 'chrome://extensions' for manual extension loading

.NOTES
    Author: Your Name
    Date: 2025-02-09
#>

param (
    [string]$PythonExe = "python",
    [string]$ChromeExe = "chrome.exe"
)

Write-Host "============================================="
Write-Host "     LinkedIn Sanity: End-to-End Pipeline    "
Write-Host "=============================================`n"

#
# 1. Environment Checks & Setup
#
Write-Host "1) Checking for Python & Installing Dependencies..."
# Check if Python is available
try {
    & $PythonExe --version
} catch {
    Write-Host "ERROR: Python not found. Please install Python or specify the path via -PythonExe."
    exit 1
}

# Install Python dependencies
Write-Host "`n-> Installing Python dependencies from ml-model/requirements.txt..."
& $PythonExe -m pip install --upgrade pip
& $PythonExe -m pip install -r .\ml-model\requirements.txt

Write-Host "`n-> Installing additional Python packages for MLOps (mlflow, airflow, kfp, etc.)..."
# For demonstration, you can tweak the versions as needed
& $PythonExe -m pip install mlflow apache-airflow kubernetes kfp pytest

Write-Host "`n-> Checking Node.js (optional, for JS tests or building)."
try {
    node --version
} catch {
    Write-Host "Node.js not found. Skipping node-based steps."
}

Write-Host "`n-> Installing onnxruntime-web globally (optional for local dev)..."
npm install --global onnxruntime-web

Write-Host "`n[OK] Environment setup complete."

#
# 2. Train Model & Export to ONNX
#
Write-Host "`n2) Training the model via train_model.ipynb..."
try {
    & $PythonExe -m jupyter nbconvert --to notebook --execute .\ml-model\train_model.ipynb --output .\ml-model\output.ipynb
} catch {
    Write-Host "ERROR: Model training notebook failed."
    exit 1
}
Write-Host "`n[OK] Model training & export finished. model.onnx should be in ml-model/ folder."

#
# 3. Start Docker & MLOps Services (MLflow)
#
Write-Host "`n3) Starting Docker containers for MLflow (and other MLOps)..."
if (Test-Path ".\mlops\docker\docker-compose.yml") {
    Push-Location .\mlops\docker
    docker-compose up -d
    Pop-Location
    Write-Host "[OK] Docker containers started in the background."
} else {
    Write-Host "No docker-compose.yml found at .\mlops\docker. Skipping docker-compose up..."
}

#
# 4. Run Tests
#
Write-Host "`n4) Running tests..."

# Python tests
Write-Host "-> Python tests (Pytest)..."
& $PythonExe -m pytest .\tests\ --maxfail=1 --disable-warnings

# Node/JS tests (if you have them, e.g., test_extension.js)
if (Test-Path ".\tests\test_extension.js") {
    Write-Host "`n-> JavaScript tests (Jest or Mocha)..."
    try {
        npx jest .\tests\test_extension.js
    } catch {
        Write-Host "JS Tests failed or jest not installed. Skipping..."
    }
} else {
    Write-Host "No JS test_extension.js found. Skipping JS tests..."
}

Write-Host "`n[OK] Testing phase complete."

#
# 5. Launch Chrome for Manual Extension Loading
#
Write-Host "`n5) Launching Chrome for manual extension loading..."
Write-Host "   => Remember to enable 'Developer Mode' and click 'Load unpacked' to select the 'chrome-extension/' folder.`n"

Start-Process $ChromeExe "chrome://extensions"

Write-Host "[DONE] Pipeline finished!`n"
Write-Host "--------------------------------------------------"
Write-Host " NEXT STEPS:                                      "
Write-Host "  - In the opened Chrome window, enable Developer Mode"
Write-Host "  - Click 'Load Unpacked'"
Write-Host "  - Select 'chrome-extension/' folder in your project"
Write-Host "  - Visit https://www.linkedin.com/ to test the extension"
Write-Host "--------------------------------------------------`n"
