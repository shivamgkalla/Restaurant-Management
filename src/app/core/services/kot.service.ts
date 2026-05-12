import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GenericService } from './generic.service';

/** Single line item under a kitchen station (KOT details API). */
export interface KotOrderItemApi {
  order_item_id: number;
  menu_item_id: number;
  menu_item_name: string;
  category_id: number;
  category_name: string;
  quantity: number;
  unit_price: number;
  is_prepared: boolean;
  special_instructions: string;
}

export interface KotStationApi {
  station_id: number;
  station_name: string;
  items: KotOrderItemApi[];
}

export interface KotCategoryItemApi {
  order_item_id: number;
  menu_item_id: number;
  menu_item_name: string;
  count: number;
  is_prepared: boolean;
  special_instructions: string;
}

export interface KotCategoryApi {
  category_id: number;
  category_name: string;
  total_count: number;
  items: KotCategoryItemApi[];
}

export interface KotOrderApi {
  order_id: number;
  order_number: string;
  table_id: number;
  table_name: string;
  stations: KotStationApi[];
  categories: KotCategoryApi[];
}

export interface KotDetailsMeta {
  total: number;
  page: number;
  limit: number;
  total_pages: number;
  has_next_page: boolean;
  has_previous_page: boolean;
}

export interface KotDetailsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: KotOrderApi[];
  meta: KotDetailsMeta;
}

export interface KotDetailsQuery {
  search?: string;
  category_id?: number;
  page: number;
  limit: number;
}

/** Typical wrapped response for PATCH toggle-prepared. */
export interface KotTogglePreparedResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data?: {
    is_prepared?: boolean;
    order_item_id?: number;
    menu_item_id?: number;
  };
}

@Injectable({
  providedIn: 'root',
})
export class KotService {
  constructor(private generic: GenericService) {}

  /** GET /kot/details — search, category filter, pagination (1-based page). */
  getKotDetails(params: KotDetailsQuery): Observable<KotDetailsResponse> {
    const q = new URLSearchParams();
    q.set('page', String(Math.max(1, params.page)));
    q.set('limit', String(Math.min(100, Math.max(1, params.limit))));
    const search = params.search?.trim();
    if (search) {
      q.set('search', search);
    }
    if (params.category_id != null && !Number.isNaN(params.category_id)) {
      q.set('category_id', String(params.category_id));
    }
    return this.generic.Get<KotDetailsResponse>(`kot/details?${q.toString()}`);
  }

  /**
   * PATCH /kot/items/{order_item_id}/toggle-prepared — toggles is_prepared (false↔true).
   * Body includes menu_item_id as required by the API.
   */
  toggleItemPrepared(
    orderItemId: number,
    menuItemId: number,
  ): Observable<KotTogglePreparedResponse> {
    return this.generic.Patch<KotTogglePreparedResponse>(
      `kot/items/${orderItemId}/toggle-prepared`,
      { menu_item_id: menuItemId },
    );
  }
}
