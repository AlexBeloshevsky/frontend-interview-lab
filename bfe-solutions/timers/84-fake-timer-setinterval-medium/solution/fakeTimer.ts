/**
 * 84. create a fake timer (setInterval) — medium
 * https://bigfrontend.dev/problem/create-a-fake-timer-setInterval
 *
 * Reference solution. See NOTES.md for the idea.
 */

interface IntervalTask {
  id: number;
  callback: () => void;
  interval: number;
  time: number;
}

export class FakeTimer {
  private now = 0;
  private nextId = 0;
  private tasks: IntervalTask[] = [];
  private original: {
    setInterval: typeof globalThis.setInterval;
    clearInterval: typeof globalThis.clearInterval;
    dateNow: typeof Date.now;
  } | null = null;

  install(): void {
    this.original = {
      setInterval: globalThis.setInterval,
      clearInterval: globalThis.clearInterval,
      dateNow: Date.now,
    };
    this.now = 0;
    this.nextId = 0;
    this.tasks = [];

    globalThis.setInterval = ((callback: () => void, interval = 0): number => {
      const id = ++this.nextId;
      this.tasks.push({ id, callback, interval, time: this.now + interval });
      return id;
    }) as unknown as typeof globalThis.setInterval;

    globalThis.clearInterval = ((id?: number): void => {
      this.tasks = this.tasks.filter((task) => task.id !== id);
    }) as unknown as typeof globalThis.clearInterval;

    Date.now = () => this.now;
  }

  uninstall(): void {
    if (!this.original) return;
    globalThis.setInterval = this.original.setInterval;
    globalThis.clearInterval = this.original.clearInterval;
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
      const task = this.tasks[earliest];
      this.now = task.time;
      task.callback();
      // If the callback didn't clearInterval itself, schedule its next run.
      if (this.tasks.indexOf(task) !== -1) {
        task.time += task.interval;
      }
    }
  }
}
