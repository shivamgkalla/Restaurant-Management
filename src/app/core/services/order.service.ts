import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Observable } from 'rxjs';

export interface OrderTableApiItem {
  id: number;
  table_number: string;
  seating_capacity: number;
  status: string;
  zone?: {
    id: number;
    name: string;
  };
}

export interface OrderTableSearchResponse {
  success?: boolean;
  statusCode?: number;
  message?: string;
  data: OrderTableApiItem[];
}

export interface CreateOrderPayloadItem {
  menu_item_id: number;
  quantity: number;
  special_instructions: string;
}

export interface CreateOrderPayload {
  table_id: number;
  customer_id: number;
  notes: string;
  is_urgent: boolean;
  totalAmount: number;
  items: CreateOrderPayloadItem[];
}

export interface UpdateOrderPayload {
  table_id: number;
  customer_id: number;
  notes: string;
  items: CreateOrderPayloadItem[];
}

export interface OrderPaginationApiItemDetail {
  order_item_id: number;
  menu_item_id: number;
  menu_item_name: string;
  quantity: number;
  unit_price: number;
}

export interface OrderPaginationApiItem {
  id: number;
  order_number: string;
  table_id: number | null;
  table_name: string | null;
  captain_id: number;
  customer_id: number | null;
  customer_name: string | null;
  status: string;
  notes: string | null;
  total_amount: number;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  item_details: OrderPaginationApiItemDetail[];
}

export interface OrderPaginationMeta {
  total: number;
  page: number;
  limit: number;
  total_pages: number;
  has_next_page: boolean;
  has_previous_page: boolean;
}

export interface OrderPaginationResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: OrderPaginationApiItem[];
  meta: OrderPaginationMeta;
}

export interface GenerateBillPayload {
  order_id: number;
  /** Amount as string (API contract), e.g. `"200"` or `"0"`. */
  discount: string;
}

export interface GenerateBillResponse {
  success?: boolean;
  statusCode?: number;
  message?: string;
  data?: unknown;
}
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private genricService: GenericService) {}

  getAllTables(): Observable<OrderTableSearchResponse> {
    return this.genricService.Get<OrderTableSearchResponse>('tables/search');
  }

  createOrder(payload: CreateOrderPayload): Observable<unknown> {
    return this.genricService.Post('orders', payload);
  }

  updateOrder(orderId: number, payload: UpdateOrderPayload): Observable<unknown> {
    return this.genricService.Put(`orders/${orderId}`, payload);
  }

  cancelOrder(orderId: number): Observable<unknown> {
    return this.genricService.DeleteRequest(`orders/${orderId}`);
  }

  getOrders(params: { search?: string; page: number; limit: number }): Observable<OrderPaginationResponse> {
    const q = new URLSearchParams();
    q.set('page', String(Math.max(1, params.page)));
    q.set('limit', String(Math.min(100, Math.max(1, params.limit))));
    const search = params.search?.trim();
    if (search) {
      q.set('search', search);
    }
    return this.genricService.Get<OrderPaginationResponse>(`orders?${q.toString()}`);
  }

  generateBill(payload: GenerateBillPayload): Observable<GenerateBillResponse> {
    return this.genricService.Post('bills/generate', payload);
  }
}
