import Plotly from 'plotly.js-dist-min';
import createPlotlyComponent from 'react-plotly.js/factory';
import type { RfmResponse } from '../../types/api';
import ChartCard from '../../components/common/ChartCard';

// @ts-expect-error - Vite requires .default for CommonJS interop, but TS types don't recognize t
const Plot = createPlotlyComponent.default(Plotly);

interface Props {
  data: RfmResponse;
}

const SEGMENT_COLORS: Record<string, string> = {
  'Champions': '#10b981',        // Emerald
  'Loyal': '#3b82f6',            // Blue
  'Recent/Promising': '#8b5cf6', // Purple
  'At Risk': '#f59e0b',          // Amber
  'Hibernating': '#ef4444'       // Red
};

export default function RfmChart({ data }: Props) {
    
    const traces = Object.keys(SEGMENT_COLORS).map((segmentName) => {
    const indices = data.segment.map((seg, i) => (seg === segmentName ? i : -1)).filter(i => i !== -1);
    
    return {
      x: indices.map(i => data.recency[i]),
      y: indices.map(i => data.monetary[i]),
      type: 'scatter',
      mode: 'markers',
      name: segmentName,
      text: indices.map(i => 
        `Segment: ${segmentName}<br>Recency: ${data.recency[i]} days<br>Monetary: $${data.monetary[i]}<br>Orders: ${data.frequency[i]}`
      ),
      hoverinfo: 'text',
      marker: {
        color: SEGMENT_COLORS[segmentName],
        size: indices.map(i => 6 + (data.frequency[i] - 1) * 3), 
        opacity: 0.7,
        line: { color: 'rgba(255,255,255,0.2)', width: 1 }
      }
    };
  });

  return (
    <ChartCard heightClass="h-96" title="RFM Customer Segments (Sample)">
      <Plot
        data={traces as any}
        layout={{
          autosize: true,
          margin: { t: 10, r: 20, l: 80, b: 60 },
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

