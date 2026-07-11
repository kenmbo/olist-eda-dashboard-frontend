import { useQuery } from '@tanstack/react-query';
import type { SellerDistributionResponse } from '../../types/api';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const fetchSellerDistribution = async (): Promise<SellerDistributionResponse> => {
  const response = await fetch(`${API_BASE_URL}/api/sellers/distribution`);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

export const useSellerDistribution = () => {
  return useQuery({
    queryKey: ['sellerDistribution'],
    queryFn: fetchSellerDistribution,
    staleTime: 1000 * 60 * 5,
  });
};
