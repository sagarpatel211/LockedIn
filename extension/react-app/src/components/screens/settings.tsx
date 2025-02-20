import { Sun, Moon } from "lucide-react";
import React, { useState, useEffect } from "react";

function Settings() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    chrome.storage.sync.get("darkMode", (data) => {
      if (data.darkMode !== undefined) {
        setDarkMode(data.darkMode);
        document.documentElement.classList.toggle("dark", data.darkMode);
      }
    });
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    chrome.storage.sync.set({ darkMode: newDarkMode });
  };

  return (
    <div className={`p-4 ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
      <h2 className="text-xl font-semibold">Settings</h2>
      <p>Adjust your preferences here.</p>
      <button
        onClick={toggleDarkMode}
        className="mt-4 p-2 rounded-full bg-gray-200 dark:bg-gray-800"
      >
        {darkMode ? (
          <Sun className="w-6 h-6 text-yellow-400" />
        ) : (
          <Moon className="w-6 h-6 text-gray-600" />
        )}
      </button>
    </div>
  );
}

export default Settings;
