import Plotly from 'plotly.js-dist-min';
import createPlotlyComponent from 'react-plotly.js/factory';
import type { DelayRiskResponse } from '../../types/api';

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
