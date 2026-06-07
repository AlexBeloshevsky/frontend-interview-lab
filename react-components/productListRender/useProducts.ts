import { useState, useEffect } from "react";
import { ProductType, Status, ProductsResponse } from "./types";

export const useProducts = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [status, setStatus] = useState<Status>("loading");
  const [error, setError] = useState<string>();

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => {
        if (!res.ok) {
          throw new Error("could not fetch products");
        }
        return res.json();
      })
      .then((res: ProductsResponse) => {
        setProducts(res.products);
        setStatus("success");
      })
      .catch((error) => {
        setError(error.message);
        setStatus("failure");
      });
  }, []);

  return {
    products,
    status,
    error,
  };
};
