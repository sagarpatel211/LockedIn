document.addEventListener('DOMContentLoaded', function() {
  const toggleFilter = document.getElementById('toggleFilter');
  const toggleExperience = document.getElementById('toggleExperience');
  
  toggleFilter.addEventListener('change', function() {
    chrome.storage.sync.set({ filterEnabled: toggleFilter.checked });
  });
  
  toggleExperience.addEventListener('change', function() {
    chrome.storage.sync.set({ hideExperience: toggleExperience.checked });
  });
  chrome.storage.sync.get(['filterEnabled', 'hideExperience'], function(result) {
    if (result.filterEnabled !== undefined) {
      toggleFilter.checked = result.filterEnabled;
    }
    if (result.hideExperience !== undefined) {
      toggleExperience.checked = result.hideExperience;
    }
  });
});
