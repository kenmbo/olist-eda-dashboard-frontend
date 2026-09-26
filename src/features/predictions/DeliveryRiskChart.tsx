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
          }
        ]}
	/>
  );
}
