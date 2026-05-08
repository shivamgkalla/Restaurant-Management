import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgFor, NgIf, NgClass, LowerCasePipe } from '@angular/common';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Subscription, forkJoin } from 'rxjs';
import Swal from 'sweetalert2';
import { StateService } from '../../core/services/state.service';
import { ToastService } from '../../core/services/toast.service';
import {
  RfidService,
  CreateRfidCardResponseBody,
  BindRfidCardResponseBody,
  LoadRfidCardResponseBody,
  ClearRfidCardResponseBody,
  RfidApiStatus,
  RfidCardApiItem,
} from '../../core/services/rfid.service';
import { CustomerService } from '../../core/services/customer.service';
import { Customer, RfidCard, RfidStatus } from '../../core/models';

interface BindModalCustomer {
  id: string;
  name: string;
  phone: string;
}

type RfidTab = 'inventory' | 'scan';
type RfidModalType = '' | 'create' | 'bind' | 'load' | 'deduct' | 'history' | 'clear';
type PaymentMode = 'Cash' | 'Online';
type RefundMode = 'Cash' | 'Online';
type RfidStatusFilter = '' | RfidApiStatus;

const MIN_LOAD_AMOUNT = 100;
const MAX_LOAD_AMOUNT = 1_000_000;
const DEFAULT_PAGE_SIZE = 10;

@Component({
  selector: 'app-rfid',
  standalone: true,
  imports: [NgFor, NgIf, NgClass, LowerCasePipe, FormsModule],
  templateUrl: './rfid.component.html',
  styleUrl: './rfid.component.css',
})
export class RfidComponent implements OnInit, OnDestroy {
  cards: RfidCard[] = [];
  customers: Customer[] = [];

  activeTab: RfidTab = 'inventory';

  scanInput = '';
  scanError = false;
  scannedCard: RfidCard | null = null;

  modalType: RfidModalType = '';
  selectedCard: RfidCard | null = null;

  bindCardId: string | null = null;
  bindCustomerId: string = '';
  bindAmount: number | null = null;
  bindMode: PaymentMode = 'Cash';
  bindReference = '';
  isBindingCard = false;
  bindFieldErrors: { card: string; customer: string; amount: string } = {
    card: '',
    customer: '',
    amount: '',
  };

  loadAmount: number | null = null;
  loadMode: PaymentMode = 'Cash';
  loadReference = '';
  isLoadingBalance = false;
  loadFieldError = '';

  isBlockingCard = false;
  blockingCardId: string | null = null;

  isUnblockingCard = false;
  unblockingCardId: string | null = null;

  clearRefundMode: RefundMode = 'Cash';
  clearReference = '';
  clearNote = '';
  isClearingCard = false;
  clearFieldError = '';

  readonly MIN_LOAD_AMOUNT = MIN_LOAD_AMOUNT;
  readonly MAX_LOAD_AMOUNT = MAX_LOAD_AMOUNT;

  deductAmount: number | null = null;
  deductOrderRef = '';

  newCardUid = '';
  createCardError = '';
  isCreatingCard = false;

  isLoadingCards = false;
  currentPage = 1;
  pageSize = DEFAULT_PAGE_SIZE;
  totalRecords = 0;
  statusFilter: RfidStatusFilter = '';
  appliedStatusFilter: RfidStatusFilter = '';

  bindModalCards: RfidCard[] = [];
  bindModalCustomers: BindModalCustomer[] = [];
  isLoadingBindModal = false;
  bindModalError = '';

  private customersSub?: Subscription;

  constructor(
    private state: StateService,
    private toast: ToastService,
    private rfidService: RfidService,
    private customerService: CustomerService,
  ) {}

  ngOnInit(): void {
    this.customersSub = this.state.select('customers').subscribe(list => {
      this.customers = list ?? [];
    });
    this.loadRfidCards(1);
  }

  ngOnDestroy(): void {
    this.customersSub?.unsubscribe();
  }

  get activeCount(): number {
    return this.cards.filter(c => c.status === 'Active').length;
  }

  get availableCount(): number {
    return this.cards.filter(c => c.status === 'Available').length;
  }

  get blockedCount(): number {
    return this.cards.filter(c => c.status === 'Blocked').length;
  }

  get totalBalance(): number {
    return this.cards
      .filter(c => c.status === 'Active')
      .reduce((sum, c) => sum + (c.balance || 0), 0);
  }

  get availableCards(): RfidCard[] {
    return this.cards.filter(c => c.status === 'Available');
  }

  get showApiLoader(): boolean {
    return (
      this.isCreatingCard ||
      this.isLoadingCards ||
      this.isLoadingBindModal ||
      this.isBindingCard ||
      this.isLoadingBalance ||
      this.isBlockingCard ||
      this.isUnblockingCard ||
      this.isClearingCard
    );
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.totalRecords / Math.max(1, this.pageSize)));
  }

  get apiLoaderText(): string {
    if (this.isClearingCard) return 'Clearing & unbinding card…';
    if (this.isBlockingCard) return 'Blocking card…';
    if (this.isUnblockingCard) return 'Unblocking card…';
    if (this.isLoadingBalance) return 'Loading balance to card…';
    if (this.isBindingCard) return 'Binding card to customer…';
    if (this.isCreatingCard) return 'Registering RFID card…';
    if (this.isLoadingBindModal) return 'Loading cards & customers…';
    if (this.isLoadingCards) return 'Loading RFID cards…';
    return 'Working…';
  }

  fmt(value: number | null | undefined): string {
    const n = Number(value ?? 0);
    return `₹${n.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
  }

  setTab(tab: RfidTab): void {
    this.activeTab = tab;
  }

  trackById(_index: number, card: RfidCard): string {
    return card.id;
  }

  getCustomer(id: string | null | undefined): Customer | null {
    if (!id) return null;
    return this.customers.find(c => c.id === id) ?? null;
  }

  loadRfidCards(page = this.currentPage): void {
    const targetPage = Math.max(1, Math.floor(page));
    this.isLoadingCards = true;

    this.rfidService.getRfidCards({
      skip: (targetPage - 1) * this.pageSize,
      limit: this.pageSize,
      status: this.appliedStatusFilter || null,
    }).subscribe({
      next: (response) => {
        this.isLoadingCards = false;
        const statusCode = Number(response?.statusCode ?? 200);
        if (statusCode !== 200) {
          const msg = response?.message || 'Failed to fetch RFID cards.';
          this.toast.show(`Error ${statusCode}: ${msg}`, 'warning');
          return;
        }
        const rows = Array.isArray(response.data) ? response.data : [];
        this.cards = rows.map(row => this.mapApiRfidCard(row));
        this.totalRecords = response.meta?.total ?? rows.length;
        const apiSkip = response.meta?.skip ?? (targetPage - 1) * this.pageSize;
        const apiLimit = response.meta?.limit ?? this.pageSize;
        if (apiLimit > 0) this.pageSize = apiLimit;
        this.currentPage = Math.max(1, Math.floor(apiSkip / Math.max(1, apiLimit)) + 1);
        this.refreshScannedCard();
        this.refreshSelectedCard();
      },
      error: (err: HttpErrorResponse) => {
        this.isLoadingCards = false;
        const apiMessage =
          (err.error && (err.error.message || err.error.errors?.[0])) || err.message;
        if (err.status === 400) {
          this.toast.show(`Error 400: ${apiMessage || 'Invalid pagination request.'}`, 'warning');
        } else if (err.status === 401 || err.status === 403) {
          this.toast.show(`Error ${err.status}: ${apiMessage || 'Not authorised.'}`, 'warning');
        } else if (err.status === 500) {
          this.toast.show('Error 500: Server error. Please try again later.', 'error');
        } else if (err.status === 0) {
          this.toast.show('Network error. Check your connection and API URL.', 'error');
        } else {
          this.toast.show(`Error ${err.status}: ${apiMessage || 'Request failed.'}`, 'error');
        }
      },
    });
  }

  applyStatusFilter(): void {
    this.appliedStatusFilter = this.statusFilter;
    this.loadRfidCards(1);
  }

  prevPage(): void {
    if (this.currentPage > 1 && !this.isLoadingCards) {
      this.loadRfidCards(this.currentPage - 1);
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages && !this.isLoadingCards) {
      this.loadRfidCards(this.currentPage + 1);
    }
  }

  private mapApiRfidCard(row: RfidCardApiItem): RfidCard {
    return {
      id: String(row.id),
      cardNo: row.card_uid,
      customerId: row.customer_id != null ? String(row.customer_id) : null,
      customerName: row.customer_name ?? null,
      balance: Number(row.balance ?? 0),
      status: this.normaliseStatus(row.status),
      loadHistory: [],
    };
  }

  onScanKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.scanCard();
    }
  }

  scanCard(): void {
    const query = this.scanInput.trim().toLowerCase();
    if (!query) {
      this.scanError = false;
      this.scannedCard = null;
      return;
    }
    const match = this.cards.find(c =>
      c.cardNo.toLowerCase() === query || c.id.toLowerCase() === query
    );
    if (match) {
      this.scannedCard = match;
      this.scanError = false;
    } else {
      this.scannedCard = null;
      this.scanError = true;
    }
  }

  openCreateModal(): void {
    this.modalType = 'create';
    this.selectedCard = null;
    this.newCardUid = '';
    this.createCardError = '';
  }

  openBindModal(card?: RfidCard): void {
    this.modalType = 'bind';
    this.selectedCard = card ?? null;
    this.bindCardId = card ? card.id : null;
    this.bindCustomerId = '';
    this.bindAmount = null;
    this.bindMode = 'Cash';
    this.bindReference = '';
    this.bindModalCards = [];
    this.bindModalCustomers = [];
    this.bindModalError = '';
    this.bindFieldErrors = { card: '', customer: '', amount: '' };
    this.fetchBindModalData(card);
  }

  private fetchBindModalData(preselect?: RfidCard): void {
    this.isLoadingBindModal = true;
    forkJoin({
      cards: this.rfidService.getAllRfidCards(),
      customers: this.customerService.getAllCustomers(),
    }).subscribe({
      next: ({ cards, customers }) => {
        this.isLoadingBindModal = false;
        const cardsStatus = Number(cards?.statusCode ?? 200);
        const customersStatus = Number(customers?.statusCode ?? 200);
        if (cardsStatus !== 200 || customersStatus !== 200) {
          const msg = cards?.message || customers?.message || 'Failed to load bind data.';
          this.bindModalError = msg;
          this.toast.show(`Error ${cardsStatus !== 200 ? cardsStatus : customersStatus}: ${msg}`, 'warning');
          return;
        }

        const cardRows = Array.isArray(cards.data) ? cards.data : [];
        this.bindModalCards = cardRows
          .map(c => this.mapApiRfidCard(c))
          .filter(c => c.status === 'Available');

        const customerRows = Array.isArray(customers.data) ? customers.data : [];
        this.bindModalCustomers = customerRows.map(c => ({
          id: String(c.id),
          name: c.name,
          phone: c.phone ?? '',
        }));

        if (preselect) {
          const match = this.bindModalCards.find(c => c.cardNo === preselect.cardNo);
          this.bindCardId = match ? match.id : (this.bindModalCards[0]?.id ?? null);
        } else if (!this.bindCardId) {
          this.bindCardId = this.bindModalCards[0]?.id ?? null;
        }
      },
      error: (err: HttpErrorResponse) => {
        this.isLoadingBindModal = false;
        const apiMessage =
          (err.error && (err.error.message || err.error.errors?.[0])) || err.message;
        if (err.status === 401 || err.status === 403) {
          this.bindModalError = apiMessage || 'Not authorised.';
          this.toast.show(`Error ${err.status}: ${this.bindModalError}`, 'warning');
        } else if (err.status === 500) {
          this.bindModalError = 'Server error. Please try again later.';
          this.toast.show('Error 500: Server error. Please try again later.', 'error');
        } else if (err.status === 0) {
          this.bindModalError = 'Network error. Check your connection and API URL.';
          this.toast.show(this.bindModalError, 'error');
        } else {
          this.bindModalError = apiMessage || 'Failed to load bind data.';
          this.toast.show(`Error ${err.status}: ${this.bindModalError}`, 'error');
        }
      },
    });
  }

  openLoadModal(card: RfidCard): void {
    this.modalType = 'load';
    this.selectedCard = card;
    this.loadAmount = null;
    this.loadMode = 'Cash';
    this.loadReference = '';
    this.loadFieldError = '';
  }

  openDeductModal(card: RfidCard): void {
    this.modalType = 'deduct';
    this.selectedCard = card;
    this.deductAmount = null;
    this.deductOrderRef = '';
  }

  openHistoryModal(card: RfidCard): void {
    this.modalType = 'history';
    this.selectedCard = card;
  }

  closeModal(): void {
    if (
      this.isCreatingCard ||
      this.isLoadingBindModal ||
      this.isBindingCard ||
      this.isLoadingBalance ||
      this.isClearingCard
    ) {
      return;
    }
    this.modalType = '';
    this.selectedCard = null;
    this.bindCardId = null;
    this.bindCustomerId = '';
    this.bindAmount = null;
    this.bindReference = '';
    this.loadAmount = null;
    this.loadReference = '';
    this.loadFieldError = '';
    this.deductAmount = null;
    this.deductOrderRef = '';
    this.newCardUid = '';
    this.createCardError = '';
    this.bindModalCards = [];
    this.bindModalCustomers = [];
    this.bindModalError = '';
    this.bindFieldErrors = { card: '', customer: '', amount: '' };
    this.clearRefundMode = 'Cash';
    this.clearReference = '';
    this.clearNote = '';
    this.clearFieldError = '';
  }

  confirmCreate(): void {
    const uid = this.newCardUid.trim();
    if (!uid) {
      this.createCardError = 'Card UID is required';
      return;
    }
    if (this.cards.some(c => c.cardNo.toLowerCase() === uid.toLowerCase())) {
      this.createCardError = 'A card with this UID already exists locally';
      return;
    }
    this.createCardError = '';
    this.isCreatingCard = true;

    this.rfidService.createRfid({ card_uid: uid }).subscribe({
      next: (res: HttpResponse<CreateRfidCardResponseBody>) => {
        this.isCreatingCard = false;
        const httpStatus = res.status;
        const body = res.body ?? {};
        const apiStatus = Number(body.statusCode ?? httpStatus);

        if (httpStatus !== 200 && httpStatus !== 201) {
          this.toast.show(
            `Unexpected response (${httpStatus}). Card may not have been created.`,
            'warning',
          );
          return;
        }
        if (apiStatus !== 200 && apiStatus !== 201) {
          this.toast.show(
            `Error ${apiStatus}: ${body.message ?? 'Failed to create RFID card.'}`,
            'warning',
          );
          return;
        }

        const created = this.mapCreatedRfidCard(body, uid);
        this.toast.show(`RFID card ${created.cardNo} created (${httpStatus})`, 'success');
        this.modalType = '';
        this.newCardUid = '';
        this.loadRfidCards(1);
      },
      error: (err: HttpErrorResponse) => {
        this.isCreatingCard = false;
        const apiMessage =
          (err.error && (err.error.message || err.error.errors?.[0])) || err.message;
        if (err.status === 400) {
          this.createCardError = apiMessage || 'Invalid card UID. Please check and try again.';
          this.toast.show(`Error 400: ${this.createCardError}`, 'warning');
        } else if (err.status === 401 || err.status === 403) {
          this.toast.show(`Error ${err.status}: ${apiMessage || 'Not authorised.'}`, 'warning');
        } else if (err.status === 409) {
          this.createCardError = apiMessage || 'A card with this UID already exists.';
          this.toast.show(`Error 409: ${this.createCardError}`, 'warning');
        } else if (err.status === 500) {
          this.toast.show('Error 500: Server error. Please try again later.', 'error');
        } else if (err.status === 0) {
          this.toast.show('Network error. Check your connection and API URL.', 'error');
        } else {
          this.toast.show(`Error ${err.status}: ${apiMessage || 'Request failed.'}`, 'error');
        }
      },
    });
  }

  private mapCreatedRfidCard(body: CreateRfidCardResponseBody, fallbackUid: string): RfidCard {
    const data = body.data ?? {};
    const id = data.id != null ? String(data.id) : `local-${Date.now()}`;
    const cardNo = (data.card_uid ?? fallbackUid).trim();
    const status = this.normaliseStatus(data.status);
    return {
      id,
      cardNo,
      customerId: null,
      balance: Number(data.balance ?? 0),
      status,
      loadHistory: [],
    };
  }

  private normaliseStatus(value: string | undefined): RfidStatus {
    const v = (value ?? '').toLowerCase();
    if (v === 'active') return 'Active';
    if (v === 'blocked') return 'Blocked';
    if (v === 'lost') return 'Lost';
    return 'Available';
  }

  private replaceCard(updated: RfidCard): void {
    this.cards = this.cards.map(c => c.id === updated.id ? updated : c);
    if (this.scannedCard?.id === updated.id) this.scannedCard = updated;
    if (this.selectedCard?.id === updated.id) this.selectedCard = updated;
  }

  confirmBind(): void {
    this.bindFieldErrors = { card: '', customer: '', amount: '' };

    if (!this.bindCardId) {
      this.bindFieldErrors.card = 'Select a card to bind.';
    }
    if (!this.bindCustomerId) {
      this.bindFieldErrors.customer = 'Customer is required.';
    }
    const initialLoad = Number(this.bindAmount ?? 0);
    if (Number.isNaN(initialLoad) || initialLoad < 0) {
      this.bindFieldErrors.amount = 'Initial load cannot be negative.';
    } else if (initialLoad > MAX_LOAD_AMOUNT) {
      this.bindFieldErrors.amount = `Initial load cannot exceed ${this.fmt(MAX_LOAD_AMOUNT)}.`;
    }
    if (this.bindFieldErrors.card || this.bindFieldErrors.customer || this.bindFieldErrors.amount) {
      return;
    }

    const card =
      this.bindModalCards.find(c => c.id === this.bindCardId) ??
      this.cards.find(c => c.id === this.bindCardId);
    if (!card) {
      this.bindFieldErrors.card = 'Selected card was not found.';
      return;
    }
    if (card.status !== 'Available') {
      this.bindFieldErrors.card = 'Only available cards can be bound.';
      return;
    }

    const cardIdNum = Number(card.id);
    const customerIdNum = Number(this.bindCustomerId);
    if (!Number.isFinite(cardIdNum) || cardIdNum <= 0 || !Number.isFinite(customerIdNum) || customerIdNum <= 0) {
      this.toast.show('Selected card or customer has an invalid id', 'error');
      return;
    }

    const payload = {
      customer_id: customerIdNum,
      initial_load_amount: initialLoad,
      payment_method: this.bindMode.toLowerCase() as 'cash' | 'online',
      reference_number: this.bindReference.trim(),
    };

    this.isBindingCard = true;
    this.rfidService.bindRfidCard(cardIdNum, payload).subscribe({
      next: (res: HttpResponse<BindRfidCardResponseBody>) => {
        this.isBindingCard = false;
        const httpStatus = res.status;
        const body = res.body ?? {};
        const apiStatus = Number(body.statusCode ?? httpStatus);

        if (httpStatus !== 200 && httpStatus !== 201) {
          this.toast.show(
            `Unexpected response (${httpStatus}). Card may not have been bound.`,
            'warning',
          );
          return;
        }
        if (apiStatus !== 200 && apiStatus !== 201) {
          this.toast.show(
            `Error ${apiStatus}: ${body.message ?? 'Failed to bind card.'}`,
            'warning',
          );
          return;
        }

        this.toast.show(`Card ${card.cardNo} bound to customer (${httpStatus})`, 'success');
        this.modalType = '';
        this.bindModalCards = [];
        this.bindModalCustomers = [];
        this.bindReference = '';
        this.bindCustomerId = '';
        this.bindAmount = null;
        this.loadRfidCards(this.currentPage);
      },
      error: (err: HttpErrorResponse) => {
        this.isBindingCard = false;
        const apiMessage =
          (err.error && (err.error.message || err.error.errors?.[0])) || err.message;
        if (err.status === 400) {
          this.bindFieldErrors.amount = apiMessage || 'Invalid bind request.';
          this.toast.show(`Error 400: ${apiMessage || 'Invalid bind request.'}`, 'warning');
        } else if (err.status === 401 || err.status === 403) {
          this.toast.show(`Error ${err.status}: ${apiMessage || 'Not authorised.'}`, 'warning');
        } else if (err.status === 404) {
          this.bindFieldErrors.card = apiMessage || 'Card not found on server.';
          this.toast.show(`Error 404: ${this.bindFieldErrors.card}`, 'warning');
        } else if (err.status === 409) {
          this.bindFieldErrors.card = apiMessage || 'Card cannot be bound in its current state.';
          this.toast.show(`Error 409: ${this.bindFieldErrors.card}`, 'warning');
        } else if (err.status === 500) {
          this.toast.show('Error 500: Server error. Please try again later.', 'error');
        } else if (err.status === 0) {
          this.toast.show('Network error. Check your connection and API URL.', 'error');
        } else {
          this.toast.show(`Error ${err.status}: ${apiMessage || 'Request failed.'}`, 'error');
        }
      },
    });
  }

  confirmLoad(): void {
    if (!this.selectedCard) return;
    this.loadFieldError = '';

    const amount = Number(this.loadAmount ?? 0);
    if (Number.isNaN(amount) || amount < MIN_LOAD_AMOUNT) {
      this.loadFieldError = `Minimum top-up is ${this.fmt(MIN_LOAD_AMOUNT)}.`;
      return;
    }
    if (amount > MAX_LOAD_AMOUNT) {
      this.loadFieldError = `Load amount cannot exceed ${this.fmt(MAX_LOAD_AMOUNT)}.`;
      return;
    }

    const cardIdNum = Number(this.selectedCard.id);
    if (!Number.isFinite(cardIdNum) || cardIdNum <= 0) {
      this.toast.show('Selected card has an invalid id', 'error');
      return;
    }

    const cardSnapshot = this.selectedCard;
    const payload = {
      amount,
      payment_method: this.loadMode.toLowerCase() as 'cash' | 'online',
      reference_number: this.loadReference.trim(),
    };

    this.isLoadingBalance = true;
    this.rfidService.loadRfidCardBalance(cardIdNum, payload).subscribe({
      next: (res: HttpResponse<LoadRfidCardResponseBody>) => {
        this.isLoadingBalance = false;
        const httpStatus = res.status;
        const body = res.body ?? {};
        const apiStatus = Number(body.statusCode ?? httpStatus);

        if (httpStatus !== 200 && httpStatus !== 201) {
          this.toast.show(
            `Unexpected response (${httpStatus}). Balance may not have been loaded.`,
            'warning',
          );
          return;
        }
        if (apiStatus !== 200 && apiStatus !== 201) {
          this.toast.show(
            `Error ${apiStatus}: ${body.message ?? 'Failed to load balance.'}`,
            'warning',
          );
          return;
        }

        this.toast.show(
          `${this.fmt(amount)} loaded to ${cardSnapshot.cardNo} (${httpStatus})`,
          'success',
        );
        this.modalType = '';
        this.selectedCard = null;
        this.loadAmount = null;
        this.loadReference = '';
        this.loadRfidCards(this.currentPage);
      },
      error: (err: HttpErrorResponse) => {
        this.isLoadingBalance = false;
        const apiMessage =
          (err.error && (err.error.message || err.error.errors?.[0])) || err.message;
        if (err.status === 400) {
          this.loadFieldError = apiMessage || 'Invalid load request.';
          this.toast.show(`Error 400: ${this.loadFieldError}`, 'warning');
        } else if (err.status === 401 || err.status === 403) {
          this.toast.show(`Error ${err.status}: ${apiMessage || 'Not authorised.'}`, 'warning');
        } else if (err.status === 404) {
          this.loadFieldError = apiMessage || 'Card not found on server.';
          this.toast.show(`Error 404: ${this.loadFieldError}`, 'warning');
        } else if (err.status === 409) {
          this.loadFieldError = apiMessage || 'Card cannot be loaded in its current state.';
          this.toast.show(`Error 409: ${this.loadFieldError}`, 'warning');
        } else if (err.status === 500) {
          this.toast.show('Error 500: Server error. Please try again later.', 'error');
        } else if (err.status === 0) {
          this.toast.show('Network error. Check your connection and API URL.', 'error');
        } else {
          this.toast.show(`Error ${err.status}: ${apiMessage || 'Request failed.'}`, 'error');
        }
      },
    });
  }

  confirmDeduct(): void {
    if (!this.selectedCard) return;
    const amount = Number(this.deductAmount ?? 0);
    if (amount <= 0) {
      this.toast.show('Enter a valid deduction amount', 'warning');
      return;
    }
    if (amount > this.selectedCard.balance) {
      this.toast.show('Amount exceeds available balance', 'error');
      return;
    }
    const newBalance = this.selectedCard.balance - amount;
    const today = new Date().toISOString().slice(0, 10);
    const note = this.deductOrderRef.trim() ? `Order ${this.deductOrderRef.trim()}` : 'Deduction';
    const updated: RfidCard = {
      ...this.selectedCard,
      balance: newBalance,
      loadHistory: [
        ...this.selectedCard.loadHistory,
        { amount: -amount, mode: note, date: today, balance: newBalance },
      ],
    };
    this.replaceCard(updated);
    this.toast.show(`${this.fmt(amount)} deducted from ${this.selectedCard.cardNo}`);
    this.closeModal();
  }

  toggleBlock(card: RfidCard): void {
    if (card.status === 'Blocked' || card.status === 'Lost') {
      Swal.fire({
        title: 'Unblock this card?',
        text: `Card "${card.cardNo}" will be restored. If a customer is linked it returns to Active, otherwise it goes back to Available.`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, unblock it',
        cancelButtonText: 'Cancel',
      }).then((result) => {
        if (!result.isConfirmed) return;
        this.callUnblockApi(card);
      });
      return;
    }

    Swal.fire({
      title: 'Block this card?',
      text: `Card "${card.cardNo}" will be blocked immediately and cannot accept loads or payments.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, block it',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (!result.isConfirmed) return;
      this.callBlockApi(card);
    });
  }

  private callBlockApi(card: RfidCard): void {
    const cardIdNum = Number(card.id);
    if (!Number.isFinite(cardIdNum) || cardIdNum <= 0) {
      this.toast.show('Selected card has an invalid id', 'error');
      return;
    }

    this.isBlockingCard = true;
    this.blockingCardId = card.id;

    this.rfidService.blockRfidCard(cardIdNum).subscribe({
      next: (response) => {
        this.isBlockingCard = false;
        this.blockingCardId = null;
        const apiStatus = Number(response?.statusCode ?? 200);
        if (apiStatus !== 200 && apiStatus !== 201) {
          const msg = response?.message || 'Failed to block card.';
          this.toast.show(`Error ${apiStatus}: ${msg}`, 'warning');
          return;
        }
        this.toast.show(`Card ${card.cardNo} blocked`, 'success');
        this.loadRfidCards(this.currentPage);
      },
      error: (err: HttpErrorResponse) => {
        this.isBlockingCard = false;
        this.blockingCardId = null;
        const apiMessage =
          (err.error && (err.error.message || err.error.errors?.[0])) || err.message;
        if (err.status === 400) {
          this.toast.show(`Error 400: ${apiMessage || 'Invalid block request.'}`, 'warning');
        } else if (err.status === 401 || err.status === 403) {
          this.toast.show(`Error ${err.status}: ${apiMessage || 'Not authorised.'}`, 'warning');
        } else if (err.status === 404) {
          this.toast.show(`Error 404: ${apiMessage || 'Card not found on server.'}`, 'warning');
        } else if (err.status === 409) {
          this.toast.show(`Error 409: ${apiMessage || 'Card cannot be blocked in its current state.'}`, 'warning');
        } else if (err.status === 500) {
          this.toast.show('Error 500: Server error. Please try again later.', 'error');
        } else if (err.status === 0) {
          this.toast.show('Network error. Check your connection and API URL.', 'error');
        } else {
          this.toast.show(`Error ${err.status}: ${apiMessage || 'Request failed.'}`, 'error');
        }
      },
    });
  }

  private callUnblockApi(card: RfidCard): void {
    const cardIdNum = Number(card.id);
    if (!Number.isFinite(cardIdNum) || cardIdNum <= 0) {
      this.toast.show('Selected card has an invalid id', 'error');
      return;
    }

    this.isUnblockingCard = true;
    this.unblockingCardId = card.id;

    this.rfidService.unblockRfidCard(cardIdNum).subscribe({
      next: (response) => {
        this.isUnblockingCard = false;
        this.unblockingCardId = null;
        const apiStatus = Number(response?.statusCode ?? 200);
        if (apiStatus !== 200 && apiStatus !== 201) {
          const msg = response?.message || 'Failed to unblock card.';
          this.toast.show(`Error ${apiStatus}: ${msg}`, 'warning');
          return;
        }
        this.toast.show(`Card ${card.cardNo} unblocked`, 'success');
        this.loadRfidCards(this.currentPage);
      },
      error: (err: HttpErrorResponse) => {
        this.isUnblockingCard = false;
        this.unblockingCardId = null;
        const apiMessage =
          (err.error && (err.error.message || err.error.errors?.[0])) || err.message;
        if (err.status === 400) {
          this.toast.show(`Error 400: ${apiMessage || 'Invalid unblock request.'}`, 'warning');
        } else if (err.status === 401 || err.status === 403) {
          this.toast.show(`Error ${err.status}: ${apiMessage || 'Not authorised.'}`, 'warning');
        } else if (err.status === 404) {
          this.toast.show(`Error 404: ${apiMessage || 'Card not found on server.'}`, 'warning');
        } else if (err.status === 409) {
          this.toast.show(`Error 409: ${apiMessage || 'Card cannot be unblocked in its current state.'}`, 'warning');
        } else if (err.status === 500) {
          this.toast.show('Error 500: Server error. Please try again later.', 'error');
        } else if (err.status === 0) {
          this.toast.show('Network error. Check your connection and API URL.', 'error');
        } else {
          this.toast.show(`Error ${err.status}: ${apiMessage || 'Request failed.'}`, 'error');
        }
      },
    });
  }

  openClearModal(card: RfidCard): void {
    this.modalType = 'clear';
    this.selectedCard = card;
    this.clearRefundMode = 'Cash';
    this.clearReference = '';
    this.clearNote = '';
    this.clearFieldError = '';
  }

  confirmClear(): void {
    if (!this.selectedCard) return;
    this.clearFieldError = '';

    const cardIdNum = Number(this.selectedCard.id);
    if (!Number.isFinite(cardIdNum) || cardIdNum <= 0) {
      this.toast.show('Selected card has an invalid id', 'error');
      return;
    }

    const cardSnapshot = this.selectedCard;
    const payload = {
      refund_method: this.clearRefundMode.toLowerCase() as 'cash' | 'online',
      reference_number: this.clearReference.trim(),
      note: this.clearNote.trim(),
    };

    this.isClearingCard = true;
    this.rfidService.clearRfidCard(cardIdNum, payload).subscribe({
      next: (res: HttpResponse<ClearRfidCardResponseBody>) => {
        this.isClearingCard = false;
        const httpStatus = res.status;
        const body = res.body ?? {};
        const apiStatus = Number(body.statusCode ?? httpStatus);

        if (httpStatus !== 200 && httpStatus !== 201) {
          this.toast.show(
            `Unexpected response (${httpStatus}). Card may not have been cleared.`,
            'warning',
          );
          return;
        }
        if (apiStatus !== 200 && apiStatus !== 201) {
          this.toast.show(
            `Error ${apiStatus}: ${body.message ?? 'Failed to clear card.'}`,
            'warning',
          );
          return;
        }

        this.toast.show(
          `Card ${cardSnapshot.cardNo} cleared and returned to inventory (${httpStatus})`,
          'success',
        );
        this.modalType = '';
        this.selectedCard = null;
        this.clearReference = '';
        this.clearNote = '';
        this.loadRfidCards(this.currentPage);
      },
      error: (err: HttpErrorResponse) => {
        this.isClearingCard = false;
        const apiMessage =
          (err.error && (err.error.message || err.error.errors?.[0])) || err.message;
        if (err.status === 400) {
          this.clearFieldError = apiMessage || 'Invalid clear request.';
          this.toast.show(`Error 400: ${this.clearFieldError}`, 'warning');
        } else if (err.status === 401 || err.status === 403) {
          this.toast.show(`Error ${err.status}: ${apiMessage || 'Not authorised.'}`, 'warning');
        } else if (err.status === 404) {
          this.clearFieldError = apiMessage || 'Card not found on server.';
          this.toast.show(`Error 404: ${this.clearFieldError}`, 'warning');
        } else if (err.status === 409) {
          this.clearFieldError = apiMessage || 'Card cannot be cleared in its current state.';
          this.toast.show(`Error 409: ${this.clearFieldError}`, 'warning');
        } else if (err.status === 500) {
          this.toast.show('Error 500: Server error. Please try again later.', 'error');
        } else if (err.status === 0) {
          this.toast.show('Network error. Check your connection and API URL.', 'error');
        } else {
          this.toast.show(`Error ${err.status}: ${apiMessage || 'Request failed.'}`, 'error');
        }
      },
    });
  }

  private refreshScannedCard(): void {
    if (!this.scannedCard) return;
    const updated = this.cards.find(c => c.id === this.scannedCard!.id);
    this.scannedCard = updated ?? null;
  }

  private refreshSelectedCard(): void {
    if (!this.selectedCard) return;
    const updated = this.cards.find(c => c.id === this.selectedCard!.id);
    if (updated) this.selectedCard = updated;
  }
}
