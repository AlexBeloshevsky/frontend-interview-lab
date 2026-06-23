import { describe, expect, it } from "vitest";
import { any } from "./any";

const after = <T>(ms: number, value: T): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(value), ms));

const failAfter = (ms: number, reason: unknown): Promise<never> =>
  new Promise((_, reject) => setTimeout(() => reject(reason), ms));

describe("any()", () => {
  it("resolves with the first fulfilled value", async () => {
    await expect(any([after(40, "slow"), after(10, "fast")])).resolves.toBe(
      "fast",
    );
  });

  it("ignores rejections as long as one fulfills", async () => {
    await expect(
      any([failAfter(10, new Error("early")), after(30, "winner")]),
    ).resolves.toBe("winner");
  });

  it("rejects with an AggregateError when all reject", async () => {
    await expect(
      any([failAfter(10, "a"), failAfter(20, "b")]),
    ).rejects.toBeInstanceOf(AggregateError);
  });

  it("collects all errors in order in the AggregateError", async () => {
    try {
      await any([failAfter(10, "a"), failAfter(20, "b")]);
      throw new Error("should have rejected");
    } catch (err) {
      expect(err).toBeInstanceOf(AggregateError);
      expect((err as AggregateError).errors).toEqual(["a", "b"]);
    }
  });

  it("rejects an empty input with an AggregateError", async () => {
    await expect(any([])).rejects.toBeInstanceOf(AggregateError);
  });
});
