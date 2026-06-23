import { describe, expect, it } from "vitest";
import { promiseAll } from "./promiseAll";

describe("promiseAll", () => {
  it("resolves an empty array", async () => {
    await expect(promiseAll([])).resolves.toEqual([]);
  });

  it("resolves an array of plain values", async () => {
    await expect(promiseAll([1, 2, 3])).resolves.toEqual([1, 2, 3]);
  });

  it("resolves an array of promises", async () => {
    const result = await promiseAll([
      Promise.resolve("React"),
      Promise.resolve("TypeScript"),
      Promise.resolve("JavaScript"),
    ]);

    expect(result).toEqual(["React", "TypeScript", "JavaScript"]);
  });

  it("resolves mixed plain values and promises", async () => {
    const result = await promiseAll([
      "React",
      Promise.resolve("TypeScript"),
      "JavaScript",
    ]);

    expect(result).toEqual(["React", "TypeScript", "JavaScript"]);
  });

  it("preserves input order even when promises resolve out of order", async () => {
    const slow = new Promise<string>((resolve) => {
      setTimeout(() => resolve("slow"), 50);
    });

    const fast = new Promise<string>((resolve) => {
      setTimeout(() => resolve("fast"), 10);
    });

    const result = await promiseAll([slow, fast]);

    expect(result).toEqual(["slow", "fast"]);
  });

  it("rejects when one promise rejects", async () => {
    const error = new Error("Something went wrong");

    await expect(
      promiseAll([
        Promise.resolve("React"),
        Promise.reject(error),
        Promise.resolve("TypeScript"),
      ]),
    ).rejects.toThrow("Something went wrong");
  });

  it("rejects with the original rejection reason", async () => {
    await expect(
      promiseAll([Promise.resolve(1), Promise.reject("failed")]),
    ).rejects.toBe("failed");
  });
});
