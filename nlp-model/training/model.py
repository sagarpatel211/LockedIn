import torch
import torch.nn as nn

class BragClassifier(nn.Module):
    def __init__(self, vocab_size, embed_dim, num_classes):
        super(BragClassifier, self).__init__()
        self.embedding = nn.Embedding(vocab_size, embed_dim)
        self.fc = nn.Linear(embed_dim, num_classes)

    def forward(self, x):
        # Average embedding for each sequence.
        embedded = self.embedding(x).mean(dim=1)
        out = self.fc(embedded)
        return out

if __name__ == '__main__':
    model = BragClassifier(vocab_size=20, embed_dim=16, num_classes=2)
    print(model)
