"use client";

import React, { useState, useEffect } from "react";

const Home: React.FC = () => {
  const [timeProtected, setTimeProtected] = useState(0);

  useEffect(() => {
    chrome.storage.local.get(["timeProtected"], (data) => {
      if (data.timeProtected) {
        setTimeProtected(data.timeProtected);
      }
    });

    const interval = setInterval(() => {
      setTimeProtected((prev) => {
        const newTime = prev + 1;
        chrome.storage.local.set({ timeProtected: newTime });
        return newTime;
      });
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (minutes: number) => {
    const days = Math.floor(minutes / 1440);
    const hours = Math.floor((minutes % 1440) / 60);
    const mins = minutes % 60;

    return (
      <div className="text-4xl font-semibold">
        {days > 0 && <p className="text-pink-700">{days} days</p>}
        {hours > 0 && <p className="text-purple-600">{hours} hours</p>}
        <p className="text-blue-500">{mins} minutes</p>
      </div>
    );
  };

  return (
    <div className="relative h-full">
      <div>
        <h2 className="text-2xl font-semibold">Home</h2>
        <p>Welcome to your dashboard!</p>

        <div className="mt-4 text-lg font-medium">
          <p>Protected from LinkedIn bragging for:</p>
          {formatTime(timeProtected)}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 text-center text-sm text-gray-500 dark:text-gray-400">
        <a
          href="https://github.com/sagarpatel211/LockedIn/issues"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline text-blue-500 dark:text-blue-400"
        >
          Report Bug
        </a>{" "}
        | Made with ♥ by{" "}
        <a
          href="https://github.com/sagarpatel211"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline text-blue-500 dark:text-blue-400"
        >
          @sagarpatel211
        </a>
      </div>
    </div>
  );
};

export default Home;
