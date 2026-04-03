'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';
import { useDebounce } from 'use-debounce';

type Props = {
  placeholder?: string;
  delay?: number;
};

export default function SearchBar({
  placeholder = 'ค้นหา...',
  delay = 500,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // state จาก URL
  const [search, setSearch] = useState(searchParams.get('search') || '');

  // 🔥 ใช้ lib debounce
  const [debouncedSearch] = useDebounce(search, delay);

  // 👉 update URL
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (debouncedSearch) {
      params.set('search', debouncedSearch);
    } else {
      params.delete('search');
    }

    router.replace(`?${params.toString()}`);
  }, [debouncedSearch]);

  // 👉 sync back/forward
  useEffect(() => {
    const urlSearch = searchParams.get('search') || '';
    setSearch(urlSearch);
  }, [searchParams]);

  return (
    <div className="mb-4 rounded-[20px] bg-white px-5 py-4">
      <div className="relative">
        <Search className="pointer-events-none absolute left-5 top-1/2 h-6 w-6 -translate-y-1/2 text-neutral-500" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={placeholder}
          className="h-14 w-full rounded-[12px] border border-neutral-500 bg-[#f5f5f5] pl-14 pr-4 text-[17px] text-neutral-800 outline-none placeholder:text-neutral-400"
        />
      </div>
    </div>
  );
}
