import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Observable } from 'rxjs';

export interface BillPaginationApiItem {
  id: number;
  bill_number: string;
  order_id: number;
  subtotal: number;
  discount_type: string;
  discount_value: number;
  discount_amount: number;
  discount_reason: string | null;
  discount_approved_by: number | null;
  taxable_amount: number;
  cgst_amount: number;
  sgst_amount: number;
  igst_amount: number;
  total_tax: number;
  is_tax_inclusive: boolean;
  grand_total: number;
  status: string;
  notes: string | null;
  created_by: number;
  settled_at: string | null;
  settled_by: number | null;
  cancelled_at: string | null;
  cancelled_by: number | null;
  created_at: string;
  updated_at: string;
}

export interface BillPaginationResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: BillPaginationApiItem[];
  meta: {
    total: number;
    skip: number;
    limit: number;
  };
}

export interface LegacyBillPaginationResponseShape {
  success?: boolean;
  statusCode?: number;
  message?: string;
  total: number;
  skip: number;
  limit: number;
  items: BillPaginationApiItem[];
}

export interface BillPaginationQuery {
  status?: string | null;
  order_id?: number | null;
  date_from?: string | null;
  date_to?: string | null;
  skip?: number;
  limit?: number;
}

export interface AddBillPaymentPayload {
  payment_method: 'cash' | 'online' | 'card';
  amount: number;
  reference_number: string;
  card_uid: string;
}

export interface AddBillPaymentResponse {
  success?: boolean;
  statusCode?: number;
  message?: string;
  data?: unknown;
}

export interface CancelBillResponse {
  success?: boolean;
  statusCode?: number;
  message?: string;
  data?: unknown;
}

export interface PrintBillResponse {
  success?: boolean;
  statusCode?: number;
  message?: string;
  data?: PrintBillData;
}

export interface PrintBillItem {
  menu_item_name: string;
  variant_name: string | null;
  quantity: number;
  unit_price: number;
  line_total: number;
}

export interface PrintBillPayment {
  id: number;
  bill_id: number;
  payment_method: string;
  amount: number;
  reference_number: string | null;
  collected_by: number | null;
  created_at: string;
}

export interface PrintBillData {
  id: number;
  bill_number: string;
  order_number: string;
  table_number: string | null;
  captain_name: string | null;
  customer_name: string | null;
  items: PrintBillItem[];
  subtotal: number;
  discount_type: string;
  discount_value: number;
  discount_amount: number;
  discount_reason: string | null;
  taxable_amount: number;
  cgst_amount: number;
  sgst_amount: number;
  igst_amount: number;
  total_tax: number;
  is_tax_inclusive: boolean;
  grand_total: number;
  status: string;
  notes: string | null;
  created_at: string;
  settled_at: string | null;
  payments: PrintBillPayment[];
}
@Injectable({
  providedIn: 'root'
})
export class BillPaymentService {

  constructor(private genricService: GenericService) {}

  getBillsPagination(params: BillPaginationQuery = {}): Observable<BillPaginationResponse | LegacyBillPaginationResponseShape> {
    const q = new URLSearchParams();
    const skip = Math.max(0, params.skip ?? 0);
    const limit = Math.min(200, Math.max(1, params.limit ?? 50));
    q.set('skip', String(skip));
    q.set('limit', String(limit));

    const status = params.status?.trim();
    if (status) q.set('status', status);

    if (params.order_id != null && Number.isInteger(params.order_id) && params.order_id > 0) {
      q.set('order_id', String(params.order_id));
    }

    const dateFrom = params.date_from?.trim();
    if (dateFrom) q.set('date_from', dateFrom);

    const dateTo = params.date_to?.trim();
    if (dateTo) q.set('date_to', dateTo);

    return this.genricService.Get<BillPaginationResponse | LegacyBillPaginationResponseShape>(`bills?${q.toString()}`);
  }

  addPayment(billId: number, payload: AddBillPaymentPayload): Observable<AddBillPaymentResponse> {
    return this.genricService.Post(`bills/${billId}/payments`, payload);
  }

  cancelBill(billId: number): Observable<CancelBillResponse> {
    return this.genricService.DeleteRequest(`bills/${billId}`);
  }

  printBill(billId: number): Observable<PrintBillResponse> {
    return this.genricService.Get<PrintBillResponse>(`bills/${billId}/print`);
  }
}
