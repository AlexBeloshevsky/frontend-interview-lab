import React, { useState } from "react";
import { ProductProps, ProductType } from "./types";
import { useProducts } from "./useProducts";

const Product = ({ product }: ProductProps) => {
  return (
    <>
      <div>
        <p>
          image: <img width={120} src={product.images[0]} alt={product.title} />
        </p>
        <p>Title: {product.title}</p>
        <p>Category: {product.category}</p>
        <p>Price: {product.price}</p>
      </div>
    </>
  );
};

export const ProductList = () => {
  const { products, status, error } = useProducts();
  const [filterValue, setFilterValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const categories = Array.from(
    new Set(products.map((product) => product.category)),
  );

  if (status === "loading") {
    return <p>Loading..</p>;
  }

  if (status === "failure") {
    return <p>Encountered error: {error}</p>;
  }

  const filteredProducts = products.filter((product) => {
    const matchesTitle = product.title
      .toLowerCase()
      .includes(filterValue.toLowerCase());

    const matchesCategory =
      selectedCategory === "" || product.category === selectedCategory;

    return matchesTitle && matchesCategory;
  });

  return (
    <>
      <div>
        <h1>filter:</h1>
        <input
          type="text"
          value={filterValue}
          onChange={(event) => {
            setFilterValue(event.target.value);
          }}
        />

        <select
          name="category"
          id="category"
          value={selectedCategory}
          onChange={(event) => setSelectedCategory(event.target.value)}
        >
          <option value="">All categories</option>

          {categories.map((category) => {
            return (
              <option key={category} value={category}>
                {category}
              </option>
            );
          })}
        </select>
      </div>

      <div>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product: ProductType) => (
            <Product product={product} key={product.id} />
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </>
  );
};
