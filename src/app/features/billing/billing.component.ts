import { Component, OnInit } from '@angular/core';
import { AsyncPipe, NgFor, NgIf, LowerCasePipe, DatePipe, DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StateService } from '../../core/services/state.service';
import { ToastService } from '../../core/services/toast.service';
import { Bill } from '../../core/models';

@Component({
  selector: 'app-billing',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf, LowerCasePipe, DatePipe, DecimalPipe],
  templateUrl: './billing.component.html',
  styleUrl: './billing.component.css',
})
export class BillingComponent implements OnInit {
  bills$!: Observable<Bill[]>;
  paidCount$!: Observable<number>;
  totalRevenue$!: Observable<number>;

  constructor(private state: StateService, private toast: ToastService) {}

  ngOnInit(): void {
    this.bills$ = this.state.select('bills');
    this.paidCount$ = this.bills$.pipe(map(b => b.filter(x => x.status === 'Paid').length));
    this.totalRevenue$ = this.bills$.pipe(map(b => b.reduce((s, x) => s + x.total, 0)));
  }
}
