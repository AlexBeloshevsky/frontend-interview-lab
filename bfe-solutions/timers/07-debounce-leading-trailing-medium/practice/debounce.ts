/**
 * 7. implement debounce() with leading & trailing option — medium
 * https://bigfrontend.dev/problem/implement-debounce-with-leading-and-trailing-option
 *
 * Follow-up on #6. `debounce(fn, wait, { leading, trailing })`:
 *   - leading:  whether to invoke right away (on the first call of a burst)
 *   - trailing: whether to invoke after the wait elapses
 *
 * Basic debounce (#6) is the default case: { leading: false, trailing: true }.
 *
 * For calls A@0, B@2, C@3 with wait 3:
 *   { leading: false, trailing: true }  -> C@6
 *   { leading: true,  trailing: true }  -> A@0, C@6
 *   { leading: true,  trailing: false } -> A@0
 *   { leading: false, trailing: false } -> (nothing)
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
  // TODO: implement
  throw new Error("Not implemented");
}
