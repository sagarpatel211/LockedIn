import os
import torch
import torch.nn as nn
import torch.optim as optim
import pandas as pd
import json
from model import BragClassifier
from sklearn.model_selection import train_test_split

def preprocess_data(df, vocab, max_length=10):
    data = []
    for text in df['text']:
        tokens = [vocab.get(word.lower(), 0) for word in text.split()]
        # Pad or truncate to max_length.
        tokens = tokens[:max_length] + [0] * (max_length - len(tokens))
        data.append(tokens)
    return torch.tensor(data, dtype=torch.long)

def train():
    # Construct paths relative to the nlp-model directory.
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    data_dir = os.path.join(base_dir, 'data')
    processed_data_path = os.path.join(data_dir, 'processed_data.csv')
    vocab_path = os.path.join(data_dir, 'vocab.json')
    
    if not os.path.exists(processed_data_path):
        raise FileNotFoundError("Processed data file not found at: " + processed_data_path)
    
    # Load processed data and vocabulary.
    df = pd.read_csv(processed_data_path)
    with open(vocab_path, 'r') as f:
        vocab = json.load(f)
    
    inputs = preprocess_data(df, vocab)
    labels = torch.tensor(df['label'].values, dtype=torch.long)
    
    # Split dataset: 80% training, 20% evaluation.
    X_train, X_test, y_train, y_test = train_test_split(
        inputs, labels, test_size=0.2, random_state=42
    )
    
    model = BragClassifier(vocab_size=len(vocab) + 1, embed_dim=16, num_classes=2)
    criterion = nn.CrossEntropyLoss()
    optimizer = optim.Adam(model.parameters(), lr=0.001)
    
    num_epochs = 10
    for epoch in range(num_epochs):
        model.train()
        optimizer.zero_grad()
        outputs = model(X_train)
        loss = criterion(outputs, y_train)
        loss.backward()
        optimizer.step()
        print("Epoch {}/{} Loss: {:.4f}".format(epoch + 1, num_epochs, loss.item()))
    
    # Evaluate on the test set.
    model.eval()
    with torch.no_grad():
        outputs_test = model(X_test)
        predictions = outputs_test.argmax(dim=1)
        correct = (predictions == y_test).sum().item()
        accuracy = correct / y_test.size(0)
        print("Test Accuracy: {:.2f}%".format(accuracy * 100))
    
    # Export the model to ONNX using a sample input from the training set.
    dummy_input = X_train[0:1]
    onnx_output_path = os.path.join(base_dir, "model.onnx")
    torch.onnx.export(
        model,
        dummy_input,
        onnx_output_path,
        input_names=['input'],
        output_names=['output']
    )
    print("Model exported to ONNX format at: " + onnx_output_path)

if __name__ == '__main__':
    train()
