// contextMenu.js

// Create a context menu when the extension is installed
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: "myRightClick",
      title: "Perform LockedIn Action",
      contexts: ["page", "selection", "link"],
      documentUrlPatterns: ["*://*.linkedin.com/*"]
    });
  });
  
  // Listen for clicks on the context menu item
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "myRightClick") {
      console.log("LockedIn context menu clicked:", info, tab);
      // Example: Execute a script in the current tab to show an alert
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: () => { alert("LockedIn action executed!"); }
      });
    }
  });
  