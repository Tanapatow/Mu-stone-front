export type ProductImage = {
  id: string;
  url: string;
  isMain: boolean;
  displayOrder: number;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  stoneType: string;
  benefit: string;
  isActive: boolean;
  images: ProductImage[];
  createdAt: string;
};

export type ProductMeta = {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export type ProductListResponse = {
  data: Product[];
  meta: ProductMeta;
};
