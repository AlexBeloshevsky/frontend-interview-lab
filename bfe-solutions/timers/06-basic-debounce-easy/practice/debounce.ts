/**
 * 6. implement basic debounce() — easy
 * https://bigfrontend.dev/problem/implement-basic-debounce
 *
 * `debounce(fn, wait)` returns a debounced function that delays invoking `fn`
 * until `wait` ms have elapsed since the last time it was called. Only the
 * latest call's arguments are used.
 *
 *   ─ A ─ B ─ C ─ ─ D ─ ─ ─ ─ ─ ─ E ─ ─ F ─ G
 *
 * debounced at wait = 3:
 *
 *   ─ ─ ─ ─ ─ ─ ─ ─ D ─ ─ ─ ─ ─ ─ ─ ─ ─ G
 */

export function debounce<A extends unknown[]>(
  fn: (...args: A) => void,
  wait: number,
): (...args: A) => void {
  let timer: ReturnType<typeof setTimeout>;
  return function debounced(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, wait);
  };
}
