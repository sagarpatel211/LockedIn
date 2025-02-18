importScripts("content-scripts/context_menu.js");

chrome.runtime.onInstalled.addListener(() => {
  console.log("LockedIn Extension Installed & Running...");
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("LockedIn Debug Log:", message.data);
});
