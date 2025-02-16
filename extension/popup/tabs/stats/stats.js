document.addEventListener('DOMContentLoaded', function() {
  chrome.storage.sync.get(['filterCount'], function(result) {
    const statsInfo = document.getElementById('statsInfo');
    const filterCount = result.filterCount || 0;
    statsInfo.textContent = `Brag posts filtered: ${filterCount}`;
  });
});
