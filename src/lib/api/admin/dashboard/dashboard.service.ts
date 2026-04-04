import { api } from '../../client';
import {
  DailySalesTrend,
  DashboardOverview,
  TopSellerProduct,
  WeeklySalesTrend,
} from './dashboard.type';

const getOverView = async () => {
  return await api.get<DashboardOverview>('dashboard/overview');
};

const getSalesDay = async () => {
  return await api.get<DailySalesTrend[]>('dashboard/sales-day');
};

const getWeeklySalesTrend = async () => {
  return await api.get<WeeklySalesTrend[]>('dashboard/sales-week');
};

const getTopSellers = async () => {
  const result = await api.get<TopSellerProduct[]>('dashboard/top-sellers');
  return result;
};

export const dashboardService = {
  getOverView,
  getSalesDay,
  getWeeklySalesTrend,
  getTopSellers,
};
