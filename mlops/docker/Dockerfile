FROM python:3.9-slim

# Set a directory for the app
WORKDIR /app

# Copy everything
COPY . /app

# Install dependencies
RUN pip install --no-cache-dir -r ml-model/requirements.txt
RUN pip install mlflow apache-airflow kubernetes kfp

# Expose MLflow port
EXPOSE 5000

CMD ["python", "mlops/mlflow_tracking.py"]
