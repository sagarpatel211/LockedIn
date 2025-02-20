import os
import json
import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.tensorboard import SummaryWriter
from model import NLPClassifier
import mlflow_tracking as mlt
from utils import load_and_preprocess_data

def train_model():
    # Check for the dataset; instruct to run fetch_data.py if missing.
    data_path = os.path.join(os.path.dirname(__file__), '..', 'data', 'dataset.csv')
    if not os.path.exists(data_path):
        raise FileNotFoundError(f"Dataset not found at {data_path}. Run fetch_data.py first.")
    
    # Start an MLflow run
    mlt.start_run()

    # Initialize TensorBoard writer
    writer = SummaryWriter(log_dir='./logs')

    # Hyperparameters
    embed_dim = 128
    num_classes = 2
    learning_rate = 0.001
    epochs = 5
    batch_size = 2
    max_seq_length = 20

    # Load and preprocess data from CSV
    X, y, vocab_size, vocab = load_and_preprocess_data(data_path, max_seq_length=max_seq_length)
    dataset = torch.utils.data.TensorDataset(X, y)
    dataloader = torch.utils.data.DataLoader(dataset, batch_size=batch_size, shuffle=True)

    # Save the vocabulary to a JSON file so that the extension can use it
    vocab_path = os.path.join(os.path.dirname(__file__), '..', 'data', 'vocab.json')
    with open(vocab_path, 'w') as f:
        json.dump(vocab, f)
    print(f"Vocabulary exported to {vocab_path}")

    # Initialize model with the determined vocab_size
    model = NLPClassifier(vocab_size, embed_dim, num_classes)
    criterion = nn.CrossEntropyLoss()
    optimizer = optim.Adam(model.parameters(), lr=learning_rate)

    global_step = 0
    for epoch in range(epochs):
        running_loss = 0.0
        for i, (inputs, labels) in enumerate(dataloader):
            optimizer.zero_grad()
            outputs = model(inputs)
            loss = criterion(outputs, labels)
            loss.backward()
            optimizer.step()

            running_loss += loss.item()
            global_step += 1

            if i % 1 == 0:
                avg_loss = running_loss / (i + 1)
                print(f"Epoch {epoch+1}, Batch {i+1}, Loss: {avg_loss:.4f}")
                writer.add_scalar('training_loss', avg_loss, global_step)
                mlt.log_metric("loss", avg_loss)

    # Save model checkpoint for testing/evaluation
    checkpoint_path = os.path.join(os.path.dirname(__file__), '..', 'model.pth')
    torch.save(model.state_dict(), checkpoint_path)
    print(f"Model checkpoint saved to {checkpoint_path}")

    # Export the trained model to ONNX for deployment
    model_path = os.path.join(os.path.dirname(__file__), '..', 'model.onnx')
    dummy_input = torch.randint(0, vocab_size, (1, max_seq_length))
    torch.onnx.export(model, dummy_input, model_path, input_names=['input'], output_names=['output'])
    print(f"Model exported to ONNX at {model_path}")

    writer.close()
    mlt.end_run()

if __name__ == "__main__":
    train_model()
