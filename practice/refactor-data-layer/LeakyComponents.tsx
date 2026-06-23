// ⚠️ Starting point: transport leaks into every component. Build the seam.
// Each component fetches inline, with its own shape, no shared types, no cancellation.

import React, { useEffect, useState } from "react";

const API = "https://example.test"; // pretend base url

// 1) Inline fetch, ad-hoc state shape, no error handling, no abort.
export function AlertCount() {
  const [n, setN] = useState(0);
  useEffect(() => {
    fetch(API + "/api/alerts")
      .then((r) => r.json())
      .then((data) => setN(data.length));
  }, []);
  return <div>Open alerts: {n}</div>;
}

// 2) Different shape again, loading flag duplicated, response typed as any.
export function AlertsList() {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(API + "/api/alerts")
      .then((r) => r.json())
      .then((data) => {
        setAlerts(data);
        setLoading(false);
      });
  }, []);
  if (loading) return <div>loading</div>;
  return (
    <ul>
      {alerts.map((a) => (
        <li key={a.id}>
          {a.severity} — {a.rule_name}
        </li>
      ))}
    </ul>
  );
}

// 3) Detail fetch with id in the URL, no error/empty handling, refetch logic inline.
export function IncidentDetail({ id }: { id: string }) {
  const [incident, setIncident] = useState<any>(null);
  useEffect(() => {
    fetch(API + "/api/incidents/" + id)
      .then((r) => r.json())
      .then((data) => setIncident(data));
  }, [id]);
  if (!incident) return <div>...</div>;
  return (
    <div>
      <h3>{incident.title}</h3>
      <p>{incident.summary}</p>
    </div>
  );
}

// Target after Part 1 (sketch — implement for real in the drill):
//
//   // repository.ts — the seam. Swap fetch -> GraphQL here later, untouched components.
//   export const alertsRepository = {
//     getAlerts(signal?: AbortSignal): Promise<Alert[]> { ... }
//     getIncident(id: string, signal?: AbortSignal): Promise<Incident> { ... }
//   };
//
//   // useAlerts.ts
//   export function useAlerts() { /* calls repo, manages status/error/abort */ }
//
//   // components consume useAlerts()/useIncident(id) and never see fetch or URLs.
