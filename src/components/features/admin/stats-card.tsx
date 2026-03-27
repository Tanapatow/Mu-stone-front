type StatsProp = {
  title: string;
  value: string;
};
export default function StatsCard({ title, value }: StatsProp) {
  return (
    <div
      key={title}
      className="flex flex-col gap-5 rounded-3xl bg-white p-6 shadow-[0_4px_12px_rgba(0,0,0,0.12)] font-roboto "
    >
      <p className="text-3xl font-medium text-neutral-900 font-roboto">
        {title}
      </p>
      <p className="mt-4 text-4xl font-bold text-black font-roboto">{value}</p>
    </div>
  );
}
