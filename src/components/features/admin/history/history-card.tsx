'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import HistoryOrdersContent from './history-orders-content';
import HistoryPaymentsContent from './history-payments-content';
import type { HistoryCardProps, HistoryInnerTab } from './history-types';

// type InnerTabsProps = {
//   activeTab: HistoryInnerTab;
//   onChange: (tab: HistoryInnerTab) => void;
// };

// function InnerTabs({ activeTab, onChange }: InnerTabsProps) {
//   return (
//     <div className="mb-8 flex items-center gap-10">
//       <span className="text-xl font-semibold text-blue-600">ประวัติ</span>

//       <button
//         type="button"
//         onClick={() => onChange('orders')}
//         className={`text-[16px] font-semibold transition ${
//           activeTab === 'orders'
//             ? 'text-blue-600 underline underline-offset-4'
//             : 'text-neutral-600 hover:text-blue-600'
//         }`}
//       >
//         คำสั่งซื้อ
//       </button>

//       <button
//         type="button"
//         onClick={() => onChange('payments')}
//         className={`text-[16px] font-semibold transition ${
//           activeTab === 'payments'
//             ? 'text-blue-600 underline underline-offset-4'
//             : 'text-neutral-600 hover:text-blue-600'
//         }`}
//       >
//         การชำระเงิน
//       </button>
//     </div>
//   );
// }

export default function HistoryCard({
  orders,
  payments,
  paymentSummary,
  totalOrders,
  itemsPerPage = 5,
  defaultTab = 'orders',
}: HistoryCardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const tabFromQuery = searchParams.get('tab');

  const normalizedTab: HistoryInnerTab | null =
    tabFromQuery === 'orders' || tabFromQuery === 'payments'
      ? tabFromQuery
      : null;

  const [activeTab, setActiveTab] = useState<HistoryInnerTab>(
    normalizedTab ?? defaultTab,
  );

  const handleChangeTab = (tab: HistoryInnerTab) => {
    setActiveTab(tab);
    router.push(`${pathname}?tab=${tab}`);
  };

  const pageTitle =
    activeTab === 'orders' ? 'ประวัติการสั่งซื้อ' : 'ประวัติการชำระเงิน';

  const pageSubtitle =
    activeTab === 'orders'
      ? 'จัดการรายการคำสั่งซื้อทั้งหมดภายในระบบ'
      : 'จัดการข้อมูลการชำระเงินทั้งหมดภายในระบบ';

  return (
    <section className="min-h-screen bg-[#efeded] w-full px-6 py-6 md:px-8 lg:px-10">
      <div className="mx-auto max-w-295">
        <div className="mb-7">
          <h1 className="text-[54px] font-bold leading-none text-[#171717]">
            {pageTitle}
          </h1>
          <p className="mt-4 text-[18px] text-neutral-600">{pageSubtitle}</p>
        </div>

        {activeTab === 'orders' ? (
          <HistoryOrdersContent
            orders={orders}
            totalOrders={totalOrders}
            itemsPerPage={itemsPerPage}
          />
        ) : (
          <HistoryPaymentsContent
            payments={payments}
            paymentSummary={paymentSummary}
          />
        )}
      </div>
    </section>
  );
}
