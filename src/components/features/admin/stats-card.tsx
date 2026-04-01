type StatsProp = {
  title: string;
  value: string;
};

export default function StatsCard({ title, value }: StatsProp) {
  return (
    <div className="flex h-full w-full flex-col justify-between rounded-2xl bg-white px-5 py-5 shadow-[0_4px_10px_rgba(0,0,0,0.10)] ">
      <p className="text-lg font-medium text-neutral-800 md:text-[18px]">
        {title}
      </p>

      <p className="mt-2 text-[24px] font-bold leading-none text-black md:text-[28px]">
        {value}
      </p>
    </div>
  );
}
