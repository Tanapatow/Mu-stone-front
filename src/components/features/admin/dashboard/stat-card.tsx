import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { LucideProps } from 'lucide-react';
import { ForwardRefExoticComponent, RefAttributes } from 'react';

type StatsCardItemProp = {
  title: string;
  icon?: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
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
    <Card
      className="shadow-lg hover:shadow-xl transition-shadow "
      style={{
        background:
          'linear-gradient(160deg, rgba(26,20,74,0.7) 0%, rgba(11,8,42,0.8) 100%)',
        border: '1px solid rgba(201,162,39,0.15)',
      }}
    >
      <CardHeader className="flex flex-row items-center justify-between ">
        <CardTitle className="text-sm font-medium text-gray-600">
          {title}
        </CardTitle>
        <div className="p-2 rounded ">
          {Icon && <Icon className={cn('w-5 h-5 text-gold', iconColor)} />}{' '}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gold font-['Sarabun']">
          {content}
        </div>
        <p className="text-xs text-gray-500 mt-1">{detail}</p>
      </CardContent>
    </Card>
  );
}
