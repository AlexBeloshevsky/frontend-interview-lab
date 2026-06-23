/**
 * 16. create an Event Emitter — medium
 * https://bigfrontend.dev/problem/create-an-Event-Emitter
 *
 * Create an EventEmitter class:
 *
 *   const emitter = new EventEmitter()
 *   const sub1 = emitter.subscribe('event1', callback1)
 *   const sub2 = emitter.subscribe('event2', callback2)
 *   // the same callback can subscribe to the same event multiple times
 *   const sub3 = emitter.subscribe('event1', callback1)
 *
 *   emitter.emit('event1', 1, 2)  // callback1 is called twice, with (1, 2)
 *
 *   sub1.release()
 *   sub3.release()
 *   // now emitting 'event1' no longer calls callback1
 */

type Listener = (...args: unknown[]) => void;

interface Subscription {
  release(): void;
}

export class EventEmitter {
  subscribe(eventName: string, callback: Listener): Subscription {
    // TODO: implement
    throw new Error("Not implemented");
  }

  emit(eventName: string, ...args: unknown[]): void {
    // TODO: implement
    throw new Error("Not implemented");
  }
}
