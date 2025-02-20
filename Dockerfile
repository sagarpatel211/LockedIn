FROM python:3.8-slim

WORKDIR /app

COPY . .

RUN pip install --no-cache-dir -r nlp-model/requirements.txt
RUN pip install mlflow tensorboard onnx scikit-learn pandas numpy torch

EXPOSE 6006

CMD ["python3", "nlp-model/training/train.py"]
