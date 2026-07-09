import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { hidePageUntil } from "./antiFlicker";

describe("hidePageUntil", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("hides the root immediately", () => {
    const root = document.createElement("div");
    hidePageUntil(new Promise(() => {}), { root, timeoutMs: 3000 });
    expect(root.style.opacity).toBe("0");
  });

  it("reveals when the ready promise resolves", async () => {
    const root = document.createElement("div");
    let resolve!: () => void;
    const ready = new Promise<void>((r) => (resolve = r));

    hidePageUntil(ready, { root, timeoutMs: 3000 });
    expect(root.style.opacity).toBe("0");

    resolve();
    await ready; // let the .then/.finally microtask run

    expect(root.style.opacity).not.toBe("0");
  });

  it("reveals after the timeout even if the promise never settles", () => {
    const root = document.createElement("div");
    hidePageUntil(new Promise(() => {}), { root, timeoutMs: 2000 });

    expect(root.style.opacity).toBe("0");
    vi.advanceTimersByTime(2000);
    expect(root.style.opacity).not.toBe("0");
  });

  it("reveals (not stays hidden) when the promise rejects", async () => {
    const root = document.createElement("div");
    const ready = Promise.reject(new Error("decision failed"));

    hidePageUntil(ready, { root, timeoutMs: 3000 });
    await ready.catch(() => {}); // swallow + let finally run

    expect(root.style.opacity).not.toBe("0");
  });
});
