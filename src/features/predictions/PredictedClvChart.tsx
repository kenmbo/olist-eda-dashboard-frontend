import Plotly from 'plotly.js-dist-min';
import createPlotlyComponent from 'react-plotly.js/factory';
import type { PredictedClvResponse } from '../../types/api';
import ChartCard from '../../components/common/ChartCard';

// @ts-expect-error - Vite requires .default for CommonJS interop, but TS types don't recognize this
const Plot = createPlotlyComponent.default(Plotly);

interface Props {
  data: PredictedClvResponse;
}

interface Props {
  data: PredictedClvResponse;
}

const SEGMENT_COLORS: Record<string, string> = {
  'Champions': '#10b981',
  'Loyal': '#3b82f6',
  'Recent/Promising': '#8b5cf6',
  'At Risk': '#f59e0b',
  'Hibernating': '#ef4444'
};

export default function PredictedClvChart({ data }: Props) {
  // Create a separate violin trace for each segment
  const traces = Object.keys(SEGMENT_COLORS).map((segmentName) => {
    const segmentClvs = data.predicted_clv.filter((_, i) => data.segment[i] === segmentName);

    return {
      type: 'violin',
      y: segmentClvs,
      name: segmentName,
      box: { visible: true }, // Shows the inner boxplot summary
      meanline: { visible: true }, // Shows the mean line
      line: { color: SEGMENT_COLORS[segmentName] },
      fillcolor: SEGMENT_COLORS[segmentName],
      opacity: 0.6,
      points: false, // Hides the raw data points to keep it looking clean
    };
  });

  return (
    <ChartCard heightClass="h-96" title="Predicted CLV Density by Segment">
      <Plot
        data={traces as any}
        layout={{
          autosize: true,
          margin: { t: 10, r: 20, l: 60, b: 60 },
          paper_bgcolor: 'transparent',
          plot_bgcolor: 'transparent',
          showlegend: false, // The X-axis labels make the legend redundant here
          xaxis: {
            gridcolor: '#374151',
            tickfont: { color: '#9ca3af' },
            tickangle: -45,
          },
          yaxis: {
            title: {
              text: 'Predicted Value ($)',
              font: { color: '#9ca3af' }
            },
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
