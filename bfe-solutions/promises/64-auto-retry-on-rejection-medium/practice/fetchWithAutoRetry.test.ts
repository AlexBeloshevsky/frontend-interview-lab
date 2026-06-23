import { describe, expect, it, vi } from "vitest";
import { fetchWithAutoRetry } from "./fetchWithAutoRetry";

describe("fetchWithAutoRetry()", () => {
  it("resolves without retrying when the fetcher succeeds", async () => {
    const fetcher = vi.fn().mockResolvedValue("ok");
    await expect(fetchWithAutoRetry(fetcher, 3)).resolves.toBe("ok");
    expect(fetcher).toHaveBeenCalledTimes(1);
  });

  it("retries until the fetcher succeeds", async () => {
    const fetcher = vi
      .fn()
      .mockRejectedValueOnce(new Error("fail 1"))
      .mockRejectedValueOnce(new Error("fail 2"))
      .mockResolvedValue("ok");

    await expect(fetchWithAutoRetry(fetcher, 3)).resolves.toBe("ok");
    expect(fetcher).toHaveBeenCalledTimes(3);
  });

  it("rejects after exhausting all retries", async () => {
    const fetcher = vi.fn().mockRejectedValue(new Error("nope"));
    await expect(fetchWithAutoRetry(fetcher, 2)).rejects.toThrow("nope");
    expect(fetcher).toHaveBeenCalledTimes(3); // initial call + 2 retries
  });

  it("does not retry when maximumRetryCount is 0", async () => {
    const fetcher = vi.fn().mockRejectedValue(new Error("once"));
    await expect(fetchWithAutoRetry(fetcher, 0)).rejects.toThrow("once");
    expect(fetcher).toHaveBeenCalledTimes(1);
  });
});
