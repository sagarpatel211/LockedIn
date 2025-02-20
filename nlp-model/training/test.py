import os
import torch
import torch.nn as nn
from model import NLPClassifier
from utils import load_and_preprocess_data, evaluate_model

def test_model():
    # Path to dataset and checkpoint
    data_path = os.path.join(os.path.dirname(__file__), '..', 'data', 'dataset.csv')
    if not os.path.exists(data_path):
        raise FileNotFoundError("Dataset not found. Run fetch_data.py first.")

    checkpoint_path = os.path.join(os.path.dirname(__file__), '..', 'model.pth')
    if not os.path.exists(checkpoint_path):
        raise FileNotFoundError("Model checkpoint not found. Run train.py first.")
    
    # Load and preprocess data (here we use the same dataset; in production, use a hold-out test set)
    X, y, vocab_size, _ = load_and_preprocess_data(data_path)
    dataset = torch.utils.data.TensorDataset(X, y)
    dataloader = torch.utils.data.DataLoader(dataset, batch_size=2, shuffle=False)

    # Initialize model and load checkpoint
    model = NLPClassifier(vocab_size, embed_dim=128, num_classes=2)
    model.load_state_dict(torch.load(checkpoint_path, map_location=torch.device('cpu')))
    model.eval()

    # Define loss function and evaluate
    criterion = nn.CrossEntropyLoss()
    avg_loss, accuracy = evaluate_model(model, dataloader, criterion)
    print(f"Test Loss: {avg_loss:.4f}, Test Accuracy: {accuracy:.4f}")

if __name__ == "__main__":
    test_model()
