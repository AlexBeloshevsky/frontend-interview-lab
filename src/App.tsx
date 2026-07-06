import { useState } from "react";
import { TableView } from "./exercises/TableView";
import { AlertsDashboard } from "../practice/refactor-soc-alerts/AlertsDashboard";
import { SlowTable } from "../practice/refactor-soc-alerts-perf/SlowTable";
import {
  AlertCount,
  AlertsList,
  IncidentDetail,
} from "../practice/refactor-data-layer/LeakyComponents";
import { HardcodedPanel } from "../practice/refactor-i18n/HardcodedPanel";
import { RecommendationsWidget } from "../practice/senior-fe-infra-interview/coding/04-recommendations-widget/RecommendationsWidget";
import React from "react";

type DrillId =
  | "soc-alerts"
  | "soc-perf"
  | "data-layer"
  | "i18n"
  | "table-view"
  | "recommendations-widget";

const DRILLS: { id: DrillId; label: string; note: string }[] = [
  {
    id: "soc-alerts",
    label: "Improve code: SOC alerts",
    note: "Deliberately buggy. Triage + refactor in practice/refactor-soc-alerts/.",
  },
  {
    id: "soc-perf",
    label: "Perf: 10k-row table",
    note: "Janks on purpose (live stream into state, no virtualization).",
  },
  {
    id: "data-layer",
    label: "Data layer seam",
    note: "fetch() leaks into components; hits a fake URL so expect loading/error.",
  },
  {
    id: "i18n",
    label: "i18n panel",
    note: "Hardcoded strings/dates/plurals to extract.",
  },
  {
    id: "table-view",
    label: "Original TableView",
    note: "Your existing exercise.",
  },
  {
    id: "recommendations-widget",
    label: "Recommendations Widget",
    note: "Recommendations widget exercise.",
  },
];

export default function App() {
  const [drill, setDrill] = useState<DrillId>("soc-alerts");
  const active = DRILLS.find((d) => d.id === drill)!;

  return (
    <div style={{ fontFamily: "sans-serif" }}>
      <nav
        style={{
          display: "flex",
          gap: 8,
          flexWrap: "wrap",
          padding: 12,
          borderBottom: "1px solid #ddd",
          position: "sticky",
          top: 0,
          background: "#fff",
        }}
      >
        {DRILLS.map((d) => (
          <button
            key={d.id}
            onClick={() => setDrill(d.id)}
            style={{
              padding: "6px 10px",
              border: "1px solid #ccc",
              borderRadius: 6,
              background: d.id === drill ? "#222" : "#fff",
              color: d.id === drill ? "#fff" : "#222",
              cursor: "pointer",
            }}
          >
            {d.label}
          </button>
        ))}
      </nav>

      <p
        style={{ padding: "8px 12px", margin: 0, color: "#666", fontSize: 13 }}
      >
        {active.note}
      </p>

      <div style={{ padding: 12 }}>
        {drill === "soc-alerts" && <AlertsDashboard count={200} />}
        {drill === "soc-perf" && <SlowTable />}
        {drill === "data-layer" && (
          <div style={{ display: "grid", gap: 16 }}>
            <AlertCount />
            <AlertsList />
            <IncidentDetail id="inc-123" />
          </div>
        )}
        {drill === "i18n" && (
          <HardcodedPanel
            user="a.smith"
            openCount={5}
            lastDetectionAt={new Date()}
            blockedToday={12873}
          />
        )}
        {drill === "table-view" && <TableView />}
        {drill === "recommendations-widget" && <RecommendationsWidget />}
      </div>
    </div>
  );
}
