import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf, DecimalPipe, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../core/services/toast.service';
import {
  AddBillPaymentPayload,
  AddBillPaymentResponse,
  AddPartialBillPaymentsPayload,
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
  readonly paymentModes = ['cash', 'online', 'card', 'partially'];
  selectedPaymentModeByBillId: Record<number, string> = {};
  settlingBillId: number | null = null;
  /** When set, the RFID card payment modal is open for this draft bill. */
  cardPaymentBill: BillPaginationApiItem | null = null;
  cardPaymentUid = '';
  /** When set, the online payment modal is open (reference required before Pay). */
  onlinePaymentBill: BillPaginationApiItem | null = null;
  onlinePaymentReference = '';
  /** When set, the partial (split) payment modal is open for this draft bill. */
  partialPaymentBill: BillPaginationApiItem | null = null;
  partialCashInput = '';
  partialOnlineAmountInput = '';
  partialOnlineRefInput = '';
  partialRfidUidInput = '';
  partialRfidAmountInput = '';
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

  get isCardPaymentSubmitting(): boolean {
    return (
      this.cardPaymentBill !== null &&
      this.settlingBillId !== null &&
      this.settlingBillId === this.cardPaymentBill.id
    );
  }

  get canSubmitCardPayment(): boolean {
    return !!this.cardPaymentUid?.trim();
  }

  get isPartialPaymentSubmitting(): boolean {
    return (
      this.partialPaymentBill !== null &&
      this.settlingBillId !== null &&
      this.settlingBillId === this.partialPaymentBill.id
    );
  }

  get isOnlinePaymentSubmitting(): boolean {
    return (
      this.onlinePaymentBill !== null &&
      this.settlingBillId !== null &&
      this.settlingBillId === this.onlinePaymentBill.id
    );
  }

  get canSubmitOnlinePayment(): boolean {
    return !!this.onlinePaymentReference?.trim();
  }

  closeOnlinePaymentModal(): void {
    if (this.isOnlinePaymentSubmitting) return;
    this.onlinePaymentBill = null;
    this.onlinePaymentReference = '';
  }

  submitOnlinePayment(): void {
    if (!this.onlinePaymentBill || this.settlingBillId !== null) return;
    const ref = this.onlinePaymentReference.trim();
    if (!ref) {
      this.toast.show('Please enter the reference number.', 'warning');
      return;
    }
    const bill = this.onlinePaymentBill;
    this.addPaymentAndRefresh(bill, {
      payment_method: 'online',
      amount: Number(bill.grand_total || 0),
      reference_number: ref,
      card_uid: '',
    });
  }

  closeCardPaymentModal(): void {
    if (this.isCardPaymentSubmitting) return;
    this.cardPaymentBill = null;
    this.cardPaymentUid = '';
  }

  closePartialPaymentModal(): void {
    if (this.isPartialPaymentSubmitting) return;
    this.partialPaymentBill = null;
    this.resetPartialPaymentForm();
  }

  private resetPartialPaymentForm(): void {
    this.partialCashInput = '';
    this.partialOnlineAmountInput = '';
    this.partialOnlineRefInput = '';
    this.partialRfidUidInput = '';
    this.partialRfidAmountInput = '';
  }

  private money(n: number): number {
    return Math.round(n * 100) / 100;
  }

  /** Empty → 0; invalid or negative → null. */
  private tryParseNonNegativeMoney(raw: string): number | null {
    const t = raw.trim();
    if (t === '') return 0;
    const n = Number(t);
    if (!Number.isFinite(n) || n < 0) return null;
    return this.money(n);
  }

  grandTotalForPartialBill(): number {
    return this.money(Number(this.partialPaymentBill?.grand_total ?? 0));
  }

  partialPaymentsSum(): number | null {
    const c = this.tryParseNonNegativeMoney(this.partialCashInput);
    const o = this.tryParseNonNegativeMoney(this.partialOnlineAmountInput);
    const r = this.tryParseNonNegativeMoney(this.partialRfidAmountInput);
    if (c === null || o === null || r === null) return null;
    return this.money(c + o + r);
  }

  partialPaymentErrors(): string[] {
    const errs: string[] = [];
    if (!this.partialPaymentBill) return errs;
    const g = this.grandTotalForPartialBill();
    const c = this.tryParseNonNegativeMoney(this.partialCashInput);
    const o = this.tryParseNonNegativeMoney(this.partialOnlineAmountInput);
    const r = this.tryParseNonNegativeMoney(this.partialRfidAmountInput);

    if (this.partialCashInput.trim() !== '' && c === null) {
      errs.push('Cash: enter a valid non-negative amount.');
    }
    if (this.partialOnlineAmountInput.trim() !== '' && o === null) {
      errs.push('Online: enter a valid non-negative amount.');
    }
    if (this.partialRfidAmountInput.trim() !== '' && r === null) {
      errs.push('RFID: enter a valid non-negative amount.');
    }
    if (c === null || o === null || r === null) return errs;

    if (c > g) errs.push('Cash amount cannot exceed grand total.');
    if (o > g) errs.push('Online amount cannot exceed grand total.');
    if (r > g) errs.push('RFID amount cannot exceed grand total.');

    const sum = this.money(c + o + r);
    if (sum > g) errs.push('Combined payments cannot exceed grand total.');
    if (sum <= 0) errs.push('Enter at least one amount greater than zero.');
    if (o > 0 && !this.partialOnlineRefInput.trim()) {
      errs.push('Online amount requires a reference number.');
    }
    if (r > 0 && !this.partialRfidUidInput.trim()) {
      errs.push('RFID amount requires a card UID.');
    }
    return errs;
  }

  partialPaymentSubmitDisabled(): boolean {
    return this.partialPaymentErrors().length > 0 || !this.partialPaymentBill || this.settlingBillId !== null;
  }

  submitPartialPayment(): void {
    if (!this.partialPaymentBill || this.settlingBillId !== null) return;
    const payload = this.buildPartialPaymentPayload();
    if (!payload) {
      this.toast.show('Please fix the payment form.', 'warning');
      return;
    }
    const bill = this.partialPaymentBill;
    this.settlingBillId = bill.id;
    this.billPaymentService.addPartialPayment(bill.id, payload).subscribe({
      next: (response: AddBillPaymentResponse) => {
        this.settlingBillId = null;
        if (this.partialPaymentBill?.id === bill.id) {
          this.partialPaymentBill = null;
          this.resetPartialPaymentForm();
        }
        const statusCode = response?.statusCode;
        const success = response?.success;
        if ((statusCode !== undefined && statusCode !== 200 && statusCode !== 201) || success === false) {
          this.toast.show(response?.message || 'Failed to record partial payment', 'warning');
          return;
        }
        this.toast.show(response?.message || `Payment recorded for ${bill.bill_number}`);
        this.loadBills();
      },
      error: (err: HttpErrorResponse) => {
        this.settlingBillId = null;
        const apiMessage =
          err.error?.message || err.error?.errors?.[0] || err.message || 'Failed to record partial payment.';
        const prefix = err.status ? `Error ${err.status}: ` : '';
        this.toast.show(`${prefix}${apiMessage}`, 'error');
      },
    });
  }

  private buildPartialPaymentPayload(): AddPartialBillPaymentsPayload | null {
    if (!this.partialPaymentBill) return null;
    const g = this.grandTotalForPartialBill();
    const c = this.tryParseNonNegativeMoney(this.partialCashInput);
    const o = this.tryParseNonNegativeMoney(this.partialOnlineAmountInput);
    const r = this.tryParseNonNegativeMoney(this.partialRfidAmountInput);
    if (c === null || o === null || r === null) return null;
    if (c > g || o > g || r > g) return null;
    if (this.money(c + o + r) > g) return null;
    if (c + o + r <= 0) return null;
    if (o > 0 && !this.partialOnlineRefInput.trim()) return null;
    if (r > 0 && !this.partialRfidUidInput.trim()) return null;

    const ref = o > 0 ? this.partialOnlineRefInput.trim() : '';
    const uid = r > 0 ? this.partialRfidUidInput.trim() : '';

    return {
      payments: [
        { amount: c, payment_method: c > 0 ? 'cash' : '' },
        { amount: o, payment_method: o > 0 ? 'online' : '', reference_number: ref },
        { amount: r, card_uid: uid, payment_method: r > 0 ? 'rfid' : '' },
      ],
    };
  }

  submitCardPayment(): void {
    if (!this.cardPaymentBill || this.settlingBillId !== null) return;
    const uid = this.cardPaymentUid.trim();
    if (!uid) {
      this.toast.show('Please enter the RFID card number.', 'warning');
      return;
    }
    const bill = this.cardPaymentBill;
    this.addPaymentAndRefresh(bill, {
      payment_method: 'rfid',
      amount: Number(bill.grand_total || 0),
      card_uid: uid,
    });
  }

  settleBill(bill: BillPaginationApiItem): void {
    if (this.settlingBillId !== null) return;
    const billStatus = bill.status?.toLowerCase();
    if (billStatus !== 'draft') return;
    const mode = this.paymentModeForBill(bill.id);
    if (mode === 'card') {
      if (this.partialPaymentBill !== null) {
        this.toast.show('Close the partial payment dialog first.', 'warning');
        return;
      }
      if (this.onlinePaymentBill !== null) {
        this.toast.show('Close the online payment dialog first.', 'warning');
        return;
      }
      this.cardPaymentBill = bill;
      this.cardPaymentUid = '';
      return;
    }
    if (mode === 'online') {
      if (this.partialPaymentBill !== null) {
        this.toast.show('Close the partial payment dialog first.', 'warning');
        return;
      }
      if (this.cardPaymentBill !== null) {
        this.toast.show('Close the card payment dialog first.', 'warning');
        return;
      }
      if (this.onlinePaymentBill !== null && this.onlinePaymentBill.id !== bill.id) {
        this.toast.show('Please close the online payment dialog first.', 'warning');
        return;
      }
      this.onlinePaymentBill = bill;
      this.onlinePaymentReference = '';
      return;
    }
    if (mode === 'partially') {
      if (this.cardPaymentBill !== null) {
        this.toast.show('Close the card payment dialog first.', 'warning');
        return;
      }
      if (this.onlinePaymentBill !== null) {
        this.toast.show('Close the online payment dialog first.', 'warning');
        return;
      }
      if (this.partialPaymentBill !== null && this.partialPaymentBill.id !== bill.id) {
        this.toast.show('Please close the partial payment dialog first.', 'warning');
        return;
      }
      this.partialPaymentBill = bill;
      this.resetPartialPaymentForm();
      return;
    }
    this.addPaymentAndRefresh(bill, {
      payment_method: 'cash',
      amount: Number(bill.grand_total || 0),
      reference_number: '',
      card_uid: '',
    });
  }

  private addPaymentAndRefresh(bill: BillPaginationApiItem, payload: AddBillPaymentPayload): void {
    this.settlingBillId = bill.id;
    this.billPaymentService.addPayment(bill.id, payload).subscribe({
      next: (response: AddBillPaymentResponse) => {
        this.settlingBillId = null;
        if (this.cardPaymentBill?.id === bill.id) {
          this.cardPaymentBill = null;
          this.cardPaymentUid = '';
        }
        if (this.onlinePaymentBill?.id === bill.id) {
          this.onlinePaymentBill = null;
          this.onlinePaymentReference = '';
        }
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
    if (this.cardPaymentBill?.id === bill.id) {
      this.cardPaymentBill = null;
      this.cardPaymentUid = '';
    }
    if (this.partialPaymentBill?.id === bill.id) {
      this.partialPaymentBill = null;
      this.resetPartialPaymentForm();
    }
    if (this.onlinePaymentBill?.id === bill.id) {
      this.onlinePaymentBill = null;
      this.onlinePaymentReference = '';
    }
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
