import { api } from '../client';
import {
  CreateProductDto,
  ProductResponse,
  UpdateProductDto,
} from './admin.type';

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
};
