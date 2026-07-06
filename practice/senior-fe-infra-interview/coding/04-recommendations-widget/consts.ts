import type { Variant } from "./hooks/useExperiment";

export const api = "https://fakestoreapi.com/products";

export const defaultProdNum = 10;

export const experiment = {
  name: "recommendations-widget",
  variants: ["control", "treatment"] as Variant[],
};
