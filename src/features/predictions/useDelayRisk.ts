import { useQuery } from '@tanstack/react-query';
import type { DelayRiskResponse } from '../../types/api';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const fetchDelayRisk = async (): Promise<DelayRiskResponse> => {
  const response = await fetch(`${API_BASE_URL}/api/predictions/delay-risk`);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

export const useDelayRisk = () => {
  return useQuery({
    queryKey: ['delayRisk'],
    queryFn: fetchDelayRisk,
    staleTime: 1000 * 60 * 5,
  });
};
