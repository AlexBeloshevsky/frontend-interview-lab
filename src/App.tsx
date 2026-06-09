import Tabs, { Tab } from "./exercises/tabs/Tabs";

const tabs: Tab[] = [
  {
    id: "overview",
    label: "Overview",
    content: "This is the overview panel",
  },
  {
    id: "alerts",
    label: "Alerts",
    content: "This is the alerts panel",
  },
  {
    id: "settings",
    label: "Settings",
    content: "This is the settings panel",
  },
];

export default function App() {
  return <Tabs tabs={tabs} />;
}
