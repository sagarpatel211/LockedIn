@echo off
setlocal enabledelayedexpansion

echo Starting setup process...

REM Check if DVC is installed.
dvc --version >nul 2>&1
if errorlevel 1 (
    echo DVC is not installed. Please install DVC by running "pip install dvc" and try again.
    exit /b 1
)

REM Check if the current directory is a DVC repository.
if not exist ".dvc" (
    echo No DVC repository detected. Initializing DVC repository...
    dvc init
)

REM 1. Install Python dependencies for the NLP model.
echo Installing Python dependencies...
pip install -r nlp-model\requirements.txt

REM 2. Run the DVC pipeline (fetch, train, evaluate).
echo Running DVC pipeline...
dvc repro
if errorlevel 1 (
    echo DVC pipeline failed.
    exit /b 1
)

REM 3. Check if the ONNX model exists.
if not exist nlp-model\model.onnx (
    echo Error: Model file not found. Training may have failed.
    exit /b 1
)

REM 4. Copy the ONNX model to the extension libraries directory.
echo Copying model to extension directory...
xcopy /Y nlp-model\model.onnx extension\libs\model.onnx

REM 5. Launch MLflow UI asynchronously (runs on port 5000).
echo Launching MLflow UI on http://localhost:5000 ...
start "" mlflow ui --port 5000

REM 6. Launch Airflow services asynchronously.
echo Initializing Airflow DB...
airflow db init

echo Launching Airflow webserver on http://localhost:8080 ...
start "" airflow webserver --port 8080

echo Launching Airflow scheduler...
start "" airflow scheduler

REM 7. Run the extension's own setup script.
echo Running extension setup script...
cd extension
call setup.bat
cd ..

echo Setup completed successfully.
echo Press any key to exit.
pause
