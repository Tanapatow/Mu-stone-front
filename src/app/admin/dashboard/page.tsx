import Chart from '@/components/features/admin/dashboard/chart';
import StatCard from '@/components/features/admin/dashboard/stat-card';
import { TopProductsCard } from '@/components/features/admin/dashboard/top-product-card';
import { dashboardService } from '@/lib/api/admin/dashboard/dashboard.service';
import { AlertTriangle, Banknote, Eye } from 'lucide-react';

export default async function DashboardPage() {
  const statsOverview = await dashboardService.getOverView();

  const daily = await dashboardService.getSalesDay();
  const weekly = await dashboardService.getWeeklySalesTrend();

  const topSales = await dashboardService.getTopSellers();

  return (
    <div className="min-h-screen flex flex-col px-10 pt-10">
      <div className="mb-8 p-4 rounded-xl bg-black/30 backdrop-blur-sm border border-white/10">
        <h1
          className="font-['Sarabun'] text-2xl text-gold mb-1"
          style={{ textShadow: '0 0 24px rgba(201,162,39,0.35)' }}
        >
          ภาพรวมแดชบอร์ด
        </h1>
        <p className="text-sm text-white/70 font-['Sarabun']">
          ยินดีต้อนรับกลับ นี่คือภาพรวมของระบบวันนี้
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="รายได้วันนี้"
          content={`฿ ${statsOverview.revenueToday}`}
          icon={Banknote}
        />
        <StatCard
          title="จำนวนผู้เข้าชม"
          content={String(statsOverview.fortuneTrafficToday)}
          icon={Eye}
          detail="ผู้ใช้ดูดวงวันนี้"
        />
        <StatCard
          title="จำนวนออเดอร์วันนี้"
          content={`${statsOverview.totalPurchases} รายการ`}
          icon={AlertTriangle}
        />
        <StatCard
          title="รายการแจ้งเตือน"
          content={`${statsOverview.outOfStockCount} รายการ`}
          icon={AlertTriangle}
          detail="สินค้าหมด โปรดดำเนินการ"
        />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <Chart dailyData={daily} weeklyData={weekly} />
        </div>
        <div className="lg:col-span-1">
          <TopProductsCard data={topSales} />
        </div>
      </div>
    </div>
  );
}
