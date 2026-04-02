export type ProductImage = {
  id: string;
  url: string;
  isMain: boolean;
  displayOrder: number;
  productId: string;
  createdAt: string;
  updatedAt: string;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: string;
  stock: number;
  stoneType: string;
  benefit: string;
  isActive: true;
  images: ProductImage[];
};

export type ProductResponse = {
  data: Product[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
};
