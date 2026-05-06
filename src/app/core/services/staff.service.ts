import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GenericService } from './generic.service';

/** Request body for POST /staff */
export interface CreateStaffPayload {
  employee_id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  date_of_joining: string;
  emergency_contact: string;
  notes: string;
  role_id: number;
  username: string;
  password: string;
}

/** Request body for PUT /staff/{staff_id} */
export interface UpdateStaffPayload {
  name: string;
  phone: string;
  email: string;
  address: string;
  emergency_contact: string;
  notes: string;
  role_id: number;
  username: string;
  /** Send empty string to keep existing password (if API supports); otherwise new password */
  password: string;
}

export interface StaffApiRole {
  id: number;
  name: string;
  description?: string;
  created_at?: string;
}

/** Single staff row from GET /staff/ (password_hash ignored) */
export interface StaffApiItem {
  id: number;
  name: string;
  employee_id: string;
  email: string;
  phone: string;
  address: string | null;
  date_of_joining: string | null;
  username: string;
  is_active: boolean;
  role_id: number;
  emergency_contact: string | null;
  notes: string | null;
  created_at?: string;
  updated_at?: string;
  resignation_date?: string | null;
  role?: StaffApiRole;
}

export interface StaffListMeta {
  total: number;
  page: number;
  limit: number;
  total_pages: number;
  has_next_page: boolean;
  has_previous_page: boolean;
}

export interface StaffPaginationResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: StaffApiItem[];
  meta: StaffListMeta;
}

@Injectable({
  providedIn: 'root',
})
export class StaffService {
  constructor(private genricService: GenericService) {}

  /** GET /staff/?page=&limit=&search= */
  staffPagination(params: { page: number; limit: number; search?: string }): Observable<StaffPaginationResponse> {
    const q = new URLSearchParams();
    q.set('page', String(Math.max(1, params.page)));
    q.set('limit', String(Math.min(100, Math.max(1, params.limit))));
    const search = params.search?.trim();
    if (search) {
      q.set('search', search);
    }
    return this.genricService.Get<StaffPaginationResponse>(`staff/?${q.toString()}`);
  }

  createStaff(payload: CreateStaffPayload): Observable<HttpResponse<unknown>> {
    return this.genricService.Post('staff', payload, { observe: 'response' });
  }

  /** PUT /staff/{staff_id} — observe full response for HTTP status + body statusCode */
  editStaff(staffId: number, payload: UpdateStaffPayload): Observable<HttpResponse<unknown>> {
    return this.genricService.PutWithResponse(`staff/${staffId}`, payload);
  }

  /** DELETE /staff/{staff_id} */
  deleteStaffById(staffId: number): Observable<unknown> {
    return this.genricService.DeleteRequest(`staff/${staffId}`);
  }
}
