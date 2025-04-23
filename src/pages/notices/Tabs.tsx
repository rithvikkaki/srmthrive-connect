
import React from "react";

interface TabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ activeTab, setActiveTab }) => (
  <div className="flex space-x-2 mb-5">
    <button
      className={`px-4 py-2 rounded-t-lg font-semibold ${
        activeTab === "notices" ? "bg-thrive-500 text-white" : "bg-muted"
      }`}
      onClick={() => setActiveTab("notices")}
    >
      Notices
    </button>
    <button
      className={`px-4 py-2 rounded-t-lg font-semibold ${
        activeTab === "assignments" ? "bg-thrive-500 text-white" : "bg-muted"
      }`}
      onClick={() => setActiveTab("assignments")}
    >
      Assignments
    </button>
  </div>
);

export default Tabs;
