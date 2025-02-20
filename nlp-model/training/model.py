import torch
import torch.nn as nn

class NLPClassifier(nn.Module):
    """
    A lightweight text classifier with an embedding layer and a simple linear classifier.
    """
    def __init__(self, vocab_size=10000, embed_dim=128, num_classes=2):
        super(NLPClassifier, self).__init__()
        self.embedding = nn.Embedding(vocab_size, embed_dim)
        self.fc = nn.Linear(embed_dim, num_classes)
    
    def forward(self, x):
        # x shape: [batch_size, seq_length]
        embeds = self.embedding(x)           # [batch_size, seq_length, embed_dim]
        avg_embeds = embeds.mean(dim=1)       # [batch_size, embed_dim]
        logits = self.fc(avg_embeds)          # [batch_size, num_classes]
        return logits
