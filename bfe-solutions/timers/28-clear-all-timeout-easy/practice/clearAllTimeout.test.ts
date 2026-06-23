import { describe, expect, it } from "vitest";
import {
  clearAllTimeout,
  clearTimeout as trackedClearTimeout,
  setTimeout as trackedSetTimeout,
} from "./clearAllTimeout";

const delay = (ms: number) =>
  new Promise<void>((resolve) => globalThis.setTimeout(resolve, ms));

describe("clearAllTimeout()", () => {
  it("cancels all pending timeouts", async () => {
    const ran: string[] = [];
    trackedSetTimeout(() => ran.push("a"), 5);
    trackedSetTimeout(() => ran.push("b"), 5);
    trackedSetTimeout(() => ran.push("c"), 5);

    clearAllTimeout();
    await delay(30);

    expect(ran).toEqual([]);
  });

  it("still runs timeouts that were not cancelled", async () => {
    const ran: string[] = [];
    trackedSetTimeout(() => ran.push("a"), 5);

    await delay(30);

    expect(ran).toEqual(["a"]);
  });

  it("can clear a single timeout by id", async () => {
    const ran: string[] = [];
    const id = trackedSetTimeout(() => ran.push("a"), 5);
    trackedClearTimeout(id);

    await delay(30);

    expect(ran).toEqual([]);
  });

  it("forwards extra arguments to the handler", async () => {
    const received: unknown[] = [];
    trackedSetTimeout(
      (x: unknown, y: unknown) => received.push(x, y),
      5,
      "p",
      "q",
    );

    await delay(30);

    expect(received).toEqual(["p", "q"]);
  });
});
