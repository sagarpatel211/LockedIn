"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HomeIcon, ChartBarIcon, CogIcon } from "@heroicons/react/24/outline";
import Home from "@/components/screens/home";
import Settings from "@/components/screens/settings";
import Stats from "@/components/screens/stats";
import type { JSX } from "react/jsx-runtime";
import { ThemeProvider } from "next-themes";

const tabs = [
  { icon: <HomeIcon className="w-6 h-6" />, component: <Home key="home" />, label: "Home" },
  { icon: <ChartBarIcon className="w-6 h-6" />, component: <Stats key="stats" />, label: "Stats" },
  {
    icon: <CogIcon className="w-6 h-6" />,
    component: <Settings key="settings" />,
    label: "Settings",
  },
];

const TabButton = ({
  icon,
  isActive,
  onClick,
  label,
}: {
  icon: JSX.Element;
  isActive: boolean;
  onClick: () => void;
  label: string;
}) => (
  <button
    className={`relative flex-1 p-3 flex flex-col items-center transition-colors ${
      isActive ? "text-gray-900 dark:text-gray-100" : "text-gray-500 dark:text-gray-400"
    }`}
    onClick={onClick}
  >
    {icon}
    <span className="text-xs mt-1">{label}</span>
    {isActive && (
      <motion.div
        className="absolute bottom-0 h-1 w-6 bg-gray-900 dark:bg-gray-100 rounded-full"
        layoutId="underline"
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
    )}
  </button>
);

const Popup = () => {
  const [tab, setTab] = useState(0);

  return (
    <div className="relative w-[400px] h-[500px]">
      <div className="absolute inset-x-0 m-auto h-80 max-w-lg bg-gray-50/30 dark:bg-gray-950/30 blur-[118px]"></div>
      <div className="relative bg-gray-50/20 dark:bg-gray-950/80 backdrop-blur-3xl shadow-lg w-full h-full flex flex-col overflow-hidden border border-gray-200 dark:border-gray-700 rounded-lg">
        <div className="flex-grow p-6 relative z-10 overflow-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              {tabs[tab].component}
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="relative z-10 bg-gray-50/30 dark:bg-gray-950/70 backdrop-blur-md shadow-lg p-2 flex justify-around">
          {tabs.map((item, index) => (
            <TabButton
              key={index}
              icon={item.icon}
              isActive={tab === index}
              onClick={() => setTab(index)}
              label={item.label}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <Popup />
      </div>
    </ThemeProvider>
  );
}
