import os
import numpy as np
import onnxruntime as ort

def test_onnx_model():
    # Determine the model path relative to this file.
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    model_path = os.path.join(base_dir, "model.onnx")
    
    if not os.path.exists(model_path):
        raise FileNotFoundError("ONNX model file not found at: " + model_path)
    
    # Create an ONNX Runtime session.
    session = ort.InferenceSession(model_path)
    
    # Create a dummy input tensor with shape (1, 10).
    dummy_input = np.random.randint(0, 20, size=(1, 10)).astype(np.int64)
    
    # Run inference.
    outputs = session.run(None, {"input": dummy_input})
    print("ONNX model test output:", outputs)

if __name__ == '__main__':
    test_onnx_model()
