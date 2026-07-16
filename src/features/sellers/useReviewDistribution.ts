import { useQuery } from '@tanstack/react-query';
import type { ReviewDistributionResponse } from '../../types/api';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const fetchReviewDistribution = async (): Promise<ReviewDistributionResponse> => {
  const response = await fetch(`${API_BASE_URL}/api/reviews/distribution`);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

export const useReviewDistribution = () => {
  return useQuery({
    queryKey: ['reviewDistribution'],
    queryFn: fetchReviewDistribution,
    staleTime: 1000 * 60 * 5,
  });
};
