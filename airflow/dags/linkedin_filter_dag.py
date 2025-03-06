from datetime import timedelta
from airflow import DAG
from airflow.operators.python_operator import PythonOperator
from airflow.utils.dates import days_ago
from airflow.plugins.custom_operators import FilterBragPostsOperator

default_args = {
    'owner': 'airflow',
    'retry_delay': timedelta(minutes=5),
    'start_date': days_ago(1),
}

dag = DAG(
    'linkedin_filter',
    default_args=default_args,
    description='A DAG to filter out brag posts using an NLP ONNX model',
    schedule_interval='@daily',
    catchup=False
)

def fetch_linkedin_data(**kwargs):
    # Dummy data representing LinkedIn posts.
    posts = [
        {"id": 1, "content": "I just got promoted, it's amazing!"},
        {"id": 2, "content": "I'm really bragging about my new job."},
        {"id": 3, "content": "Enjoying a quiet day at the park."}
    ]
    kwargs['ti'].xcom_push(key='posts', value=posts)
    print("Fetched posts:", posts)

fetch_task = PythonOperator(
    task_id='fetch_data',
    python_callable=fetch_linkedin_data,
    provide_context=True,
    dag=dag
)

filter_task = FilterBragPostsOperator(
    task_id='filter_posts',
    model_path='../../nlp-model/model.onnx',  # adjust relative path as needed
    dag=dag
)

fetch_task >> filter_task
