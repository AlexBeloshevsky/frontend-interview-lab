// ⚠️ Starting point: everything hardcoded in English with manual formatting.
// Internationalize it (react-i18next assumed). Timebox ~30 min.

import React from "react";

type Props = {
  user: string;
  openCount: number;
  lastDetectionAt: Date;
  blockedToday: number;
};

export function HardcodedPanel({ user, openCount, lastDetectionAt, blockedToday }: Props) {
  return (
    <div style={{ fontFamily: "sans-serif", padding: 16 }}>
      {/* string concatenation — breaks word order across languages */}
      <h2>Welcome back, {user}!</h2>

      {/* manual pluralization */}
      <p>
        You have {openCount} {openCount === 1 ? "alert" : "alerts"} that need attention.
      </p>

      {/* manual number formatting */}
      <p>Threats blocked today: {blockedToday.toLocaleString()}</p>

      {/* manual date formatting, hardcoded locale assumptions */}
      <p>Last detection: {lastDetectionAt.toLocaleString()}</p>

      {/* hardcoded empty/CTA text */}
      {openCount === 0 ? (
        <p>All clear. No open alerts.</p>
      ) : (
        <button>Review alerts</button>
      )}
    </div>
  );
}
