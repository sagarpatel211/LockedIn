# LinkedIn Sanity Chrome Extension - Architecture

[Chrome Extension] <--> [Local NLP Model] <--> [MLOps Pipeline]

    (User Browses LinkedIn)
        ↓
    Chrome Extension (content.js)
        ↓
    NLP Model (ONNX in the browser)
        ↓
    Filters brag posts, hides work history
        ↓
    Logs predictions to MLflow for tracking
        ↓
    MLOps (Airflow/Kubeflow) automates training & updates

## Overview
This project is a Chrome extension that enhances the LinkedIn user experience by:
- **Hiding brag posts** using a local NLP model (ONNX/TensorFlow.js).
- **Removing work history** from profiles to reduce comparison.
- **Employing an MLOps pipeline** for model training, tracking, and deployment.

## System Design
### Components
1. **Chrome Extension**
   - **Content Script (`content.js`)** – Modifies the LinkedIn DOM to filter brag posts and hide work history.
   - **Background Script (`background.js`)** – Handles event-driven operations.
   - **Popup UI (`popup.html`, `popup.js`)** – Optional user interface for settings.

2. **Local NLP Model**
   - **Model Inference (`inference.js`)** – Runs the ONNX NLP model directly in the browser.
   - **Pretrained Model (`model.onnx`)** – A text classification model that detects bragging language.
   - **Tokenizer (`tokenizer.json`)** – Preprocesses LinkedIn posts for the model.

3. **MLOps Pipeline**
   - **Model Training (`train_model.ipynb`)** – Jupyter Notebook for training and exporting the model.
   - **MLflow (`mlflow_tracking.py`)** – Tracks model performance, metrics, and versioning.
   - **Airflow (`airflow_dag.py`)** – Automates the model training workflow.
   - **Kubeflow (`kubeflow_pipeline.py`)** – Deploys the trained model to an inference service.

## Data Flow
1. **User Browses LinkedIn** → Content script scrapes post text.
2. **NLP Model Runs Locally** → Classifies posts as bragging/non-bragging.
3. **DOM Manipulation** → Hides filtered posts and work history sections.
4. **Logging & MLOps Integration** → Predictions are logged in MLflow.
5. **Automated Retraining** → Airflow schedules retraining if model performance drops.
6. **Deployment with Kubeflow** → Updates the in-browser ONNX model.

## Technologies Used
- **Frontend:** Chrome Extension API, JavaScript, CSS
- **Machine Learning:** ONNX, TensorFlow.js, Hugging Face Transformers
- **MLOps:** MLflow (tracking), Airflow (automation), Kubeflow (deployment)
- **Deployment:** Docker, Kubernetes
- **Testing:** Jest (Chrome extension), PyTest (ML model)

## Scaling & Future Enhancements
- **User Customization:** Allow toggling different filter settings.
- **Improved NLP Model:** Fine-tune using LinkedIn-specific datasets.
- **Cloud-based MLOps:** Optional model hosting for non-local execution.
- **CI/CD Integration:** GitHub Actions for automated testing and deployment.

## Conclusion
This project integrates **browser-based ML inference with an end-to-end MLOps pipeline** for a robust, scalable solution to improve LinkedIn's user experience.

