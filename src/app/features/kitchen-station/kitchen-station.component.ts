import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { ToastService } from '../../core/services/toast.service';
import { KitchenStationActionResponse, KitchenStationApiItem, KitchenStationService } from '../../core/services/kitchen-station.service';
import { ApiLoaderComponent } from '../../shared/components/api-loader/api-loader.component';

interface StationRow {
  id: string;
  name: string;
  isActive: boolean;
}

@Component({
  selector: 'app-kitchen-station',
  standalone: true,
  imports: [CommonModule, FormsModule, ApiLoaderComponent],
  templateUrl: './kitchen-station.component.html',
  styleUrl: './kitchen-station.component.css',
})
export class KitchenStationComponent implements OnInit {
  stations: StationRow[] = [];
  currentPage = 1;
  pageSize = 10;
  totalPages = 1;
  totalRecords = 0;
  search = '';
  isLoading = false;

  showCreateModal = false;
  showEditModal = false;
  nameError = '';
  isSubmitting = false;
  togglingStationId: string | null = null;

  newStationName = '';
  editStation = { id: '', name: '' };

  constructor(
    private toast: ToastService,
    private kitchenStationService: KitchenStationService,
  ) {}

  ngOnInit(): void {
    this.loadStations();
  }

  loadStations(): void {
    this.isLoading = true;
    this.kitchenStationService.stationPagination({
      page: this.currentPage,
      limit: this.pageSize,
      search: this.search,
    }).subscribe({
      next: (response) => {
        this.isLoading = false;
        const statusCode = Number(response?.statusCode ?? 0);
        if (statusCode !== 200) {
          const apiMessage = response?.message || 'Failed to load kitchen stations';
          this.toast.show(`Error ${statusCode}: ${apiMessage}`, 'error');
          return;
        }

        this.stations = (response?.data ?? []).map((s: KitchenStationApiItem) => ({
          id: String(s.id),
          name: s.name,
          isActive: Boolean(s.is_active ?? true),
        }));

        this.totalRecords = Number(response?.meta?.total ?? 0);
        this.currentPage = Number(response?.meta?.page ?? this.currentPage);
        this.pageSize = Number(response?.meta?.limit ?? this.pageSize);
        this.totalPages = Number(response?.meta?.total_pages ?? 1);
      },
      error: (err) => {
        this.isLoading = false;
        const statusCode = Number(err?.error?.statusCode ?? err?.status ?? 0);
        const apiMessage = err?.error?.message || err?.error?.errors?.[0] || 'Failed to load kitchen stations';
        const prefix = statusCode ? `Error ${statusCode}: ` : '';
        this.toast.show(`${prefix}${apiMessage}`, 'error');
      },
    });
  }

  nextPage(): void {
    if (this.currentPage >= this.totalPages) return;
    this.currentPage += 1;
    this.loadStations();
  }

  prevPage(): void {
    if (this.currentPage <= 1) return;
    this.currentPage -= 1;
    this.loadStations();
  }

  openCreateModal(): void {
    this.newStationName = '';
    this.nameError = '';
    this.showCreateModal = true;
  }

  createStation(): void {
    const name = this.newStationName.trim();
    if (!name) {
      this.nameError = 'Station name is required.';
      return;
    }
    this.isSubmitting = true;
    this.kitchenStationService.createKitchenStation({ name }).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        const body = response.body as { data?: KitchenStationApiItem; message?: string; statusCode?: number } | null;
        const statusCode = Number(body?.statusCode ?? response.status ?? 0);

        if (![200, 201].includes(statusCode)) {
          const apiMessage = body?.message || 'Failed to create station.';
          this.toast.show(`Error ${statusCode}: ${apiMessage}`, 'warning');
          return;
        }

        this.currentPage = 1;
        this.showCreateModal = false;
        const createdName = (body?.data?.name ?? name).trim();
        this.toast.show(`Station "${createdName}" created`, 'success');
        this.loadStations();
      },
      error: (err) => {
        this.isSubmitting = false;
        const statusCode = Number(err?.error?.statusCode ?? err?.status ?? 0);
        const apiMessage =
          err?.error?.message ||
          err?.error?.errors?.[0] ||
          'Failed to create station.';

        if (statusCode === 409) {
          this.toast.show(`Error ${statusCode}: ${apiMessage}`, 'warning');
        } else if (statusCode === 400) {
          this.toast.show(`Error ${statusCode}: ${apiMessage}`, 'warning');
        } else if (statusCode > 0) {
          this.toast.show(`Error ${statusCode}: ${apiMessage}`, 'error');
        } else {
          this.toast.show(apiMessage, 'error');
        }
      },
    });
  }

  openEditModal(station: StationRow): void {
    this.editStation = { id: station.id, name: station.name };
    this.nameError = '';
    this.showEditModal = true;
  }

  updateStation(): void {
    const name = this.editStation.name.trim();
    if (!name) {
      this.nameError = 'Station name is required.';
      return;
    }
    const stationId = Number(this.editStation.id);
    if (!Number.isFinite(stationId) || stationId <= 0) {
      this.toast.show('Invalid station id for update', 'warning');
      return;
    }

    this.isSubmitting = true;
    this.kitchenStationService.updateKitchenStation(stationId, { name }).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        const body = response.body as { data?: KitchenStationApiItem; message?: string; statusCode?: number } | null;
        const statusCode = Number(body?.statusCode ?? response.status ?? 0);

        if (statusCode !== 200) {
          const apiMessage = body?.message || 'Failed to update station.';
          this.toast.show(`Error ${statusCode}: ${apiMessage}`, 'warning');
          return;
        }

        this.showEditModal = false;
        const updatedName = (body?.data?.name ?? name).trim();
        this.toast.show(`Station "${updatedName}" updated successfully`, 'success');
        this.loadStations();
      },
      error: (err) => {
        this.isSubmitting = false;
        const statusCode = Number(err?.error?.statusCode ?? err?.status ?? 0);
        const apiMessage =
          err?.error?.message ||
          err?.error?.errors?.[0] ||
          'Failed to update station.';

        if (statusCode === 400 || statusCode === 409) {
          this.toast.show(`Error ${statusCode}: ${apiMessage}`, 'warning');
        } else if (statusCode > 0) {
          this.toast.show(`Error ${statusCode}: ${apiMessage}`, 'error');
        } else {
          this.toast.show(apiMessage, 'error');
        }
      },
    });
  }

  toggleActive(station: StationRow): void {
    const stationId = Number(station.id);
    if (!Number.isFinite(stationId) || stationId <= 0) {
      this.toast.show('Invalid station id for status update', 'warning');
      return;
    }

    this.togglingStationId = station.id;
    this.kitchenStationService.toggleAvailability(stationId).subscribe({
      next: (response: KitchenStationActionResponse) => {
        this.togglingStationId = null;
        const statusCode = Number(response?.statusCode ?? 0);
        if (statusCode !== 200) {
          const apiMessage = response?.message || 'Failed to update station status';
          this.toast.show(`Error ${statusCode}: ${apiMessage}`, 'warning');
          return;
        }

        const fromApi = response?.data?.is_active;
        const nextActive = typeof fromApi === 'boolean' ? fromApi : !station.isActive;
        this.stations = this.stations.map(s =>
          s.id === station.id ? { ...s, isActive: nextActive } : s,
        );
        this.toast.show(response?.message || 'Station status updated', 'success');
      },
      error: (err) => {
        this.togglingStationId = null;
        const statusCode = Number(err?.error?.statusCode ?? err?.status ?? 0);
        const apiMessage =
          err?.error?.message ||
          err?.error?.errors?.[0] ||
          'Failed to update station status';
        const prefix = statusCode ? `Error ${statusCode}: ` : '';
        this.toast.show(`${prefix}${apiMessage}`, 'error');
      },
    });
  }

  deleteStation(station: StationRow): void {
    const stationId = Number(station.id);
    if (!Number.isFinite(stationId) || stationId <= 0) {
      this.toast.show('Invalid station id for delete', 'warning');
      return;
    }

    Swal.fire({
      title: 'Are you sure?',
      text: `This action will permanently delete station "${station.name}"!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (!result.isConfirmed) return;

      this.isSubmitting = true;
      this.kitchenStationService.deleteKitchenStation(stationId).subscribe({
        next: (response: unknown) => {
          this.isSubmitting = false;
          const body = response as { statusCode?: number; message?: string } | null;
          const statusCode =
            body && typeof body === 'object' && body.statusCode != null
              ? Number(body.statusCode)
              : 200;

          if (statusCode !== 200) {
            const apiMessage = body?.message || 'Failed to delete station.';
            this.toast.show(`Error ${statusCode}: ${apiMessage}`, 'warning');
            return;
          }

          this.toast.show(`Station "${station.name}" deleted`, 'success');
          const willPageBeEmpty = this.stations.length === 1 && this.currentPage > 1;
          if (willPageBeEmpty) {
            this.currentPage -= 1;
          }
          this.loadStations();
        },
        error: (err: HttpErrorResponse) => {
          this.isSubmitting = false;
          const apiMessage =
            err?.error?.message ||
            err?.error?.errors?.[0] ||
            'Failed to delete station';
          const statusCode = err?.error?.statusCode ?? err?.status;
          const codePrefix = statusCode ? `Error ${statusCode}: ` : '';
          this.toast.show(`${codePrefix}${apiMessage}`, 'error');
        },
      });
    });
  }
}
