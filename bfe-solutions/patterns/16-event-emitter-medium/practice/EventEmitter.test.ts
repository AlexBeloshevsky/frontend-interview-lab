import { describe, expect, it, vi } from "vitest";
import { EventEmitter } from "./EventEmitter";

describe("EventEmitter", () => {
  it("calls a subscribed listener with relayed args", () => {
    const emitter = new EventEmitter();
    const cb = vi.fn();
    emitter.subscribe("event1", cb);

    emitter.emit("event1", 1, 2);

    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenCalledWith(1, 2);
  });

  it("calls the same callback once per subscription", () => {
    const emitter = new EventEmitter();
    const cb = vi.fn();
    emitter.subscribe("event1", cb);
    emitter.subscribe("event1", cb);

    emitter.emit("event1", "x");

    expect(cb).toHaveBeenCalledTimes(2);
  });

  it("does not call listeners of other events", () => {
    const emitter = new EventEmitter();
    const cb1 = vi.fn();
    const cb2 = vi.fn();
    emitter.subscribe("event1", cb1);
    emitter.subscribe("event2", cb2);

    emitter.emit("event1");

    expect(cb1).toHaveBeenCalledTimes(1);
    expect(cb2).not.toHaveBeenCalled();
  });

  it("release() removes only that specific subscription", () => {
    const emitter = new EventEmitter();
    const cb = vi.fn();
    const sub1 = emitter.subscribe("event1", cb);
    emitter.subscribe("event1", cb); // sub2, kept

    sub1.release();
    emitter.emit("event1");

    expect(cb).toHaveBeenCalledTimes(1);
  });

  it("stops calling a callback after all its subscriptions are released", () => {
    const emitter = new EventEmitter();
    const cb = vi.fn();
    const sub1 = emitter.subscribe("event1", cb);
    const sub3 = emitter.subscribe("event1", cb);

    sub1.release();
    sub3.release();
    emitter.emit("event1", 1, 2);

    expect(cb).not.toHaveBeenCalled();
  });

  it("emitting an unknown event is a no-op", () => {
    const emitter = new EventEmitter();
    expect(() => emitter.emit("nope", 1)).not.toThrow();
  });

  it("release() is safe to call twice", () => {
    const emitter = new EventEmitter();
    const cb = vi.fn();
    const sub = emitter.subscribe("event1", cb);

    sub.release();
    expect(() => sub.release()).not.toThrow();
  });
});
