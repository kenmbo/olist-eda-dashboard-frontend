import Plotly from 'plotly.js-dist-min';
import createPlotlyComponent from 'react-plotly.js/factory';
import type { RegressionTrendResponse } from '../../types/api';
import ChartCard from '../../components/common/ChartCard';

// @ts-expect-error - Vite requires .default for CommonJS interop, but TS types don't recognize it
const Plot = createPlotlyComponent.default(Plotly);

interface Props {
  data: RegressionTrendResponse;
}

export default function RegressionTrendChart({ data }: Props) {
  return (
    <ChartCard heightClass="h-96" title="Sales Trajectory (Linear Regression Model)">
      <Plot
        data={[
          {
            x: data.dates,
            y: data.actual_sales,
            type: 'scatter',
            mode: 'markers',
            name: 'Daily Sales',
            marker: {
              color: '#3b82f6', // Muted Blue
              opacity: 0.3,
              size: 5
            },
            hoverinfo: 'x+y',
          },
          {
            x: data.dates,
            y: data.regression_trend,
            type: 'scatter',
            mode: 'lines',
            name: 'Regression Trend',
            line: {
              color: '#ec4899', // Neon Magenta
              width: 3,
              dash: 'solid'
            },
            hoverinfo: 'none', // Disable hover on the line itself to keep tooltips clean
          }
        ]}
        layout={{
          autosize: true,
          margin: { t: 10, r: 20, l: 60, b: 40 },
          paper_bgcolor: 'transparent',
          plot_bgcolor: 'transparent',
          hovermode: 'closest',
          showlegend: true,
          legend: {
            orientation: 'h',
            y: 1.1,
            font: { color: '#9ca3af' }
          },
          xaxis: { 
            gridcolor: '#374151',
            tickfont: { color: '#9ca3af' },
          },
          yaxis: { 
            title: 'Daily Sales ($)',
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
