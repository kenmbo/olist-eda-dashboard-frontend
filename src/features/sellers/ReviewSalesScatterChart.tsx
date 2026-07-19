import Plotly from 'plotly.js-dist-min';
import createPlotlyComponent from 'react-plotly.js/factory';
import type { ReviewSalesScatterResponse } from '../../types/api';
import ChartCard from '../../components/common/ChartCard';

// @ts-expect-error - Vite requires .default for CommonJS interop, but TS types don't recognize it
const Plot = createPlotlyComponent.default(Plotly);

interface Props {
  data: ReviewSalesScatterResponse;
}

export default function ReviewSalesScatterChart({ data }: Props) {
  // Create an array of custom hover text strings
  const hoverText = data.seller_ids.map((id, index) => 
    `Seller: ${id.substring(0, 8)}...<br>Avg Score: ${data.avg_scores[index]}<br>Total Sales: $${data.total_sales[index].toLocaleString()}<br>Orders: ${data.order_counts[index]}`
  );

  return (
    <ChartCard heightClass="h-80" title="Review Score vs. Total Sales">
      <Plot
        data={[
          {
            x: data.avg_scores,
            y: data.total_sales,
            type: 'scatter',
            mode: 'markers',
            text: hoverText,
            hoverinfo: 'text',
            marker: {
              color: '#2dd4bf', // Tailwind teal-400
              opacity: 0.5,     // Creates the clustering density effect
              size: data.order_counts,
              sizemode: 'area',
              sizeref: 2 * Math.max(...data.order_counts) / (40 ** 2), // Scales bubbles appropriately
              sizemin: 4
            }
          }
        ]}
        layout={{
          autosize: true,
          margin: { t: 10, r: 20, l: 60, b: 40 },
          paper_bgcolor: 'transparent',
          plot_bgcolor: 'transparent',
          hovermode: 'closest',
          xaxis: { 
            title: 'Average Review Score',
            gridcolor: '#374151',
            tickfont: { color: '#9ca3af' },
            range: [0.8, 5.2], // Give the edges a little breathing room
          },
          yaxis: { 
            title: 'Total Sales ($)',
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
