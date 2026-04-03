import { api } from '../client';
import {
  CreateProductDto,
  GetAllUserResponse,
  ProductResponse,
  UpdateProductDto,
} from './admin.type';

type GetAllUsersParams = {
  search?: string;
  page?: number;
  limit?: number;
};

const getAllUsers = async (params?: GetAllUsersParams) => {
  const query = new URLSearchParams();

  if (params?.search) {
    query.append('search', params.search);
  }

  if (params?.page) {
    query.append('page', params.page.toString());
  }

  if (params?.limit) {
    query.append('limit', params.limit.toString());
  }

  const path = `user${query.toString() ? `?${query.toString()}` : ''}`;

  const res = await api.get<GetAllUserResponse>(path);
  return {
    data: res.users,
    meta: res.meta,
  };
};

const banUser = async (userId: string, isActive: boolean) =>
  api.patch(`user/${userId}/status`, { isActive });

const getAllProduct = (search: string | string[] | undefined) => {
  let path = 'products';
  if (typeof search === 'string') {
    path += `?search=${encodeURIComponent(search)}`;
  }
  return api.get<ProductResponse>(path);
};

const createProduct = (data: CreateProductDto) => {
  const formData = new FormData();

  // append fields ธรรมดา
  formData.append('name', data.name);
  formData.append('description', data.description);
  formData.append('price', data.price.toString());
  formData.append('stock', data.stock.toString());
  formData.append('stoneType', data.stoneType);
  formData.append('benefit', data.benefit);

  // append files (สำคัญมาก!)
  data.images.forEach((file) => {
    formData.append('images', file);
  });
  return api.post('products', formData);
};

const updateProduct = (updateProductDto: UpdateProductDto) =>
  api.patch(`products/${updateProductDto.id}`);

const deleteProductById = (id: string) => api.delete(`products/${id}`);

export const adminService = {
  getAllProduct,
  createProduct,
  updateProduct,
  deleteProductById,
  getAllUsers,
  banUser,
};
