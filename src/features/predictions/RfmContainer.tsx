import { useRfm } from './useRfm';
import RfmChart from './RfmChart';

export default function RfmContainer() {
  const { data, isLoading, isError } = useRfm();

  if (isLoading) {
    return (
      <div className="w-full h-96 flex items-center justify-center bg-gray-900 rounded-lg border border-gray-800">
        <span className="text-gray-400 animate-pulse">Calculating RFM models...</span>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="w-full h-96 flex items-center justify-center bg-red-900/20 rounded-lg border border-red-800">
        <span className="text-red-400">Failed to load RFM segmentation.</span>
      </div>
    );
  }

  return <RfmChart data={data} />;
}
