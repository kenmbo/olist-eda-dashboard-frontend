import Plotly from 'plotly.js-dist-min';
import createPlotlyComponent from 'react-plotly.js/factory';
import type { PredictedClvResponse } from '../../types/api';
import ChartCard from '../../components/common/ChartCard';

const Plot = createPlotlyComponent.default(Plotly);

export default function PredictedClvChart({ data }: Props) {
	return (
	<Plot data={traces as any} layout={{autosize: true}} useResizeHandler={true}/>
	);
}
