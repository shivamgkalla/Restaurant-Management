import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { ToastService } from '../../core/services/toast.service';
import { TableService, ZoneApiItem } from '../../core/services/table.service';
import {
  ValidationErrors,
  ValidationSchema,
  ValidationService,
} from '../../core/services/validation.service';
import { ApiLoaderComponent } from '../../shared/components/api-loader/api-loader.component';

interface ZoneFormValues {
  name: string;
  description: string;
}

@Component({
  selector: 'app-zones',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, ApiLoaderComponent],
  templateUrl: './zones.component.html',
  styleUrl: './zones.component.css',
})
export class ZonesComponent implements OnInit {
  zones: ZoneApiItem[] = [];
  isLoading = false;
  totalPages = 1;
  isSubmitting = false;
  showAddModal = false;
  showEditModal = false;
  pageSize = 10;
  totalRecords = 0;
  currentPage = 1;
  get showApiLoader(): boolean {
    return this.isLoading || this.isSubmitting;
  }

  newZone: ZoneFormValues = {
    name: '',
    description: '',
  };
  editZoneData = {
    id: 0,
    name: '',
    description: '',
    is_active: true,
  };

  zoneErrors: ValidationErrors<ZoneFormValues> = {};
  editZoneErrors: ValidationErrors<ZoneFormValues> = {};

  private readonly zoneSchema: ValidationSchema<ZoneFormValues> = {
    name: {
      label: 'Zone name',
      rules: [
        { type: 'required' },
        { type: 'minLength', value: 3 },
        { type: 'maxLength', value: 30 },
      ],
    },
    description: {
      label: 'Description',
      rules: [{ type: 'maxLength', value: 200 }],
    },
  };

  constructor(
    private toast: ToastService,
    private tableService: TableService,
    private validation: ValidationService,
  ) {}

  ngOnInit(): void {
    this.loadZones();
  }

  loadZones(): void {
    this.isLoading = true;
    this.tableService.zonePagination(this.currentPage, this.pageSize).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.zones = response?.data ?? [];
        const metaTotal = Number(response?.meta?.total ?? response?.total ?? 0);
        const metaLimit = Number(response?.meta?.limit ?? response?.limit ?? this.pageSize);
        const metaPage = Number(
          response?.meta?.page ?? response?.page ?? response?.meta?.skip ?? response?.skip ?? this.currentPage,
        );
        const metaTotalPages = Number(response?.meta?.total_pages);

        this.totalRecords = metaTotal;
        if (metaLimit > 0) {
          this.pageSize = metaLimit;
        }
        if (Number.isFinite(metaPage) && metaPage > 0) {
          this.currentPage = metaPage;
        }

        this.totalPages = Number.isFinite(metaTotalPages) && metaTotalPages > 0
          ? metaTotalPages
          : Math.max(1, Math.ceil(this.totalRecords / this.pageSize));

        if (response?.statusCode && response?.statusCode !== 200) {
          const apiMessage = response?.message || 'Failed to load zones';
          this.toast.show(`Error ${response.statusCode}: ${apiMessage}`, 'error');
        }
      },
      error: (err) => {
        this.isLoading = false;
        const apiMessage =
          err?.error?.message ||
          err?.error?.errors?.[0] ||
          'Failed to load zones';
        const codePrefix = err?.status ? `Error ${err.status}: ` : '';
        this.toast.show(`${codePrefix}${apiMessage}`, 'error');
      },
    });
  }

  openAddModal(): void {
    this.newZone = { name: '', description: '' };
    this.zoneErrors = {};
    this.showAddModal = true;
  }

  onAddZoneFieldChange(field: keyof ZoneFormValues, value: string): void {
    this.newZone[field] = value;
    const schema = this.zoneSchema[field];
    if (schema) {
      this.zoneErrors = {
        ...this.zoneErrors,
        [field]: this.validation.validateField(value, schema),
      };
    }
  }

  onEditZoneFieldChange(field: keyof ZoneFormValues, value: string): void {
    this.editZoneData[field] = value;
    const schema = this.zoneSchema[field];
    if (schema) {
      this.editZoneErrors = {
        ...this.editZoneErrors,
        [field]: this.validation.validateField(value, schema),
      };
    }
  }

  addZone(): void {
    if (this.isSubmitting) return;

    this.zoneErrors = this.validation.validate(this.newZone, this.zoneSchema);
    if (this.validation.hasErrors(this.zoneErrors)) {
      return;
    }

    const name = this.newZone.name.trim();
    const description = this.newZone.description.trim();

    this.isSubmitting = true;

    this.tableService.createZone({ name, description }).subscribe({
      next: (response: any) => {
        this.isSubmitting = false;
        const statusCode = response?.statusCode;
        if (statusCode && statusCode !== 200 && statusCode !== 201) {
          const apiMessage = response?.message || 'Failed to create zone.';
          const toastType = statusCode === 409 ? 'warning' : 'error';
          this.toast.show(`Error ${statusCode}: ${apiMessage}`, toastType);
          return;
        }
        this.toast.show(`Zone "${name}" created successfully`, 'success');
        this.showAddModal = false;
        this.currentPage = 1;
        this.loadZones();
      },
      error: (err) => {
        this.isSubmitting = false;
        const statusCode = err?.error?.statusCode ?? err?.status;
        const apiMessage = err?.error?.message || err?.error?.errors?.[0];

        if (statusCode === 409) {
          this.toast.show(`Error 409: ${apiMessage || 'Zone with this name already exists'}`, 'warning');
        } else if (statusCode === 400) {
          const apiMessage =
            err.error?.message ||
            err.error?.errors?.[0] ||
            'Invalid zone data. Please check the fields and try again.';
          this.toast.show(apiMessage, 'warning');

        } else if (statusCode === 500) {
          this.toast.show('Server error. Please try again later.', 'error');

        } else {
          const msg = apiMessage || 'Something went wrong. Please try again.';
          const prefix = statusCode ? `Error ${statusCode}: ` : '';
          this.toast.show(`${prefix}${msg}`, 'error');
        }
      },
    });
  }

  openEditModal(zone: ZoneApiItem): void {
    this.editZoneData = {
      id: zone.id,
      name: zone.name,
      description: zone.description ?? '',
      is_active: zone.is_active,
    };
    this.editZoneErrors = {};
    this.showEditModal = true;
  }

  updateZone(): void {
    if (this.isSubmitting) return;

    const formValues: ZoneFormValues = {
      name: this.editZoneData.name,
      description: this.editZoneData.description,
    };
    this.editZoneErrors = this.validation.validate(formValues, this.zoneSchema);
    if (this.validation.hasErrors(this.editZoneErrors)) {
      return;
    }

    const name = this.editZoneData.name.trim();

    this.isSubmitting = true;
    this.tableService.updateZone(this.editZoneData.id, {
      name,
      description: this.editZoneData.description.trim(),
      is_active: this.editZoneData.is_active,
    }).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.showEditModal = false;
        this.toast.show('Zone updated successfully', 'success');
        this.loadZones();
      },
      error: (err) => {
        this.isSubmitting = false;
        const msg = err?.error?.message || 'Failed to update zone';
        this.toast.show(msg, 'error');
      },
    });
  }

  toggleZoneStatus(zone: ZoneApiItem): void {
    if (this.isSubmitting) return;
    this.isSubmitting = true;
    this.tableService.updateZone(zone.id, {
      name: zone.name,
      description: zone.description ?? '',
      is_active: !zone.is_active,
    }).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.toast.show(
          `Zone "${zone.name}" marked ${zone.is_active ? 'Unavailable' : 'Available'}`,
          'success'
        );
        this.loadZones();
      },
      error: () => {
        this.isSubmitting = false;
        this.toast.show('Failed to change zone status', 'error');
      },
    });
  }

  deleteZone(zone: ZoneApiItem): void {
    if (this.isSubmitting) return;

    Swal.fire({
      title: 'Are you sure?',
      text: `This action will permanently delete the zone "${zone.name}"!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (!result.isConfirmed) return;

      this.isSubmitting = true;
      this.tableService.deleteZone(zone.id).subscribe({
        next: (response: unknown) => {
          this.isSubmitting = false;
          const body = response as { statusCode?: number; message?: string } | null;
          const statusCode =
            body && typeof body === 'object' && body.statusCode != null
              ? Number(body.statusCode)
              : 200;
          if (statusCode !== 200) {
            const apiMessage = body?.message || 'Failed to delete zone.';
            this.toast.show(`Error ${statusCode}: ${apiMessage}`, 'warning');
            return;
          }
          this.toast.show(`Zone "${zone.name}" deleted`, 'success');
          const willPageBeEmpty = this.zones.length === 1 && this.currentPage > 1;
          if (willPageBeEmpty) {
            this.currentPage -= 1;
          }
          this.loadZones();
        },
        error: (err: HttpErrorResponse) => {
          this.isSubmitting = false;
          const apiMessage =
            err?.error?.message ||
            err?.error?.errors?.[0] ||
            'Failed to delete zone';
          const statusCode = err?.error?.statusCode ?? err?.status;
          const codePrefix = statusCode ? `Error ${statusCode}: ` : '';
          this.toast.show(`${codePrefix}${apiMessage}`, 'error');
        },
      });
    });
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage += 1;
      this.loadZones();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage -= 1;
      this.loadZones();
    }
  }
}

