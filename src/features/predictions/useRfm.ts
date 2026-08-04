import { useQuery } from '@tanstack/react-query';
import type { RfmResponse } from '../../types/api';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const fetchRfm = async (): Promise<RfmResponse> => {
  const response = await fetch(`${API_BASE_URL}/api/predictions/rfm`);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

export const useRfm = () => {
  return useQuery({
    queryKey: ['rfmSegmentation'],
    queryFn: fetchRfm,
    staleTime: 1000 * 60 * 5,
  });
};
