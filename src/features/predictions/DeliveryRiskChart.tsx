import Plotly from 'plotly.js-dist-min';
import createPlotlyComponent from 'react-plotly.js/factory';
import type { DelayRiskResponse } from '../../types/api';

// @ts-expect-error - Vite requires .default for CommonJS interop, but TS types don't recognize it
const Plot = createPlotlyComponent.default(Plotly);

interface Props {
  data: DelayRiskResponse;
}

export default function DeliveryRiskChart({ data }: Props) {
  return (
  <Plot
        data={[
          {
            x: data.importance_scores,
            y: data.factors,
            type: 'bar',
            orientation: 'h',
            marker: {
              color: '#ef4444', // Tailwind red-500
              opacity: 0.8
            },
            text: data.importance_scores.map(score => `${score}%`),
            textposition: 'auto',
            hoverinfo: 'none', // Hover redundant since text is on the bar
          }
        ]}
        layout={{
          autosize: true,
          margin: { t: 10, r: 40, l: 160, b: 40 }, // Expanded left margin for long labels
          paper_bgcolor: 'transparent',
          plot_bgcolor: 'transparent',
          xaxis: {
            title: 'Predictive Importance (%)',
            gridcolor: '#374151',
            tickfont: { color: '#9ca3af' }
          },
          yaxis: {
            gridcolor: '#374151',
            tickfont: { color: '#9ca3af' },
          }
        }}
        useResizeHandler={true}
        style={{ width: '100%', height: '100%' }}
        config={{ displayModeBar: false }}
      />
  );
}
