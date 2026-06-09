import { useState } from "react";

export type Tab = {
  id: string;
  label: string;
  content: string;
};

type TabsProps = {
  tabs: Tab[];
};

const Tabs = ({ tabs }: TabsProps) => {
  const [activeTabId, setActiveTabId] = useState(tabs[0]?.id);
  const activeTab = tabs.find((tab) => {
    return tab.id === activeTabId;
  });

  if (tabs.length === 0) {
    return <p>no tabs to show</p>;
  }

  return (
    <>
      <p>tabs</p>
      {tabs.map((tab) => {
        return (
          <div key={tab.id}>
            <button onClick={() => setActiveTabId(tab.id)}>
              {tab.label}
              {tab.id === activeTabId ? " selected" : ""}
            </button>
          </div>
        );
      })}
      <p>{activeTab?.content}</p>
    </>
  );
};

export default Tabs;
