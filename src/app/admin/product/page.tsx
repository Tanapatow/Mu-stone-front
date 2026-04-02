import ProductList from '@/components/features/admin/product-management/product-list';
import { adminService } from '@/lib/api/admin/admin.service';

export default async function ProductPage() {
  const { data, meta } = await adminService.getAllProduct();
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
        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <button
            type="button"
            className="h-14 rounded-2xl bg-[#3b82f6] px-7 text-[18px] font-medium text-white transition hover:bg-[#2563eb]"
          >
            + เพิ่มสินค้า
          </button>
        </div>
      </div>
      <ProductList data={data} meta={meta} />
    </>
  );
}
