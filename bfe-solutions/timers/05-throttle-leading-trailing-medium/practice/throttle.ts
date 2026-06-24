/**
 * 5. implement throttle() with leading & trailing option — medium
 * https://bigfrontend.dev/problem/implement-throttle-with-leading-and-trailing-option
 *
 * Follow-up on #4. `throttle(fn, wait, { leading, trailing })`:
 *   - leading:  whether to invoke right away
 *   - trailing: whether to invoke after the cooldown
 *
 * Basic throttle (#4) is the default case: { leading: true, trailing: true }.
 *
 * For A B C D ... E F G with wait 3:
 *   { leading: true,  trailing: true }  -> A C D E G
 *   { leading: false, trailing: true }  -> C D G      (A, E swallowed)
 *   { leading: true,  trailing: false } -> A D E
 *   { leading: false, trailing: false } -> (nothing)
 */

interface ThrottleOptions {
  leading?: boolean;
  trailing?: boolean;
}

export function throttle<A extends unknown[]>(
  fn: (...args: A) => void,
  wait: number,
  { leading = true, trailing = true }: ThrottleOptions = {},
): (...args: A) => void {
  let timer;
  let trailingArgs;
  function startCooldown() {
    timer = setTimeout(() => {
      if (trailingArgs) {
        if (trailing) fn(...trailingArgs);
        trailingArgs = null;
        startCooldown();
      } else {
        timer = null;
      }
    }, wait);
  }

  return function (...args) {
    if (timer) {
      trailingArgs = args;
      return;
    }
    if (leading) fn(...args);
    startCooldown();
  };
}
