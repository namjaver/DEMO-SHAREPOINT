import React from "react";
import { motion } from "framer-motion";

export default function Tabs({ tabs, activeTab, onChange }) {
  return (
    <div className="flex w-screen max-w-full px-4 sm:px-6">
      <div className="relative flex bg-base-300/40 rounded-full p-0.5 shadow-md gap-0.5 mt-1 mb-2 flex-1">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onChange(tab)}
            className={`relative px-4 py-1.5 text-sm rounded-full font-medium flex-1 duration-300 ${
              activeTab === tab
                ? "text-primary-content"
                : "text-base-content/70 hover:text-primary"
            }`}
          >
            {activeTab === tab && (
              <motion.div
                layoutId="tabHighlight"
                className="absolute inset-0 bg-primary rounded-full"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10 whitespace-nowrap">{tab}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
