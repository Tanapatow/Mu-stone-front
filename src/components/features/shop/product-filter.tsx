"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import type { ProductFilter } from "@/lib/api/product/product.service";

type ProductFilterProps = {
  filter: ProductFilter;
  stoneTypes: string[];
};

export default function ProductFilterPanel({
  filter,
  stoneTypes,
}: ProductFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const updateFilter = (updates: Partial<ProductFilter>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value === undefined || value === "") {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }
    });
    params.delete("page");
    startTransition(() => router.push(`?${params.toString()}`));
  };

  const labelClass = "text-xs text-cream/55 font-sarabun tracking-wide";
  const sectionClass = "flex flex-col gap-2";

  return (
    <aside
      className={`w-56 shrink-0 flex flex-col gap-5 p-4 rounded-xl card-glass ${isPending ? "opacity-60 pointer-events-none" : ""}`}
    >
      <p className="font-sarabun text-sm font-semibold text-cream">ตัวกรอง</p>

      {/* Search */}
      <div className={sectionClass}>
        <label className={labelClass}>ค้นหา</label>
        <input
          type="text"
          defaultValue={filter.search ?? ""}
          placeholder="ค้นหาสินค้า..."
          onChange={(e) => updateFilter({ search: e.target.value })}
          className="px-3 py-2 rounded-lg text-sm bg-white/5 text-cream border border-gold/20 placeholder:text-white/20 font-sarabun focus:outline-none focus:border-gold/55 transition-all duration-200"
        />
      </div>

      {/* Stone Types */}
      <div className={sectionClass}>
        <label className={labelClass}>ประเภทหิน</label>
        <div className="flex flex-col gap-1.5">
          {stoneTypes.map((value) => {
            const isActive = filter.stoneType === value;
            return (
              <button
                key={value}
                onClick={() =>
                  updateFilter({ stoneType: isActive ? undefined : value })
                }
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-sarabun text-left transition-all duration-200 border ${
                  isActive
                    ? "bg-gold/15 border-gold/50 text-gold"
                    : "bg-transparent border-transparent text-white/50 hover:text-white/80"
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full shrink-0 ${isActive ? "bg-gold" : "bg-white/20"}`}
                />
                {value}
              </button>
            );
          })}
        </div>
      </div>

      {/* Sort */}
      <div className={sectionClass}>
        <label className={labelClass}>เรียงโดย</label>
        <select
          value={`${filter.sortBy ?? "createdAt"}-${filter.order ?? "desc"}`}
          onChange={(e) => {
            const [sortBy, order] = e.target.value.split("-") as [
              string,
              "asc" | "desc",
            ];
            updateFilter({ sortBy: sortBy as ProductFilter["sortBy"], order });
          }}
          className="px-3 py-2 rounded-lg text-sm w-full bg-navy/95 text-cream border border-gold/20 font-sarabun focus:outline-none focus:border-gold/55 transition-all duration-200 [color-scheme:dark]"
        >
          <option value="createdAt-desc">ใหม่ล่าสุด</option>
          <option value="createdAt-asc">เก่าที่สุด</option>
          <option value="price-asc">ราคา: ต่ำ → สูง</option>
          <option value="price-desc">ราคา: สูง → ต่ำ</option>
          <option value="stock-desc">สต็อกมากที่สุด</option>
        </select>
      </div>

      {/* Clear */}
      <button
        onClick={() => router.push("/shop")}
        className="py-2 rounded-lg text-xs font-sarabun text-white/40 border border-white/10 hover:text-white/70 hover:border-white/20 transition-all duration-200"
      >
        ล้างตัวกรอง
      </button>
    </aside>
  );
}
