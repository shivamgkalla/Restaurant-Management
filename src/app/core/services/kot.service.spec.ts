import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { environment } from '../../../environment/environment';

import { KotService } from './kot.service';
import { GenericService } from './generic.service';

describe('KotService', () => {
  let service: KotService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KotService, GenericService, provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(KotService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getKotDetails should request kot/details with query params', () => {
    const expectedUrl = `${environment.baseUrl}kot/details?page=2&limit=10&search=ORD&category_id=3`;
    service.getKotDetails({ page: 2, limit: 10, search: 'ORD', category_id: 3 }).subscribe();
    const req = http.expectOne(expectedUrl);
    expect(req.request.method).toBe('GET');
    req.flush({
      success: true,
      statusCode: 200,
      message: '',
      data: [],
      meta: {
        total: 0,
        page: 2,
        limit: 10,
        total_pages: 1,
        has_next_page: false,
        has_previous_page: false,
      },
    });
  });

  it('toggleItemPrepared should PATCH with menu_item_id body', () => {
    service.toggleItemPrepared(5, 8).subscribe();
    const req = http.expectOne(`${environment.baseUrl}kot/items/5/toggle-prepared`);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual({ menu_item_id: 8 });
    req.flush({
      success: true,
      statusCode: 200,
      message: 'Updated',
      data: { is_prepared: true, order_item_id: 5, menu_item_id: 8 },
    });
  });
});
