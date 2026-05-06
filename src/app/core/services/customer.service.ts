import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { GenericService } from './generic.service';
import { Observable } from 'rxjs';

/** Request body for POST /customers */
export interface CreateCustomerPayload {
  name: string;
  phone: string;
  email: string;
  address: string;
  date_of_birth: string;
  notes: string;
  customer_type: 'new' | 'regular' | 'vip';
}

export interface UpdateCustomerPayload {
  name?: string;
  phone?: string;
  email?: string;
  address?: string;
  date_of_birth?: string;
  notes?: string;
  customer_type?: 'new' | 'regular' | 'vip';
}

export interface CustomerSearchPayload {
  page: number;
  page_size: number;
  search?: string;
}

export interface CustomerApiItem {
  customer_id: string;
  phone: string;
  id: number;
  address: string;
  notes: string;
  is_active: boolean;
  updated_at: string;
  name: string;
  email: string;
  date_of_birth: string;
  customer_type: string;
  registered_at: string;
}

export interface CustomerPaginationResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: CustomerApiItem[];
  meta: {
    total: number;
    page: number;
    limit: number;
    total_pages: number;
    has_next: boolean;
    has_prev: boolean;
  };
}

export interface CustomerSearchResponse {
  success?: boolean;
  statusCode?: number;
  message?: string;
  data: CustomerApiItem[];
}

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(
    private genricService: GenericService,
  ) {}

  createCustomer(payload: CreateCustomerPayload): Observable<HttpResponse<unknown>> {
    return this.genricService.Post('customers', payload, { observe: 'response' });
  }

  updateCustomer(id: number, payload: UpdateCustomerPayload): Observable<HttpResponse<unknown>> {
    return this.genricService.Put(`customers/${id}`, payload);
  }

  /** DELETE /customers/{id} */
  deleteCustomer(id: number): Observable<unknown> {
    return this.genricService.DeleteRequest(`customers/${id}`);
  }

  customerPagination(payload: CustomerSearchPayload): Observable<CustomerPaginationResponse> {
    const search = payload.search?.trim() ?? '';
    const query = search
      ? `customers?page=${payload.page}&page_size=${payload.page_size}&search=${encodeURIComponent(search)}`
      : `customers?page=${payload.page}&page_size=${payload.page_size}`;
    return this.genricService.Get(query);
  }

  getAllCustomers(): Observable<CustomerSearchResponse> {
    return this.genricService.Get<CustomerSearchResponse>('customers/search');
  }

}
