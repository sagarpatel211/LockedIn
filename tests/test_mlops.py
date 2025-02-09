import pytest
import subprocess

def test_mlflow_tracking():
    # Just ensure the script runs without error
    ret = subprocess.run(["python", "mlops/mlflow_tracking.py"], check=False)
    assert ret.returncode == 0, "MLflow tracking script failed"
