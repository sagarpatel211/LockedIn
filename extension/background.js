// background.js

// Import the context menu code
importScripts("content-scripts/context_menu.js");

chrome.runtime.onInstalled.addListener(() => {
  console.log("LockedIn Extension Installed & Running...");
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "debug") {
    console.log("LockedIn Debug Log:", message.data);
  }
});
