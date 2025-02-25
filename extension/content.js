import { removeBragPosts } from "./content/removebragposts.js";
import { removeProfileExperiences } from "./content/removeprofileexperiences.js";
import { removeSidebar } from "./content/removesidebar.js";

chrome.storage.sync.get(["settings"], (data) => {
  const settings = data.settings || {};

  removeBragPosts(settings);
  removeProfileExperiences(settings);
  removeSidebar(settings);

  const observer = new MutationObserver(() => {
    removeBragPosts(settings);
    removeProfileExperiences(settings);
    removeSidebar(settings);
  });

  observer.observe(document.body, { childList: true, subtree: true });
});
