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

# Upgrade pip
Write-Host "`n-> Upgrading pip..."
& $PythonExe -m pip install --upgrade pip

# Install dependencies from requirements.txt (model training, ONNX, etc.)
Write-Host "`n-> Installing Python dependencies from ml-model/requirements.txt..."
try {
    & $PythonExe -m pip install -r (Join-Path $PSScriptRoot "ml-model\requirements.txt")
} catch {
    Write-Host "WARNING: Some dependencies in requirements.txt may conflict. Trying to continue..."
}

# Install pinned MLOps & test dependencies separately to avoid resolution errors
Write-Host "`n-> Installing pinned Python packages for MLOps & testing..."
try {
    # Adjust versions as needed if they still conflict
    & $PythonExe -m pip install mlflow==2.0.1
    & $PythonExe -m pip install apache-airflow==2.6.3
    & $PythonExe -m pip install kubernetes==24.2.0
    & $PythonExe -m pip install kfp==2.0.0
    & $PythonExe -m pip install pytest
} catch {
    Write-Host "WARNING: MLOps dependencies encountered an error. Try adjusting pinned versions."
}

Write-Host "`n-> Checking Node.js (optional, for JS tests or building)..."
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
    & $PythonExe -m jupyter nbconvert `
        --to notebook `
        --execute (Join-Path $PSScriptRoot "ml-model\train_model.ipynb") `
        --output (Join-Path $PSScriptRoot "ml-model\output.ipynb")
} catch {
    Write-Host "ERROR: Model training notebook failed."
    exit 1
}
Write-Host "`n[OK] Model training & export finished. model.onnx should be in ml-model/ folder."

#
# 3. Start Docker & MLOps Services (MLflow)
#
Write-Host "`n3) Starting Docker containers for MLflow (and other MLOps)..."
if (Test-Path (Join-Path $PSScriptRoot "mlops\docker\docker-compose.yml")) {
    Push-Location (Join-Path $PSScriptRoot "mlops\docker")
    try {
        docker-compose up -d
        Write-Host "[OK] Docker containers started in the background."
    } catch {
        Write-Host "ERROR: Docker may not be running, or docker-compose failed."
    }
    Pop-Location
} else {
    Write-Host "No docker-compose.yml found at .\mlops\docker. Skipping docker-compose up..."
}

#
# 4. Run Tests
#
Write-Host "`n4) Running tests..."

# Python tests
Write-Host "-> Python tests (Pytest)..."
try {
    & $PythonExe -m pytest (Join-Path $PSScriptRoot "tests") --maxfail=1 --disable-warnings
} catch {
    Write-Host "ERROR: Pytest failed or isn't installed properly."
}

# Node/JS tests (if you have them, e.g., test_extension.js)
$jsTestPath = Join-Path $PSScriptRoot "tests\test_extension.js"
if (Test-Path $jsTestPath) {
    Write-Host "`n-> JavaScript tests (Jest or Mocha)..."
    try {
        # If you get "Could not find a config file", create a jest.config.js or run with --config
        npx jest $jsTestPath
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

try {
    Start-Process $ChromeExe "chrome://extensions"
} catch {
    Write-Host "ERROR: Could not launch Chrome. Make sure $ChromeExe is on your PATH or specify -ChromeExe."
}

Write-Host "[DONE] Pipeline finished!`n"
Write-Host "--------------------------------------------------"
Write-Host " NEXT STEPS:                                      "
Write-Host "  - In the opened Chrome window, enable Developer Mode"
Write-Host "  - Click 'Load Unpacked'"
Write-Host "  - Select 'chrome-extension/' folder in your project"
Write-Host "  - Visit https://www.linkedin.com/ to test the extension"
Write-Host "--------------------------------------------------`n"
