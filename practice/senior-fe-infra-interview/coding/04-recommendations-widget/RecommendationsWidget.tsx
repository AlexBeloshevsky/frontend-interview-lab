import React from "react";
import { Product } from "./types";
import { ProductCard } from "./components/productCard/ProductCard";
import { useRecommendations } from "./hooks/useRecommendations";
import { useExperiment } from "./hooks/useExperiment";
import { experiment } from "./consts";

type RecommendationsWidgetProps = {
  fetchRecommendations?: (prodNum: number) => Promise<Product[]>;
  onSelect?: (product: Product) => void;
  prodNum?: number | undefined;
  userId: string;
};

export const RecommendationsWidget = ({
  fetchRecommendations,
  onSelect,
  prodNum,
  userId,
}: RecommendationsWidgetProps) => {
  const { products, status, error } = useRecommendations({
    fetchRecommendations,
    prodNum,
  });

  const isInExperiment = useExperiment(experiment, userId);

  if (status === "loading") {
    return <div>Loading..</div>;
  }

  if (status === "error")
    return <div>Couldn't load recommendations. Error: {String(error)}</div>;

  if (status === "success" && products.length === 0)
    return <div>No recommendations</div>;

  return (
    // <ErrorBoundary fallback={<div>Error: {String(err)}</div>}>
    <>
      {isInExperiment === "treatment" ? (
        <div>In treatment</div>
      ) : (
        <div>Not in experiment</div>
      )}
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <ProductCard
              product={product}
              onClick={() => onSelect?.(product)}
            />
          </li>
        ))}
      </ul>
    </>
    // </ErrorBoundary>
  );
};
