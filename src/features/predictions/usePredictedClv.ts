import { useQuery } from '@tanstack/react-query';
import type { PredictedClvResponse } from '../../types/api';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const fetchPredictedClv = async (): Promise<PredictedClvResponse> => {
  const response = await fetch(`${API_BASE_URL}/api/predictions/clv`);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

export const usePredictedClv = () => {
  return useQuery({
    queryKey: ['predictedClv'],
    queryFn: fetchPredictedClv,
    staleTime: 1000 * 60 * 5,
  });
};
