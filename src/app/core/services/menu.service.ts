import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GenericService } from './generic.service';

export type MenuFoodType = 'veg' | 'non_veg';

export interface CreateMenuPayload {
  category_id: string | number;
  station_id: number;
  name: string;
  description: string;
  base_price: number;
  food_type: MenuFoodType;
  is_chef_special: boolean;
}

export interface MenuApiItem {
  id: number;
  category_id: number;
  station_id?: number;
  name: string;
  description: string | null;
  base_price: number;
  food_type: MenuFoodType;
  prep_time_minutes: number;
  is_available: boolean;
  sku: string;
  spice_level: number | null;
  is_chef_special: boolean;
  is_archived: boolean;
  created_at: string;
  updated_at: string;
  category_name?: string;
  station_name?: string;
}

export interface MenuListMeta {
  total: number;
  page: number;
  limit: number;
  total_pages: number;
  has_next_page: boolean;
  has_previous_page: boolean;
}

export interface MenuPaginationResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: MenuApiItem[];
  meta: MenuListMeta;
}

export interface MenuItemResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: MenuApiItem;
}

export interface MenuSearchResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: MenuApiItem[];
}

export interface UpdateMenuPayload {
  category_id: number;
  station_id: number;
  name: string;
  description: string;
  base_price: number;
  food_type: MenuFoodType;
  is_chef_special: boolean;
}
@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private genricService: GenericService) {}

  createMenu(payload: CreateMenuPayload): Observable<HttpResponse<unknown>> {
    return this.genricService.Post('items', payload, { observe: 'response' });
  }

  editMenu(itemId: number, payload: UpdateMenuPayload): Observable<HttpResponse<unknown>> {
    return this.genricService.PutWithResponse(`items/${itemId}`, payload);
  }

  deleteMenuById(itemId: number): Observable<unknown> {
    return this.genricService.DeleteRequest(`items/${itemId}`);
  }

  toggleAvailability(itemId: number): Observable<MenuItemResponse> {
    return this.genricService.Patch<MenuItemResponse>(`items/${itemId}/availability`, {});
  }

  menuPagination(params: { page: number; limit: number; search?: string; category_id?: number }): Observable<MenuPaginationResponse> {
    const q = new URLSearchParams();
    q.set('page', String(Math.max(1, params.page)));
    q.set('limit', String(Math.min(100, Math.max(1, params.limit))));
    const search = params.search?.trim();
    if (search) {
      q.set('search', search);
    }
    if (params.category_id && params.category_id > 0) {
      q.set('category_id', String(params.category_id));
    }
    return this.genricService.Get<MenuPaginationResponse>(`items?${q.toString()}`);
  }

  getAllWithSearch(search?: string): Observable<MenuSearchResponse> {
    const query = search?.trim()
      ? `items/search?search=${encodeURIComponent(search.trim())}`
      : 'items/search';
    return this.genricService.Get<MenuSearchResponse>(query);
  }
}
