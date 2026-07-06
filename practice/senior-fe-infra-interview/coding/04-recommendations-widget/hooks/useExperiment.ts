import { useEffect } from "react";
export type Variant = "control" | "treatment";

export interface Experiment {
  name: string;
  variants: Variant[];
}

function djb2Hash(str: string) {
  let hash = 5381; // Seed value
  for (let i = 0; i < str.length; i++) {
    // Equivalent to: hash * 33 + charCode
    hash = (hash << 5) + hash + str.charCodeAt(i);
  }
  return hash >>> 0; // Convert to a 32-bit unsigned integer
}

export const useExperiment = (
  experiment: Experiment,
  userId: string,
  onExposure?: (info: {
    experiment: string;
    variant: "control" | "treatment";
    userId: string;
  }) => void,
): Variant => {
  const variant =
    experiment.variants[
      djb2Hash(`${experiment.name}:${userId}`) % experiment.variants.length
    ];

  useEffect(() => {
    if (onExposure) {
      onExposure({ experiment: experiment.name, variant, userId });
    }
  }, [variant, userId, experiment.name, onExposure]);

  return variant;
};
