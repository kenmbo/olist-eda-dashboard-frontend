import { useQuery } from '@tanstack/react-query';
import type { ReviewSalesScatterResponse } from '../../types/api';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const fetchReviewSalesScatter = async (): Promise<ReviewSalesScatterResponse> => {
  const response = await fetch(`${API_BASE_URL}/api/sellers/review-sales`);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

export const useReviewSalesScatter = () => {
  return useQuery({
    queryKey: ['reviewSalesScatter'],
    queryFn: fetchReviewSalesScatter,
    staleTime: 1000 * 60 * 5,
  });
};
