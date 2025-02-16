(function() {
  function isBragPost(text) {
    return nlpModel.isBragging(text);
  }
  function hideElement(el) {
    anime({
      targets: el,
      opacity: [1, 0],
      duration: 500,
      easing: 'easeInOutQuad',
      complete: function() {
        el.style.display = 'none';
      }
    });
  }
  
  function filterPosts() {
    const posts = document.querySelectorAll('div.feed-shared-update, div.feed-update');
    posts.forEach(post => {
      if (post.getAttribute('data-filtered') === 'true') return;
      
      const postText = post.innerText || '';
      if (isBragPost(postText)) {
        console.log("Brag post detected and removed:", postText);
        hideElement(post);
        post.setAttribute('data-filtered', 'true');
        chrome.storage.sync.get(['filterCount'], function(result) {
          let count = result.filterCount || 0;
          count++;
          chrome.storage.sync.set({ filterCount: count });
        });
      }
    });
  }
  
  function hideProfileExperiences() {
    const experienceSection = document.querySelector('section.pv-profile-section.experience-section');
    if (experienceSection && experienceSection.getAttribute('data-hidden') !== 'true') {
      console.log("Hiding profile experiences section.");
      hideElement(experienceSection);
      experienceSection.setAttribute('data-hidden', 'true');
    }
  }
  
  window.addEventListener('load', function() {
    filterPosts();
    hideProfileExperiences();
  });
  
  const feedContainer = document.querySelector('div.feed-content') || document.body;
  const observer = new MutationObserver((mutationsList) => {
    mutationsList.forEach(mutation => {
      if (mutation.addedNodes.length) {
        filterPosts();
        hideProfileExperiences();
      }
    });
  });
  
  observer.observe(feedContainer, { childList: true, subtree: true });
})();
