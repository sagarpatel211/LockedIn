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
          animate={{ x: "-50%" }}
        />
      )}
    </button>
  );
}

function TabContent({ tab }) {
  return (
    <div className="p-4">
      {tab === 0 && <Home />}
      {tab === 1 && <Stats />}
      {tab === 2 && <Settings />}
      {tab === 3 && <Donate />}
    </div>
  );
}

function Popup() {
  const [tab, setTab] = useState(0);

  return (
    <div className="w-[600px] h-[400px] bg-black text-white p-4">
      <div className="flex border-b border-gray-700 relative">
        {tabs.map((label, index) => (
          <TabButton key={index} label={label} isActive={tab === index} onClick={() => setTab(index)} />
        ))}
      </div>
      <TabContent tab={tab} />
    </div>
  );
}

export default Popup;
