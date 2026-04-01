export default function OrderHistoryHeader() {
  return (
    <div className="mx-auto w-full max-w-310 space-y-6">
      <h1 className="text-4xl font-bold tracking-tight text-black md:text-4xl">
        ประวัติการสั่งซื้อ
      </h1>
      <p className="text-base text-neutral-700 md:text-lg">
        จัดการคำสั่งซื้อของ user
      </p>
    </div>
  );
}
