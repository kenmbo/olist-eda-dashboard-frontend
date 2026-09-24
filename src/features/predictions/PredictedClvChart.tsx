import Plotly from 'plotly.js-dist-min';
import createPlotlyComponent from 'react-plotly.js/factory';
import type { PredictedClvResponse } from '../../types/api';
import ChartCard from '../../components/common/ChartCard';

// @ts-expect-error - Vite requires .default for CommonJS interop, but TS types don't recognize this
const Plot = createPlotlyComponent.default(Plotly);

const SEGMENT_COLORS: Record<string, string> = {
	'Champions': '#10b981',
	'Loyal': '#3b82f6',
	'Recent/Promising': '#8b5cf6',
	'At Risk': '#f59e0b',
	'Hibernating': '#ef4444'
};

export default function PredictedClvChart({ data }: Props) {
	return (
	<Plot data={traces as any} layout={{autosize: true}} useResizeHandler={true}/>
	);
}
