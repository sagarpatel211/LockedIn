console.log("LinkedIn Sanity Filter: Content script loaded.");

// Load ONNX Model (Local)
async function loadModel() {
    const session = await ort.InferenceSession.create(chrome.runtime.getURL("model.onnx"));
    return session;
}

// Predict whether a post is a brag
async function isBragPost(text, session) {
    const inputTensor = new ort.Tensor("float32", new Float32Array([text.length]), [1]);
    const outputs = await session.run({ input: inputTensor });
    return outputs.output.data[0] > 0.5; // Returns true if confidence > 50%
}

// Hide bragging posts in feed
async function hideBragPosts() {
    const session = await loadModel();
    const posts = document.querySelectorAll(".feed-shared-update-v2");

    for (const post of posts) {
        const text = post.innerText.toLowerCase();
        if (await isBragPost(text, session)) {
            post.style.display = "none";
        }
    }
}

// Hide work experience section on profiles
function hideWorkHistory() {
    document.querySelectorAll("section.pvs-profile-section").forEach(section => {
        if (section.innerText.includes("Experience")) {
            section.style.display = "none";
        }
    });
}

// Run on page load and observe changes
setTimeout(() => {
    hideBragPosts();
    hideWorkHistory();
}, 2000);

const observer = new MutationObserver(() => {
    hideBragPosts();
    hideWorkHistory();
});

observer.observe(document.body, { childList: true, subtree: true });
