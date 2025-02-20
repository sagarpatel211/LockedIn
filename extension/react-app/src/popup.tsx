import { motion } from "framer-motion";
import { ThemeProvider, useTheme } from "next-themes";
import React, { useState, useEffect } from "react";
import Donate from "@/components/screens/donate";
import Home from "@/components/screens/home";
import Settings from "@/components/screens/settings";
import Stats from "@/components/screens/stats";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

const tabs = ["Home", "Stats", "Settings", "Donate"];

const TabButton = ({ label, isActive, onClick }) => (
  <button
    className={`relative flex-1 p-3 text-center transition-colors rounded-lg ${
      isActive ? "bg-primary text-white" : "text-gray-500"
    }`}
    onClick={onClick}
  >
    {label}
    {isActive && (
      <motion.div
        className="absolute inset-0 bg-primary opacity-20 rounded-lg"
        layoutId="highlight"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.2 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
    )}
  </button>
);

const TabContent = ({ tab }) => {
  return (
    <motion.div
      className="p-4 grid gap-4 grid-cols-2"
      key={tab}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {tab === 0 && <Home />}
      {tab === 1 && <Stats />}
      {tab === 2 && <Settings />}
      {tab === 3 && <Donate />}
    </motion.div>
  );
};

const BentoBoard = () => (
  <div className="grid grid-cols-2 gap-4 p-4">
    <Card>
      <CardContent className="p-4">📊 Quick Stats</CardContent>
    </Card>
    <Card>
      <CardContent className="p-4">⚙️ Settings Overview</CardContent>
    </Card>
    <Card>
      <CardContent className="p-4">💡 Tips & Insights</CardContent>
    </Card>
    <Card>
      <CardContent className="p-4">❤️ Donate & Support</CardContent>
    </Card>
  </div>
);

const Popup = () => {
  const [tab, setTab] = useState(0);
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="p-6 rounded-lg bg-background shadow-lg">
      <div className="flex border-b border-gray-300 mb-4 gap-2">
        {tabs.map((label, index) => (
          <TabButton
            key={index}
            label={label}
            isActive={tab === index}
            onClick={() => setTab(index)}
          />
        ))}
      </div>
      {tab === 2 && (
        <div className="flex justify-between items-center p-4 border rounded-lg bg-muted">
          <span>Dark Mode</span>
          <Switch
            checked={theme === "dark"}
            onCheckedChange={() => setTheme(theme === "dark" ? "light" : "dark")}
          />
        </div>
      )}
      <BentoBoard />
      <TabContent tab={tab} />
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider attribute="class">
      <Popup />
    </ThemeProvider>
  );
};

export default App;
