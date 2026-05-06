import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Observable } from 'rxjs';

export interface CreateTablePayload {
  table_number: string;
  seating_capacity: number;
  zone_id: number;
  notes: string;
  pos_x: number;
  pos_y: number;
}

export interface TableSearchPayload {
  page: number;
  limit: number;
  search?: string;
}

export interface TableApiItem {
  id: number;
  zone_id: number;
  notes?: string;
  pos_x: number;
  pos_y: number;
  created_at?: string;
  table_number: string;
  seating_capacity: number;
  status: string;
  is_active: boolean;
  updated_at?: string;
  zone?: {
    id: number;
    name: string;
    description?: string;
    is_active?: boolean;
    created_at?: string;
    updated_at?: string;
  };
}

export interface TablePaginationResponse {
  success?: boolean;
  statusCode?: number;
  message?: string;
  meta?: {
    total: number;
    page: number;
    limit: number;
    total_pages?: number;
    has_next_page?: boolean;
    has_previous_page?: boolean;
  };
  total?: number;
  page?: number;
  limit?: number;
  data: TableApiItem[];
}

export interface TableStatusUpdateResponse {
  id: number;
  table_number: string;
  seating_capacity: number;
  status: string;
  notes?: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
  zone?: {
    id: number;
    name: string;
    description?: string;
    is_active?: boolean;
    created_at?: string;
  };
}

export interface TableDeleteResponse {
  success: boolean;
  statusCode: number;
  message: string;
}

export interface UpdateTablePayload {
  table_number: string;
  seating_capacity: number;
  zone_id: number;
  notes: string;
}

export interface ZonePaginationResponse {
  success: boolean;
  statusCode: number;
  message: string;
  meta?: {
    total: number;
    page: number;
    limit: number;
    total_pages: number;
    has_next_page: boolean;
    has_previous_page: boolean;
    /** Legacy shape */
    skip?: number;
  };
  total?: number;
  page?: number;
  skip?: number;
  limit?: number;
  data: ZoneApiItem[];
}

export interface ZoneApiItem {
  id: number;
  name: string;
  description?: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}
@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor(
    private genricService: GenericService,
  ) {}

  createZone(zone: { name: string; description: string }): Observable<any> {
    return this.genricService.Post('zones', zone);
  }
  getAllZone(): Observable<any> {
    return this.genricService.Get(`zones`);
  }
  
  /** GET /zones?page=&limit= (1-based page) */
  zonePagination(page: number, limit: number): Observable<ZonePaginationResponse> {
    const p = Math.max(1, page);
    const l = Math.min(100, Math.max(1, limit));
    return this.genricService.Get<ZonePaginationResponse>(`zones?page=${p}&limit=${l}`);
  }
  updateZone(id: number, payload: { name: string; description: string; is_active: boolean }): Observable<any> {
    return this.genricService.Put(`zones/${id}`, payload);
  }
  deleteZone(id: number): Observable<any> {
    return this.genricService.DeleteRequest(`zones/${id}`);
  }
  createTable(payload: CreateTablePayload): Observable<any> {
    return this.genricService.Post('tables', payload);
  }

  tablePagination(payload: TableSearchPayload): Observable<TablePaginationResponse> {
    const page = Math.max(1, payload.page);
    const limit = Math.min(100, Math.max(1, payload.limit));
    const search = payload.search?.trim() ?? '';
    const query = search
      ? `tables?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`
      : `tables?page=${page}&limit=${limit}`;
    return this.genricService.Get<TablePaginationResponse>(query);
  }

  updateTableStatus(tableId: number, status: string): Observable<TableStatusUpdateResponse> {
    return this.genricService.Patch(`tables/${tableId}/status`, { status });
  }

  deleteTable(tableId: number): Observable<TableDeleteResponse> {
    return this.genricService.DeleteRequest(`tables/${tableId}`);
  }

  updateTable(tableId: number, payload: UpdateTablePayload): Observable<any> {
    return this.genricService.Put(`tables/${tableId}`, payload);
  }
}
