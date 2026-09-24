import { usePredictedClv } from './usePredictedClv';
import PredictedClvChart from './PredictedClvChart';

export default function PredictedClvContainer() {
  const { data, isLoading, isError } = usePredictedClv();

  if (isLoading) {
    return (
      <div className="w-full h-96 flex items-center justify-center bg-gray-900 rounded-lg border border-gray-800">
        <span className="text-gray-400 animate-pulse">Modeling CLV distributions...</span>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="w-full h-96 flex items-center justify-center bg-red-900/20 rounded-lg border border-red-800">
        <span className="text-red-400">Failed to load CLV projections.</span>
      </div>
    );
  }

  return <PredictedClvChart data={data} />;
}
