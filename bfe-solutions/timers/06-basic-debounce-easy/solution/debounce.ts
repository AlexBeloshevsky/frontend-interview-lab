/**
 * 6. implement basic debounce() — easy
 * https://bigfrontend.dev/problem/implement-basic-debounce
 *
 * Reference solution. See NOTES.md for the idea.
 */

export function debounce<A extends unknown[]>(
  fn: (...args: A) => void,
  wait: number,
): (...args: A) => void {
  let timer: ReturnType<typeof setTimeout> | undefined;

  return function (...args: A) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = undefined;
      fn(...args);
    }, wait);
  };
}
