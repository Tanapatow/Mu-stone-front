'use server';

import { revalidatePath } from 'next/cache';
import { adminService } from '../api/admin/admin.service';

export const deleteProduct = async (productId: string) => {
  try {
    await adminService.deleteProductById(productId);
    revalidatePath('/admin/product');
    return { success: true };
  } catch {
    return { success: false, code: 'DELETE_PRODUCT_FAILED' };
  }
};
