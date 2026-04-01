import { api } from "../../client";
import { Address } from "./address.type";

const getAddress = () => api.get<Address | null>("user/address");

const upsertAddress = (data: Omit<Address, "id" | "userId">) =>
  api.put<Address>("user/address", data);

export const addressService = { getAddress, upsertAddress };
