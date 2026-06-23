/**
 * 36. create a fake timer (setTimeout) — medium
 * https://bigfrontend.dev/problem/create-a-fake-timer
 *
 * Reference solution. See NOTES.md for the idea.
 */

interface ScheduledTask {
  id: number;
  callback: () => void;
  time: number;
}

export class FakeTimer {
  private now = 0;
  private nextId = 0;
  private tasks: ScheduledTask[] = [];
  private original: {
    setTimeout: typeof globalThis.setTimeout;
    clearTimeout: typeof globalThis.clearTimeout;
    dateNow: typeof Date.now;
  } | null = null;

  install(): void {
    this.original = {
      setTimeout: globalThis.setTimeout,
      clearTimeout: globalThis.clearTimeout,
      dateNow: Date.now,
    };
    this.now = 0;
    this.nextId = 0;
    this.tasks = [];

    globalThis.setTimeout = ((callback: () => void, delay = 0): number => {
      const id = ++this.nextId;
      this.tasks.push({ id, callback, time: this.now + delay });
      return id;
    }) as unknown as typeof globalThis.setTimeout;

    globalThis.clearTimeout = ((id?: number): void => {
      this.tasks = this.tasks.filter((task) => task.id !== id);
    }) as unknown as typeof globalThis.clearTimeout;

    Date.now = () => this.now;
  }

  uninstall(): void {
    if (!this.original) return;
    globalThis.setTimeout = this.original.setTimeout;
    globalThis.clearTimeout = this.original.clearTimeout;
    Date.now = this.original.dateNow;
    this.original = null;
  }

  tick(): void {
    while (this.tasks.length > 0) {
      let earliest = 0;
      for (let i = 1; i < this.tasks.length; i++) {
        const candidate = this.tasks[i];
        const current = this.tasks[earliest];
        if (
          candidate.time < current.time ||
          (candidate.time === current.time && candidate.id < current.id)
        ) {
          earliest = i;
        }
      }
      const [task] = this.tasks.splice(earliest, 1);
      this.now = task.time;
      task.callback();
    }
  }
}
