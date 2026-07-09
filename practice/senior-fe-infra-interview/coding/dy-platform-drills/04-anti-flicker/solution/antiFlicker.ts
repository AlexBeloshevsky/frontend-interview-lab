/**
 * Reference solution — Drill 4.
 */

export interface AntiFlickerOptions {
  timeoutMs?: number;
  root?: HTMLElement;
}

export function hidePageUntil(
  ready: Promise<unknown>,
  opts?: AntiFlickerOptions,
): void {
  const { timeoutMs = 3000, root = document.documentElement } = opts ?? {};

  root.style.opacity = "0";

  let revealed = false;
  let timer: ReturnType<typeof setTimeout>;

  const reveal = () => {
    if (revealed) return;
    revealed = true;
    clearTimeout(timer);
    root.style.opacity = ""; // restore inherited opacity
  };

  timer = setTimeout(reveal, timeoutMs);
  ready.then(reveal, reveal); // reveal on success OR failure — never strand hidden
}
