import mlflow

def start_run(run_name="NLP_Model_Training"):
    mlflow.start_run(run_name=run_name)
    mlflow.log_param("model", "NLPClassifier")
    # Log additional parameters as needed

def log_metric(metric_name, value):
    mlflow.log_metric(metric_name, value)

def end_run():
    mlflow.end_run()
