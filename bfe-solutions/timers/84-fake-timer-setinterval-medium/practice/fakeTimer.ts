/**
 * 84. create a fake timer (setInterval) — medium
 * https://bigfrontend.dev/problem/create-a-fake-timer-setInterval
 *
 * Follow-up on #36. Implement your own sync `setInterval()`/`clearInterval()`
 * (and `Date.now()`). Starting at 0, `setInterval(fn, 100)` should schedule `fn`
 * at exactly 100, 200, 300, ... Be careful about infinite loops.
 *
 *   class FakeTimer {
 *     install()   // replace setInterval, clearInterval, Date.now
 *     uninstall() // restore the originals
 *     tick()      // run the scheduled functions without waiting
 *   }
 *
 *   const fakeTimer = new FakeTimer()
 *   fakeTimer.install()
 *   const logs = []
 *   const log = () => logs.push(Date.now())
 *   let count = 0
 *   const id = setInterval(() => {
 *     if (count > 1) clearInterval(id)
 *     else log()
 *     count += 1
 *   }, 100)
 *   fakeTimer.tick()
 *   fakeTimer.uninstall()
 *   // logs === [100, 200]
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
    // TODO: replace setInterval, clearInterval, and Date.now
    throw new Error("Not implemented");
  }

  uninstall(): void {
    // TODO: restore the original setInterval, clearInterval, and Date.now
    throw new Error("Not implemented");
  }

  tick(): void {
    // TODO: run the scheduled functions in order (watch out for infinite loops)
    throw new Error("Not implemented");
  }
}
