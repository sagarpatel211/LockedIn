# LockedIn
Wanna use Linkedin without feeling like sh*t?

Chat for help on how to structure chrome extensions:
https://chatgpt.com/share/67a937ac-f280-8011-9119-8abe919d2f5e
https://chatgpt.com/c/67b1801c-f1a4-8011-b81c-eded95b744a6?model=o1

## TO DO
- add github workflow for chrome extension

## 📌 Overview
LinkedIn Sanity is a **Chrome extension** that enhances the LinkedIn experience by:
✅ **Hiding brag posts** using a local NLP model (ONNX/TensorFlow.js).
✅ **Removing work history** from profiles to reduce comparison.
✅ **Integrating an MLOps pipeline** for model training, tracking, and deployment.

## 🛠 Features
- **In-Browser NLP Model**: Classifies and hides brag posts in real-time.
- **Work Experience Hider**: Automatically removes work history from profiles.
- **MLOps Pipeline**: Uses MLflow, Airflow, and Kubeflow to automate model updates.
- **Lightweight & Fast**: Runs entirely in the browser—no external API calls.

## 📂 Project Structure
```
linkedin-sanity/
│── chrome-extension/       # Chrome Extension Files
│── ml-model/               # NLP Model & Training Scripts
│── mlops/                  # MLOps Tracking & Automation
│── docs/                   # Documentation
│── tests/                  # Unit & Integration Tests
│── scripts/                # Development Scripts
```

## 🚀 Installation
1. **Clone this repo:**
   ```sh
   git clone https://github.com/yourusername/linkedin-sanity.git
   cd linkedin-sanity
   ```
2. **Install dependencies:**
   ```sh
   pip install -r requirements.txt
   ```
3. **Load the Chrome Extension:**
   - Open `chrome://extensions/`
   - Enable `Developer mode`
   - Click `Load unpacked` and select the `chrome-extension/` folder.
4. **Run MLOps Services (Optional):**
   ```sh
   docker-compose up
   ```

## 🏗 Development
- **Auto-reload Extension:** Use `scripts/auto_reload.js`
- **Run NLP Model Locally:**
  ```sh
  python ml-model/inference.js
  ```
- **Test MLOps Pipeline:**
  ```sh
  python mlops/mlflow_tracking.py
  ```

## 📝 Contributing
Feel free to open issues or submit pull requests to enhance the project!

## 📜 License
MIT License © 2024 Your Name

