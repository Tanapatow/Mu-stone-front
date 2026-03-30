'use client';

import { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';

import type { HistoryOrderItem, OrderStatus } from './history-types';

type HistoryOrdersContentProps = {
  orders: HistoryOrderItem[];
  totalOrders: number;
  itemsPerPage: number;
};

const ORDER_STATUS_MAP: Record<
  OrderStatus,
  {
    label: string;
    className: string;
  }
> = {
  DELIVERED: {
    label: 'จัดส่งแล้ว',
    className: 'bg-green-100 text-green-700',
  },
  SHIPPED: {
    label: 'กำลังจัดส่ง',
    className: 'bg-blue-100 text-blue-700',
  },
  PENDING: {
    label: 'รอดำเนินการ',
    className: 'bg-yellow-100 text-yellow-700',
  },
  CANCELLED: {
    label: 'ยกเลิก',
    className: 'bg-red-100 text-red-700',
  },
};

const ORDER_STATUS_OPTIONS: Array<{
  value: 'ALL' | OrderStatus;
  label: string;
}> = [
  { value: 'ALL', label: 'ทั้งหมด' },
  { value: 'DELIVERED', label: 'จัดส่งแล้ว' },
  { value: 'SHIPPED', label: 'กำลังจัดส่ง' },
  { value: 'PENDING', label: 'รอดำเนินการ' },
  { value: 'CANCELLED', label: 'ยกเลิก' },
];

function formatThaiDate(date: string) {
  return new Intl.DateTimeFormat('th-TH', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date));
}

function formatPrice(price: number) {
  return price.toLocaleString('th-TH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export default function HistoryOrdersContent({
  orders,
  totalOrders,
  itemsPerPage,
}: HistoryOrdersContentProps) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | OrderStatus>('ALL');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredOrders = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return orders.filter((order) => {
      const matchedKeyword =
        order.orderCode.toLowerCase().includes(keyword) ||
        order.customerName.toLowerCase().includes(keyword);

      const matchedStatus =
        statusFilter === 'ALL' || order.status === statusFilter;

      return matchedKeyword && matchedStatus;
    });
  }, [orders, search, statusFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredOrders.length / itemsPerPage),
  );

  // useEffect(() => {
  //   if (currentPage > totalPages) {
  //     setCurrentPage(totalPages);
  //   }
  // }, [currentPage, totalPages]);

  const paginatedOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return filteredOrders.slice(startIndex, endIndex);
  }, [filteredOrders, currentPage, itemsPerPage]);

  const visiblePages = useMemo(() => {
    const maxVisiblePages = 3;
    const pages: number[] = [];

    let startPage = Math.max(1, currentPage - 1);
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let page = startPage; page <= endPage; page += 1) {
      pages.push(page);
    }

    return pages;
  }, [currentPage, totalPages]);

  return (
    <div className="overflow-hidden rounded-[28px] bg-white shadow-[0_4px_14px_rgba(0,0,0,0.14)]">
      <div className="flex flex-col gap-4 border-b border-neutral-200 px-6 py-8 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:max-w-[500px]">
          <Search className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={search}
            placeholder="ชื่อลูกค้า หรือ รหัสคำสั่งซื้อ"
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="h-[46px] w-full rounded-2xl bg-[#f5f2f2] pl-14 pr-4 text-[15px] text-neutral-800 outline-none placeholder:text-neutral-400"
          />
        </div>

        <div className="flex items-center gap-3 self-end md:self-auto">
          <label
            htmlFor="status-filter"
            className="text-[14px] font-medium text-neutral-600"
          >
            กรองตาม:
          </label>

          <select
            id="status-filter"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value as 'ALL' | OrderStatus);
              setCurrentPage(1);
            }}
            className="h-[42px] rounded-xl bg-[#f5f2f2] px-4 text-[14px] font-semibold text-neutral-700 outline-none"
          >
            {ORDER_STATUS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[980px]">
          <thead className="bg-[#faf8f8]">
            <tr className="text-left text-[14px] font-semibold text-neutral-500">
              <th className="px-8 py-7 text-center">รหัสคำสั่งซื้อ</th>
              <th className="px-8 py-7 text-center">ลูกค้า</th>
              <th className="px-8 py-7 text-center">วันที่</th>
              <th className="px-8 py-7 text-center">ยอดรวม</th>
              <th className="px-8 py-7 text-center">สถานะจัดส่ง</th>
              <th className="px-8 py-7 text-center">รายละเอียด</th>
            </tr>
          </thead>

          <tbody>
            {paginatedOrders.length > 0 ? (
              paginatedOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-neutral-100 text-[15px] text-neutral-700"
                >
                  <td className="px-8 py-9 text-center font-semibold text-blue-600">
                    {order.orderCode}
                  </td>

                  <td className="px-8 py-9 text-center font-medium">
                    <div className="mx-auto max-w-[170px] break-words leading-6">
                      {order.customerName}
                    </div>
                  </td>

                  <td className="px-8 py-9 text-center text-neutral-500">
                    {formatThaiDate(order.orderDate)}
                  </td>

                  <td className="px-8 py-9 text-center font-semibold">
                    {formatPrice(order.total)}
                  </td>

                  <td className="px-8 py-9 text-center">
                    <span
                      className={`inline-flex min-w-[110px] items-center justify-center rounded-full px-3 py-1.5 text-[12px] font-bold ${ORDER_STATUS_MAP[order.status].className}`}
                    >
                      {ORDER_STATUS_MAP[order.status].label}
                    </span>
                  </td>

                  <td className="px-8 py-9 text-center">
                    <button
                      type="button"
                      className="text-[14px] font-bold text-blue-600 transition hover:text-blue-800"
                    >
                      ดู
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="px-8 py-14 text-center text-[15px] text-neutral-500"
                >
                  ไม่พบข้อมูลคำสั่งซื้อ
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-4 px-6 py-8 md:flex-row md:items-center md:justify-between">
        <p className="text-[14px] font-medium text-neutral-500">
          แสดง {paginatedOrders.length} รายการ จากทั้งหมด{' '}
          {totalOrders.toLocaleString('th-TH')} รายการ
        </p>

        <div className="flex items-center gap-2 self-end">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-200 bg-white text-neutral-500 transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          {visiblePages.map((page) => {
            const isActive = page === currentPage;

            return (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                className={`h-10 min-w-10 rounded-xl border text-[14px] font-bold transition ${
                  isActive
                    ? 'border-blue-600 bg-blue-600 text-white'
                    : 'border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50'
                }`}
              >
                {page}
              </button>
            );
          })}

          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage((prev) => Math.min(totalPages, prev + 1))
            }
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-200 bg-white text-neutral-500 transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
