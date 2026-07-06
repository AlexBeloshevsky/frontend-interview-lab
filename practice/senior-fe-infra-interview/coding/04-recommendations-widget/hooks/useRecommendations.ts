import { useState, useEffect } from "react";
import { Product, Status } from "../types";
import { api, defaultProdNum } from "../consts";

type UseRecommendationsProps = {
  fetchRecommendations?: (
    prodNum: number,
    signal?: AbortSignal,
  ) => Promise<Product[]>;
  prodNum?: number;
};

const defaultFetch = (prodNum: number, signal?: AbortSignal) =>
  fetch(`${api}?limit=${prodNum}`, { signal }).then((res) => {
    if (!res.ok) {
      throw new Error("something went wrong");
    }
    return res.json();
  });

export const useRecommendations = ({
  fetchRecommendations = defaultFetch,
  prodNum = defaultProdNum,
}: UseRecommendationsProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [status, setStatus] = useState<Status>("loading");
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const abortController = new AbortController();
    fetchRecommendations(prodNum, abortController.signal)
      .then((data) => {
        if (!abortController.signal.aborted) {
          setProducts(data);
          setStatus("success");
        }
      })
      .catch((err) => {
        if (!abortController.signal.aborted) {
          setStatus("error");
          setError(err);
        }
      });
    return () => {
      abortController.abort();
    };
  }, [fetchRecommendations, prodNum]);

  return {
    products,
    status,
    error,
  };
};
