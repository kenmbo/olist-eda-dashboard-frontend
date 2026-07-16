import Plotly from 'plotly.js-dist-min';
import createPlotlyComponent from 'react-plotly.js/factory';
import type { ReviewDistributionResponse } from '../../types/api';
import ChartCard from '../../components/common/ChartCard';

const Plot = createPlotlyComponent.default(Plotly);

interface Props {
  data: ReviewDistributionResponse;
}

export default function ReviewDistributionChart({ data }: Props) {
  // The Sentiment Gradient: Rose -> Orange -> Amber -> Light Green -> Emerald
  const sentimentColors = ['#e11d48', '#f97316', '#fbbf24', '#a3e635', '#10b981'];

  return (
    <ChartCard heightClass="h-80" title="Review Score Distribution">
      <Plot
        data={[
          {
            x: data.scores,
            y: data.counts,
            type: 'bar',
            marker: { 
              color: sentimentColors, 
              opacity: 0.9 
            },
            text: data.counts.map(String),
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
            tickfont: { color: '#9ca3af', size: 14 } // Slightly larger font for the stars
          },
          yaxis: { 
            title: 'Total Reviews',
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
