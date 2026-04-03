export default function DashboardPage() {
  const stats = [
    { title: "ยอดขายรวม", value: "45,231 บาท" },
    { title: "สินค้าทั้งหมด", value: "156" },
    { title: "จำนวนการสั่งซื้อ", value: "89" },
    { title: "จำนวนลูกค้า", value: "1,245" },
  ];

  const activities = [
    { title: "มีออเดอร์ใหม่เข้ามา", time: "5 นาทีที่แล้ว" },
    { title: "อัปเดตคลังสินค้าแล้ว", time: "1 ชั่วโมงที่แล้ว" },
    { title: "มีลูกค้าใหม่สมัครสมาชิก", time: "2 ชั่วโมงที่แล้ว" },
    { title: "ออเดอร์เสร็จสมบูรณ์", time: "3 ชั่วโมงที่แล้ว" },
  ];

  return (
    <div className="min-h-screen flex flex-col px-10 pt-10">
      {/* Header */}
      <div className="mb-8 p-4  rounded-xl bg-black/30 backdrop-blur-sm border border-white/10">
        <h1
          className="font-['Sarabun'] text-2xl text-gold mb-1"
          style={{ textShadow: "0 0 24px rgba(201,162,39,0.35)" }}
        >
          ภาพรวมแดชบอร์ด
        </h1>
        <p className="text-sm text-white/70 font-['Sarabun']">
          ยินดีต้อนรับกลับ นี่คือภาพรวมของระบบวันนี้
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="p-5 rounded-2xl flex flex-col gap-2"
            style={{
              background:
                "linear-gradient(160deg, rgba(26,20,74,0.7) 0%, rgba(11,8,42,0.8) 100%)",
              border: "1px solid rgba(201,162,39,0.15)",
            }}
          >
            <p className="text-xs text-white/40 font-['Sarabun']">
              {stat.title}
            </p>
            <p className="text-2xl font-bold text-gold font-['Sarabun']">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Recent activities */}
      <div
        className="w-full p-6 rounded-2xl"
        style={{
          background:
            "linear-gradient(160deg, rgba(26,20,74,0.7) 0%, rgba(11,8,42,0.8) 100%)",
          border: "1px solid rgba(201,162,39,0.15)",
        }}
      >
        <p className="text-sm font-semibold text-cream font-['Sarabun'] mb-4">
          กิจกรรมล่าสุด
        </p>
        <div className="flex flex-col gap-4">
          {activities.map((activity, i) => (
            <div
              key={i}
              className="flex items-center justify-between py-3"
              style={{
                borderBottom:
                  i < activities.length - 1
                    ? "1px solid rgba(255,255,255,0.05)"
                    : "none",
              }}
            >
              <p className="text-sm text-white/70 font-['Sarabun']">
                {activity.title}
              </p>
              <p className="text-xs text-white/30 font-['Sarabun'] shrink-0 ml-4">
                {activity.time}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
