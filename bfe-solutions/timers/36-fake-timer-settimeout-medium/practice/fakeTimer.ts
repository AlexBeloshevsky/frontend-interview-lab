/**
 * 36. create a fake timer (setTimeout) — medium
 * https://bigfrontend.dev/problem/create-a-fake-timer
 *
 * Implement your own sync `setTimeout()`/`clearTimeout()` (and `Date.now()`) so
 * that timing is accurate for tests. Starting at time 0, `setTimeout(fn, 100)`
 * should schedule `fn` at exactly 100.
 *
 *   class FakeTimer {
 *     install()   // replace setTimeout, clearTimeout, Date.now
 *     uninstall() // restore the originals
 *     tick()      // run all scheduled functions in order
 *   }
 *
 *   const fakeTimer = new FakeTimer()
 *   fakeTimer.install()
 *   const logs = []
 *   const log = (arg) => logs.push([Date.now(), arg])
 *   setTimeout(() => log('A'), 100)
 *   const b = setTimeout(() => log('B'), 110)
 *   clearTimeout(b)
 *   setTimeout(() => log('C'), 200)
 *   fakeTimer.tick()
 *   fakeTimer.uninstall()
 *   // logs === [[100, 'A'], [200, 'C']]
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
    // TODO: replace setTimeout, clearTimeout, and Date.now
    throw new Error("Not implemented");
  }

  uninstall(): void {
    // TODO: restore the original setTimeout, clearTimeout, and Date.now
    throw new Error("Not implemented");
  }

  tick(): void {
    // TODO: run all scheduled functions in order
    throw new Error("Not implemented");
  }
}
