import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf, DecimalPipe, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../core/services/toast.service';
import {
  AddBillPaymentResponse,
  BillPaginationApiItem,
  BillPaginationResponse,
  BillPaymentService,
  CancelBillResponse,
  LegacyBillPaginationResponseShape,
  PrintBillData,
  PrintBillResponse,
} from '../../core/services/bill-payment.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiLoaderComponent } from '../../shared/components/api-loader/api-loader.component';

@Component({
  selector: 'app-billing',
  standalone: true,
  imports: [NgFor, NgIf, DecimalPipe, TitleCasePipe, FormsModule, ApiLoaderComponent],
  templateUrl: './billing.component.html',
  styleUrl: './billing.component.css',
})
export class BillingComponent implements OnInit {
  bills: BillPaginationApiItem[] = [];
  readonly paymentModes = ['cash', 'online', 'card'];
  selectedPaymentModeByBillId: Record<number, string> = {};
  settlingBillId: number | null = null;
  cancellingBillId: number | null = null;
  printingBillId: number | null = null;
  isLoadingBills = false;
  selectedStatus = '';
  orderIdFilter = '';
  dateFromFilter = '';
  dateToFilter = '';
  skip = 0;
  limit = 10;
  total = 0;
  readonly pageSizeOptions = [10, 25, 50];

  constructor(private billPaymentService: BillPaymentService, private toast: ToastService) {}

  ngOnInit(): void {
    this.loadBills();
  }

  get currentPage(): number {
    return Math.floor(this.skip / this.limit) + 1;
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.total / this.limit));
  }

  get hasNoBills(): boolean {
    return !this.isLoadingBills && this.bills.length === 0;
  }

  applyFilters(): void {
    this.skip = 0;
    this.loadBills();
  }

  clearFilters(): void {
    if (!this.selectedStatus && !this.orderIdFilter && !this.dateFromFilter && !this.dateToFilter) return;
    this.selectedStatus = '';
    this.orderIdFilter = '';
    this.dateFromFilter = '';
    this.dateToFilter = '';
    this.skip = 0;
    this.loadBills();
  }

  onLimitChange(): void {
    this.skip = 0;
    this.loadBills();
  }

  prevPage(): void {
    if (this.skip <= 0 || this.isLoadingBills) return;
    this.skip = Math.max(0, this.skip - this.limit);
    this.loadBills();
  }

  nextPage(): void {
    if (this.isLoadingBills) return;
    const nextSkip = this.skip + this.limit;
    if (nextSkip >= this.total) return;
    this.skip = nextSkip;
    this.loadBills();
  }

  paymentModeForBill(billId: number): string {
    return this.selectedPaymentModeByBillId[billId] || 'cash';
  }

  onPaymentModeChange(billId: number, mode: string): void {
    this.selectedPaymentModeByBillId[billId] = mode;
  }

  settleBill(bill: BillPaginationApiItem): void {
    if (this.settlingBillId !== null) return;
    const billStatus = bill.status?.toLowerCase();
    if (billStatus !== 'draft') return;
    const mode = this.paymentModeForBill(bill.id);
    this.settlingBillId = bill.id;
    this.billPaymentService
      .addPayment(bill.id, {
        payment_method: mode as 'cash' | 'online' | 'card',
        amount: Number(bill.grand_total || 0),
        reference_number: '',
        card_uid: '',
      })
      .subscribe({
        next: (response: AddBillPaymentResponse) => {
          this.settlingBillId = null;
          const statusCode = response?.statusCode;
          const success = response?.success;
          if ((statusCode !== undefined && statusCode !== 200 && statusCode !== 201) || success === false) {
            this.toast.show(response?.message || 'Failed to settle bill', 'warning');
            return;
          }
          this.toast.show(response?.message || `${bill.bill_number} settled successfully`);
          this.loadBills();
        },
        error: (err: HttpErrorResponse) => {
          this.settlingBillId = null;
          const apiMessage =
            err.error?.message || err.error?.errors?.[0] || err.message || 'Failed to settle bill.';
          const prefix = err.status ? `Error ${err.status}: ` : '';
          this.toast.show(`${prefix}${apiMessage}`, 'error');
        },
      });
  }

  cancelBill(bill: BillPaginationApiItem): void {
    if (this.cancellingBillId !== null) return;
    const billStatus = bill.status?.toLowerCase();
    if (billStatus !== 'draft') return;
    this.cancellingBillId = bill.id;
    this.billPaymentService.cancelBill(bill.id).subscribe({
      next: (response: CancelBillResponse) => {
        this.cancellingBillId = null;
        const statusCode = response?.statusCode;
        const success = response?.success;
        if ((statusCode !== undefined && statusCode !== 200) || success === false) {
          this.toast.show(response?.message || 'Failed to cancel bill', 'warning');
          return;
        }
        this.toast.show(response?.message || `${bill.bill_number} cancelled successfully`);
        this.loadBills();
      },
      error: (err: HttpErrorResponse) => {
        this.cancellingBillId = null;
        const apiMessage =
          err.error?.message || err.error?.errors?.[0] || err.message || 'Failed to cancel bill.';
        const prefix = err.status ? `Error ${err.status}: ` : '';
        this.toast.show(`${prefix}${apiMessage}`, 'error');
      },
    });
  }

  printBill(bill: BillPaginationApiItem): void {
    if (this.printingBillId !== null) return;
    this.printingBillId = bill.id;
    this.billPaymentService.printBill(bill.id).subscribe({
      next: (response: PrintBillResponse) => {
        this.printingBillId = null;
        const statusCode = response?.statusCode;
        const success = response?.success;
        if ((statusCode !== undefined && statusCode !== 200) || success === false) {
          this.toast.show(response?.message || 'Failed to fetch print data', 'warning');
          return;
        }
        if (!response?.data) {
          this.toast.show('Print data is empty', 'warning');
          return;
        }
        this.openPrintWindow(response.data);
      },
      error: (err: HttpErrorResponse) => {
        this.printingBillId = null;
        const apiMessage =
          err.error?.message || err.error?.errors?.[0] || err.message || 'Failed to fetch print data.';
        const prefix = err.status ? `Error ${err.status}: ` : '';
        this.toast.show(`${prefix}${apiMessage}`, 'error');
      },
    });
  }

  private loadBills(): void {
    const orderIdInput = String(this.orderIdFilter ?? '').trim();
    const parsedOrderId = Number(orderIdInput);
    const orderId =
      orderIdInput && Number.isInteger(parsedOrderId) && parsedOrderId > 0
        ? parsedOrderId
        : null;
    this.isLoadingBills = true;
    this.billPaymentService
      .getBillsPagination({
        status: this.selectedStatus || null,
        order_id: orderId,
        date_from: this.dateFromFilter ? new Date(this.dateFromFilter).toISOString() : null,
        date_to: this.dateToFilter ? new Date(this.dateToFilter).toISOString() : null,
        skip: this.skip,
        limit: this.limit,
      })
      .subscribe({
        next: (response: BillPaginationResponse | LegacyBillPaginationResponseShape) => {
          this.isLoadingBills = false;
          const statusCode = response?.statusCode;
          const success = response?.success;
          if ((statusCode !== undefined && statusCode !== 200) || success === false) {
            this.toast.show(response?.message || 'Failed to load bills', 'warning');
            this.bills = [];
            this.total = 0;
            return;
          }
          if ('meta' in response) {
            this.bills = Array.isArray(response.data) ? response.data : [];
            this.total = Number(response.meta?.total ?? 0);
            this.skip = Number(response.meta?.skip ?? 0);
            this.limit = Number(response.meta?.limit ?? this.limit);
          } else {
            this.bills = Array.isArray(response.items) ? response.items : [];
            this.total = Number(response.total ?? 0);
            this.skip = Number(response.skip ?? 0);
            this.limit = Number(response.limit ?? this.limit);
          }
        },
        error: (err: HttpErrorResponse) => {
          this.isLoadingBills = false;
          this.bills = [];
          this.total = 0;
          const apiMessage =
            err.error?.message || err.error?.errors?.[0] || err.message || 'Failed to load bills.';
          const prefix = err.status ? `Error ${err.status}: ` : '';
          this.toast.show(`${prefix}${apiMessage}`, 'error');
        },
      });
  }

  private openPrintWindow(data: PrintBillData): void {
    const printWindow = window.open('', '_blank', 'width=420,height=720');
    if (!printWindow) {
      this.toast.show('Popup blocked. Please allow popups to print bills.', 'warning');
      return;
    }

    const itemsRows = (data.items || [])
      .map(
        (item) => `
          <tr>
            <td>
              ${item.menu_item_name}${item.variant_name ? ` (${item.variant_name})` : ''}
            </td>
            <td style="text-align:center;">${item.quantity}</td>
            <td style="text-align:right;">${item.unit_price.toFixed(2)}</td>
            <td style="text-align:right;">${item.line_total.toFixed(2)}</td>
          </tr>
        `,
      )
      .join('');

    const paymentsRows = (data.payments || [])
      .map(
        (payment) => `
          <tr>
            <td>${this.capitalize(payment.payment_method)}</td>
            <td style="text-align:right;">${payment.amount.toFixed(2)}</td>
          </tr>
        `,
      )
      .join('');

    const customerName = data.customer_name || 'Walk-in';
    const tableNumber = data.table_number || '-';
    const captainName = data.captain_name || '-';
    const createdAt = data.created_at ? new Date(data.created_at).toLocaleString() : '-';

    printWindow.document.write(`
      <html>
        <head>
          <title>${data.bill_number}</title>
          <style>
            body { font-family: Arial, sans-serif; font-size: 12px; color: #111; margin: 0; padding: 14px; }
            .head { text-align: center; margin-bottom: 10px; }
            .title { font-size: 16px; font-weight: 700; margin-bottom: 2px; }
            .muted { color: #555; }
            .meta { margin: 8px 0; line-height: 1.5; }
            table { width: 100%; border-collapse: collapse; margin-top: 8px; }
            th, td { padding: 6px 4px; border-bottom: 1px dashed #ccc; }
            th { text-align: left; font-weight: 700; }
            .summary { margin-top: 10px; }
            .row { display: flex; justify-content: space-between; margin: 3px 0; }
            .grand { font-size: 14px; font-weight: 700; border-top: 1px solid #000; padding-top: 6px; margin-top: 6px; }
            .foot { text-align: center; margin-top: 14px; font-size: 11px; color: #444; }
          </style>
        </head>
        <body>
          <div class="head">
            <div class="title">Restaurant Receipt</div>
            <div class="muted">${data.bill_number}</div>
          </div>
          <div class="meta">
            <div><strong>Order:</strong> ${data.order_number}</div>
            <div><strong>Table:</strong> ${tableNumber}</div>
            <div><strong>Customer:</strong> ${customerName}</div>
            <div><strong>Captain:</strong> ${captainName}</div>
            <div><strong>Date:</strong> ${createdAt}</div>
          </div>
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th style="text-align:center;">Qty</th>
                <th style="text-align:right;">Rate</th>
                <th style="text-align:right;">Total</th>
              </tr>
            </thead>
            <tbody>${itemsRows}</tbody>
          </table>
          <div class="summary">
            <div class="row"><span>Subtotal</span><span>${data.subtotal.toFixed(2)}</span></div>
            <div class="row"><span>Discount</span><span>${data.discount_amount.toFixed(2)}</span></div>
            <div class="row"><span>CGST</span><span>${data.cgst_amount.toFixed(2)}</span></div>
            <div class="row"><span>SGST</span><span>${data.sgst_amount.toFixed(2)}</span></div>
            <div class="row"><span>Total Tax</span><span>${data.total_tax.toFixed(2)}</span></div>
            <div class="row grand"><span>Grand Total</span><span>${data.grand_total.toFixed(2)}</span></div>
          </div>
          <table>
            <thead>
              <tr><th>Payment Mode</th><th style="text-align:right;">Amount</th></tr>
            </thead>
            <tbody>${paymentsRows || '<tr><td colspan="2">Not paid yet</td></tr>'}</tbody>
          </table>
          <div class="foot">Thank you. Visit again.</div>
          <script>
            window.onload = function () {
              window.print();
              window.close();
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  }

  private capitalize(value: string): string {
    if (!value) return '';
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }
}
