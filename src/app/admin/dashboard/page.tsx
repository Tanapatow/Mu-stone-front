import StatsCard from "@/components/features/admin/stats-card";

const status = [
  { title: "ยอดขายรวม", value: "45,231 บาท" },
  { title: "สินค้าทั้งหมด", value: "156" },
  { title: "จำนวนการสั่งซื้อ", value: "89" },
  { title: "จำนวนลูกค้า", value: "1245" },
];

const recentActivities = [
  { title: "มีออเดอร์ใหม่เข้ามา", time: "5 นาทีที่แล้ว" },
  { title: "อัปเดตคลังสินค้าแล้ว", time: "1 ชั่วโมงที่แล้ว" },
  { title: "มีลูกค้าใหม่สมัครสมาชิก", time: "2 ชั่วโมงที่แล้ว" },
  { title: "ออเดอร์เสร็จสมบูรณ์", time: "3 ชั่วโมงที่แล้ว" },
];

export default function DashboardPage() {
  return (
    <section className="space-y-4 p-2 ml-67.5">
      <div className="mx-auto w-full max-w-310 space-y-6">
        <h1 className="text-2xl font-bold tracking-tight text-black md:text-2xl">
          ภาพรวมแดชบอร์ด
        </h1>
        <p className="mt-2 text-base text-neutral-700 md:text-lg">
          ยินดีต้อนรับกลับ นี่คือภาพรวมของระบบวันนี้
        </p>
      </div>

      <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-4 ">
        {status.map((item) => (
          <StatsCard key={item.title} title={item.title} value={item.value} />
        ))}
      </div>

      <div className="w-full rounded-l-lg bg-white p-2 shadow-[0_4px_12px_rgba(0,0,0,0.12)] md:p-7">
        <h2 className="text-2xl font-bold text-black md:text-2xl">
          กิจกรรมล่าสุด
        </h2>

        <div className="mt-6 space-y-6">
          {recentActivities.map((activity) => (
            <div key={activity.title}>
              <p className="text-xl font-semibold text-neutral-900 md:text-xl">
                {activity.title}
              </p>
              <p className="mt-1 text-lg text-neutral-500 md:text-base">
                {activity.time}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
