import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GenericService } from './generic.service';

export interface CreateKitchenStationPayload {
  name: string;
}

export interface UpdateKitchenStationPayload {
  name: string;
}

export interface KitchenStationApiItem {
  id: number | string;
  name: string;
  printer_name?: string | null;
  printer_ip?: string | null;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface KitchenStationPaginationMeta {
  total: number;
  page: number;
  limit: number;
  total_pages: number;
  has_next: boolean;
  has_prev: boolean;
}

export interface KitchenStationPaginationResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: KitchenStationApiItem[];
  meta: KitchenStationPaginationMeta;
}

export interface KitchenStationActionResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data?: KitchenStationApiItem;
}

export interface KitchenStationListResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: KitchenStationApiItem[];
}

@Injectable({
  providedIn: 'root'
})
export class KitchenStationService {

  constructor(private genricService: GenericService) {}

  createKitchenStation(payload: CreateKitchenStationPayload): Observable<HttpResponse<unknown>> {
    return this.genricService.Post('kitchen-stations', payload, { observe: 'response' });
  }

  updateKitchenStation(stationId: number, payload: UpdateKitchenStationPayload): Observable<HttpResponse<unknown>> {
    return this.genricService.PutWithResponse(`kitchen-stations/${stationId}`, payload);
  }

  stationPagination(params: { page: number; limit: number; search?: string }): Observable<KitchenStationPaginationResponse> {
    const q = new URLSearchParams();
    q.set('page', String(Math.max(1, params.page)));
    q.set('limit', String(Math.min(100, Math.max(1, params.limit))));
    const search = params.search?.trim();
    if (search) {
      q.set('search', search);
    }
    return this.genricService.Get<KitchenStationPaginationResponse>(`kitchen-stations/paginated?${q.toString()}`);
  }

  getAllStations(): Observable<KitchenStationListResponse> {
    return this.genricService.Get<KitchenStationListResponse>('kitchen-stations');
  }

  toggleAvailability(stationId: number): Observable<KitchenStationActionResponse> {
    return this.genricService.Patch<KitchenStationActionResponse>(`kitchen-stations/${stationId}/toggle-availability`, {});
  }

  deleteKitchenStation(stationId: number): Observable<unknown> {
    return this.genricService.DeleteRequest(`kitchen-stations/${stationId}`);
  }
}
