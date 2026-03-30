type StatsProp = {
  title: string;
  value: string;
};

export default function StatsCard({ title, value }: StatsProp) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-[0_4px_10px_rgba(0,0,0,0.10)]">
      <p className="text-[18px] font-medium text-neutral-800">{title}</p>
      <p className="mt-3 text-[22px] font-bold text-black md:text-[26px]">
        {value}
      </p>
    </div>
  );
}
