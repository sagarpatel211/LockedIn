import pytest
import numpy as np
import onnxruntime as ort

def test_model_load():
    session = ort.InferenceSession("ml-model/model.onnx")
    assert session is not None, "Failed to load ONNX model"

def test_simple_inference():
    session = ort.InferenceSession("ml-model/model.onnx")
    # Example input: [1, sequence_length]
    dummy_input = np.ones((1, 5), dtype=np.float32)
    inputs = {session.get_inputs()[0].name: dummy_input}
    output = session.run(None, inputs)
    assert len(output) > 0, "Expected model to return at least one output"
