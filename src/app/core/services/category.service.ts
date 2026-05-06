import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GenericService } from './generic.service';

export interface CreateCategoryPayload {
  name: string;
  description: string;
  tax_config_id: number;
}

export interface UpdateCategoryPayload {
  name: string;
  description: string;
  tax_config_id: number;
}

export interface CategoryApiItem {
  id: number;
  name: string;
  description: string | null;
  tax_config_id: number;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface CategoryListMeta {
  total: number;
  page: number;
  limit: number;
  total_pages: number;
  has_next: boolean;
  has_prev: boolean;
}

export interface CategoryPaginationResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: CategoryApiItem[];
  meta: CategoryListMeta;
}

export interface CategoryListResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: CategoryApiItem[];
}
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private genricService: GenericService,
  ) {}

  createCategory(payload: CreateCategoryPayload): Observable<HttpResponse<unknown>> {
    return this.genricService.Post('categories', payload, { observe: 'response' });
  }

  categoryPagination(params: { page: number; limit: number; search?: string }): Observable<CategoryPaginationResponse> {
    const q = new URLSearchParams();
    q.set('page', String(Math.max(1, params.page)));
    q.set('limit', String(Math.min(100, Math.max(1, params.limit))));
    const search = params.search?.trim();
    if (search) {
      q.set('search', search);
    }
    return this.genricService.Get<CategoryPaginationResponse>(`categories/paginated?${q.toString()}`);
  }

  getAllCategories(): Observable<CategoryListResponse> {
    return this.genricService.Get<CategoryListResponse>('categories');
  }

  updateCategory(categoryId: number, payload: UpdateCategoryPayload): Observable<HttpResponse<unknown>> {
    return this.genricService.PutWithResponse(`categories/${categoryId}`, payload);
  }

  deleteCategoryById(categoryId: number): Observable<unknown> {
    return this.genricService.DeleteRequest(`categories/${categoryId}`);
  }
}
