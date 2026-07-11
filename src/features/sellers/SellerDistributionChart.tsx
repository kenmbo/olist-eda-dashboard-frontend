import Plotly from 'plotly.js-dist-min';
import createPlotlyComponent from 'react-plotly.js/factory';
import type { SellerDistributionResponse } from '../../types/api';
import ChartCard from '../../components/common/ChartCard';

// @ts-expect-error - Vite requires .default for CommonJS interop, but TS types don't recognize it
const Plot = createPlotlyComponent.default(Plotly);

interface Props {
  data: SellerDistributionResponse;
}

export default function SellerDistributionChart({ data }: Props) {
  return (
    <ChartCard heightClass="h-80" title="Number of Sellers by Total Orders">
      <Plot
        data={[
          {
            x: data.buckets,
            y: data.seller_count,
            type: 'bar',
            marker: { 
              color: '#6366f1', // Tailwind indigo-500
              opacity: 0.9 
            },
            text: data.seller_count.map(String),
            textposition: 'auto',
            hoverinfo: 'x+y',
          }
        ]}
        layout={{
          autosize: true,
          margin: { t: 10, r: 20, l: 50, b: 40 },
          paper_bgcolor: 'transparent',
          plot_bgcolor: 'transparent',
          xaxis: { 
            gridcolor: '#374151',
            tickfont: { color: '#9ca3af' }
          },
          yaxis: { 
            title: 'Total Sellers',
            gridcolor: '#374151',
            tickfont: { color: '#9ca3af' },
          }
        }}
        useResizeHandler={true}
        style={{ width: '100%', height: '100%' }}
        config={{ displayModeBar: false }}
      />
    </ChartCard>
  );
}
