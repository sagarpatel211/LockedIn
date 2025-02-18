function init() {
  console.log("LinkedIn Job Experience Hider: Script loaded and running...");

  function hideJobExperience() {
    console.log("LinkedIn Job Experience Hider: Checking for job experiences...");

    const jobExperiences = document.querySelectorAll('div[data-view-name="profile-component-entity"]');
    if (jobExperiences.length === 0) {
      console.log("LinkedIn Job Experience Hider: No job experiences found. Check selector.");
    }

    jobExperiences.forEach((job, index) => {
      console.log(`Checking experience #${index + 1}:`, job.innerText);
      if (job.innerText.includes("Software Engineer Intern") || job.innerText.includes("Ford Motor Company")) {
        console.log(`Hiding experience #${index + 1}:`, job.innerText.slice(0, 50));
        job.style.display = "none";
      }
    });

    console.log("LinkedIn Job Experience Hider: Check completed.");
  }

  setTimeout(hideJobExperience, 2000);

  const observer = new MutationObserver(() => {
    console.log("LinkedIn Job Experience Hider: DOM changed, rechecking job experiences...");
    hideJobExperience();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  console.log("LinkedIn Job Experience Hider: MutationObserver is active.");
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
