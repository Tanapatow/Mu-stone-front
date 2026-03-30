import { api } from "../client";
import type { Product, ProductListResponse } from "./product.type";

export type ProductFilter = {
  page?: number;
  limit?: number;
  search?: string;
  stoneType?: string;
  sortBy?: "price" | "createdAt" | "stock";
  order?: "asc" | "desc";
};

const buildQuery = (filter: ProductFilter) => {
  const params = new URLSearchParams();
  Object.entries(filter).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      params.set(key, String(value));
    }
  });
  return params.toString();
};

const getAll = (filter: ProductFilter = {}) =>
  api.get<ProductListResponse>(`products?${buildQuery(filter)}`);

const getById = (id: string) => api.get<{ data: Product }>(`products/${id}`);

export const productService = { getAll, getById };
