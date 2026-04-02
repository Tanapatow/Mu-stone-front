"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import type { ProductFilter } from "@/lib/api/product/product.service";

const STONE_TYPES: { value: string; label: string }[] = [
  { value: "Amethyst", label: "อเมทิสต์" },
  { value: "Rose Quartz", label: "โรสควอตซ์" },
  { value: "Obsidian", label: "ออบซิเดียน" },
  { value: "Citrine", label: "ซิทริน" },
  { value: "Lapis Lazuli", label: "ลาพิสลาซูลี" },
];

type ProductFilterProps = {
  filter: ProductFilter;
};

export default function ProductFilterPanel({ filter }: ProductFilterProps) {
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
    params.delete("page"); // reset page เมื่อ filter เปลี่ยน
    startTransition(() => router.push(`?${params.toString()}`));
  };

  const labelClass =
    "text-xs text-[rgba(245,240,232,0.55)] font-['Sarabun'] tracking-wide";
  const sectionClass = "flex flex-col gap-2";

  return (
    <aside
      className="w-56 shrink-0 flex flex-col gap-5 p-4 rounded-xl"
      style={{
        background:
          "linear-gradient(160deg, rgba(26,20,74,0.7) 0%, rgba(11,8,42,0.8) 100%)",
        border: "1px solid rgba(201,162,39,0.15)",
      }}
    >
      <p className="font-['Sarabun'] text-lg font-semibold text-cream">
        Filters
      </p>

      {/* Search */}
      <div className={sectionClass}>
        <label className={labelClass}>ค้นหา</label>
        <input
          type="text"
          defaultValue={filter.search ?? ""}
          placeholder="ค้นหาสินค้า..."
          onChange={(e) => updateFilter({ search: e.target.value })}
          className="
            px-3 py-2 rounded-lg text-lg
            bg-white/5 text-cream
            border border-[rgba(201,162,39,0.2)]
            placeholder:text-white/20 font-['Sarabun']
            focus:outline-none focus:border-[rgba(201,162,39,0.55)]
            transition-all duration-200
          "
        />
      </div>

      {/* Stone Type */}
      <div className={sectionClass}>
        <label className={labelClass}>ประเภทหิน</label>
        <div className="flex flex-col gap-1.5">
          {STONE_TYPES.map(({ value, label }) => {
            const isActive = filter.stoneType === value;
            return (
              <button
                key={value}
                onClick={() =>
                  updateFilter({ stoneType: isActive ? undefined : value })
                }
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-['Sarabun'] text-left transition-all duration-200"
                style={{
                  background: isActive
                    ? "rgba(201,162,39,0.15)"
                    : "transparent",
                  border: isActive
                    ? "1px solid rgba(201,162,39,0.5)"
                    : "1px solid transparent",
                  color: isActive ? "#c9a227" : "rgba(245,240,232,0.55)",
                }}
              >
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{
                    background: isActive ? "#c9a227" : "rgba(255,255,255,0.2)",
                  }}
                />
                {label}
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
          className="px-3 py-2 rounded-lg text-lg w-full
    bg-[rgba(11,8,42,0.95)] text-cream
    border border-[rgba(201,162,39,0.2)]
    font-['Sarabun'] transition-all duration-200
    focus:outline-none focus:border-[rgba(201,162,39,0.55)]
  "
          style={{ colorScheme: "dark" }}
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
        className="
          py-2 rounded-lg text-xs font-['Sarabun'] text-white/40
          border border-white/10 hover:text-white/70 hover:border-white/20
          transition-all duration-200
        "
      >
        Clear All
      </button>
    </aside>
  );
}
