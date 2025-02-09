// Inference with ONNX Runtime Web
// Make sure you've included the onnxruntime-web script in your extension or imported from a local path

let session = null;

// Load model session
async function loadModel() {
  if (!session) {
    session = await ort.InferenceSession.create(chrome.runtime.getURL("model.onnx"));
    console.log("ONNX model loaded!");
  }
  return session;
}

// Tokenize text (simple example - replace with something robust)
function tokenize(text) {
  // This is just a stub. Real logic might read from tokenizer.json
  return text.toLowerCase().split(" ");
}

// Convert tokens to numeric IDs
function encodeTokens(tokens) {
  // Example: convert each token to length for demonstration
  const arr = tokens.map(t => t.length);
  return arr;
}

// Inference function
async function predict(text) {
  const session = await loadModel();
  const tokens = tokenize(text);
  const inputIds = encodeTokens(tokens);

  // Convert input to a typed array for ONNX
  const inputTensor = new ort.Tensor("float32", Float32Array.from(inputIds), [1, inputIds.length]);

  const feeds = { input: inputTensor };
  const results = await session.run(feeds);

  // Suppose the output node is named "output"
  const outputData = results.output.data;
  // For demonstration: if output > 0.5 => brag
  const isBrag = outputData[0] > 0.5;
  return isBrag;
}

// Export predict() so other scripts can use it
export { predict };
