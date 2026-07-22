import { useQuery } from '@tanstack/react-query';
import type { RegressionTrendResponse } from '../../types/api';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const fetchRegressionTrend = async (): Promise<RegressionTrendResponse> => {
  const response = await fetch(`${API_BASE_URL}/api/predictions/regression-trend`);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

export const useRegressionTrend = () => {
  return useQuery({
    queryKey: ['regressionTrend'],
    queryFn: fetchRegressionTrend,
    staleTime: 1000 * 60 * 5,
  });
};
