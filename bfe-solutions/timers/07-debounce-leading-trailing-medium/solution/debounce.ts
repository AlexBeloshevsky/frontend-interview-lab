/**
 * 7. implement debounce() with leading & trailing option — medium
 * https://bigfrontend.dev/problem/implement-debounce-with-leading-and-trailing-option
 *
 * Reference solution. See NOTES.md for the idea.
 */

interface DebounceOptions {
  leading?: boolean;
  trailing?: boolean;
}

export function debounce<A extends unknown[]>(
  fn: (...args: A) => void,
  wait: number,
  { leading = false, trailing = true }: DebounceOptions = {},
): (...args: A) => void {
  let timer: ReturnType<typeof setTimeout> | null = null;
  let pendingArgs: A | null = null;

  return function (...args: A) {
    if (timer) {
      // Inside the wait window: remember the latest call for the trailing edge.
      pendingArgs = args;
    } else if (leading) {
      fn(...args);
    } else {
      pendingArgs = args;
    }

    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      if (trailing && pendingArgs) fn(...pendingArgs);
      pendingArgs = null;
      timer = null;
    }, wait);
  };
}
