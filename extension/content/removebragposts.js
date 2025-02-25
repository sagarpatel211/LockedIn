import { updateStats } from "./updatestats.js";

export function removeBragPosts(settings) {
    document.querySelectorAll(".feed-shared-update").forEach((post) => {
      const postText = post.innerText;
      let shouldHide = false;
  
      if (settings.hideBragPosts) {
        if (
          postText.match(/promotion|new position|humbled|blessed|honored|thrilled/i)
        ) {
          shouldHide = true;
        }
  
        if (settings.filterKeywords && settings.filterKeywords.length > 0) {
          for (const keyword of settings.filterKeywords) {
            if (postText.toLowerCase().includes(keyword.text.toLowerCase())) {
              shouldHide = true;
              break;
            }
          }
        }
  
        if (shouldHide) {
          post.style.display = "none";
          updateStats("post");
        }
      }
    });
  }