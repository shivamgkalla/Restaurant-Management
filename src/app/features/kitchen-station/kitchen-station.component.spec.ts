import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitchenStationComponent } from './kitchen-station.component';

describe('KitchenStationComponent', () => {
  let component: KitchenStationComponent;
  let fixture: ComponentFixture<KitchenStationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KitchenStationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KitchenStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
