import { useDelayRisk } from './useDelayRisk';
import DeliveryRiskChart from './DeliveryRiskChart';

export default function DeliveryRiskContainer() {
  const { data, isLoading, isError } = useDelayRisk();

  if (isLoading) {
    return (
      <div className="w-full h-96 flex items-center justify-center bg-gray-900 rounded-lg border border-gray-800">
        <span className="text-gray-400 animate-pulse">Analyzing risk factors...</span>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="w-full h-96 flex items-center justify-center bg-red-900/20 rounded-lg border border-red-800">
        <span className="text-red-400">Failed to load risk factors.</span>
      </div>
    );
  }

  return <DeliveryRiskChart data={data} />;
}
