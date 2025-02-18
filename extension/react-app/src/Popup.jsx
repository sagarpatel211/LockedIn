import React, { useState } from "react";
import { motion } from "framer-motion";
import Home from "./components/Home";
import Stats from "./components/Stats";
import Settings from "./components/Settings";
import Donate from "./components/Donate";

const tabs = ["Home", "Stats", "Settings", "Donate"];

function TabButton({ label, isActive, onClick }) {
  return (
    <button
      className={`relative flex-1 p-2 text-center transition-colors ${
        isActive ? "text-white" : "text-gray-400"
      }`}
      onClick={onClick}
    >
      {label}
      {isActive && (
        <motion.div
          className="absolute left-1/2 -bottom-1 h-1 w-2 bg-white rounded-full"
          layoutId="underline"
          initial={{ scaleX: 0.8 }}
          animate={{ x: "-50%", scaleX: 1.2 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        />
      )}
      {isActive && (
        <motion.div
          className="absolute inset-0 bg-white opacity-20 rounded-lg"
          layoutId="highlight"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.2 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        />
      )}
    </button>
  );
}

function TabContent({ tab }) {
  return (
    <motion.div
      className="p-4"
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
}

function Popup() {
  const [tab, setTab] = useState(0);

  return (
    <div className="w-[600px] h-[400px] bg-black text-white p-4">
      <div className="flex border-b border-gray-700 relative">
        {tabs.map((label, index) => (
          <TabButton
            key={index}
            label={label}
            isActive={tab === index}
            onClick={() => setTab(index)}
          />
        ))}
      </div>
      <TabContent tab={tab} />
    </div>
  );
}

export default Popup;
