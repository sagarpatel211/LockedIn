import { updateStats } from "./updatestats.js";

export function removeSidebar(settings) {
  if (settings.hideSidebar) {
    document.querySelectorAll(".discover-entity-type-card").forEach((sidebar) => {
      sidebar.remove();
      updateStats("profile");
    });
  }
}
