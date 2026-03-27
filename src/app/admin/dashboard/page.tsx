import StatsCard from '@/components/features/admin/stats-card';

const status = [
  {
    title: 'ยอดขายรวม',
    value: '45,231 บาท',
  },
  {
    title: 'สินค้าทั้งหมด',
    value: '156',
  },
  {
    title: 'จำนวนการสั่งซื้อ',
    value: '89',
  },
  {
    title: 'จำนวนลูกค้า',
    value: '1245',
  },
];

const recentActivities = [
  {
    title: 'มีออเดอร์ใหม่เข้ามา',
    time: '5 นาทีที่แล้ว',
  },
  {
    title: 'อัปเดตคลังสินค้าแล้ว',
    time: '1 ชั่วโมงที่แล้ว',
  },
  {
    title: 'มีลูกค้าใหม่สมัครสมาชิก',
    time: '2 ชั่วโมงที่แล้ว',
  },
  {
    title: 'ออเดอร์เสร็จสมบูรณ์',
    time: '3 ชั่วโมงที่แล้ว',
  },
];

export default function DashboardPage() {
  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-6xl font-bold tracking-tight text-black font-saraban">
          ภาพรวมแดชบอร์ด
        </h1>
        <p className="mt-4 text-3xl text-neutral-700 font-saraban">
          ยินดีต้อนรับ นี่คือภาพรวมของระบบวันนี้
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 2xl:grid-cols-4 font-roboto">
        {status.map((item) => (
          <StatsCard key={item.title} title={item.title} value={item.value} />
        ))}
      </div>

      <div className="rounded-3xl bg-white p-7 shadow-[0_4px_12px_rgba(0,0,0,0.12)]">
        <h2 className="text-6xl font-bold text-black font-saraban">
          กิจกรรมล่าสุด
        </h2>

        <div className="mt-8 space-y-7 font-roboto">
          {recentActivities.map((activity) => (
            <div
              className="flex flex-col gap-6 font-roboto"
              key={activity.title}
            >
              <p className="text-3xl font-semibold text-neutral-900 font-roboto">
                {activity.title}
              </p>
              <p className="mt-2 text-xl text-neutral-500 font-roboto">
                {activity.time}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
