import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GenericService } from './generic.service';

export interface CustomerCategoryApiItem {
  id: number;
  name: string;
  description: string | null;
  tax_config_id: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CustomerCategoriesResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: CustomerCategoryApiItem[];
}

export interface CustomerMenuApiItem {
  id: number;
  name: string;
  base_price: number;
  food_type: string;
  prep_time_minutes: number;
  is_available: boolean;
  created_at: string;
  category_id: number;
  station_id: number;
  description: string | null;
  sku: string;
  spice_level: number | null;
  is_chef_special: boolean;
  is_archived: boolean;
  updated_at: string;
}

export interface CustomerMenuListMeta {
  total: number;
  page: number;
  limit: number;
  total_pages: number;
  has_next_page: boolean;
  has_previous_page: boolean;
}

export interface CustomerMenuPaginationResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: CustomerMenuApiItem[];
  meta: CustomerMenuListMeta;
}

export interface CustomerMenuQuery {
  page: number;
  limit: number;
  search?: string;
  category_id?: number | null;
}

@Injectable({ providedIn: 'root' })
export class CustomerMenuService {
  constructor(private generic: GenericService) {}

  getCategories(): Observable<CustomerCategoriesResponse> {
    return this.generic.Get<CustomerCategoriesResponse>('customer/categories');
  }

  getMenuItems(params: CustomerMenuQuery): Observable<CustomerMenuPaginationResponse> {
    const q = new URLSearchParams();
    q.set('page', String(Math.max(1, params.page)));
    q.set('limit', String(Math.min(100, Math.max(1, params.limit))));
    const search = params.search?.trim();
    if (search) {
      q.set('search', search);
    }
    if (params.category_id != null && params.category_id > 0) {
      q.set('category_id', String(params.category_id));
    }
    return this.generic.Get<CustomerMenuPaginationResponse>(`customer/items?${q.toString()}`);
  }
}
