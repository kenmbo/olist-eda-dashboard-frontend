# TypeScript Build Fix Plan

Goal: make `tsc -b` pass without bypassing the TypeScript step in `npm run build`.

## 1. TS7016: Missing Plotly Module Declarations

Problem:
- TypeScript cannot find declarations for `plotly.js-dist-min`.
- TypeScript cannot find declarations for `plotly.js-basic-dist`.
- This is repeated across the chart components and is the biggest cluster of errors.

Plan:
- Add a local declaration file under `src`, for example `src/types/plotly-bundles.d.ts`.
- Declare the Plotly bundle modules using the existing `plotly.js` type surface where possible.
- Cover both modules:
  - `plotly.js-dist-min`
  - `plotly.js-basic-dist`
- Re-run `tsc -b` and confirm the missing declaration errors are gone before moving on.

Files likely involved:
- `src/features/categories/CategoryMonthlySalesChart.tsx`
- `src/features/categories/CategoryTreemap.tsx`
- `src/features/categories/CategoryWeightsBoxplot.tsx`
- `src/features/customers/CustomerDensityMap.tsx`
- `src/features/delivery/DeliveryStagesChart.tsx`
- `src/features/delivery/DeliveryTrendChart.tsx`
- `src/features/leads/LeadOriginsChart.tsx`
- `src/features/orders/OrderCostsHistograms.tsx`
- `src/features/orders/OrdersHeatmap.tsx`
- `src/features/orders/OrdersLineChart.tsx`
- `src/features/sellers/SellerShippingBoxPlot.tsx`

## 2. TS2339: Incorrect `react-plotly.js/factory` Call Shape

Problem:
- The chart files call:

```ts
createPlotlyComponent.default(Plotly)
```

- The installed TypeScript types describe `createPlotlyComponent` itself as the function, so `.default` does not exist.

Plan:
- Update each chart component to call:

```ts
const Plot = createPlotlyComponent(Plotly);
```

- Apply this consistently across all chart components using the factory.
- Re-run `tsc -b` after the TS7016 fix, because declaration cleanup may affect the remaining Plotly diagnostics.

## 3. TS1484: Type-Only Imports Required

Problem:
- `verbatimModuleSyntax` is enabled in `tsconfig.app.json`.
- TypeScript requires values and types to be imported separately.

Plan:
- In `src/components/common/ChartCard.tsx`, change `ReactNode` to a type-only import:

```ts
import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
```

- In `src/features/orders/ordersApi.ts`, change `DailyOrdersResponse` to a type-only import:

```ts
import type { DailyOrdersResponse } from '../../types/api';
```

- Re-run `tsc -b` and confirm TS1484 is cleared.

## 4. TS1117: Duplicate Object Literal Property

Problem:
- `src/features/categories/CategoryWeightsBoxplot.tsx` defines `boxpoints` twice in the same trace object.

Plan:
- Remove the duplicate `boxpoints` property.
- Keep the intended value, currently `'outliers'`.
- Re-run `tsc -b` and confirm TS1117 is cleared.

## 5. TS6133: Unused Imports

Problem:
- `src/main.tsx` imports `StrictMode` and `createRoot`, but uses `React.StrictMode` and `ReactDOM.createRoot`.

Plan:
- Pick one style and remove the unused imports.
- Minimal option:

```ts
import React from 'react';
import ReactDOM from 'react-dom/client';
```

- Cleaner option:

```ts
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
```

and then render with `createRoot(...).render(<StrictMode>...</StrictMode>)`.

- Re-run `tsc -b` and confirm TS6133 is cleared.

## Newly Surfaced TS1484: Plotly `Data` Type Imports

Problem:
- After adding declarations for the Plotly bundle modules, TypeScript can now resolve `Data` from `plotly.js-dist-min`.
- Because `verbatimModuleSyntax` is enabled, `Data` is recognized as a type and cannot be imported through a runtime import.
- The current compiler output reports this in:
  - `src/features/categories/CategoryMonthlySalesChart.tsx`
  - `src/features/categories/CategoryWeightsBoxplot.tsx`

## Final Verification

- Run `tsc -b`.
- If it passes, run `npm run build` to verify both TypeScript and Vite production build pass.
- Keep the `package.json` build script as:

```json
"build": "tsc -b && vite build"
```
