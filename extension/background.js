chrome.runtime.onInstalled.addListener(() => {
  console.log("LinkedIn Sanity Filter installed!");
});

// Ensure the service worker stays alive
chrome.alarms.create("keepAlive", { periodInMinutes: 5 });

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "keepAlive") {
      console.log("Service worker still running...");
  }
});

// Auto-reload extension when navigating LinkedIn
chrome.webNavigation?.onCompleted?.addListener(details => {
  if (details.url.includes("linkedin.com")) {
      console.log("Navigated to LinkedIn. Reloading...");
      chrome.runtime.reload();
  }
});
