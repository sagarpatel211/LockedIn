importScripts("content-scripts/context_menu.js");

chrome.runtime.onInstalled.addListener(() => {
  console.log("LockedIn Extension Installed & Running...");
});
