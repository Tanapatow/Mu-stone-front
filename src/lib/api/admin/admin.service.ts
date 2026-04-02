import { api } from '../client';
import { ProductResponse } from './admin.type';

const getAllProduct = () => api.get<ProductResponse>('products');

const deleteProductById = (id: string) => {
  console.log('id', id);
  return api.delete(`products/${id}`);
};

export const adminService = { getAllProduct, deleteProductById };
