import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GenericService } from './generic.service';

export type RfidApiStatus = 'available' | 'active' | 'blocked' | 'lost';

export interface CreateRfidCardPayload {
  card_uid: string;
}

export interface CreateRfidCardApiData {
  id?: number;
  card_uid?: string;
  status?: string;
  balance?: number;
  customer_id?: number | null;
  created_at?: string;
}

export interface CreateRfidCardResponseBody {
  success?: boolean;
  statusCode?: number;
  message?: string;
  data?: CreateRfidCardApiData;
}

export interface RfidCardApiItem {
  id: number;
  status: string;
  customer_id: number | null;
  customer_name?: string | null;
  bound_by: number | null;
  updated_at: string;
  card_uid: string;
  balance: number;
  bound_at: string | null;
  created_at: string;
}

export interface RfidPaginationMeta {
  total: number;
  skip: number;
  limit: number;
}

export interface RfidPaginationResponse {
  success?: boolean;
  statusCode?: number;
  message?: string;
  data: RfidCardApiItem[];
  meta: RfidPaginationMeta;
}

export interface RfidPaginationQuery {
  skip?: number;
  limit?: number;
  status?: RfidApiStatus | '' | null;
}

export interface RfidAllResponseMeta {
  total?: number;
}

export interface RfidAllResponse {
  success?: boolean;
  statusCode?: number;
  message?: string;
  data: RfidCardApiItem[];
  meta?: RfidAllResponseMeta;
}

export interface BindRfidCardPayload {
  customer_id: number;
  initial_load_amount: number;
  payment_method: 'cash' | 'online';
  reference_number: string;
}

export interface BindRfidCardResponseBody {
  success?: boolean;
  statusCode?: number;
  message?: string;
  data?: unknown;
}

export interface LoadRfidCardPayload {
  amount: number;
  payment_method: 'cash' | 'online';
  reference_number: string;
}

export interface LoadRfidCardResponseBody {
  success?: boolean;
  statusCode?: number;
  message?: string;
  data?: unknown;
}

export interface BlockRfidCardResponseBody {
  success?: boolean;
  statusCode?: number;
  message?: string;
  data?: unknown;
}

export interface UnblockRfidCardResponseBody {
  success?: boolean;
  statusCode?: number;
  message?: string;
  data?: unknown;
}

export interface ClearRfidCardPayload {
  refund_method: 'cash' | 'online';
  reference_number: string;
  note: string;
}

export interface ClearRfidCardResponseBody {
  success?: boolean;
  statusCode?: number;
  message?: string;
  data?: unknown;
}

@Injectable({
  providedIn: 'root',
})
export class RfidService {
  constructor(private genricService: GenericService) {}

  createRfid(payload: CreateRfidCardPayload): Observable<HttpResponse<CreateRfidCardResponseBody>> {
    return this.genricService.Post('rfid-cards', payload, { observe: 'response' });
  }

  getAllRfidCards(): Observable<RfidAllResponse> {
    return this.genricService.Get<RfidAllResponse>('rfid-cards/all');
  }

  bindRfidCard(cardId: number, payload: BindRfidCardPayload): Observable<HttpResponse<BindRfidCardResponseBody>> {
    return this.genricService.Post(`rfid-cards/${cardId}/bind`, payload, { observe: 'response' });
  }

  loadRfidCardBalance(cardId: number, payload: LoadRfidCardPayload): Observable<HttpResponse<LoadRfidCardResponseBody>> {
    return this.genricService.Post(`rfid-cards/${cardId}/load`, payload, { observe: 'response' });
  }

  blockRfidCard(cardId: number): Observable<BlockRfidCardResponseBody> {
    return this.genricService.Patch<BlockRfidCardResponseBody>(`rfid-cards/${cardId}/block`, {});
  }

  unblockRfidCard(cardId: number): Observable<UnblockRfidCardResponseBody> {
    return this.genricService.Patch<UnblockRfidCardResponseBody>(`rfid-cards/${cardId}/unblock`, {});
  }

  clearRfidCard(cardId: number, payload: ClearRfidCardPayload): Observable<HttpResponse<ClearRfidCardResponseBody>> {
    return this.genricService.Post(`rfid-cards/${cardId}/clear`, payload, { observe: 'response' });
  }

  getRfidCards(params: RfidPaginationQuery = {}): Observable<RfidPaginationResponse> {
    const skip = Math.max(0, params.skip ?? 0);
    const limit = Math.min(200, Math.max(1, params.limit ?? 50));
    const q = new URLSearchParams();
    q.set('skip', String(skip));
    q.set('limit', String(limit));
    const status = params.status?.trim();
    if (status) {
      q.set('status', status);
    }
    return this.genricService.Get<RfidPaginationResponse>(`rfid-cards?${q.toString()}`);
  }
}
