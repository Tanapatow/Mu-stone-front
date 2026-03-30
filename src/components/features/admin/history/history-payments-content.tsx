'use client';

import { CreditCard, Eye, Landmark, QrCode } from 'lucide-react';

import type {
  PaymentIconType,
  PaymentItem,
  PaymentStatus,
  PaymentSummary,
} from './history-types';

type HistoryPaymentsContentProps = {
  payments: PaymentItem[];
  paymentSummary: PaymentSummary;
};

const PAYMENT_STATUS_MAP: Record<
  PaymentStatus,
  {
    label: string;
    dotClassName: string;
    textClassName: string;
  }
> = {
  SUCCESS: {
    label: 'สำเร็จ',
    dotClassName: 'bg-green-500',
    textClassName: 'text-green-500',
  },
  FAILED: {
    label: 'ล้มเหลว',
    dotClassName: 'bg-red-500',
    textClassName: 'text-red-500',
  },
  PENDING: {
    label: 'รอดำเนินการ',
    dotClassName: 'bg-yellow-500',
    textClassName: 'text-yellow-500',
  },
};

function formatPrice(price: number) {
  return price.toLocaleString('th-TH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function formatSummaryPrice(price: number) {
  return `฿${price.toLocaleString('th-TH')}`;
}

function renderPaymentIcon(icon: PaymentIconType) {
  switch (icon) {
    case 'qr':
      return <QrCode className="h-5 w-5 text-blue-600" />;
    case 'bank':
      return <Landmark className="h-5 w-5 text-blue-600" />;
    case 'card':
    default:
      return <CreditCard className="h-5 w-5 text-blue-600" />;
  }
}

export default function HistoryPaymentsContent({
  payments,
  paymentSummary,
}: HistoryPaymentsContentProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-[1.9fr_0.9fr]">
      <div className="overflow-hidden rounded-[24px] bg-white shadow-[0_4px_14px_rgba(0,0,0,0.14)]">
        <div className="grid grid-cols-4 bg-[#f7f5f5] px-6 py-4 text-[14px] font-semibold text-neutral-500">
          <div className="text-center">ช่องทาง</div>
          <div className="text-center">จำนวนเงิน</div>
          <div className="text-center">สถานะ</div>
          <div className="text-center">หลักฐาน</div>
        </div>

        <div className="divide-y divide-neutral-100">
          {payments.map((payment) => (
            <div
              key={payment.id}
              className="grid grid-cols-4 items-center px-6 py-6 text-[15px] text-neutral-700"
            >
              <div className="flex items-center gap-3">
                {renderPaymentIcon(payment.icon)}
                <span className="font-medium">{payment.channel}</span>
              </div>

              <div className="text-center font-semibold">
                {formatPrice(payment.amount)}
              </div>

              <div className="flex items-center justify-center gap-2">
                <span
                  className={`h-2.5 w-2.5 rounded-full ${PAYMENT_STATUS_MAP[payment.status].dotClassName}`}
                />
                <span
                  className={`text-[14px] font-semibold ${PAYMENT_STATUS_MAP[payment.status].textClassName}`}
                >
                  {PAYMENT_STATUS_MAP[payment.status].label}
                </span>
              </div>

              <div className="flex items-center justify-center">
                {payment.proofLabel === 'ดู' ? (
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 text-[14px] font-medium text-neutral-500 transition hover:text-blue-600"
                  >
                    <Eye className="h-4 w-4" />
                    <span>{payment.proofLabel}</span>
                  </button>
                ) : (
                  <span className="text-[14px] font-medium text-neutral-400">
                    {payment.proofLabel}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-[24px] bg-[#0d63d6] p-6 text-white shadow-[0_4px_14px_rgba(0,0,0,0.18)]">
        <p className="text-[15px] font-medium text-white/85">ยอดรวมรายเดือน</p>

        <h2 className="mt-3 text-[54px] font-light leading-none">
          {formatSummaryPrice(paymentSummary.totalAmount)}
        </h2>

        <div className="mt-8 space-y-4 text-[15px]">
          <div className="flex items-center justify-between gap-4">
            <span className="text-white/85">ยอดชำระสำเร็จ</span>
            <span className="font-semibold">
              {paymentSummary.successCount} รายการ
            </span>
          </div>

          <div className="flex items-center justify-between gap-4">
            <span className="text-white/85">รอดำเนินการ</span>
            <span className="font-semibold">
              {paymentSummary.pendingCount} รายการ
            </span>
          </div>
        </div>

        <button
          type="button"
          className="mt-10 flex h-[52px] w-full items-center justify-center rounded-2xl bg-white text-[15px] font-semibold text-[#0d63d6] transition hover:bg-blue-50"
        >
          {paymentSummary.downloadText}
        </button>
      </div>
    </div>
  );
}
