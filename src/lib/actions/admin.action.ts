'use server';

import { revalidatePath } from 'next/cache';
import { adminService } from '../api/admin/admin.service';
import { CreateProductDto } from '../api/admin/admin.type';

export const deleteProduct = async (productId: string) => {
  try {
    await adminService.deleteProductById(productId);
    revalidatePath('/admin/product');
    return { success: true };
  } catch {
    return { success: false, code: 'DELETE_PRODUCT_FAILED' };
  }
};

export const createProduct = async (createProductDto: CreateProductDto) => {
  try {
    await adminService.createProduct(createProductDto);
    revalidatePath('/');
    return { success: true };
  } catch {
    return { success: false, code: 'CREATE_PRODUCT_FAILED' };
  }
};

export const banUser = async (userId: string, isActive: boolean) => {
  try {
    await adminService.banUser(userId, isActive);
    revalidatePath('/admin/manage-user');
    return { success: true };
  } catch {
    return { success: false, code: 'BAN_USER_FAILED' };
  }
};
