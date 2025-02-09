from datetime import datetime, timedelta
from airflow import DAG
from airflow.operators.python_operator import PythonOperator
import subprocess

default_args = {
    'owner': 'airflow',
    'depends_on_past': False,
    'start_date': datetime(2025, 1, 1),
    'retries': 1,
    'retry_delay': timedelta(minutes=1),
}

dag = DAG(
    'linkedin_sanity_pipeline',
    default_args=default_args,
    schedule_interval='@daily',
)

def train_and_log():
    # Run the training notebook and log to MLflow
    subprocess.run(["jupyter", "nbconvert", "--to", "notebook", 
                    "--execute", "ml-model/train_model.ipynb",
                    "--output", "ml-model/output.ipynb"])
    subprocess.run(["python", "mlops/mlflow_tracking.py"])

train_and_log_task = PythonOperator(
    task_id='train_and_log',
    python_callable=train_and_log,
    dag=dag
)
