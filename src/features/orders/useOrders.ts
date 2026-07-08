import { useQuery } from '@tanstack/react-query';
import type { DailyOrdersResponse } from '../../types/api';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const fetchDailyOrders = async (): Promise<DailyOrdersResponse> => {
  const response = await fetch(`${API_BASE_URL}/api/orders/daily`);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

export const useDailyOrders = () => {
  return useQuery({
    queryKey: ['dailyOrders'], // A unique key for caching
    queryFn: fetchDailyOrders,
    staleTime: 1000 * 60 * 5,  // Data stays fresh for 5 minutes (no refetching if user changes tabs)
  });
};
