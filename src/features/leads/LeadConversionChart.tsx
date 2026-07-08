import Plotly from 'plotly.js-dist-min';
import createPlotlyComponent from 'react-plotly.js/factory';
import type { LeadConversionResponse } from '../../types/api';
import ChartCard from '../../components/common/ChartCard';

// @ts-expect-error - Vite requires .default for CommonJS interop, but TS types don't recognize it
const Plot = createPlotlyComponent.default(Plotly);

interface Props {
  data: LeadConversionResponse;
}

export default function LeadConversionChart({ data }: Props) {
  return (
    <ChartCard heightClass="h-80" title="Lead Volume vs. Conversion Rate">
      <Plot
        data={[
          {
            x: data.origins,
            y: data.qualified_leads,
            type: 'bar',
            name: 'Qualified Leads',
            marker: { color: '#4c1d95', opacity: 0.7 }, // Deep violet for volume
            yaxis: 'y1',
          },
          {
            x: data.origins,
            y: data.conversion_rate,
            type: 'scatter',
            mode: 'lines+markers',
            name: 'Conversion %',
            line: { color: '#c084fc', width: 3 }, // Bright purple for the rate line
            marker: { size: 8 },
            yaxis: 'y2',
          }
        ]}
        layout={{
          autosize: true,
          margin: { t: 10, r: 60, l: 40, b: 60 }, // Right margin increased for 2nd Y-axis
          paper_bgcolor: 'transparent',
          plot_bgcolor: 'transparent',
          xaxis: { 
            gridcolor: '#374151',
            tickfont: { color: '#9ca3af' },
            tickangle: -45, // Angle labels so they don't overlap
          },
          yaxis: { 
            title: 'Total Leads',
            gridcolor: '#374151',
            tickfont: { color: '#9ca3af' },
            side: 'left',
          },
          yaxis2: { 
            title: 'Conversion Rate (%)',
            tickfont: { color: '#c084fc' },
            overlaying: 'y', // This is what stacks the axes
            side: 'right',
            showgrid: false, // Hide the secondary grid to prevent visual clutter
            rangemode: 'tozero',
          },
          legend: {
            font: { color: '#9ca3af' },
            orientation: 'h',
            yanchor: 'bottom',
            y: 1.02,
            xanchor: 'right',
            x: 1
          }
        }}
        useResizeHandler={true}
        style={{ width: '100%', height: '100%' }}
        config={{ displayModeBar: false }}
      />
    </ChartCard>
  );
}
