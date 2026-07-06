import React from "react";
import { Product } from "../../types";
import styles from "./style.module.css";

type ProductCardProps = {
  product: Product;
  onClick: () => void;
};

export const ProductCard = ({ product, onClick }: ProductCardProps) => (
  <div
    className={styles.card}
    onClick={onClick}
    role="button"
    tabIndex={0}
    onKeyDown={(e) => {
      if (e.key === "Enter" || e.key === " ") {
        onClick();
      }
    }}
  >
    <div>{product.title}</div>
    <img
      src={product.image}
      alt={product.title}
      width={100}
      height={100}
      loading="lazy"
    />
    <div>${product.price}</div>
  </div>
);
