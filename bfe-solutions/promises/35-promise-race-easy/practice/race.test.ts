import { describe, expect, it } from "vitest";
import { race } from "./race";

const after = <T>(ms: number, value: T): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(value), ms));

const failAfter = (ms: number, reason: unknown): Promise<never> =>
  new Promise((_, reject) => setTimeout(() => reject(reason), ms));

describe("race()", () => {
  it("settles with the first promise to resolve", async () => {
    await expect(race([after(40, "slow"), after(10, "fast")])).resolves.toBe(
      "fast",
    );
  });

  it("rejects if the first to settle is a rejection", async () => {
    await expect(
      race([after(40, "slow"), failAfter(10, new Error("boom"))]),
    ).rejects.toThrow("boom");
  });

  it("resolves immediately with a plain value", async () => {
    await expect(race([42, after(40, 1)])).resolves.toBe(42);
  });

  it("ignores later settlements once one has won", async () => {
    const result = await race([after(10, "first"), failAfter(40, "late")]);
    expect(result).toBe("first");
  });
});
