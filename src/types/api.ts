export interface DailyOrdersResponse {
  day: string[];
  order_count: number[];
}

export interface HourlyOrdersResponse {
  index: string[];    // The days of the week
  columns: string[];  // The hours of the day (0-23)
  data: number[][];   // The 2D array of order counts
}

export interface CategorySalesResponse {
  category: string[];
  sales: number[];
}

export interface SellerShippingResponse {
  bucket: string[];
  seller_id: string[];
  delivery_time: number[];
}

export interface OrderCostsResponse {
  order_id: string[];
  product_cost: number[];
  shipping_cost: number[];
}

export interface CustomerMapResponse {
  zip_prefix: number[];
  avg_CLV: number[];
  customer_count: number[];
  latitude: number[];
  longitude: number[];
}

export interface CategoryMonthlySalesResponse {
  index: string[];    // The months (e.g., '2017-01', '2017-02')
  columns: string[];  // The category names
  data: number[][];   // 2D array: rows are months, columns are sales for that category
}

export type CategoryWeightResponse = Record<string, number[]>;


export interface DeliveryTrendResponse {
  dates: string[];
  actual_days: number[];
  trend_days: number[];
}

export interface DeliveryStagesResponse {
  cities: string[];
  approval_days: number[];
  carrier_days: number[];
  transit_days: number[];
}

export interface LeadOriginResponse {
  origins: string[];
  leads: number[];
}

export interface LeadConversionResponse {
  origins: string[];
  qualified_leads: number[];
  closed_leads: number[];
  conversion_rate: number[];
}

export interface SellerDistributionResponse {
  buckets: string[];
  seller_count: number[];
}

export interface ReviewDistributionResponse {
  scores: string[];
  counts: number[];
}

export interface ReviewSalesScatterResponse {
  seller_ids: string[];
  total_sales: number[];
  avg_scores: number[];
  order_counts: number[];
}
