import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { KitchenKotViewComponent } from './kitchen-kot-view.component';
import { KotService } from '../../core/services/kot.service';
import { ToastService } from '../../core/services/toast.service';

describe('KitchenKotViewComponent', () => {
  let component: KitchenKotViewComponent;
  let fixture: ComponentFixture<KitchenKotViewComponent>;

  const emptyMeta = {
    total: 0,
    page: 1,
    limit: 10,
    total_pages: 1,
    has_next_page: false,
    has_previous_page: false,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KitchenKotViewComponent],
      providers: [
        {
          provide: KotService,
          useValue: {
            getKotDetails: () =>
              of({
                success: true,
                statusCode: 200,
                message: '',
                data: [],
                meta: emptyMeta,
              }),
            toggleItemPrepared: () =>
              of({
                success: true,
                statusCode: 200,
                message: '',
                data: { is_prepared: true },
              }),
          },
        },
        { provide: ToastService, useValue: { show: () => {} } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(KitchenKotViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
