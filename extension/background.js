chrome.runtime.onInstalled.addListener(() => {
  console.log("LockedIn Extension Installed");

  chrome.storage.sync.get(["settings"], (data) => {
    if (!data.settings) {
      chrome.storage.sync.set({
        settings: {
          darkMode: false,
          hideExperiences: false,
          hideBragPosts: false,
          hideSidebar: false,
          filterKeywords: [],
        },
      });
    }
  });

  chrome.storage.local.get(["stats"], (data) => {
    if (!data.stats) {
      chrome.storage.local.set({
        stats: {
          blockedPosts: 0,
          blockedProfiles: 0,
          dailyStats: {},
        },
      });
    }
  });
});
