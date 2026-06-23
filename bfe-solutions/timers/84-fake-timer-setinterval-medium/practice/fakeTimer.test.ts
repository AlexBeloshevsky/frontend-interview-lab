import { describe, expect, it } from "vitest";
import { FakeTimer } from "./fakeTimer";

describe("FakeTimer (setInterval)", () => {
  it("runs an interval at accurate times until it clears itself", () => {
    const fakeTimer = new FakeTimer();
    fakeTimer.install();
    try {
      const logs: number[] = [];
      const log = () => logs.push(Date.now());

      let count = 0;
      const id = setInterval(() => {
        if (count > 1) {
          clearInterval(id);
        } else {
          log();
        }
        count += 1;
      }, 100);

      fakeTimer.tick();
      expect(logs).toEqual([100, 200]);
    } finally {
      fakeTimer.uninstall();
    }
  });

  it("interleaves two intervals by time", () => {
    const fakeTimer = new FakeTimer();
    fakeTimer.install();
    try {
      const logs: string[] = [];
      let ticks = 0;

      const fast = setInterval(() => {
        logs.push(`fast@${Date.now()}`);
        if (Date.now() >= 200) clearInterval(fast);
      }, 100);
      const slow = setInterval(() => {
        logs.push(`slow@${Date.now()}`);
        ticks += 1;
        if (ticks >= 1) clearInterval(slow);
      }, 150);

      fakeTimer.tick();
      expect(logs).toEqual(["fast@100", "slow@150", "fast@200"]);
    } finally {
      fakeTimer.uninstall();
    }
  });

  it("restores the original timers after uninstall", () => {
    const originalSetInterval = globalThis.setInterval;
    const originalDateNow = Date.now;

    const fakeTimer = new FakeTimer();
    fakeTimer.install();
    fakeTimer.uninstall();

    expect(globalThis.setInterval).toBe(originalSetInterval);
    expect(Date.now).toBe(originalDateNow);
  });
});
