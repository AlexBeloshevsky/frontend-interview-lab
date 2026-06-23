import { describe, expect, it } from "vitest";
import { allSettled } from "./allSettled";

describe("allSettled()", () => {
  it("resolves an empty array", async () => {
    await expect(allSettled([])).resolves.toEqual([]);
  });

  it("reports all fulfilled outcomes in order", async () => {
    const result = await allSettled([1, Promise.resolve(2), 3]);
    expect(result).toEqual([
      { status: "fulfilled", value: 1 },
      { status: "fulfilled", value: 2 },
      { status: "fulfilled", value: 3 },
    ]);
  });

  it("never rejects, reporting a mix of outcomes", async () => {
    const result = await allSettled([
      Promise.resolve("ok"),
      Promise.reject(new Error("boom")),
      Promise.resolve("done"),
    ]);

    expect(result[0]).toEqual({ status: "fulfilled", value: "ok" });
    expect(result[1].status).toBe("rejected");
    expect((result[1] as { reason: Error }).reason).toBeInstanceOf(Error);
    expect(result[2]).toEqual({ status: "fulfilled", value: "done" });
  });

  it("preserves order despite different timings", async () => {
    const slow = new Promise((resolve) => setTimeout(() => resolve("slow"), 40));
    const fast = new Promise((_, reject) =>
      setTimeout(() => reject("fast-fail"), 10),
    );

    const result = await allSettled([slow, fast]);
    expect(result).toEqual([
      { status: "fulfilled", value: "slow" },
      { status: "rejected", reason: "fast-fail" },
    ]);
  });
});
