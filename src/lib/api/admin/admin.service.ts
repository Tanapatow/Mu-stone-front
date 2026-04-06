import { api } from "../client";
import {
  CreateProductDto,
  GetAllUserResponse,
  ProductResponse,
  UpdateProductDto,
} from "./admin.type";

export type UserFilter = {
  search?: string;
  page?: number;
  limit?: number;
};

const getAllUsers = async (params?: UserFilter) => {
  const query = new URLSearchParams();

  if (params?.search) {
    query.append("search", params.search);
  }

  if (params?.page) {
    query.append("page", params.page.toString());
  }

  if (params?.limit) {
    query.append("limit", params.limit.toString());
  }

  const path = `user${query.toString() ? `?${query.toString()}` : ""}`;

  const res = await api.get<GetAllUserResponse>(path);
  return {
    data: res.users,
    meta: res.meta,
  };
};

const banUser = async (userId: string, isActive: boolean) =>
  api.patch(`user/${userId}/status`, { isActive });

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

const getAllProduct = (filter: ProductFilter = {}) => {
  return api.get<ProductResponse>(`products?${buildQuery(filter)}`);
};

const createProduct = (data: CreateProductDto) => {
  const formData = new FormData();

  // append fields ธรรมดา
  formData.append("name", data.name);
  formData.append("description", data.description);
  formData.append("price", data.price.toString());
  formData.append("stock", data.stock.toString());
  formData.append("stoneType", data.stoneType);
  formData.append("benefit", data.benefit);

  // append files (สำคัญมาก!)
  data.images.forEach((file) => {
    formData.append("images", file);
  });
  return api.post("products", formData);
};

const updateProduct = (product: UpdateProductDto, productId: string) => {
  const formData = new FormData();

  Object.entries(product).forEach(([key, value]) => {
    if (value !== undefined && key !== "images") {
      formData.append(key, value.toString());
    }
  });

  if (product.images) {
    Array.from(product.images).forEach((file) => {
      formData.append("images", file);
    });
  }
  return api.patch(`products/${productId}`, formData);
};

const deleteProductById = (id: string) => api.delete(`products/${id}`);

const getUserStats = async () => {
  return api.get<{ totalItems: number; activeCount: number }>("user/stats");
};

export const adminService = {
  getAllProduct,
  createProduct,
  updateProduct,
  deleteProductById,
  getAllUsers,
  banUser,
  getUserStats, // เพิ่มตรงนี้
};
