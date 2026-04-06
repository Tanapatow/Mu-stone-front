import { cn } from "@/lib/utils";
import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

type StatsCardItemProp = {
  title: string;
  icon?: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  iconColor?: string;
  content: string;
  detail?: string;
};

export default function StatCard({
  content,
  title,
  detail,
  icon: Icon,
  iconColor,
}: StatsCardItemProp) {
  return (
    <div className="card-glass flex flex-col gap-3 hover:shadow-xl transition-shadow">
      <div className="flex items-center justify-between">
        <p className="text-sm font-sarabun text-white/50">{title}</p>
        {Icon && (
          <div className="p-2 rounded-lg bg-gold/10">
            <Icon className={cn("w-4 h-4 text-gold", iconColor)} />
          </div>
        )}
      </div>
      <p className="text-2xl font-bold text-gold font-sarabun">{content}</p>
      {detail && <p className="text-xs text-white/30 font-sarabun">{detail}</p>}
    </div>
  );
}
