import pandas as pd
import torch
from sklearn.feature_extraction.text import CountVectorizer

def load_and_preprocess_data(csv_path, max_seq_length=20):
    """
    Loads data from CSV, tokenizes text using CountVectorizer, and pads/truncates to max_seq_length.
    Returns:
        X: Tensor of token indices with shape [num_samples, max_seq_length]
        y: Tensor of labels with shape [num_samples]
        vocab_size: size of vocabulary
        vocab: dictionary mapping token to index
    """
    df = pd.read_csv(csv_path)
    texts = df['text'].tolist()
    labels = df['label'].tolist()

    # Build vocabulary using CountVectorizer
    vectorizer = CountVectorizer(max_features=10000, token_pattern=r'\b\w+\b')
    vectorizer.fit(texts)
    vocab = vectorizer.vocabulary_
    vocab_size = len(vocab) + 1  # +1 for unknown tokens

    # Convert texts to sequences of token ids
    sequences = []
    for text in texts:
        tokens = text.lower().split()  # simple tokenization
        seq = [vocab.get(token, 0) for token in tokens]
        # Pad or truncate sequence to max_seq_length
        if len(seq) < max_seq_length:
            seq = seq + [0] * (max_seq_length - len(seq))
        else:
            seq = seq[:max_seq_length]
        sequences.append(seq)

    X = torch.tensor(sequences, dtype=torch.long)
    y = torch.tensor(labels, dtype=torch.long)
    return X, y, vocab_size, vocab

def generate_dummy_data(num_samples=1000, seq_length=20, vocab_size=10000):
    """
    Generates dummy input data and labels.
    """
    X = torch.randint(0, vocab_size, (num_samples, seq_length))
    y = torch.randint(0, 2, (num_samples,))
    return X, y

def evaluate_model(model, dataloader, criterion):
    """
    Evaluate the model on a validation dataset.
    Returns the average loss and accuracy.
    """
    model.eval()
    total_loss = 0.0
    correct = 0
    total = 0
    with torch.no_grad():
        for inputs, labels in dataloader:
            outputs = model(inputs)
            loss = criterion(outputs, labels)
            total_loss += loss.item()
            _, predicted = torch.max(outputs.data, 1)
            total += labels.size(0)
            correct += (predicted == labels).sum().item()
    accuracy = correct / total
    avg_loss = total_loss / len(dataloader)
    return avg_loss, accuracy
