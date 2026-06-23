import { describe, expect, it } from "vitest";
import { cloneDeep } from "./cloneDeep";

describe("cloneDeep()", () => {
  it("returns primitives as-is", () => {
    expect(cloneDeep(42)).toBe(42);
    expect(cloneDeep("hi")).toBe("hi");
    expect(cloneDeep(null)).toBe(null);
    expect(cloneDeep(undefined)).toBe(undefined);
  });

  it("deeply clones nested objects and arrays", () => {
    const original = { a: 1, b: { c: [1, 2, 3] } };
    const copy = cloneDeep(original);

    expect(copy).toEqual(original);
    expect(copy).not.toBe(original);
    expect(copy.b).not.toBe(original.b);
    expect(copy.b.c).not.toBe(original.b.c);
  });

  it("mutating the clone does not affect the original", () => {
    const original = { list: [{ n: 1 }] };
    const copy = cloneDeep(original);

    copy.list[0].n = 99;
    copy.list.push({ n: 2 });

    expect(original.list).toEqual([{ n: 1 }]);
  });

  it("clones arrays of objects", () => {
    const original = [{ a: 1 }, { b: 2 }];
    const copy = cloneDeep(original);

    expect(copy).toEqual(original);
    expect(copy[0]).not.toBe(original[0]);
  });

  it("handles circular references", () => {
    const original: Record<string, unknown> = { name: "root" };
    original.self = original;

    const copy = cloneDeep(original);

    expect(copy).not.toBe(original);
    expect(copy.self).toBe(copy);
    expect(copy.name).toBe("root");
  });

  it("preserves shared references as shared", () => {
    const shared = { value: 1 };
    const original = { a: shared, b: shared };
    const copy = cloneDeep(original);

    expect(copy.a).toBe(copy.b);
    expect(copy.a).not.toBe(shared);
  });
});
