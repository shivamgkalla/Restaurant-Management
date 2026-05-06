import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Observable } from 'rxjs';

export interface OrderTableApiItem {
  id: number;
  table_number: string;
  seating_capacity: number;
  status: string;
  zone?: {
    id: number;
    name: string;
  };
}

export interface OrderTableSearchResponse {
  success?: boolean;
  statusCode?: number;
  message?: string;
  data: OrderTableApiItem[];
}
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private genricService: GenericService) {}

  getAllTables(): Observable<OrderTableSearchResponse> {
    return this.genricService.Get<OrderTableSearchResponse>('tables/search');
  }
}
