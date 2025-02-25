"use client";

import React, { useState, useEffect } from "react";
import ThemeToggle from "@/components/ui/themetoggle";
import ToggleOption from "@/components/ui/toggleoption";
import KeywordTags from "@/components/ui/keywordtags";
import ResetStatisticsButton from "@/components/ui/resetstats";

interface Tag {
  id: number;
  text: string;
  color: string;
}

interface SettingsData {
  darkMode: boolean;
  hideExperiences: boolean;
  hideBragPosts: boolean;
  hideSidebar: boolean;
  filterKeywords: Tag[];
}

const Settings = () => {
  const [settings, setSettings] = useState<SettingsData>({
    darkMode: false,
    hideExperiences: false,
    hideBragPosts: false,
    hideSidebar: false,
    filterKeywords: [],
  });

  useEffect(() => {
    chrome.storage.sync.get(["settings"], (data) => {
      if (data.settings) {
        setSettings({
          ...data.settings,
          filterKeywords: data.settings.filterKeywords ?? [],
        });
      }
    });
  }, []);

  const updateSetting = (key: keyof SettingsData, value: boolean | Tag[]) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    chrome.storage.sync.set({ settings: newSettings });
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold">Settings</h2>
      <p>Here you can customize the extension!</p>
      <div className="space-y-4 mt-5">
        <ThemeToggle />
        <ToggleOption
          id="hide-experiences"
          label="Hide Profile Experiences"
          checked={settings.hideExperiences}
          onChange={(checked) => updateSetting("hideExperiences", checked)}
        />
        <ToggleOption
          id="hide-brag-posts"
          label="Hide Brag Posts"
          checked={settings.hideBragPosts}
          onChange={(checked) => updateSetting("hideBragPosts", checked)}
        />
        <ToggleOption
          id="hide-sidebar"
          label="Hide Sidebar"
          checked={settings.hideSidebar}
          onChange={(checked) => updateSetting("hideSidebar", checked)}
        />
        <KeywordTags
          keywords={settings.filterKeywords}
          onUpdate={(keywords) => updateSetting("filterKeywords", keywords)}
        />
        <ResetStatisticsButton />
      </div>
    </div>
  );
};

export default Settings;
