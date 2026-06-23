import { describe, expect, it } from "vitest";
import { FakeTimer } from "./fakeTimer";

describe("FakeTimer (setTimeout)", () => {
  it("runs scheduled timeouts in order with accurate Date.now()", () => {
    const fakeTimer = new FakeTimer();
    fakeTimer.install();
    try {
      const logs: [number, string][] = [];
      const log = (arg: string) => logs.push([Date.now(), arg]);

      setTimeout(() => log("A"), 100);
      const b = setTimeout(() => log("B"), 110);
      clearTimeout(b);
      setTimeout(() => log("C"), 200);

      fakeTimer.tick();
      expect(logs).toEqual([
        [100, "A"],
        [200, "C"],
      ]);
    } finally {
      fakeTimer.uninstall();
    }
  });

  it("runs timeouts scheduled from within a callback", () => {
    const fakeTimer = new FakeTimer();
    fakeTimer.install();
    try {
      const times: number[] = [];
      setTimeout(() => {
        times.push(Date.now());
        setTimeout(() => times.push(Date.now()), 50);
      }, 100);

      fakeTimer.tick();
      expect(times).toEqual([100, 150]);
    } finally {
      fakeTimer.uninstall();
    }
  });

  it("restores the original timers after uninstall", () => {
    const originalSetTimeout = globalThis.setTimeout;
    const originalDateNow = Date.now;

    const fakeTimer = new FakeTimer();
    fakeTimer.install();
    fakeTimer.uninstall();

    expect(globalThis.setTimeout).toBe(originalSetTimeout);
    expect(Date.now).toBe(originalDateNow);
  });
});
