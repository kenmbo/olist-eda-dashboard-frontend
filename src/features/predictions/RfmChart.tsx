import Plotly from 'plotly.js-dist-min';
import createPlotlyComponent from 'react-plotly.js/factory';
import type { RfmResponse } from '../../types/api';
import ChartCard from '../../components/common/ChartCard';

// @ts-expect-error - Vite requires .default for CommonJS interop, but TS types don't recognize it
const Plot = createPlotlyComponent.default(Plotly);

interface Props {
  data: RfmResponse;
}

export default function RfmChart({ data }: Props) {
  return (
    <ChartCard heightClass="h-96" title="RFM Customer Segments (Sample)">
      <Plot
        data={traces as any}
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
            title: 'Recency (Days Since Last Order)',
            gridcolor: '#374151',
            tickfont: { color: '#9ca3af' },
            autorange: 'reversed' // Recency to ze left....
          },
          yaxis: { 
            title: 'Monetary Spend ($) - Log Scale',
            type: 'log', // Log scale flattens massive outliers
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
