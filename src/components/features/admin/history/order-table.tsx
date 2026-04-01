'use client';

import { useMemo, useState } from 'react';
import CancelButton from './cancel-button';
import ShippedButton from './shipped-button';

enum ShippingStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  SHIPPED = 'SHIPPED',
  CANCELLED = 'CANCELLED',
}

const orders = [
  {
    id: '#ORD-2024-001',
    name: 'วิภาดา กิจขยัน',
    date: '12 ต.ค. 2023',
    total: '12,450.00',
    status: ShippingStatus.SHIPPED,
  },
  {
    id: '#ORD-2024-002',
    name: 'ธนากร สุขสวัสดิ์',
    date: '14 ต.ค. 2023',
    total: '8,200.00',
    status: ShippingStatus.PAID,
  },
  {
    id: '#ORD-2024-003',
    name: 'ธนากร สุขสวัสดิ์',
    date: '14 ต.ค. 2023',
    total: '8,200.00',
    status: ShippingStatus.PENDING,
  },
  {
    id: '#ORD-2024-004',
    name: 'ธนากร สุขสวัสดิ์',
    date: '14 ต.ค. 2023',
    total: '250.00',
    status: ShippingStatus.PAID,
  },
  {
    id: '#ORD-2024-005',
    name: 'ธนากร สุขสวัสดิ์ตอนบ่าย',
    date: '14 ต.ค. 2023',
    total: '8,200.00',
    status: ShippingStatus.CANCELLED,
  },
];

const statusStyle = {
  SHIPPED: 'bg-green-100 text-green-600',
  PAID: 'bg-blue-100 text-blue-600',
  PENDING: 'bg-yellow-100 text-yellow-600',
  CANCELLED: 'bg-red-100 text-red-600',
};

export default function OrderTable() {
  const [search, setSearch] = useState('');

  //   const filteredOrder = useMemo(() => {});
  return (
    <div>
      <div className="rounded-2xl border bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500">
            <tr className="text-center">
              <th className="px-6 py-4 font-medium">รหัสคำสั่งซื้อ</th>
              <th className="px-6 py-4 font-medium">ลูกค้า</th>
              <th className="px-6 py-4 font-medium">วันที่</th>
              <th className="px-6 py-4 font-medium">ยอดรวม</th>
              <th className="px-6 py-4 font-medium">สถานะจัดส่ง</th>
              <th className="px-6 py-4 font-medium text-center">รายละเอียด</th>
              <th className="px-6 py-4 font-medium text-center">สถานะ</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((item, i) => (
              <tr
                key={i}
                className="border-t transition hover:bg-gray-50 text-center"
              >
                <td className="px-6 py-8 font-medium text-blue-600">
                  {item.id}
                </td>

                <td className="px-6">{item.name}</td>

                <td className="px-6 text-gray-500">{item.date}</td>

                <td className="px-6 font-semibold">{item.total}</td>

                <td className="px-6">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyle[item.status]}`}
                  >
                    {item.status}
                  </span>
                </td>

                <td className="px-6 text-center">
                  <button className="font-medium text-blue-600 hover:underline">
                    VIEW
                  </button>
                </td>

                <td className="px-6 py-6 text-center">
                  <div className="flex justify-center">
                    {item.status === ShippingStatus.PAID ? (
                      <div className="flex gap-2">
                        <CancelButton /> <ShippedButton />
                      </div>
                    ) : item.status === ShippingStatus.PENDING ? (
                      <>
                        <CancelButton />
                      </>
                    ) : item.status === ShippingStatus.CANCELLED ||
                      item.status === ShippingStatus.SHIPPED ? (
                      <>-</>
                    ) : (
                      <>-</>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
