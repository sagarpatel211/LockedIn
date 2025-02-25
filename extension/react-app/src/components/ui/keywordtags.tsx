"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

const tagColors = [
  "bg-red-400 dark:bg-red-700",
  "bg-green-400 dark:bg-green-700",
  "bg-blue-400 dark:bg-blue-700",
  "bg-yellow-400 dark:bg-yellow-700",
  "bg-purple-400 dark:bg-purple-700",
  "bg-pink-400 dark:bg-pink-700",
  "bg-indigo-400 dark:bg-indigo-700",
  "bg-teal-400 dark:bg-teal-700",
];

const getRandomColorClass = () => {
  return tagColors[Math.floor(Math.random() * tagColors.length)];
};

interface Tag {
  id: number;
  text: string;
  color: string;
}

interface KeywordTagsProps {
  keywords: Tag[];
  onUpdate: (newKeywords: Tag[]) => void;
}

const KeywordTags: React.FC<KeywordTagsProps> = ({ keywords, onUpdate }) => {
  const [input, setInput] = useState("");
  useEffect(() => {
    chrome.storage.sync.get(["filterKeywords"], (data) => {
      if (data.filterKeywords) {
        onUpdate(data.filterKeywords);
      }
    });
  }, []);

  const addKeyword = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim() !== "") {
      const newTag: Tag = {
        id: Date.now(),
        text: input.trim(),
        color: getRandomColorClass(),
      };
      const newKeywords = [...keywords, newTag];
      onUpdate(newKeywords);
      chrome.storage.sync.set({ filterKeywords: newKeywords });
      setInput("");
      e.preventDefault();
    }
  };

  const removeKeyword = (id: number) => {
    const newKeywords = keywords.filter((tag) => tag.id !== id);
    onUpdate(newKeywords);
    chrome.storage.sync.set({ filterKeywords: newKeywords });
  };

  return (
    <div className="space-y-2">
      <div className="mb-2">
        <h2 className="text-xl font-semibold">Custom Filter Keywords</h2>
        <p>Type a keyword and press Enter to create a tag</p>
      </div>
      <div className="flex flex-wrap gap-2 border rounded-md p-2 bg-gray-50 dark:bg-gray-900">
        {keywords.map((tag) => (
          <div
            key={tag.id}
            className={`flex items-center px-2 py-1 rounded-md break-all backdrop-blur-sm ${tag.color} text-gray-800 dark:text-gray-200`}
          >
            <span>{tag.text}</span>
            <button
              type="button"
              onClick={() => removeKeyword(tag.id)}
              className="ml-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
        <input
          type="text"
          className="flex-grow bg-transparent outline-none"
          placeholder="Type and press Enter"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={addKeyword}
        />
      </div>
    </div>
  );
};

export default KeywordTags;
