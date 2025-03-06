#!/bin/bash
set -e

echo "Starting setup process..."

# Check if DVC is installed.
if ! command -v dvc &> /dev/null; then
    echo "DVC is not installed. Please install DVC by running 'pip install dvc' and try again."
    exit 1
fi

# Check if the current directory is a DVC repository.
if [ ! -d ".dvc" ]; then
    echo "No DVC repository detected. Initializing DVC repository..."
    dvc init --subdir
fi

# 1. Install Python dependencies for the NLP model.
echo "Installing Python dependencies..."
pip install -r nlp-model/requirements.txt

# 2. Run the DVC pipeline (fetch, train, evaluate).
echo "Running DVC pipeline..."
dvc repro

# 3. Verify that the ONNX model was created.
if [ ! -f nlp-model/model.onnx ]; then
    echo "Error: Model file not found. Training may have failed."
    exit 1
fi

# 4. Copy the ONNX model to the extension libraries directory.
echo "Copying model to extension directory..."
cp nlp-model/model.onnx extension/libs/model.onnx

# 5. Run the extension's own setup script.
echo "Running extension setup script..."
cd extension
chmod +x setup.sh
./setup.sh

echo "Setup completed successfully."
