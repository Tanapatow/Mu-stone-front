"use server";

import { revalidatePath } from "next/cache";
import { adminService } from "../api/admin/admin.service";
import { CreateProductDto, UpdateProductDto } from "../api/admin/admin.type";

export const updateProduct = async (
  data: UpdateProductDto,
  productId: string,
) => {
  try {
    await adminService.updateProduct(data, productId);
    revalidatePath("/admin/product");
    return { success: true };
  } catch {
    return { success: false, code: "UPDATE_PRODUCT_FAILED" };
  }
};

export const deleteProduct = async (productId: string) => {
  try {
    await adminService.deleteProductById(productId);
    revalidatePath("/admin/product");
    return { success: true };
  } catch {
    return { success: false, code: "DELETE_PRODUCT_FAILED" };
  }
};

export const createProduct = async (createProductDto: CreateProductDto) => {
  try {
    await adminService.createProduct(createProductDto);
    revalidatePath("/");
    return { success: true };
  } catch {
    return { success: false, code: "CREATE_PRODUCT_FAILED" };
  }
};

export const banUser = async (userId: string, isActive: boolean) => {
  try {
    const result = await adminService.banUser(userId, isActive);
    console.log("banUser result:", result);
    revalidatePath("/admin/manage-user", "layout");
    return { success: true };
  } catch (e) {
    console.log("banUser error:", e);
    return { success: false, code: "BAN_USER_FAILED" };
  }
};
