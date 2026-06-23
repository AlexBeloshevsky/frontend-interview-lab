/**
 * 4. implement basic throttle() — medium
 * https://bigfrontend.dev/problem/implement-basic-throttle
 *
 * `throttle(fn, wait)` returns a throttled function that invokes `fn` at most
 * once per `wait` ms. The first call fires immediately; calls during the
 * cooldown are swallowed except the last, which fires when the cooldown ends.
 *
 *   ─ A ─ B ─ C ─ ─ D ─ ─ ─ ─ ─ ─ E ─ ─ F ─ G
 *
 * throttled at wait = 3:
 *
 *   ─ A ─ ─ ─ C ─ ─ ─ D ─ ─ ─ ─ E ─ ─ ─ G
 */

export function throttle<A extends unknown[]>(
  fn: (...args: A) => void,
  wait: number,
): (...args: A) => void {
  let timer;
  let pendingArgs;
  function startCooldown() {
    timer = setTimeout(() => {
      if (pendingArgs) {
        fn(...pendingArgs);
        pendingArgs = null;
        startCooldown();
      } else {
        timer = null;
      }
    }, wait);
  }

  return function (...args) {
    if (timer) {
      pendingArgs = args;
      return;
    }
    fn(...args);
    startCooldown();
  };
}
