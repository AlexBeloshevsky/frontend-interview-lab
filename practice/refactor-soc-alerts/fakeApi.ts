// Fake detection backend. Do not "fix" this file — it stands in for a real REST API.
// It intentionally returns loosely-typed data and is occasionally slow / flaky.

export type RawAlert = {
  id: string;
  rule_name: string;
  severity: string; // "critical" | "high" | "medium" | "low" | sometimes garbage
  host: string;
  user: string;
  // ISO string, but sometimes a unix epoch number sneaks in from a legacy producer
  detected_at: string | number;
  // analyst-supplied note; may contain HTML from a legacy ticketing integration
  description_html: string;
  status: string; // "open" | "acknowledged" | "closed"
  count: number;
};

const HOSTS = ["web-01", "db-prod-3", "k8s-node-7", "vpn-gw-1", "jump-box-2"];
const USERS = ["a.smith", "root", "svc-deploy", "j.doe", "unknown"];
const RULES = [
  "Suspicious PowerShell",
  "Brute Force SSH",
  "Privilege Escalation",
  "Malware Beacon",
  "Data Exfil Pattern",
  "Impossible Travel",
];
const SEVS = ["critical", "high", "medium", "low"];
const STATUSES = ["open", "acknowledged", "closed"];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function makeAlert(i: number): RawAlert {
  const rule = pick(RULES);
  return {
    id: `alert-${i}-${Math.random().toString(36).slice(2, 7)}`,
    rule_name: rule,
    severity: pick(SEVS),
    host: pick(HOSTS),
    user: pick(USERS),
    detected_at:
      Math.random() > 0.85
        ? Date.now() - Math.floor(Math.random() * 1e7) // legacy epoch number
        : new Date(Date.now() - Math.floor(Math.random() * 1e7)).toISOString(),
    description_html: `Detected <b>${rule}</b> on host. Investigate immediately.`,
    status: pick(STATUSES),
    count: 1 + Math.floor(Math.random() * 40),
  };
}

export function fetchAlerts(count = 200): Promise<RawAlert[]> {
  const delay = 300 + Math.random() * 700;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // ~10% of calls fail, like a real flaky endpoint
      if (Math.random() < 0.1) {
        reject(new Error("Detection service timed out"));
        return;
      }
      resolve(Array.from({ length: count }, (_, i) => makeAlert(i)));
    }, delay);
  });
}
