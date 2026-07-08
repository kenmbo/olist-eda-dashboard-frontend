import { useLeadConversions } from './useLeadConversions';
import LeadConversionChart from './LeadConversionChart';

export default function LeadConversionsContainer() {
  const { data, isLoading, isError } = useLeadConversions();

  if (isLoading) {
    return (
      <div className="w-full h-80 flex items-center justify-center bg-gray-900 rounded-lg border border-gray-800">
        <span className="text-gray-400 animate-pulse">Loading conversion rates...</span>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="w-full h-80 flex items-center justify-center bg-red-900/20 rounded-lg border border-red-800">
        <span className="text-red-400">Failed to load conversion rates.</span>
      </div>
    );
  }

  return <LeadConversionChart data={data} />;
}
