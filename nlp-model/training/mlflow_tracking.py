import os
import mlflow
import subprocess
import time

def track_experiment(model, metrics, params):
    with mlflow.start_run():
        mlflow.log_params(params)
        mlflow.log_metrics(metrics)
        
        # Log the ONNX model artifact.
        base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        onnx_model_path = os.path.join(base_dir, "model.onnx")
        if os.path.exists(onnx_model_path):
            mlflow.log_artifact(onnx_model_path)
        else:
            print("Warning: ONNX model file not found at: " + onnx_model_path)
        print("Experiment tracked with MLflow.")

    print("Launching MLflow UI on http://localhost:5000 ...")
    subprocess.Popen(["mlflow", "ui", "--port", "5000"],
                     stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    
    log_dir = os.path.join(os.path.dirname(__file__), "logs")
    print("Launching TensorBoard on http://localhost:6006 ...")
    subprocess.Popen(["tensorboard", "--logdir", log_dir, "--port", "6006"],
                     stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    print("MLflow UI and TensorBoard have been launched.")

if __name__ == '__main__':
    model = None
    metrics = {'accuracy': 0.9}  # You could update this with your evaluated metric.
    params = {'epochs': 10, 'lr': 0.001}
    track_experiment(model, metrics, params)
    time.sleep(5)
