// ⚠️ DELIBERATELY SLOW. Wire into App.tsx and watch it jank, then fix it.
// Goal: virtualization + keep the stream out of React + memoized rows + worker/transition.

import React, { useEffect, useMemo, useState } from "react";

type Alert = {
  id: number;
  severity: "critical" | "high" | "medium" | "low";
  rule: string;
  host: string;
  count: number;
  ts: number;
};

const SEVS = ["critical", "high", "medium", "low"] as const;

function makeAlerts(n: number): Alert[] {
  const out: Alert[] = [];
  for (let i = 0; i < n; i++) {
    out.push({
      id: i,
      severity: SEVS[i % 4],
      rule: `Rule ${i % 50}`,
      host: `host-${i % 200}`,
      count: 1,
      ts: Date.now(),
    });
  }
  return out;
}

// Not memoized: re-renders on every parent render even if its alert didn't change.
function Row({ alert }: { alert: Alert }) {
  return (
    <div
      style={{
        display: "flex",
        gap: 16,
        padding: "4px 8px",
        borderBottom: "1px solid #eee",
        background: alert.severity === "critical" ? "#fdd" : "white",
      }}
    >
      <span style={{ width: 80 }}>{alert.severity}</span>
      <span style={{ width: 120 }}>{alert.rule}</span>
      <span style={{ width: 120 }}>{alert.host}</span>
      <span style={{ width: 60 }}>{alert.count}</span>
      <span>{new Date(alert.ts).toLocaleTimeString()}</span>
    </div>
  );
}

export function SlowTable() {
  const [alerts, setAlerts] = useState<Alert[]>(() => makeAlerts(10000));
  const [query, setQuery] = useState("");

  // Live "stream": every 200ms, bump a random row's count. Pushed straight into state,
  // which re-renders ALL 10k rows. This is the core thing to fix.
  useEffect(() => {
    const id = setInterval(() => {
      setAlerts((prev) => {
        const next = prev.slice();
        const i = Math.floor(Math.random() * next.length);
        next[i] = { ...next[i], count: next[i].count + 1, ts: Date.now() };
        return next;
      });
    }, 200);
    return () => clearInterval(id);
  }, []);

  // Recomputed every render (including every 200ms tick). Heavy on the main thread.
  const visible = useMemo(() => {
    const q = query.toLowerCase();
    return alerts
      .filter((a) => a.rule.toLowerCase().includes(q) || a.host.toLowerCase().includes(q))
      .sort((a, b) => b.count - a.count);
  }, [alerts, query]);

  return (
    <div style={{ fontFamily: "sans-serif" }}>
      <input
        placeholder="filter rule/host"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ margin: 8 }}
      />
      <div style={{ height: 500, overflow: "auto" }}>
        {/* All rows mounted — no virtualization. */}
        {visible.map((a) => (
          <Row key={a.id} alert={a} />
        ))}
      </div>
    </div>
  );
}
