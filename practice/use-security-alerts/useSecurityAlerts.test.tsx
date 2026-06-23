import { renderHook, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { useSecurityAlerts, type Alert } from "./useSecurityAlerts";

const phishing: Alert = {
  id: 1,
  priority: "High",
  timestamp: "2026-01-01T00:00:00Z",
  message: "Phishing attack detected on email.",
  category: "Phishing",
};

const malware: Alert = {
  id: 2,
  priority: "Medium",
  timestamp: "2026-01-01T00:01:00Z",
  message: "Malware detected in file transfer.",
  category: "Malware",
};

const ddos: Alert = {
  id: 3,
  priority: "High",
  timestamp: "2026-01-01T00:02:00Z",
  message: "Volumetric DDoS detected.",
  category: "DDoS",
};

describe("useSecurityAlerts", () => {
  it("adds alerts under their category, creating new categories", () => {
    const { result } = renderHook(() => useSecurityAlerts());

    act(() => {
      result.current.addAlert("Phishing", phishing);
      result.current.addAlert("Malware", malware);
    });

    expect(result.current.getAlertsByCategory("Phishing")).toEqual([phishing]);
    expect(result.current.getAlertsByCategory("Malware")).toEqual([malware]);
  });

  it("returns [] for an unknown category", () => {
    const { result } = renderHook(() => useSecurityAlerts());
    expect(result.current.getAlertsByCategory("Nope")).toEqual([]);
  });

  it("dedupes by id", () => {
    const { result } = renderHook(() => useSecurityAlerts());
    act(() => {
      result.current.addAlert("Phishing", phishing);
      result.current.addAlert("Phishing", phishing);
    });
    expect(result.current.getAlertsByCategory("Phishing")).toHaveLength(1);
  });

  it("gets alerts by priority across categories", () => {
    const { result } = renderHook(() => useSecurityAlerts());
    act(() => {
      result.current.addAlert("Phishing", phishing); // High
      result.current.addAlert("Malware", malware); // Medium
      result.current.addAlert("DDoS", ddos); // High
    });

    const high = result.current.getAlertsByPriority("High");
    expect(high).toHaveLength(2);
    expect(high.map((a) => a.id).sort()).toEqual([1, 3]);
    expect(result.current.getAlertsByPriority("Low")).toEqual([]);
  });

  it("removes a specific alert and drops the empty category", () => {
    const { result } = renderHook(() => useSecurityAlerts());
    act(() => {
      result.current.addAlert("Phishing", phishing);
    });
    act(() => {
      result.current.removeAlert("Phishing", phishing.id);
    });
    expect(result.current.getAlertsByCategory("Phishing")).toEqual([]);
    expect(result.current.alerts).not.toHaveProperty("Phishing");
  });

  it("is a no-op when removing a missing id or category (state ref unchanged)", () => {
    const { result } = renderHook(() => useSecurityAlerts());
    act(() => {
      result.current.addAlert("Phishing", phishing);
    });
    const before = result.current.alerts;
    act(() => {
      result.current.removeAlert("Phishing", 999); // missing id
      result.current.removeAlert("Ghost", 1); // missing category
    });
    expect(result.current.alerts).toBe(before); // same reference => no re-render churn
  });

  it("does not mutate previous state when adding", () => {
    const { result } = renderHook(() => useSecurityAlerts());
    act(() => {
      result.current.addAlert("Phishing", phishing);
    });
    const snapshot = result.current.alerts;
    act(() => {
      result.current.addAlert("Phishing", { ...phishing, id: 99 });
    });
    expect(snapshot.Phishing).toHaveLength(1); // old reference untouched
    expect(result.current.alerts.Phishing).toHaveLength(2);
  });
});
