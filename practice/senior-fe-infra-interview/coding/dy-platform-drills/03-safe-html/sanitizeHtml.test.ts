import { describe, expect, it } from "vitest";
import { sanitizeHtml } from "./sanitizeHtml";

describe("sanitizeHtml", () => {
  it("keeps allowed tags and their text", () => {
    const out = sanitizeHtml("<p>Hello <strong>world</strong></p>").toLowerCase();
    expect(out).toContain("<p>");
    expect(out).toContain("<strong>");
    expect(out).toContain("hello");
    expect(out).toContain("world");
  });

  it("removes <script> tags", () => {
    const out = sanitizeHtml("<p>hi</p><script>alert(1)</script>");
    expect(out.toLowerCase()).not.toContain("<script");
    expect(out).toContain("hi");
  });

  it("strips inline event-handler attributes", () => {
    const out = sanitizeHtml('<img src="x" onerror="alert(1)">').toLowerCase();
    expect(out).not.toContain("onerror");
  });

  it("blocks javascript: URLs but keeps safe hrefs", () => {
    const bad = sanitizeHtml('<a href="javascript:alert(1)">x</a>').toLowerCase();
    expect(bad).not.toContain("javascript:");

    const good = sanitizeHtml('<a href="https://example.com">x</a>');
    expect(good).toContain("https://example.com");
  });

  it("unwraps disallowed tags but keeps their text", () => {
    const out = sanitizeHtml("<div><b>keep me</b></div>", {
      allowedTags: ["b"],
    }).toLowerCase();

    expect(out).not.toContain("<div");
    expect(out).toContain("<b>");
    expect(out).toContain("keep me");
  });
});
