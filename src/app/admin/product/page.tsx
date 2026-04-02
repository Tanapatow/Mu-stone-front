import ProductCreate from '@/components/features/admin/product-management/product-create';
import ProductList from '@/components/features/admin/product-management/product-list';
import { adminService } from '@/lib/api/admin/admin.service';

export default async function ProductPage({
  searchParams,
}: PageProps<'/admin/product'>) {
  const { search } = await searchParams;
  const { data, meta } = await adminService.getAllProduct(search);
  return (
    <>
      <div className="flex justify-between gap-8 px-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-black md:text-4xl">
            สินค้า
          </h1>
          <p className="text-base text-neutral-700 md:text-lg">
            จัดการสินค้าคงคลัง
          </p>
        </div>
        <ProductCreate />
      </div>
      <ProductList data={data} meta={meta} />
    </>
  );
}
