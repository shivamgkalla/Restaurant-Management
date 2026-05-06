import { Component, OnInit } from '@angular/core';
import { AsyncPipe, NgFor, NgIf, LowerCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { StateService } from '../../core/services/state.service';
import { Customer, CustomerType } from '../../core/models';
import { ToastService } from '../../core/services/toast.service';
import { CreateCustomerPayload, CustomerApiItem, CustomerService } from '../../core/services/customer.service';
import { ApiLoaderComponent } from '../../shared/components/api-loader/api-loader.component';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf, LowerCasePipe, FormsModule, ApiLoaderComponent],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css',
})
export class CustomersComponent implements OnInit {
  private search$ = new BehaviorSubject<string>('');
  private customersSubject = new BehaviorSubject<Customer[]>([]);
  private customerApiIdByCode = new Map<string, number>();
  searchInput = '';
  private appliedSearch = '';
  customers$!: Observable<Customer[]>;
  filteredCustomers$!: Observable<Customer[]>;
  showAddModal = false;
  showEditModal = false;
  isSubmitting = false;
  isLoadingCustomers = false;
  currentPage = 1;
  pageSize = 10;
  totalPages = 1;
  totalCustomers = 0;
  newCustomer: {
    name: string;
    phone: string;
    email: string;
    address: string;
    dateOfBirth: string;
    type: CustomerType;
    notes: string;
  } = {
    name: '',
    phone: '',
    email: '',
    address: '',
    dateOfBirth: '',
    type: 'New',
    notes: '',
  };

  /** Inline messages for the add-customer modal */
  fieldErrors: { name: string; phone: string; email: string; dateOfBirth: string } = {
    name: '',
    phone: '',
    email: '',
    dateOfBirth: '',
  };
  editCustomer: {
    id: string;
    name: string;
    phone: string;
    email: string;
    address: string;
    dateOfBirth: string;
    notes: string;
    type: CustomerType;
  } = {
    id: '',
    name: '',
    phone: '',
    email: '',
    address: '',
    dateOfBirth: '',
    notes: '',
    type: 'New',
  };
  editFieldErrors: { name: string; phone: string; email: string; dateOfBirth: string } = {
    name: '',
    phone: '',
    email: '',
    dateOfBirth: '',
  };

  applySearch(): void {
    this.appliedSearch = this.searchInput.trim();
    this.search$.next(this.appliedSearch);
    this.loadCustomers(1);
  }

  get hasActiveSearch(): boolean {
    return !!this.appliedSearch;
  }

  clearSearch(): void {
    if (!this.searchInput && !this.appliedSearch) return;
    this.searchInput = '';
    this.appliedSearch = '';
    this.search$.next('');
    this.loadCustomers(1);
  }

  constructor(
    private state: StateService,
    private toast: ToastService,
    private customerService: CustomerService,
  ) {}

  ngOnInit(): void {
    this.customers$ = this.customersSubject.asObservable();
    this.filteredCustomers$ = combineLatest([this.customers$, this.search$]).pipe(
      map(([customers, q]) => {
        const lower = q.toLowerCase();
        return customers.filter(c =>
          !lower || c.name.toLowerCase().includes(lower) || c.phone.includes(lower)
        );
      })
    );
    this.loadCustomers(1);
  }

  openAddModal(): void {
    this.newCustomer = {
      name: '',
      phone: '',
      email: '',
      address: '',
      dateOfBirth: '',
      type: 'New',
      notes: '',
    };
    this.clearFieldErrors();
    this.showAddModal = true;
  }

  /** Keeps only digits, max length 10 */
  onPhoneInput(value: string): void {
    this.newCustomer.phone = value.replace(/\D/g, '').slice(0, 10);
    if (this.fieldErrors.phone) {
      this.fieldErrors = { ...this.fieldErrors, phone: '' };
    }
  }

  addCustomer(): void {
    if (this.isSubmitting) return;
    if (!this.validateCreateForm()) return;

    const name = this.newCustomer.name.trim();
    const phone = this.newCustomer.phone.trim();

    const dateOfBirthIso = this.newCustomer.dateOfBirth
      ? new Date(this.newCustomer.dateOfBirth).toISOString()
      : '';

    const payload: CreateCustomerPayload = {
      name,
      phone,
      email: this.newCustomer.email.trim(),
      address: this.newCustomer.address.trim(),
      date_of_birth: dateOfBirthIso,
      notes: this.newCustomer.notes.trim(),
      customer_type: this.toApiCustomerType(this.newCustomer.type),
    };

    this.isSubmitting = true;
    this.customerService.createCustomer(payload).subscribe({
      next: (res: HttpResponse<unknown>) => {
        this.isSubmitting = false;
        const status = res.status;
        if (status !== 200 && status !== 201) {
          this.toast.show(`Unexpected response (${status}). Customer may not have been saved.`, 'warning');
          return;
        }
        const customer = this.mapCreatedCustomer(res.body, name, phone);
        this.toast.show(`Customer ${customer.name} added (${status})`, 'success');
        this.showAddModal = false;
        this.loadCustomers(1);
      },
      error: (err: HttpErrorResponse) => {
        this.isSubmitting = false;
        if (err.status === 400) {
          const apiMessage =
            err.error?.message ||
            err.error?.errors?.[0] ||
            'Invalid customer data. Please check the fields and try again.';
          this.toast.show(`Error 400: ${apiMessage}`, 'warning');
        } else if (err.status === 500) {
          this.toast.show('Error 500: Server error. Please try again later.', 'error');
        } else if (err.status === 0) {
          this.toast.show('Network error. Check your connection and API URL.', 'error');
        } else {
          const apiMessage = err.error?.message || err.message || 'Request failed.';
          this.toast.show(`Error ${err.status}: ${apiMessage}`, 'error');
        }
      },
    });
  }

  openEditModal(customer: Customer): void {
    this.editCustomer = {
      id: customer.id,
      name: customer.name || '',
      phone: customer.phone || '',
      email: customer.email || '',
      address: customer.address || '',
      dateOfBirth: this.toDateInput(customer.dob),
      notes: customer.notes || '',
      type: customer.type,
    };
    this.clearEditFieldErrors();
    this.showEditModal = true;
  }

  onEditPhoneInput(value: string): void {
    this.editCustomer.phone = value.replace(/\D/g, '').slice(0, 10);
    if (this.editFieldErrors.phone) {
      this.editFieldErrors.phone = '';
    }
  }

  updateCustomer(): void {
    if (this.isSubmitting) return;
    if (!this.validateEditForm()) return;

    const apiId = this.resolveApiCustomerId(this.editCustomer.id);
    if (apiId === null) {
      this.toast.show('Unable to update this customer: missing API id.', 'error');
      return;
    }

    const payload = {
      name: this.editCustomer.name.trim(),
      phone: this.editCustomer.phone.trim(),
      email: this.editCustomer.email.trim(),
      address: this.editCustomer.address.trim(),
      date_of_birth: this.editCustomer.dateOfBirth
        ? new Date(this.editCustomer.dateOfBirth).toISOString()
        : '',
      notes: this.editCustomer.notes.trim(),
      customer_type: this.toApiCustomerType(this.editCustomer.type),
    };

    this.isSubmitting = true;
    this.customerService.updateCustomer(apiId, payload).subscribe({
      next: (response: any) => {
        this.isSubmitting = false;
        const statusCode = Number(response?.statusCode ?? 200);
        if (statusCode !== 200) {
          const apiMessage = response?.message || 'Failed to update customer.';
          this.toast.show(`Error ${statusCode}: ${apiMessage}`, 'warning');
          return;
        }

        this.toast.show('Customer updated successfully', 'success');
        this.showEditModal = false;
        this.loadCustomers(this.currentPage);
      },
      error: (err: HttpErrorResponse) => {
        this.isSubmitting = false;
        if (err.status === 400) {
          const apiMessage =
            err.error?.message ||
            err.error?.errors?.[0] ||
            'Invalid customer data. Please check the fields and try again.';
          this.toast.show(`Error 400: ${apiMessage}`, 'warning');
        } else if (err.status === 409) {
          this.toast.show(`Error 409: ${err.error?.message || 'Conflict while updating customer.'}`, 'warning');
        } else if (err.status === 500) {
          this.toast.show('Error 500: Server error. Please try again later.', 'error');
        } else if (err.status === 0) {
          this.toast.show('Network error. Check your connection and API URL.', 'error');
        } else {
          const apiMessage = err.error?.message || err.message || 'Request failed.';
          this.toast.show(`Error ${err.status}: ${apiMessage}`, 'error');
        }
      },
    });
  }

  prevPage(): void {
    if (this.currentPage <= 1 || this.isLoadingCustomers) return;
    this.loadCustomers(this.currentPage - 1);
  }

  nextPage(): void {
    if (this.currentPage >= this.totalPages || this.isLoadingCustomers) return;
    this.loadCustomers(this.currentPage + 1);
  }

  onDeleteCustomer(customer: Customer): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action will permanently delete the customer!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (!result.isConfirmed) return;

      const apiId = this.resolveApiCustomerId(customer.id);
      if (apiId === null) {
        this.toast.show('Unable to delete this customer: missing API id.', 'error');
        return;
      }

      const rowsOnPage = this.customersSubject.getValue().length;
      let reloadPage = this.currentPage;
      if (rowsOnPage === 1 && this.currentPage > 1) {
        reloadPage = this.currentPage - 1;
      }

      this.isLoadingCustomers = true;
      this.customerService.deleteCustomer(apiId).subscribe({
        next: (response: unknown) => {
          this.isLoadingCustomers = false;
          const body = response as { statusCode?: number; message?: string } | null;
          const statusCode =
            body && typeof body === 'object' && body.statusCode != null
              ? Number(body.statusCode)
              : 200;
          if (statusCode !== 200) {
            const apiMessage = body?.message || 'Failed to delete customer.';
            this.toast.show(`Error ${statusCode}: ${apiMessage}`, 'warning');
            return;
          }
          this.toast.show('Customer deleted successfully', 'success');
          this.loadCustomers(reloadPage);
        },
        error: (err: HttpErrorResponse) => {
          this.isLoadingCustomers = false;
          if (err.status === 404) {
            this.toast.show(err.error?.message || 'Customer not found.', 'warning');
          } else if (err.status === 500) {
            this.toast.show('Error 500: Server error. Please try again later.', 'error');
          } else if (err.status === 0) {
            this.toast.show('Network error. Check your connection and API URL.', 'error');
          } else {
            const apiMessage = err.error?.message || err.message || 'Request failed.';
            this.toast.show(`Error ${err.status}: ${apiMessage}`, 'error');
          }
        },
      });
    });
  }

  private loadCustomers(page: number): void {
    this.isLoadingCustomers = true;
    this.customerService.customerPagination({
      page,
      page_size: this.pageSize,
      search: this.appliedSearch,
    }).subscribe({
      next: (response) => {
        this.isLoadingCustomers = false;
        const statusCode = response?.statusCode;

        if (statusCode !== 200) {
          const msg = response?.message || 'Failed to fetch customers.';
          this.toast.show(`Error ${statusCode ?? 'N/A'}: ${msg}`, 'warning');
          return;
        }

        const rows = Array.isArray(response.data) ? response.data : [];
        this.customerApiIdByCode.clear();
        rows.forEach((row) => this.customerApiIdByCode.set(row.customer_id, row.id));
        this.customersSubject.next(rows.map((row) => this.mapApiCustomer(row)));
        this.currentPage = response.meta?.page ?? page;
        this.pageSize = response.meta?.limit ?? this.pageSize;
        this.totalPages = response.meta?.total_pages ?? 1;
        this.totalCustomers = response.meta?.total ?? rows.length;
      },
      error: (err: HttpErrorResponse) => {
        this.isLoadingCustomers = false;
        if (err.status === 400) {
          const apiMessage = err.error?.message || 'Invalid pagination request.';
          this.toast.show(`Error 400: ${apiMessage}`, 'warning');
        } else if (err.status === 500) {
          this.toast.show('Error 500: Server error. Please try again later.', 'error');
        } else if (err.status === 0) {
          this.toast.show('Network error. Check your connection and API URL.', 'error');
        } else {
          const apiMessage = err.error?.message || err.message || 'Request failed.';
          this.toast.show(`Error ${err.status}: ${apiMessage}`, 'error');
        }
      },
    });
  }

  private clearFieldErrors(): void {
    this.fieldErrors = { name: '', phone: '', email: '', dateOfBirth: '' };
  }

  private clearEditFieldErrors(): void {
    this.editFieldErrors = { name: '', phone: '', email: '', dateOfBirth: '' };
  }

  private validateCreateForm(): boolean {
    this.clearFieldErrors();
    const name = this.newCustomer.name.trim();
    const phoneDigits = this.newCustomer.phone.trim();
    const email = this.newCustomer.email.trim();

    if (!name) {
      this.fieldErrors.name = 'Name is required.';
    }
    if (!phoneDigits) {
      this.fieldErrors.phone = 'Phone number is required.';
    } else if (phoneDigits.length !== 10 || !/^\d{10}$/.test(phoneDigits)) {
      this.fieldErrors.phone = 'Enter exactly 10 digits.';
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      this.fieldErrors.email = 'Enter a valid email address.';
    }
    if (this.newCustomer.dateOfBirth) {
      const dob = new Date(this.newCustomer.dateOfBirth);
      const endOfToday = new Date();
      endOfToday.setHours(23, 59, 59, 999);
      if (Number.isNaN(dob.getTime())) {
        this.fieldErrors.dateOfBirth = 'Invalid date.';
      } else if (dob > endOfToday) {
        this.fieldErrors.dateOfBirth = 'Date of birth cannot be in the future.';
      }
    }

    const msg =
      this.fieldErrors.name ||
      this.fieldErrors.phone ||
      this.fieldErrors.email ||
      this.fieldErrors.dateOfBirth;
    if (msg) {
      this.toast.show(msg, 'warning');
      return false;
    }
    return true;
  }

  private validateEditForm(): boolean {
    this.clearEditFieldErrors();
    const name = this.editCustomer.name.trim();
    const phoneDigits = this.editCustomer.phone.trim();
    const email = this.editCustomer.email.trim();

    if (!name) {
      this.editFieldErrors.name = 'Name is required.';
    }
    if (!phoneDigits) {
      this.editFieldErrors.phone = 'Phone number is required.';
    } else if (phoneDigits.length !== 10 || !/^\d{10}$/.test(phoneDigits)) {
      this.editFieldErrors.phone = 'Enter exactly 10 digits.';
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      this.editFieldErrors.email = 'Enter a valid email address.';
    }
    if (this.editCustomer.dateOfBirth) {
      const dob = new Date(this.editCustomer.dateOfBirth);
      if (Number.isNaN(dob.getTime())) {
        this.editFieldErrors.dateOfBirth = 'Invalid date.';
      }
    }

    const msg =
      this.editFieldErrors.name ||
      this.editFieldErrors.phone ||
      this.editFieldErrors.email ||
      this.editFieldErrors.dateOfBirth;
    if (msg) {
      this.toast.show(msg, 'warning');
      return false;
    }
    return true;
  }

  private mapCreatedCustomer(body: unknown, fallbackName: string, fallbackPhone: string): Customer {
    const raw = body as Record<string, unknown> | null | undefined;
    const d = (raw?.['data'] ?? raw) as Record<string, unknown> | undefined;
    const id =
      d && d['id'] != null
        ? String(d['id'])
        : `C${String(this.state.snapshot.customers.length + 1).padStart(3, '0')}`;
    const dobRaw = d?.['date_of_birth'] ?? d?.['dob'] ?? this.newCustomer.dateOfBirth;
    const dob =
      typeof dobRaw === 'string'
        ? dobRaw
        : dobRaw instanceof Date
          ? dobRaw.toISOString()
          : this.newCustomer.dateOfBirth
            ? new Date(this.newCustomer.dateOfBirth).toISOString()
            : '';
    const regSource = d?.['created_at'] ?? d?.['reg_date'] ?? d?.['registration_date'];
    const regDate = this.toYyyyMmDd(regSource) ?? new Date().toISOString().slice(0, 10);

    return {
      id,
      name: typeof d?.['name'] === 'string' ? d['name'] : fallbackName,
      phone: typeof d?.['phone'] === 'string' ? d['phone'] : fallbackPhone,
      email: typeof d?.['email'] === 'string' ? d['email'] : this.newCustomer.email.trim(),
      address: typeof d?.['address'] === 'string' ? d['address'] : this.newCustomer.address.trim(),
      dob,
      notes: typeof d?.['notes'] === 'string' ? d['notes'] : this.newCustomer.notes.trim(),
      type: this.newCustomer.type,
      regDate,
      active: d?.['active'] !== false,
    };
  }

  private mapApiCustomer(row: CustomerApiItem): Customer {
    return {
      id: row.customer_id || String(row.id),
      name: row.name || '',
      phone: row.phone || '',
      email: row.email || '',
      address: row.address || '',
      dob: row.date_of_birth || '',
      notes: row.notes || '',
      type: this.toUiCustomerType(row.customer_type),
      regDate: this.toYyyyMmDd(row.registered_at) ?? new Date().toISOString().slice(0, 10),
      active: row.is_active !== false,
    };
  }

  private toUiCustomerType(value: string | undefined): CustomerType {
    const normalized = (value || '').toLowerCase();
    if (normalized === 'regular') return 'Regular';
    if (normalized === 'vip') return 'VIP';
    return 'New';
  }

  private toApiCustomerType(value: CustomerType): 'new' | 'regular' | 'vip' {
    if (value === 'Regular') return 'regular';
    if (value === 'VIP') return 'vip';
    return 'new';
  }

  private resolveApiCustomerId(customerId: string): number | null {
    const byCode = this.customerApiIdByCode.get(customerId);
    if (typeof byCode === 'number') return byCode;
    const parsed = Number(customerId);
    return Number.isFinite(parsed) ? parsed : null;
  }

  private toDateInput(value: string): string {
    if (!value) return '';
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return '';
    return d.toISOString().slice(0, 10);
  }

  private toYyyyMmDd(value: unknown): string | null {
    if (value == null) return null;
    if (typeof value === 'string') {
      const d = new Date(value);
      return Number.isNaN(d.getTime()) ? null : d.toISOString().slice(0, 10);
    }
    if (value instanceof Date) return value.toISOString().slice(0, 10);
    return null;
  }
}
