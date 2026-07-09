import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { observeDomChanges } from "./observeDomChanges";

class MockMutationObserver {
  static instances: MockMutationObserver[] = [];
  callback: MutationCallback;
  observe = vi.fn();
  disconnect = vi.fn();

  constructor(cb: MutationCallback) {
    this.callback = cb;
    MockMutationObserver.instances.push(this);
  }

  trigger() {
    this.callback([], this as unknown as MutationObserver);
  }
}

const lastObserver = () =>
  MockMutationObserver.instances[MockMutationObserver.instances.length - 1];

beforeEach(() => {
  MockMutationObserver.instances = [];
  vi.stubGlobal("MutationObserver", MockMutationObserver);
  vi.useFakeTimers();
});
afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe("observeDomChanges", () => {
  it("observes the target with subtree and childList", () => {
    const target = document.createElement("div");
    observeDomChanges(target, vi.fn());

    expect(lastObserver().observe).toHaveBeenCalledWith(target, {
      subtree: true,
      childList: true,
    });
  });

  it("calls onChange after mutations (post-debounce)", () => {
    const onChange = vi.fn();
    observeDomChanges(document.createElement("div"), onChange, { debounceMs: 100 });

    lastObserver().trigger();
    expect(onChange).not.toHaveBeenCalled();

    vi.advanceTimersByTime(100);
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("debounces rapid mutations into one callback", () => {
    const onChange = vi.fn();
    observeDomChanges(document.createElement("div"), onChange, { debounceMs: 100 });
    const observer = lastObserver();

    observer.trigger();
    vi.advanceTimersByTime(50);
    observer.trigger();
    vi.advanceTimersByTime(50);
    expect(onChange).not.toHaveBeenCalled();

    vi.advanceTimersByTime(50);
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("disconnect stops further callbacks", () => {
    const onChange = vi.fn();
    const disconnect = observeDomChanges(document.createElement("div"), onChange, {
      debounceMs: 100,
    });

    lastObserver().trigger();
    disconnect();
    vi.advanceTimersByTime(200);

    expect(onChange).not.toHaveBeenCalled();
    expect(lastObserver().disconnect).toHaveBeenCalled();
  });
});
