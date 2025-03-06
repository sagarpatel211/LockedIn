import json

def load_vocab(file_path='../data/vocab.json'):
    with open(file_path, 'r') as f:
        vocab = json.load(f)
    return vocab

def save_vocab(vocab, file_path='../data/vocab.json'):
    with open(file_path, 'w') as f:
        json.dump(vocab, f)
