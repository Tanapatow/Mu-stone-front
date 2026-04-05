import Chart from "@/components/features/admin/dashboard/chart";
import StatCard from "@/components/features/admin/dashboard/stat-card";
import { TopProductsCard } from "@/components/features/admin/dashboard/top-product-card";
import { dashboardService } from "@/lib/api/admin/dashboard/dashboard.service";
import {
  Banknote,
  Eye,
  ShoppingBag,
  AlertTriangle,
  TrendingUp,
} from "lucide-react";

export default async function DashboardPage() {
  const statsOverview = await dashboardService.getOverView();
  const daily = await dashboardService.getSalesDay();
  const weekly = await dashboardService.getWeeklySalesTrend();
  const topSales = await dashboardService.getTopSellers();

  return (
    <div className="flex flex-col gap-6">
      <div className="dashboard-header">
        <h1 className="dashboard-title">ภาพรวมแดชบอร์ด</h1>
        <p className="dashboard-subtitle">
          ยินดีต้อนรับกลับ นี่คือภาพรวมของระบบวันนี้
        </p>
      </div>

      {/* Row 1: 3 stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          title="รายได้วันนี้"
          content={`฿${Number(statsOverview.revenueToday).toLocaleString()}`}
          icon={Banknote}
        />
        <StatCard
          title="ออเดอร์วันนี้"
          content={`${statsOverview.totalPurchases} รายการ`}
          icon={ShoppingBag}
        />
        <StatCard
          title="สินค้าหมดสต็อก"
          content={`${statsOverview.outOfStockCount} รายการ`}
          icon={AlertTriangle}
          detail="โปรดดำเนินการ"
        />
      </div>

      {/* Row 2: 2 stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StatCard
          title="ผู้ใช้ดูดวงวันนี้"
          content={String(statsOverview.fortuneTrafficToday)}
          icon={Eye}
          detail="จำนวนผู้เข้าชม"
        />
        <StatCard
          title="Conversion Rate"
          content={`${statsOverview.conversionRate}%`}
          icon={TrendingUp}
          detail="ผู้ดูดวงที่ซื้อสินค้า"
        />
      </div>

      {/* Chart + Top products */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
