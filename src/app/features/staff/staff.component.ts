import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf, LowerCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { UserRole } from '../../core/models';
import { ToastService } from '../../core/services/toast.service';
import {
  CreateStaffPayload,
  StaffApiItem,
  StaffPaginationResponse,
  StaffService,
  UpdateStaffPayload,
} from '../../core/services/staff.service';
import { ApiLoaderComponent } from '../../shared/components/api-loader/api-loader.component';
import { FieldSchema, ValidationService } from '../../core/services/validation.service';

type StaffSchemaKey = 'name' | 'username' | 'email' | 'notes' | 'emergencyContact';

/** Matches API role_id values */
const ROLE_TO_ID: Record<UserRole, number> = {
  Admin: 1,
  Captain: 2,
  Cashier: 3,
  Manager: 4,
  Kitchen: 5,
};

const ID_TO_ROLE = new Map<number, UserRole>([
  [1, 'Admin'],
  [2, 'Captain'],
  [3, 'Cashier'],
  [4, 'Manager'],
  [5, 'Kitchen'],
]);

/** Row model for table + edit/delete (API numeric id separate from employee_id) */
interface StaffTableRow {
  recordId: number;
  employeeId: string;
  name: string;
  role: UserRole;
  username: string;
  phone: string;
  email: string;
  doj: string;
  status: 'Active' | 'Inactive';
  address: string;
  emergencyContact: string;
  notes: string;
}

@Component({
  selector: 'app-staff',
  standalone: true,
  imports: [NgFor, NgIf, LowerCasePipe, FormsModule, ApiLoaderComponent],
  templateUrl: './staff.component.html',
  styleUrl: './staff.component.css',
})
export class StaffComponent implements OnInit {
  staffRows: StaffTableRow[] = [];
  showAddModal = false;
  showEditModal = false;
  isSubmitting = false;
  isLoadingStaff = false;
  deletingRecordId: number | null = null;

  searchInput = '';
  private appliedSearch = '';
  currentPage = 1;
  pageSize = 10;
  totalPages = 1;
  totalRecords = 0;

  newStaff = {
    employeeId: '',
    name: '',
    role: 'Captain' as UserRole,
    username: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    dateOfJoining: '',
    emergencyContact: '',
    notes: '',
  };

  /** Add-staff modal: toggle password field visibility */
  showAddPassword = false;
  showAddConfirmPassword = false;

  /** Edit-staff modal: toggle password field visibility */
  showEditPassword = false;
  showEditConfirmPassword = false;

  editStaff = {
    recordId: 0,
    employeeId: '',
    name: '',
    role: 'Captain' as UserRole,
    username: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    emergencyContact: '',
    notes: '',
  };

  fieldErrors: {
    name: string;
    phone: string;
    email: string;
    password: string;
    confirmPassword: string;
    username: string;
    notes: string;
    emergencyContact: string;
  } = {
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    notes: '',
    emergencyContact: '',
  };

  editFieldErrors: {
    name: string;
    phone: string;
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
    notes: string;
    emergencyContact: string;
  } = {
    name: '',
    phone: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    notes: '',
    emergencyContact: '',
  };

  private readonly staffSchemas: Record<StaffSchemaKey, FieldSchema> = {
    name: {
      label: 'Name',
      rules: [
        { type: 'required' },
        { type: 'minLength', value: 3 },
        { type: 'maxLength', value: 30 },
      ],
    },
    username: {
      label: 'Username',
      rules: [
        { type: 'required' },
        { type: 'maxLength', value: 30 },
      ],
    },
    email: {
      label: 'Email',
      rules: [
        { type: 'required' },
        { type: 'email' },
      ],
    },
    notes: {
      label: 'Notes',
      rules: [{ type: 'maxLength', value: 400 }],
    },
    emergencyContact: {
      label: 'Emergency contact',
      rules: [{ type: 'maxLength', value: 10 }],
    },
  };

  readonly roles: UserRole[] = ['Admin', 'Manager', 'Captain', 'Cashier', 'Kitchen'];

  get showStaffLoader(): boolean {
    return this.isLoadingStaff || this.isSubmitting || this.deletingRecordId !== null;
  }

  get hasActiveSearch(): boolean {
    return !!this.appliedSearch;
  }

  constructor(
    private toast: ToastService,
    private staffService: StaffService,
    private validation: ValidationService,
  ) {}

  onAddStaffFieldInput(field: StaffSchemaKey, value: string): void {
    if (field === 'emergencyContact') {
      this.newStaff.emergencyContact = value.replace(/\D/g, '').slice(0, 10);
    } else {
      this.newStaff[field] = value;
    }
    this.fieldErrors = {
      ...this.fieldErrors,
      [field]: this.validation.validateField(this.newStaff[field], this.staffSchemas[field]),
    };
  }

  onEditStaffFieldInput(field: StaffSchemaKey, value: string): void {
    if (field === 'emergencyContact') {
      this.editStaff.emergencyContact = value.replace(/\D/g, '').slice(0, 10);
    } else {
      this.editStaff[field] = value;
    }
    this.editFieldErrors = {
      ...this.editFieldErrors,
      [field]: this.validation.validateField(this.editStaff[field], this.staffSchemas[field]),
    };
  }

  ngOnInit(): void {
    this.loadStaff(1);
  }

  initials(name: string): string {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  }

  applySearch(): void {
    this.appliedSearch = this.searchInput.trim();
    this.loadStaff(1);
  }

  clearSearch(): void {
    if (!this.searchInput && !this.appliedSearch) return;
    this.searchInput = '';
    this.appliedSearch = '';
    this.loadStaff(1);
  }

  prevPage(): void {
    if (this.currentPage <= 1 || this.isLoadingStaff) return;
    this.loadStaff(this.currentPage - 1);
  }

  nextPage(): void {
    if (this.currentPage >= this.totalPages || this.isLoadingStaff) return;
    this.loadStaff(this.currentPage + 1);
  }

  private loadStaff(page: number): void {
    this.isLoadingStaff = true;
    this.staffService
      .staffPagination({
        page,
        limit: this.pageSize,
        search: this.appliedSearch || undefined,
      })
      .subscribe({
        next: (response: StaffPaginationResponse) => {
          this.isLoadingStaff = false;
          const statusCode = response?.statusCode;
          if (statusCode !== undefined && statusCode !== 200) {
            const msg = response?.message || 'Failed to load staff.';
            this.toast.show(`Error ${statusCode}: ${msg}`, 'warning');
            this.staffRows = [];
            return;
          }
          const rows = Array.isArray(response.data) ? response.data : [];
          this.staffRows = rows.map((r) => this.mapApiItemToRow(r));
          this.currentPage = response.meta?.page ?? page;
          this.pageSize = response.meta?.limit ?? this.pageSize;
          this.totalRecords = response.meta?.total ?? rows.length;
          this.totalPages = Math.max(1, response.meta?.total_pages ?? Math.ceil(this.totalRecords / this.pageSize));
        },
        error: (err: HttpErrorResponse) => {
          this.isLoadingStaff = false;
          this.staffRows = [];
          const apiMessage =
            err.error?.message || err.error?.errors?.[0] || err.message || 'Failed to load staff.';
          const prefix = err.status ? `Error ${err.status}: ` : '';
          this.toast.show(`${prefix}${apiMessage}`, 'error');
        },
      });
  }

  openAddModal(): void {
    this.newStaff = {
      employeeId: '',
      name: '',
      role: 'Captain',
      username: '',
      phone: '',
      email: '',
      password: '',
      confirmPassword: '',
      address: '',
      dateOfJoining: new Date().toISOString().slice(0, 10),
      emergencyContact: '',
      notes: '',
    };
    this.showAddPassword = false;
    this.showAddConfirmPassword = false;
    this.clearFieldErrors();
    this.showAddModal = true;
  }

  onPhoneInput(value: string): void {
    this.newStaff.phone = value.replace(/\D/g, '').slice(0, 10);
    if (this.fieldErrors.phone) {
      this.fieldErrors = { ...this.fieldErrors, phone: '' };
    }
  }

  onEditPhoneInput(value: string): void {
    this.editStaff.phone = value.replace(/\D/g, '').slice(0, 10);
    if (this.editFieldErrors.phone) {
      this.editFieldErrors.phone = '';
    }
  }

  openEditModal(row: StaffTableRow): void {
    this.editStaff = {
      recordId: row.recordId,
      employeeId: row.employeeId,
      name: row.name,
      role: row.role,
      username: row.username,
      phone: row.phone,
      email: row.email,
      password: '',
      confirmPassword: '',
      address: row.address,
      emergencyContact: row.emergencyContact,
      notes: row.notes,
    };
    this.showEditPassword = false;
    this.showEditConfirmPassword = false;
    this.clearEditFieldErrors();
    this.showEditModal = true;
  }

  submitStaffEdit(): void {
    if (this.isSubmitting) return;
    if (!this.validateEditForm()) return;

    const payload: UpdateStaffPayload = {
      name: this.editStaff.name.trim(),
      phone: this.editStaff.phone.trim(),
      email: this.editStaff.email.trim(),
      address: this.editStaff.address.trim(),
      emergency_contact: this.editStaff.emergencyContact.trim(),
      notes: this.editStaff.notes.trim(),
      role_id: ROLE_TO_ID[this.editStaff.role],
      username: this.editStaff.username.trim(),
      password: this.editStaff.password.trim(),
    };

    this.isSubmitting = true;
    this.staffService.editStaff(this.editStaff.recordId, payload).subscribe({
      next: (res: HttpResponse<unknown>) => {
        this.isSubmitting = false;
        const httpStatus = res.status;
        const body = res.body as { statusCode?: number; message?: string; success?: boolean } | null;

        if (httpStatus < 200 || httpStatus >= 300) {
          const msg = body?.message || `Request failed (${httpStatus}).`;
          this.toast.show(`Error ${httpStatus}: ${msg}`, 'error');
          return;
        }

        const businessCode =
          body && typeof body === 'object' && body.statusCode != null ? Number(body.statusCode) : 200;
        if (businessCode !== 200) {
          const msg = body?.message || 'Failed to update staff.';
          this.toast.show(`Error ${businessCode}: ${msg}`, 'warning');
          return;
        }

        this.toast.show(body?.message || 'Staff updated successfully', 'success');
        this.showEditModal = false;
        this.loadStaff(this.currentPage);
      },
      error: (err: HttpErrorResponse) => {
        this.isSubmitting = false;
        const nested = err.error as { statusCode?: number; message?: string } | undefined;
        const businessCode = nested?.statusCode ?? err.status;
        const apiMessage =
          nested?.message ||
          err.error?.message ||
          err.error?.errors?.[0] ||
          err.message ||
          'Failed to update staff.';
        const prefix = businessCode ? `Error ${businessCode}: ` : '';
        this.toast.show(`${prefix}${apiMessage}`, 'error');
      },
    });
  }

  onDeleteStaff(row: StaffTableRow): void {
    if (this.deletingRecordId !== null || this.isSubmitting || this.isLoadingStaff) return;

    Swal.fire({
      title: 'Are you sure?',
      text: `This action will permanently delete staff member "${row.name}"!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (!result.isConfirmed) return;

      const rowsOnPage = this.staffRows.length;
      let reloadPage = this.currentPage;
      if (rowsOnPage === 1 && this.currentPage > 1) {
        reloadPage = this.currentPage - 1;
      }

      this.deletingRecordId = row.recordId;
      this.staffService.deleteStaffById(row.recordId).subscribe({
        next: (response: unknown) => {
          this.deletingRecordId = null;
          const body = response as { statusCode?: number; message?: string } | null;
          const code =
            body && typeof body === 'object' && body.statusCode != null ? Number(body.statusCode) : 200;
          if (code === 200) {
            this.toast.show(`Staff "${row.name}" deleted`, 'success');
            this.loadStaff(reloadPage);
            return;
          }
          const apiMessage = body?.message || `Delete failed (${code}).`;
          if (code === 400) {
            this.toast.show(`Error 400: ${apiMessage}`, 'warning');
          } else if (code === 403) {
            this.toast.show(`Error 403: ${apiMessage}`, 'warning');
          } else if (code === 404) {
            this.toast.show(`Error 404: ${apiMessage}`, 'warning');
          } else if (code === 409) {
            this.toast.show(`Error 409: ${apiMessage}`, 'warning');
          } else if (code === 500) {
            this.toast.show('Error 500: Server error. Please try again later.', 'error');
          } else {
            this.toast.show(`Error ${code}: ${apiMessage}`, 'error');
          }
        },
        error: (err: HttpErrorResponse) => {
          this.deletingRecordId = null;
          const apiMessage =
            err.error?.message ||
            err.error?.errors?.[0] ||
            err.message ||
            'Failed to delete staff.';
          if (err.status === 400) {
            this.toast.show(`Error 400: ${apiMessage}`, 'warning');
          } else if (err.status === 403) {
            this.toast.show(`Error 403: ${apiMessage || 'Only administrators can delete staff.'}`, 'warning');
          } else if (err.status === 404) {
            this.toast.show(`Error 404: ${apiMessage || 'Staff not found.'}`, 'warning');
          } else if (err.status === 409) {
            this.toast.show(`Error 409: ${apiMessage || 'Staff cannot be deleted in its current state.'}`, 'warning');
          } else if (err.status === 500) {
            this.toast.show('Error 500: Server error. Please try again later.', 'error');
          } else if (err.status === 0) {
            this.toast.show('Network error. Check your connection and API URL.', 'error');
          } else {
            const prefix = err.status ? `Error ${err.status}: ` : '';
            this.toast.show(`${prefix}${apiMessage}`, 'error');
          }
        },
      });
    });
  }

  addStaff(): void {
    if (this.isSubmitting) return;
    if (!this.validateCreateForm()) return;

    const name = this.newStaff.name.trim();
    const username = this.newStaff.username.trim();
    const phone = this.newStaff.phone.trim();
    const email = this.newStaff.email.trim();
    const employeeId =
      this.newStaff.employeeId.trim() ||
      `EMP-${Date.now().toString(36).toUpperCase()}`;

    const dateOfJoiningIso = this.newStaff.dateOfJoining
      ? new Date(this.newStaff.dateOfJoining).toISOString()
      : new Date().toISOString();

    const payload: CreateStaffPayload = {
      employee_id: employeeId,
      name,
      phone,
      email,
      address: this.newStaff.address.trim(),
      date_of_joining: dateOfJoiningIso,
      emergency_contact: this.newStaff.emergencyContact.trim(),
      notes: this.newStaff.notes.trim(),
      role_id: ROLE_TO_ID[this.newStaff.role],
      username,
      password: this.newStaff.password,
    };

    this.isSubmitting = true;
    this.staffService.createStaff(payload).subscribe({
      next: (res: HttpResponse<unknown>) => {
        this.isSubmitting = false;
        const status = res.status;
        if (status !== 200 && status !== 201) {
          this.toast.show(`Unexpected response (${status}). Staff may not have been saved.`, 'warning');
          return;
        }
        this.toast.show(`Staff ${name} added (${status})`, 'success');
        this.showAddModal = false;
        this.loadStaff(1);
      },
      error: (err: HttpErrorResponse) => {
        this.isSubmitting = false;
        if (err.status === 400) {
          const apiMessage =
            err.error?.message ||
            err.error?.errors?.[0] ||
            'Invalid staff data. Please check the fields and try again.';
          this.toast.show(`Error 400: ${apiMessage}`, 'warning');
        } else if (err.status === 403) {
          this.toast.show(err.error?.message || 'Only administrators can create staff.', 'warning');
        } else if (err.status === 409) {
          this.toast.show(err.error?.message || 'Username or employee id already exists.', 'warning');
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

  private mapApiItemToRow(item: StaffApiItem): StaffTableRow {
    return {
      recordId: item.id,
      employeeId: item.employee_id,
      name: item.name ?? '',
      role: this.roleFromApi(item),
      username: item.username ?? '',
      phone: item.phone ?? '',
      email: item.email ?? '',
      doj: item.date_of_joining ? item.date_of_joining.slice(0, 10) : '',
      status: item.is_active ? 'Active' : 'Inactive',
      address: item.address ?? '',
      emergencyContact: item.emergency_contact ?? '',
      notes: item.notes ?? '',
    };
  }

  private roleFromApi(item: StaffApiItem): UserRole {
    const byId = ID_TO_ROLE.get(item.role_id);
    if (byId) return byId;
    const raw = (item.role?.name ?? '').toLowerCase();
    if (raw === 'admin') return 'Admin';
    if (raw === 'manager') return 'Manager';
    if (raw === 'captain') return 'Captain';
    if (raw === 'cashier') return 'Cashier';
    if (raw === 'kitchen') return 'Kitchen';
    return 'Captain';
  }

  private clearFieldErrors(): void {
    this.fieldErrors = {
      name: '',
      phone: '',
      email: '',
      password: '',
      confirmPassword: '',
      username: '',
      notes: '',
      emergencyContact: '',
    };
  }

  private clearEditFieldErrors(): void {
    this.editFieldErrors = {
      name: '',
      phone: '',
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      notes: '',
      emergencyContact: '',
    };
  }

  private validateCreateForm(): boolean {
    this.clearFieldErrors();

    (Object.keys(this.staffSchemas) as StaffSchemaKey[]).forEach((field) => {
      this.fieldErrors[field] = this.validation.validateField(
        this.newStaff[field],
        this.staffSchemas[field],
      );
    });

    const phoneDigits = this.newStaff.phone.trim();
    const password = this.newStaff.password;
    const confirmPassword = this.newStaff.confirmPassword;

    if (!phoneDigits) {
      this.fieldErrors.phone = 'Phone number is required.';
    } else if (phoneDigits.length !== 10 || !/^\d{10}$/.test(phoneDigits)) {
      this.fieldErrors.phone = 'Enter exactly 10 digits.';
    }
    if (!password) {
      this.fieldErrors.password = 'Password is required.';
    } else if (password.length < 6) {
      this.fieldErrors.password = 'Password must be at least 6 characters.';
    }
    if (!confirmPassword) {
      this.fieldErrors.confirmPassword = 'Please confirm your password.';
    } else if (password && confirmPassword !== password) {
      this.fieldErrors.confirmPassword = 'Passwords do not match.';
    }

    const msg =
      this.fieldErrors.name ||
      this.fieldErrors.phone ||
      this.fieldErrors.email ||
      this.fieldErrors.password ||
      this.fieldErrors.confirmPassword ||
      this.fieldErrors.username ||
      this.fieldErrors.notes ||
      this.fieldErrors.emergencyContact;
    if (msg) {
      this.toast.show(msg, 'warning');
      return false;
    }
    return true;
  }

  private validateEditForm(): boolean {
    this.clearEditFieldErrors();

    (Object.keys(this.staffSchemas) as StaffSchemaKey[]).forEach((field) => {
      this.editFieldErrors[field] = this.validation.validateField(
        this.editStaff[field],
        this.staffSchemas[field],
      );
    });

    const phoneDigits = this.editStaff.phone.trim();
    const pwdT = this.editStaff.password.trim();
    const confT = this.editStaff.confirmPassword.trim();

    if (!phoneDigits) {
      this.editFieldErrors.phone = 'Phone number is required.';
    } else if (phoneDigits.length !== 10 || !/^\d{10}$/.test(phoneDigits)) {
      this.editFieldErrors.phone = 'Enter exactly 10 digits.';
    }

    const wantsChange = !!pwdT || !!confT;
    if (wantsChange) {
      if (!pwdT) {
        this.editFieldErrors.password = 'Enter a new password or clear both password fields.';
      } else if (pwdT.length < 6) {
        this.editFieldErrors.password = 'Password must be at least 6 characters.';
      }
      if (!confT) {
        this.editFieldErrors.confirmPassword = 'Please confirm your new password.';
      } else if (pwdT && confT !== pwdT) {
        this.editFieldErrors.confirmPassword = 'Passwords do not match.';
      }
    }

    const msg =
      this.editFieldErrors.name ||
      this.editFieldErrors.phone ||
      this.editFieldErrors.email ||
      this.editFieldErrors.username ||
      this.editFieldErrors.password ||
      this.editFieldErrors.confirmPassword ||
      this.editFieldErrors.notes ||
      this.editFieldErrors.emergencyContact;
    if (msg) {
      this.toast.show(msg, 'warning');
      return false;
    }
    return true;
  }
}
