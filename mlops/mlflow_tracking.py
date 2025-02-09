import mlflow
import mlflow.pytorch
import os

def log_experiment(run_name="linkedin_sanity"):
    mlflow.set_tracking_uri("http://localhost:5000")  # Example local MLflow server
    mlflow.set_experiment("LinkedInSanityExperiment")

    with mlflow.start_run(run_name=run_name):
        # Log hyperparameters
        mlflow.log_param("learning_rate", 1e-4)
        mlflow.log_param("epochs", 1)

        # Simulate some metrics
        mlflow.log_metric("accuracy", 0.95)
        mlflow.log_metric("loss", 0.05)

        # Log model (if needed)
        if os.path.exists("ml-model/model.onnx"):
            mlflow.log_artifact("ml-model/model.onnx", artifact_path="onnx_model")

        print("Experiment logged to MLflow!")

if __name__ == "__main__":
    log_experiment()
