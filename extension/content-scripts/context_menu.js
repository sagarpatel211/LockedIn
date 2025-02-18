chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: "myRightClick",
      title: "Perform LockedIn Action",
      contexts: ["page", "selection", "link"],
      documentUrlPatterns: ["*://*.linkedin.com/*"]
    });
  });
  
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "myRightClick") {
      console.log("LockedIn context menu clicked:", info, tab);
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: () => { alert("LockedIn action executed!"); }
      });
    }
  });
  