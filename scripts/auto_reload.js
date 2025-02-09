// auto_reload.js
// Node script example using Chrome Debugging Protocol to reload extension automatically

const CDP = require("chrome-remote-interface");

(async function() {
  let client;
  try {
    client = await CDP();
    const { Runtime } = client;
    // Reload extension
    await Runtime.evaluate({ expression: 'chrome.runtime.reload()' });
    console.log("Extension reloaded");
  } catch (err) {
    console.error(err);
  } finally {
    if (client) {
      await client.close();
    }
  }
})();
