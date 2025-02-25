import { updateStats } from "./updatestats.js";

export function removeProfileExperiences(settings) {
  if (settings.hideExperiences) {
    document.querySelectorAll(".profile-experience, .experience-section").forEach((experience) => {
      experience.style.display = "none";
      updateStats("profile");
    });
  }
}
