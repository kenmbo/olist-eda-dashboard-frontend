import { useRegressionTrend } from './useRegressionTrend';
import RegressionTrendChart from './RegressionTrendChart';

export default function RegressionTrendContainer() {
  const { data, isLoading, isError } = useRegressionTrend();

  if (isLoading) {
    return (
      <div className="w-full h-96 flex items-center justify-center bg-gray-900 rounded-lg border border-gray-800">
        <span className="text-gray-400 animate-pulse">Calculating regression model...</span>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="w-full h-96 flex items-center justify-center bg-red-900/20 rounded-lg border border-red-800">
        <span className="text-red-400">Failed to load regression data.</span>
      </div>
    );
  }

  return <RegressionTrendChart data={data} />;
}
