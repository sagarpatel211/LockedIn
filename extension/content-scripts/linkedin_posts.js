// // File: extension/model_inference.js
// import * as ort from 'onnxruntime-web';

// /**
//  * Load the ONNX model from the extension's bundled assets.
//  */
// async function loadModel() {
//   // Use chrome.runtime.getURL to correctly resolve file paths in an extension.
//   const modelUrl = chrome.runtime.getURL('model/model.onnx');
//   const session = await ort.InferenceSession.create(modelUrl);
//   return session;
// }

// /**
//  * Load the vocabulary mapping from a JSON file.
//  */
// async function loadVocab() {
//   const vocabUrl = chrome.runtime.getURL('model/vocab.json');
//   const response = await fetch(vocabUrl);
//   const vocab = await response.json();
//   return vocab;
// }

// /**
//  * Preprocess text:
//  * - Lowercases and splits the text into tokens.
//  * - Maps tokens to indices using the vocabulary.
//  * - Pads or truncates the sequence to the maxSeqLength.
//  */
// function preprocessText(text, vocab, maxSeqLength = 20) {
//   const tokens = text.toLowerCase().split(/\s+/);
//   let indices = tokens.map(token => vocab[token] || 0);
//   if (indices.length < maxSeqLength) {
//     indices = indices.concat(new Array(maxSeqLength - indices.length).fill(0));
//   } else {
//     indices = indices.slice(0, maxSeqLength);
//   }
//   // Create a tensor of shape [1, maxSeqLength]. Note: onnxruntime-web may expect a typed array.
//   return new ort.Tensor('int64', Int32Array.from(indices), [1, maxSeqLength]);
// }

// /**
//  * Run inference on the given text and return the prediction.
//  */
// export async function classifyText(text) {
//   const [session, vocab] = await Promise.all([loadModel(), loadVocab()]);
//   const inputTensor = preprocessText(text, vocab);
//   const feeds = { 'input': inputTensor };
//   const results = await session.run(feeds);
  
//   // Assume binary classification where output tensor contains logits or probabilities.
//   // Here, a simple threshold or argmax is used.
//   const outputData = results['output'].data;
//   // For example, if the model outputs raw scores, pick the index with the maximum value.
//   const prediction = outputData[0] > 0.5 ? 1 : 0; 
//   return prediction;
// }

// // Example usage: process a post on LinkedIn
// classifyText("Had a fantastic experience working on a challenging project.")
//   .then(prediction => {
//     console.log("Prediction:", prediction);
//     if (prediction === 1) {
//       console.log("Blocking post as brag post.");
//       // Insert code here to hide the post in the extension.
//     } else {
//       console.log("Allowing post.");
//     }
//   })
//   .catch(err => {
//     console.error("Error during inference:", err);
//   });
