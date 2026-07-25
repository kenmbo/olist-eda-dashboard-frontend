import { useQuery } from '@tanstack/react-query';
import type { SalesForecastResponse } from '../../types/api';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const fetchSalesForecast = async (): Promise<SalesForecastResponse> => {
  const response = await fetch(`${API_BASE_URL}/api/predictions/sales-forecast`);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

export const useSalesForecast = () => {
  return useQuery({
    queryKey: ['salesForecast'],
    queryFn: fetchSalesForecast,
    staleTime: 1000 * 60 * 5,
  });
};
