type StatsProp = {
  title: string;
  value: string;
};

export default function StatsCard({ title, value }: StatsProp) {
  return (
    <div className="card-glass flex flex-col gap-2">
      <p className="text-sm font-sarabun text-white/50">{title}</p>
      <p className="text-3xl font-bold font-sarabun text-gold leading-none">
        {value}
      </p>
    </div>
  );
}
