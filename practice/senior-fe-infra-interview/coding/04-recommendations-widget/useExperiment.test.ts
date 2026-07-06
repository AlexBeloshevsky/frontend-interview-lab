import { renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useExperiment } from "./hooks/useExperiment";

const experiment = {
  name: "reco-layout",
  variants: ["control", "treatment"] as const,
};

describe("useExperiment", () => {
  it("returns one of the declared variants", () => {
    const { result } = renderHook(() => useExperiment(experiment, "user-1"));
    expect(experiment.variants).toContain(result.current);
  });

  it("is deterministic: same experiment + user always maps to the same variant", () => {
    const a = renderHook(() => useExperiment(experiment, "user-42")).result
      .current;
    const b = renderHook(() => useExperiment(experiment, "user-42")).result
      .current;
    expect(a).toBe(b);
  });

  it("spreads users across all variants", () => {
    const seen = new Set<string>();
    for (let i = 0; i < 100; i++) {
      const { result } = renderHook(() =>
        useExperiment(experiment, `user-${i}`),
      );
      seen.add(result.current);
    }
    expect(seen).toEqual(new Set(experiment.variants));
  });

  it("fires onExposure once with the assigned variant (not on every render)", () => {
    const onExposure = vi.fn();
    const { result, rerender } = renderHook(() =>
      useExperiment(experiment, "user-1", onExposure),
    );

    rerender();
    rerender();

    expect(onExposure).toHaveBeenCalledTimes(1);
    expect(onExposure).toHaveBeenCalledWith(
      expect.objectContaining({
        experiment: "reco-layout",
        variant: result.current,
        userId: "user-1",
      }),
    );
  });
});
