from airflow import DAG
from airflow.operators.bash import BashOperator
from airflow.operators.python import PythonOperator
from airflow.utils.dates import days_ago
from datetime import timedelta

default_args = {
    'owner': 'airflow',
    'depends_on_past': False,
    'email_on_failure': False,
    'retries': 1,
    'retry_delay': timedelta(minutes=5),
}

def convert_model_to_onnx():
    print("ONNX model conversion step completed.")

with DAG(
    'linkedin_filter_pipeline',
    default_args=default_args,
    description='Pipeline to train and deploy the NLP model for LinkedIn filtering',
    schedule_interval=timedelta(days=1),
    start_date=days_ago(1),
    catchup=False,
) as dag:

    train_model = BashOperator(
        task_id='train_model',
        bash_command='python3 nlp-model/training/train.py',
    )

    onnx_conversion = PythonOperator(
        task_id='convert_to_onnx',
        python_callable=convert_model_to_onnx,
    )

    train_model >> onnx_conversion
