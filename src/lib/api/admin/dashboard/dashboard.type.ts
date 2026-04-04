export type DashboardOverview = {
  revenueToday: number;
  outOfStockCount: number;
  fortuneTrafficToday: number;
  conversionRate: number;
  totalPurchases: number;
};

export type DailySalesTrend = {
  date: string;
  totalRevenue: number;
};

export type WeeklySalesTrend = {
  label: string; // เช่น "สัปดาห์ที่ 4"
  totalRevenue: number;
};

export type TopSellerProduct = {
  productId: string;
  name: string;
  stoneType?: string;
  stockLeft: number;
  totalSold: number;
  imageUrl: string;
};
