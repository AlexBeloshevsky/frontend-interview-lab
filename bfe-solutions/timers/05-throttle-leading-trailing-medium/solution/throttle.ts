/**
 * 5. implement throttle() with leading & trailing option — medium
 * https://bigfrontend.dev/problem/implement-throttle-with-leading-and-trailing-option
 *
 * Reference solution. See NOTES.md for the idea.
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
  let timer: ReturnType<typeof setTimeout> | null = null;
  let pendingArgs: A | null = null;

  const startCooldown = () => {
    timer = setTimeout(() => {
      if (trailing && pendingArgs) {
        fn(...pendingArgs);
        pendingArgs = null;
        startCooldown();
      } else {
        timer = null;
      }
    }, wait);
  };

  return function (...args: A) {
    if (timer) {
      pendingArgs = args;
      return;
    }
    if (leading) {
      fn(...args);
    } else {
      pendingArgs = args;
    }
    startCooldown();
  };
}
