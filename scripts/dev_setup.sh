#!/usr/bin/env bash

echo "Setting up development environment..."

# 1. Install Python dependencies
pip install -r ml-model/requirements.txt

# 2. Install Node dependencies if needed
npm install --global onnxruntime-web

# 3. Optionally set up Airflow
pip install apache-airflow

# 4. Print success message
echo "Development environment is ready!"
