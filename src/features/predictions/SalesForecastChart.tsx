import Plotly from 'plotly.js-dist-min';
import createPlotlyComponent from 'react-plotly.js/factory';
import type { SalesForecastResponse } from '../../types/api';
import ChartCard from '../../components/common/ChartCard';

// @ts-expect-error - Vite requires .default for CommonJS interop, but TS types don't recognize it
const Plot = createPlotlyComponent.default(Plotly);

interface Props {
  data: SalesForecastResponse;
}

export default function SalesForecastChart({ data }: Props) {
  return (
    <ChartCard heightClass="h-96" title="Monthly Sales & Q4 2018 Forecast">
      <Plot
        data={[
          {
            x: data.months,
            y: data.actual_sales,
            type: 'scatter',
            mode: 'lines+markers',
            name: 'Historical Actuals',
            line: {
              color: '#06b6d4', // Cyan
              width: 3,
              shape: 'spline',
              smoothing: 0.8
            },
            marker: { size: 6 },
            fill: 'tozeroy',
            fillcolor: 'rgba(6, 182, 212, 0.1)',
            hoverinfo: 'x+y',
          },
          {
            x: data.months,
            y: data.forecast_sales,
            type: 'scatter',
            mode: 'lines+markers',
            name: 'Projected Forecast',
            line: {
              color: '#facc15', // Yellow
              width: 3,
              dash: 'dash', // Distinguishes forecast from actuals
              shape: 'spline',
              smoothing: 0.8
            },
            marker: { 
              size: 6,
              symbol: 'diamond'
            },
            hoverinfo: 'x+y',
          }
        ]}
        layout={{
          autosize: true,
          margin: { t: 10, r: 20, l: 60, b: 40 },
          paper_bgcolor: 'transparent',
          plot_bgcolor: 'transparent',
          hovermode: 'x unified',
          showlegend: true,
          legend: {
            orientation: 'h',
            y: 1.1,
            font: { color: '#9ca3af' }
          },
          xaxis: { 
            gridcolor: '#374151',
            tickfont: { color: '#9ca3af' },
            tickangle: -45,
          },
          yaxis: { 
            title: 'Monthly Sales ($)',
            gridcolor: '#374151',
            tickfont: { color: '#9ca3af' },
            zeroline: false,
          }
        }}
        useResizeHandler={true}
        style={{ width: '100%', height: '100%' }}
        config={{ displayModeBar: false }}
      />
    </ChartCard>
  );
}
