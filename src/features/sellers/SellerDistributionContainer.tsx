import { useSellerDistribution } from './useSellerDistribution';
import SellerDistributionChart from './SellerDistributionChart';

export default function SellerDistributionContainer() {
  const { data, isLoading, isError } = useSellerDistribution();

  if (isLoading) {
    return (
      <div className="w-full h-80 flex items-center justify-center bg-gray-900 rounded-lg border border-gray-800">
        <span className="text-gray-400 animate-pulse">Loading seller distribution...</span>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="w-full h-80 flex items-center justify-center bg-red-900/20 rounded-lg border border-red-800">
        <span className="text-red-400">Failed to load seller distribution.</span>
      </div>
    );
  }

  return <SellerDistributionChart data={data} />;
}
