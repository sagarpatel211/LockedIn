export function updateStats(type) {
    chrome.storage.local.get(["stats"], (data) => {
      let stats = data.stats || {
        blockedPosts: 0,
        blockedProfiles: 0,
        dailyStats: {},
      };
  
      if (type === "post") stats.blockedPosts += 1;
      if (type === "profile") stats.blockedProfiles += 1;
  
      const today = new Date().toISOString().split("T")[0];
      if (!stats.dailyStats[today]) {
        stats.dailyStats[today] = { blockedPosts: 0, blockedProfiles: 0 };
      }
      if (type === "post") stats.dailyStats[today].blockedPosts += 1;
      if (type === "profile") stats.dailyStats[today].blockedProfiles += 1;
  
      chrome.storage.local.set({ stats });
    });
  }
  