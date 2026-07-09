import { renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useImpression } from "./useImpression";

/**
 * Minimal IntersectionObserver mock. The real one isn't in the test DOM, so we stub it
 * and drive intersection manually via `.trigger(isIntersecting)`.
 */
class MockIntersectionObserver {
  static instances: MockIntersectionObserver[] = [];
  callback: IntersectionObserverCallback;
  elements = new Set<Element>();

  constructor(cb: IntersectionObserverCallback) {
    this.callback = cb;
    MockIntersectionObserver.instances.push(this);
  }

  observe = vi.fn((el: Element) => this.elements.add(el));
  unobserve = vi.fn((el: Element) => this.elements.delete(el));
  disconnect = vi.fn(() => this.elements.clear());

  trigger(isIntersecting: boolean) {
    const entries = [...this.elements].map(
      (target) => ({ isIntersecting, target }) as IntersectionObserverEntry,
    );
    this.callback(entries, this as unknown as IntersectionObserver);
  }
}

const lastObserver = () =>
  MockIntersectionObserver.instances[MockIntersectionObserver.instances.length - 1];

beforeEach(() => {
  MockIntersectionObserver.instances = [];
  vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
});
afterEach(() => vi.unstubAllGlobals());

describe("useImpression", () => {
  it("observes the node it is attached to", () => {
    const { result } = renderHook(() => useImpression(vi.fn()));
    const node = document.createElement("div");

    result.current(node);

    expect(lastObserver().observe).toHaveBeenCalledWith(node);
  });

  it("fires onImpression when the element becomes visible", () => {
    const onImpression = vi.fn();
    const { result } = renderHook(() => useImpression(onImpression));
    result.current(document.createElement("div"));

    lastObserver().trigger(true);

    expect(onImpression).toHaveBeenCalledTimes(1);
  });

  it("does not fire while the element is not intersecting", () => {
    const onImpression = vi.fn();
    const { result } = renderHook(() => useImpression(onImpression));
    result.current(document.createElement("div"));

    lastObserver().trigger(false);

    expect(onImpression).not.toHaveBeenCalled();
  });

  it("fires only once by default, then disconnects", () => {
    const onImpression = vi.fn();
    const { result } = renderHook(() => useImpression(onImpression));
    result.current(document.createElement("div"));
    const observer = lastObserver();

    observer.trigger(true);
    observer.trigger(true);

    expect(onImpression).toHaveBeenCalledTimes(1);
    expect(observer.disconnect).toHaveBeenCalled();
  });

  it("fires every time it re-enters view when once is false", () => {
    const onImpression = vi.fn();
    const { result } = renderHook(() =>
      useImpression(onImpression, { once: false }),
    );
    result.current(document.createElement("div"));
    const observer = lastObserver();

    observer.trigger(true);
    observer.trigger(false);
    observer.trigger(true);

    expect(onImpression).toHaveBeenCalledTimes(2);
  });
});
