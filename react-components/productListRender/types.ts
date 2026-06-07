export type Status = "loading" | "success" | "failure";

export type ProductType = {
  id: number;
  title: string;
  images: string[];
  category: string;
  price: number;
};

export type ProductProps = {
  product: ProductType;
};

export type ProductsResponse = {
  products: ProductType[];
};
