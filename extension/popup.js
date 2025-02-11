document.getElementById("toggleFilter").addEventListener("click", () => {
  chrome.storage.local.get("filterEnabled", data => {
      chrome.storage.local.set({ "filterEnabled": !data.filterEnabled }, () => {
          alert("Brag filtering " + (!data.filterEnabled ? "enabled" : "disabled"));
      });
  });
});

document.getElementById("toggleWorkHistory").addEventListener("click", () => {
  chrome.storage.local.get("hideWorkHistory", data => {
      chrome.storage.local.set({ "hideWorkHistory": !data.hideWorkHistory }, () => {
          alert("Work history " + (!data.hideWorkHistory ? "hidden" : "visible"));
      });
  });
});

document.getElementById('openPage').addEventListener('click', function() {
  chrome.tabs.create({ url: "webpage.html" });
});
