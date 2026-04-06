type UserStatsProps = {
  totalItems: number;
  activeCount: number;
};

export default function UserStats({ totalItems, activeCount }: UserStatsProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="card-glass flex flex-col gap-2">
        <p className="text-sm font-sarabun text-white/50">ผู้ใช้ทั้งหมด</p>
        <p className="text-3xl font-bold font-sarabun text-gold leading-none">
          {totalItems.toLocaleString()}
        </p>
      </div>
      <div className="card-glass flex flex-col gap-2">
        <p className="text-sm font-sarabun text-white/50">ใช้งานอยู่</p>
        <p className="text-3xl font-bold font-sarabun text-gold leading-none">
          {activeCount.toLocaleString()}
        </p>
        <p className="text-xs text-white/30 font-sarabun">
          {totalItems > 0 ? Math.round((activeCount / totalItems) * 100) : 0}%
          ของทั้งหมด
        </p>
      </div>
    </div>
  );
}
