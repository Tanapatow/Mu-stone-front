import { api } from '../client';
import { CreateProductDto, ProductResponse } from './admin.type';

const getAllProduct = () => api.get<ProductResponse>('products');

const createProduct = (createProductDto: CreateProductDto) =>
  api.post('products', createProductDto);

const deleteProductById = (id: string) => {
  console.log('id', id);
  return api.delete(`products/${id}`);
};

export const adminService = { getAllProduct, createProduct, deleteProductById };
