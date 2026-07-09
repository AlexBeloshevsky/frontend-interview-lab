/**
 * Reference solution — Drill 3. Study this, don't copy blindly into interviews;
 * say "in production I'd use DOMPurify."
 */

export interface SanitizeOptions {
  allowedTags?: string[];
  allowedAttrs?: string[];
}

const DEFAULT_TAGS = [
  "a",
  "b",
  "i",
  "em",
  "strong",
  "p",
  "ul",
  "ol",
  "li",
  "span",
  "br",
];
const DEFAULT_ATTRS = ["href", "title"];

/** Block dangerous URL schemes (javascript:, data:, vbscript:). */
function isSafeUrl(url: string): boolean {
  const scheme = url.trim().toLowerCase().replace(/\s+/g, "");
  return (
    !scheme.startsWith("javascript:") &&
    !scheme.startsWith("data:") &&
    !scheme.startsWith("vbscript:")
  );
}

function sanitizeNode(
  node: Node,
  allowedTags: Set<string>,
  allowedAttrs: Set<string>,
): Node {
  if (node.nodeType === Node.TEXT_NODE) {
    return node.cloneNode(false);
  }

  if (node.nodeType !== Node.ELEMENT_NODE) {
    return document.createDocumentFragment();
  }

  const el = node as Element;
  const tag = el.tagName.toLowerCase();

  // Drop script/style entirely — never unwrap their contents into the page
  if (tag === "script" || tag === "style") {
    return document.createDocumentFragment();
  }

  // Disallowed tag → unwrap: keep sanitized children, drop the wrapper
  if (!allowedTags.has(tag)) {
    const frag = document.createDocumentFragment();
    for (const child of [...el.childNodes]) {
      frag.appendChild(sanitizeNode(child, allowedTags, allowedAttrs));
    }
    return frag;
  }

  // Allowed tag → recreate clean element with filtered attrs + sanitized children
  const clean = document.createElement(tag);
  for (const attr of [...el.attributes]) {
    const name = attr.name.toLowerCase();
    if (name.startsWith("on")) continue;
    if (!allowedAttrs.has(name)) continue;
    if ((name === "href" || name === "src") && !isSafeUrl(attr.value)) continue;
    clean.setAttribute(attr.name, attr.value);
  }

  for (const child of [...el.childNodes]) {
    clean.appendChild(sanitizeNode(child, allowedTags, allowedAttrs));
  }

  return clean;
}

export function sanitizeHtml(dirty: string, opts?: SanitizeOptions): string {
  const allowedTags = new Set(
    (opts?.allowedTags ?? DEFAULT_TAGS).map((t) => t.toLowerCase()),
  );
  const allowedAttrs = new Set(
    (opts?.allowedAttrs ?? DEFAULT_ATTRS).map((a) => a.toLowerCase()),
  );

  const tpl = document.createElement("template");
  tpl.innerHTML = dirty;

  const out = document.createElement("div");
  for (const child of [...tpl.content.childNodes]) {
    out.appendChild(sanitizeNode(child, allowedTags, allowedAttrs));
  }

  return out.innerHTML;
}
