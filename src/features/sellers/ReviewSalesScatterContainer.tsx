import { useReviewSalesScatter } from './useReviewSalesScatter';
import ReviewSalesScatterChart from './ReviewSalesScatterChart';

export default function ReviewSalesScatterContainer() {
  const { data, isLoading, isError } = useReviewSalesScatter();

  if (isLoading) {
    return (
      <div className="w-full h-80 flex items-center justify-center bg-gray-900 rounded-lg border border-gray-800">
        <span className="text-gray-400 animate-pulse">Loading clustering data...</span>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="w-full h-80 flex items-center justify-center bg-red-900/20 rounded-lg border border-red-800">
        <span className="text-red-400">Failed to load scatter data.</span>
      </div>
    );
  }

  return <ReviewSalesScatterChart data={data} />;
}
