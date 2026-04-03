import { api } from "../../client";
import type { Address } from "./address.type";

const getAddresses = () => api.get<Address[]>("user/addresses");
const createAddress = (
  data: Omit<Address, "id" | "userId" | "createdAt" | "updatedAt">,
) => api.post<Address>("user/address", data);
const updateAddress = (
  addressId: string,
  data: Partial<Omit<Address, "id" | "userId" | "createdAt" | "updatedAt">>,
) => api.patch<Address>(`user/address/${addressId}`, data);
const setDefault = (addressId: string) =>
  api.patch<Address>(`user/address/${addressId}/default`, {});
const deleteAddress = (addressId: string) =>
  api.delete<void>(`user/address/${addressId}`);

export const addressService = {
  getAddresses,
  createAddress,
  updateAddress,
  setDefault,
  deleteAddress,
};
