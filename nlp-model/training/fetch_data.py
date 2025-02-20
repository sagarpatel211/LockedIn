import os
import pandas as pd

def fetch_data():
    data_dir = os.path.join(os.path.dirname(__file__), '..', 'data')
    os.makedirs(data_dir, exist_ok=True)
    data_path = os.path.join(data_dir, 'dataset.csv')
    
    if not os.path.exists(data_path):
        print("Dataset not found. Creating a dummy dataset...")
        data = {
            "text": [
                "Had a fantastic experience working on a challenging project.",
                "Bragging about my achievements and the awards I received!",
                "Enjoyed collaborating with amazing colleagues on this project.",
                "Boasting about my success and promotions again."
            ],
            "label": [0, 1, 0, 1]
        }
        df = pd.DataFrame(data)
        df.to_csv(data_path, index=False)
        print(f"Dataset created at {data_path}")
    else:
        print("Dataset already exists at", data_path)

if __name__ == "__main__":
    fetch_data()
