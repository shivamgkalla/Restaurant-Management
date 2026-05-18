import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GenericService } from './generic.service';

export interface CustomerCreateOrderItem {
  menu_item_id: number;
  quantity: number;
  special_instructions: string;
}

export interface CustomerCreateOrderPayload {
  customer_id: number;
  notes: string;
  is_urgent: boolean;
  items: CustomerCreateOrderItem[];
}

export interface CustomerCreateOrderData {
  id?: number;
  order_number?: string;
  [key: string]: unknown;
}

export interface CustomerCreateOrderResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data?: CustomerCreateOrderData;
}

export interface CustomerOrderItemApi {
  id: number;
  menu_item_id: number;
  quantity: number;
  unit_price: number;
  special_instructions: string;
  is_cancelled: boolean;
}

export interface CustomerOrderApi {
  id: number;
  order_number: string;
  customer_id: number;
  table_id: number | null;
  captain_id: number;
  status: string;
  notes: string | null;
  total_amount: number;
  created_at: string;
  updated_at: string;
  items: CustomerOrderItemApi[];
}

export interface CustomerOrdersListResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: CustomerOrderApi[];
}

export interface CustomerOrderDetailResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: CustomerOrderApi;
}

@Injectable({ providedIn: 'root' })
export class CustomerOrderService {
  constructor(private generic: GenericService) {}

  createOrder(payload: CustomerCreateOrderPayload): Observable<CustomerCreateOrderResponse> {
    return this.generic.Post('customer/orders', payload);
  }

  getMyOrders(customerId: number): Observable<CustomerOrdersListResponse> {
    return this.generic.Get<CustomerOrdersListResponse>(`customer/orders?customer_id=${customerId}`);
  }

  getOrderById(orderId: number): Observable<CustomerOrderDetailResponse> {
    return this.generic.Get<CustomerOrderDetailResponse>(`customer/orders/${orderId}`);
  }
}
