import { useQuery } from '@tanstack/react-query';
import type { LeadConversionResponse } from '../../types/api';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const fetchLeadConversions = async (): Promise<LeadConversionResponse> => {
  const response = await fetch(`${API_BASE_URL}/api/leads/conversion`);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

export const useLeadConversions = () => {
  return useQuery({
    queryKey: ['leadConversions'],
    queryFn: fetchLeadConversions,
    staleTime: 1000 * 60 * 5,
  });
};
