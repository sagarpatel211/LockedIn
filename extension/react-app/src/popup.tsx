import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
// import * as Sentry from "@sentry/react";
import Donate from "@/components/screens/donate";
import Home from "@/components/screens/home";
import Settings from "@/components/screens/settings";
import Stats from "@/components/screens/stats";
import { ThemeProvider } from "next-themes";

// Sentry.init({
//   dsn: "YOUR_SENTRY_DSN_HERE",
//   integrations: [new Sentry.BrowserTracing()],
//   tracesSampleRate: 1.0,
// });

interface TabContentProps {
  tab: number;
}

interface TabButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const tabs = ["Home", "Stats", "Settings", "Donate"];

const TabButton = ({ label, isActive, onClick }: TabButtonProps) => (
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

const TabContent = ({ tab }: TabContentProps) => {
  return (
    <motion.div
      className="p-4 grid gap-4 grid-cols-2 transition-all"
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

const Popup = () => {
  const [tab, setTab] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Sentry.captureMessage("Popup mounted");
  }, []);

  if (!mounted) return null;

  return (
    <div className="p-6 rounded-lg bg-background shadow-lg relative w-[500px] h-[500px]">
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
      <TabContent tab={tab} />
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider attribute="class">
      {/* <Sentry.ErrorBoundary fallback={<p>Something went wrong.</p>}> */}
      <Popup />
      {/* </Sentry.ErrorBoundary> */}
    </ThemeProvider>
  );
};

export default App;
