// ⚠️ This file is DELIBERATELY BAD. It is the starting point for the refactor drill.
// Do not read ISSUES.md until you have done your own triage pass. Refactor in place.

import React, { useState, useEffect } from "react";
import { fetchAlerts } from "./fakeApi";

// One giant component that fetches, transforms, filters, sorts, and renders.
export function AlertsDashboard(props: any) {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [severityFilter, setSeverityFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [sortDir, setSortDir] = useState("desc");
  const [selected, setSelected] = useState<any>(null);

  // Fetch on mount AND poll every 5s. No cleanup, no abort, no error handling.
  useEffect(() => {
    setLoading(true);
    fetchAlerts(props.count || 200).then((data) => {
      setAlerts(data);
      setLoading(false);
    });

    setInterval(() => {
      fetchAlerts(props.count || 200).then((data) => {
        setAlerts(data);
      });
    }, 5000);
  }, [search, severityFilter, sortDir]); // wrong deps: refetches on every keystroke

  // Severity rank computed inline with magic strings, recreated every render.
  function rank(sev: string) {
    if (sev == "critical") return 4;
    if (sev == "high") return 3;
    if (sev == "medium") return 2;
    if (sev == "low") return 1;
    return 0;
  }

  // Filtering + sorting done inline on every render, mutating the source array.
  let visible = alerts.filter((a) => {
    return (
      (severityFilter == "all" || a.severity == severityFilter) &&
      (a.rule_name.toLowerCase().includes(search.toLowerCase()) ||
        a.host.toLowerCase().includes(search.toLowerCase()) ||
        a.user.toLowerCase().includes(search.toLowerCase()))
    );
  });
  visible = visible.sort((a, b) => {
    if (sortDir == "desc") return rank(b.severity) - rank(a.severity);
    return rank(a.severity) - rank(b.severity);
  });

  function acknowledge(id: string) {
    // Mutates state in place, then sets the same reference back.
    for (let i = 0; i < alerts.length; i++) {
      if (alerts[i].id == id) {
        alerts[i].status = "acknowledged";
      }
    }
    setAlerts(alerts);
  }

  return (
    <div style={{ padding: 16, fontFamily: "sans-serif" }}>
      <h1>Security Alerts</h1>

      <div style={{ marginBottom: 12 }}>
        <input
          placeholder="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ marginRight: 8 }}
        />
        <select
          value={severityFilter}
          onChange={(e) => setSeverityFilter(e.target.value)}
        >
          <option value="all">all</option>
          <option value="critical">critical</option>
          <option value="high">high</option>
          <option value="medium">medium</option>
          <option value="low">low</option>
        </select>
        <span
          onClick={() => setSortDir(sortDir == "desc" ? "asc" : "desc")}
          style={{ marginLeft: 8, color: "blue", cursor: "pointer" }}
        >
          sort: {sortDir}
        </span>
      </div>

      {loading ? <div>Loading...</div> : null}

      <table border={1} cellPadding={4}>
        <tbody>
          {visible.map((a, i) => (
            <tr key={i} style={{ background: a.severity == "critical" ? "#fdd" : "white" }}>
              <td>{a.severity}</td>
              <td>{a.rule_name}</td>
              <td>{a.host}</td>
              <td>{a.user}</td>
              <td>{new Date(a.detected_at).toLocaleString()}</td>
              <td dangerouslySetInnerHTML={{ __html: a.description_html }} />
              <td>{a.status}</td>
              <td>
                <button onClick={() => acknowledge(a.id)}>ack</button>
                <span
                  style={{ marginLeft: 6, color: "blue", cursor: "pointer" }}
                  onClick={() => setSelected(a)}
                >
                  details
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selected ? (
        <div
          style={{
            position: "fixed",
            top: 100,
            left: 100,
            background: "white",
            border: "1px solid black",
            padding: 20,
          }}
        >
          <h3>{selected.rule_name}</h3>
          <p>Host: {selected.host}</p>
          <p>User: {selected.user}</p>
          <div dangerouslySetInnerHTML={{ __html: selected.description_html }} />
          <button onClick={() => setSelected(null)}>close</button>
        </div>
      ) : null}
    </div>
  );
}
