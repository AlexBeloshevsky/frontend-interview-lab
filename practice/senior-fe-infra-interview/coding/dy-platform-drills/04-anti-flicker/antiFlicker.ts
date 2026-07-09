/**
 * Drill 4 — anti-flicker. See TASK.md.
 * Stub no-ops so tests fail on behavior, not imports.
 */

export interface AntiFlickerOptions {
  timeoutMs?: number;
  root?: HTMLElement;
}

export function hidePageUntil(
  ready: Promise<unknown>,
  opts?: AntiFlickerOptions,
): void {
  const { timeoutMs = 1000, root = document.body } = opts || {};
  root.style.opacity = "0";

  let revealed = false;
  let timer: ReturnType<typeof setTimeout>;

  const reveal = () => {
    if (revealed) return;
    revealed = true;
    root.style.opacity = "1";
    clearTimeout(timer);
  };

  timer = setTimeout(reveal, timeoutMs);

  ready.then(reveal).catch(reveal);
}
