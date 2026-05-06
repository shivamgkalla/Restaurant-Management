import { Component, OnInit } from '@angular/core';
import { AsyncPipe, NgFor, NgIf, DecimalPipe, LowerCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StateService } from '../../core/services/state.service';
import { AuthService } from '../../core/services/auth.service';
import { Order, Table } from '../../core/models';
import { SALES_SUMMARY, DAILY_SALES, TOP_ITEMS } from '../../core/data/mock-data';

function greeting(): string {
  const h = new Date().getHours();
  if (h < 12) return 'Morning';
  if (h < 17) return 'Afternoon';
  return 'Evening';
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf, RouterLink, DecimalPipe, LowerCasePipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  greet = greeting();
  today = SALES_SUMMARY['today'];
  topItems = TOP_ITEMS;
  dailySales = DAILY_SALES;

  firstName$!: Observable<string>;
  activeOrders$!: Observable<Order[]>;
  availTables$!: Observable<number>;
  occupiedTables$!: Observable<number>;
  totalTables$!: Observable<number>;

  constructor(private state: StateService, private auth: AuthService) {}

  ngOnInit(): void {
    this.firstName$ = this.auth.currentUser$.pipe(
      map(u => u?.name?.split(' ')[0] ?? '')
    );
    this.activeOrders$ = this.state.select('orders').pipe(
      map(orders => orders.filter(o => ['Pending','Preparing','Served'].includes(o.status)))
    );
    this.availTables$ = this.state.select('tables').pipe(map(t => t.filter(x => x.status === 'Available').length));
    this.occupiedTables$ = this.state.select('tables').pipe(map(t => t.filter(x => x.status === 'Occupied').length));
    this.totalTables$ = this.state.select('tables').pipe(map(t => t.length));
  }
}
