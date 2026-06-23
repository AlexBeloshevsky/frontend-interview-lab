/**
 * 16. create an Event Emitter — medium
 * https://bigfrontend.dev/problem/create-an-Event-Emitter
 *
 * Reference solution. See NOTES.md for the idea.
 */

type Listener = (...args: unknown[]) => void;

interface Subscription {
  release(): void;
}

export class EventEmitter {
  // Each subscription gets a unique holder object, so the same callback can be
  // subscribed multiple times and released independently.
  private events = new Map<string, Set<{ callback: Listener }>>();

  subscribe(eventName: string, callback: Listener): Subscription {
    if (!this.events.has(eventName)) {
      this.events.set(eventName, new Set());
    }
    const holders = this.events.get(eventName)!;
    const holder = { callback };
    holders.add(holder);

    return {
      release: () => {
        holders.delete(holder);
      },
    };
  }

  emit(eventName: string, ...args: unknown[]): void {
    const holders = this.events.get(eventName);
    if (!holders) return;
    // Snapshot so releasing during emit doesn't disturb the current dispatch.
    [...holders].forEach((holder) => holder.callback(...args));
  }
}
