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
      isActive ? "text-blue-500" : "text-gray-400"
    }`}
    onClick={onClick}
  >
    {icon}
    <span className="text-xs mt-1">{label}</span>
    {isActive && (
      <motion.div
        className="absolute bottom-0 h-1 w-6 bg-blue-500 rounded-full"
        layoutId="underline"
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
    )}
  </button>
);

const Popup = () => {
  const [tab, setTab] = useState(0);

  return (
    <div className="relative w-[400px] h-[600px]">
      {/* Background blur */}
      <div className="absolute inset-x-0 m-auto h-80 max-w-lg bg-gradient-to-tr from-indigo-600 via-teal-950 to-[#9333EA] blur-[118px]"></div>

      {/* Content */}
      <div className="relative bg-slate-950/60 backdrop-blur-xl shadow-lg w-full h-full flex flex-col overflow-hidden border border-slate-800">
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
        <div className="relative z-10 bg-slate-900/60 backdrop-blur-md shadow-lg p-2 flex justify-around">
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
      <div className="bg-slate-900 text-slate-400">
        <Popup />
      </div>
    </ThemeProvider>
  );
}
