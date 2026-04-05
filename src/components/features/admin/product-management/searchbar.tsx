"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { useDebounce } from "use-debounce";
import { useEffect } from "react";

type Props = {
  placeholder?: string;
  delay?: number;
};

export default function SearchBar({
  placeholder = "ค้นหาสินค้า...",
  delay = 500,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [debouncedSearch] = useDebounce(search, delay);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (debouncedSearch) {
      params.set("search", debouncedSearch);
    } else {
      params.delete("search");
    }
    router.replace(`?${params.toString()}`);
  }, [debouncedSearch]);

  return (
    <div className="relative">
      <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={placeholder}
        className="h-11 w-full rounded-xl bg-white/5 border border-gold/20 pl-10 pr-4 text-sm text-cream font-sarabun placeholder:text-white/20 outline-none focus:border-gold/55 transition-all duration-200"
      />
    </div>
  );
}
