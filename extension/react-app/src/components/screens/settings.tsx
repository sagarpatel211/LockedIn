import React from "react";
import { ModeToggle } from "../ui/modetoggle";

function Settings() {
  return (
    <div>
      <h2 className="text-xl font-semibold">Settings</h2>;
      <div className="absolute bottom-4 right-4">
        <ModeToggle />
      </div>
    </div>
  );
}

export default Settings;
