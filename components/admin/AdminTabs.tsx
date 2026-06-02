"use client";

import { TabKey } from "./types";

interface AdminTabsProps {
  tabs: TabKey[];
  activeTab: TabKey;
  onChange: (tab: TabKey) => void;
}

export function AdminTabs({ tabs, activeTab, onChange }: AdminTabsProps) {
  return (
    <nav className="flex flex-wrap items-center justify-center md:justify-start gap-5 lg:gap-10 text-black/80 mx-auto">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={
            activeTab === tab
              ? "bg-black text-white rounded-full px-5 py-1.5 text-base font-medium"
              : "text-base font-medium"
          }
          type="button"
          onClick={() => onChange(tab)}
        >
          {tab}
        </button>
      ))}
    </nav>
  );
}
