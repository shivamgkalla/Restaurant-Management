import { Component } from '@angular/core';
import { NgFor, NgIf, DecimalPipe } from '@angular/common';
import { SALES_SUMMARY, DAILY_SALES, TOP_ITEMS, CAPTAIN_PERFORMANCE, REVENUE_LEAKAGE } from '../../core/data/mock-data';
import { SalesSummaryEntry } from '../../core/models';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [NgFor, DecimalPipe],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css',
})
export class ReportsComponent {
  summaryToday: SalesSummaryEntry = SALES_SUMMARY['today'];
  summaryWeek: SalesSummaryEntry = SALES_SUMMARY['thisWeek'];
  summaryMonth: SalesSummaryEntry = SALES_SUMMARY['thisMonth'];
  topItems = TOP_ITEMS;
  captainPerf = CAPTAIN_PERFORMANCE;
  leakage = REVENUE_LEAKAGE;
  dailySales = DAILY_SALES;
}
