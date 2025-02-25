"use client";

import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface DailyStats {
  blockedPosts: number;
  blockedProfiles: number;
}

interface StatsData {
  blockedPosts: number;
  blockedProfiles: number;
  dailyStats: Record<string, DailyStats>;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload || payload.length === 0) return null;

  const isDark = document.documentElement.classList.contains("dark");
  const bgColor = isDark ? "rgba(31, 41, 55, 0.8)" : "rgba(255, 255, 255, 0.8)";
  const textColor = isDark ? "#f9fafb" : "#1f2937";

  return (
    <div
      style={{
        backgroundColor: bgColor,
        padding: "8px",
        borderRadius: "6px",
        color: textColor,
      }}
    >
      <p>{label}</p>
      {payload.map((entry: any, index: number) => (
        <p key={index} style={{ color: entry.color }}>
          {entry.name}: {entry.value}
        </p>
      ))}
    </div>
  );
};

const Stats: React.FC = () => {
  const [stats, setStats] = useState<StatsData>({
    blockedPosts: 0,
    blockedProfiles: 0,
    dailyStats: {},
  });

  useEffect(() => {
    chrome.storage.local.get(["stats"], (data) => {
      if (data.stats) {
        setStats(data.stats as StatsData);
      }
    });

    const handleStorageChange = (changes: { [key: string]: chrome.storage.StorageChange }) => {
      if (changes.stats?.newValue) {
        setStats(changes.stats.newValue as StatsData);
      }
    };

    chrome.storage.onChanged.addListener(handleStorageChange);
    return () => chrome.storage.onChanged.removeListener(handleStorageChange);
  }, []);

  const graphData = Object.entries(stats.dailyStats).map(([date, values]) => ({
    day: new Date(date).toLocaleDateString("en-US", { weekday: "short" }),
    blockedPosts: values.blockedPosts,
    blockedProfiles: values.blockedProfiles,
  }));

  const totalBlocked = stats.blockedPosts + stats.blockedProfiles;
  const isDark =
    typeof window !== "undefined" && document.documentElement.classList.contains("dark");

  return (
    <div>
      <h2 className="text-2xl font-semibold">Stats</h2>
      <p className="text-gray-700 dark:text-gray-300">Your blocking activity over time.</p>

      <div className="text-xl font-semibold text-blue-900 dark:text-blue-400">
        Total Blocked: {totalBlocked}
      </div>

      <div className="w-[90vw] h-64 mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={graphData} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
            <XAxis dataKey="day" tick={{ fill: "var(--chart-tick-color, #888)" }} />
            <YAxis tick={{ fill: "var(--chart-tick-color, #888)" }} />
            {totalBlocked > 0 && <Tooltip content={<CustomTooltip />} />}
            <Legend />
            <Bar
              name="Blocked Posts"
              dataKey="blockedPosts"
              stackId="a"
              fill={isDark ? "#93c5fd" : "#1e3a8a"}
              barSize={30}
              radius={[0, 0, 0, 0]}
            />
            <Bar
              name="Blocked Profiles"
              dataKey="blockedProfiles"
              stackId="a"
              fill={isDark ? "#d8b4fe" : "#5b21b6"}
              barSize={30}
              radius={[0, 0, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Stats;
