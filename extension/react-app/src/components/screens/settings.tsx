"use client";

import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sun, Moon } from "lucide-react";

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [hideExperiences, setHideExperiences] = useState(false);
  const [hideBragPosts, setHideBragPosts] = useState(false);
  const [hideSidebar, setHideSidebar] = useState(false);
  const [filterKeywords, setFilterKeywords] = useState("");

  const handleResetStatistics = () => {
    // Implement reset statistics logic here
    console.log("Statistics reset");
  };

  return (
    <div className="h-full overflow-y-auto px-4 py-6 space-y-6">
      <h1 className="text-3xl font-bold mb-6">
        <span className="bg-gradient-to-r from-blue-500 to-[#E114E5] bg-clip-text text-transparent">
          Settings
        </span>
      </h1>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="dark-mode" className="flex items-center space-x-2">
            <span>{darkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}</span>
            <span>Dark Mode</span>
          </Label>
          <Switch id="dark-mode" checked={darkMode} onCheckedChange={setDarkMode} />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="hide-experiences">Hide Profile Experiences</Label>
          <Switch
            id="hide-experiences"
            checked={hideExperiences}
            onCheckedChange={setHideExperiences}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="hide-brag-posts">Hide Brag Posts</Label>
          <Switch id="hide-brag-posts" checked={hideBragPosts} onCheckedChange={setHideBragPosts} />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="hide-sidebar">Hide Sidebar</Label>
          <Switch id="hide-sidebar" checked={hideSidebar} onCheckedChange={setHideSidebar} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="filter-keywords">Custom Filter Keywords</Label>
          <Input
            id="filter-keywords"
            placeholder="Enter keywords separated by commas"
            value={filterKeywords}
            onChange={(e) => setFilterKeywords(e.target.value)}
          />
        </div>

        <Button variant="destructive" className="w-full" onClick={handleResetStatistics}>
          Reset Statistics
        </Button>
      </div>
    </div>
  );
};

export default Settings;
