import { useSalesForecast } from './useSalesForecast';
import SalesForecastChart from './SalesForecastChart';

export default function SalesForecastContainer() {
  const { data, isLoading, isError } = useSalesForecast();

  if (isLoading) {
    return (
      <div className="w-full h-96 flex items-center justify-center bg-gray-900 rounded-lg border border-gray-800">
        <span className="text-gray-400 animate-pulse">Running forecasting model...</span>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="w-full h-96 flex items-center justify-center bg-red-900/20 rounded-lg border border-red-800">
        <span className="text-red-400">Failed to load forecast data.</span>
      </div>
    );
  }

  return <SalesForecastChart data={data} />;
}
