/**
 * 4. implement basic throttle() — medium
 * https://bigfrontend.dev/problem/implement-basic-throttle
 *
 * Reference solution. See NOTES.md for the idea.
 */

export function throttle<A extends unknown[]>(
  fn: (...args: A) => void,
  wait: number,
): (...args: A) => void {
  let timer: ReturnType<typeof setTimeout> | null = null;
  let pendingArgs: A | null = null;

  const startCooldown = () => {
    timer = setTimeout(() => {
      if (pendingArgs) {
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
    fn(...args);
    startCooldown();
  };
}
