import { Component, OnInit } from '@angular/core';
import { AsyncPipe, NgFor, NgIf, NgClass, LowerCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { ToastService } from '../../core/services/toast.service';
import { Table, TableStatus } from '../../core/models';
import { TableService, TableApiItem, TableStatusUpdateResponse, TableDeleteResponse } from '../../core/services/table.service';

type FilterZone = 'All' | string;
type ZoneItem = { id: number; name: string; description?: string; is_active?: boolean; created_at?: string };
type ZoneListResponse = {
  success?: boolean;
  statusCode?: number;
  message?: string;
  data?: ZoneItem[];
};

@Component({
  selector: 'app-tables',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf, NgClass, LowerCasePipe, FormsModule],
  templateUrl: './tables.component.html',
  styleUrl: './tables.component.css',
})
export class TablesComponent implements OnInit {
  zones: FilterZone[] = ['All'];
  zoneItems: ZoneItem[] = [];
  tables: Table[] = [];
  totalRecords = 0;
  currentPage = 1;
  pageSize = 10;
  searchText = '';
  isLoadingTables = false;
  isLoadingZones = false;
  statuses: TableStatus[] = ['Available', 'Occupied', 'Reserved', 'Cleaning'];
  allStatuses: TableStatus[] = ['Available', 'Occupied', 'Reserved', 'Cleaning'];
  private activeZone$ = new BehaviorSubject<FilterZone>('All');
  private tables$ = new BehaviorSubject<Table[]>([]);
  selectedTable: Table | null = null;
  showAddModal = false;
  showEditModal = false;
  isSubmitting = false;
  deletingTableId: string | null = null;
  newTable = {
    name: '',
    capacity: 4,
    zone: '',
    zoneId: null as number | null,
    shape: 'square' as Table['shape'],
    status: 'Available' as TableStatus,
    notes: '',
  };
  editTable = {
    id: '',
    name: '',
    capacity: 1,
    zone: '',
    zoneId: null as number | null,
    notes: '',
  };
  addTableErrors = {
    name: '',
    capacity: '',
    zone: '',
  };

  get activeZone(): FilterZone { return this.activeZone$.value; }
  set activeZone(v: FilterZone) { this.activeZone$.next(v); }

  filteredTables$!: Observable<Table[]>;
  get showApiLoader(): boolean {
    return this.isLoadingTables || this.isLoadingZones || this.isSubmitting || !!this.deletingTableId;
  }

  constructor(
    private toast: ToastService,
    private tableService: TableService,
  ) {}

  ngOnInit(): void {
    this.loadZones();
    this.loadTables();
    this.filteredTables$ = combineLatest([this.tables$, this.activeZone$]).pipe(
      map(([tables, zone]) => zone === 'All' ? tables : tables.filter(t => t.zone === zone))
    );
  }

  private loadZones(): void {
    this.isLoadingZones = true;
    this.tableService.getAllZone().subscribe({
      next: (response: ZoneItem[] | ZoneListResponse) => {
        this.isLoadingZones = false;
        const zones = Array.isArray(response) ? response : (response?.data ?? []);
        this.zoneItems = zones;
        this.zones = ['All', ...zones.filter(z => z.is_active !== false).map(z => z.name)];
        if (!this.zones.includes(this.activeZone)) {
          this.activeZone = 'All';
        }

        if (!Array.isArray(response) && response?.statusCode && response.statusCode !== 200) {
          this.toast.show(`Error ${response.statusCode}: ${response?.message || 'Failed to load zones'}`, 'error');
        }
      },
      error: (err) => {
        this.isLoadingZones = false;
        const statusCode = err?.status;
        const apiMessage =
          err?.error?.message ||
          err?.error?.errors?.[0] ||
          'Failed to load zones';

        if (statusCode) {
          this.toast.show(`Error ${statusCode}: ${apiMessage}`, 'error');
        } else {
          this.toast.show(apiMessage, 'error');
        }
      },
    });
  }

  private toUiStatus(status?: string): TableStatus {
    const normalized = (status ?? '').toLowerCase();
    if (normalized === 'occupied') return 'Occupied';
    if (normalized === 'reserved') return 'Reserved';
    if (normalized === 'cleaning') return 'Cleaning';
    return 'Available';
  }

  private toApiStatus(status: TableStatus): string {
    return status.toLowerCase();
  }

  private mapApiTableToUi(table: TableApiItem): Table {
    const zoneName =
      table.zone?.name ||
      this.zoneItems.find(z => z.id === table.zone_id)?.name ||
      `Zone ${table.zone_id}`;
    return {
      id: String(table.id),
      name: table.table_number,
      capacity: Number(table.seating_capacity ?? 1),
      zone: zoneName,
      shape: 'square',
      status: this.toUiStatus(table.status),
      notes: table.notes ?? '',
      mergedWith: null,
    };
  }

  loadTables(page = this.currentPage): void {
    this.isLoadingTables = true;
    this.tableService.tablePagination({
      page,
      limit: this.pageSize,
      search: this.searchText.trim(),
    }).subscribe({
      next: (response) => {
        this.isLoadingTables = false;
        const metaPage = Number(response?.meta?.page ?? response?.page ?? page);
        const metaLimit = Number(response?.meta?.limit ?? response?.limit ?? this.pageSize);
        const metaTotal = Number(response?.meta?.total ?? response?.total ?? 0);
        this.currentPage = metaPage > 0 ? metaPage : page;
        this.pageSize = metaLimit > 0 ? metaLimit : this.pageSize;
        this.totalRecords = metaTotal;
        const apiTables = Array.isArray(response?.data) ? response.data : [];
        this.tables = apiTables.map((t) => this.mapApiTableToUi(t));
        this.tables$.next(this.tables);

        if (response?.statusCode && response.statusCode !== 200) {
          const apiMessage = response?.message || 'Failed to load tables';
          this.toast.show(`Error ${response.statusCode}: ${apiMessage}`, 'error');
        }
      },
      error: (err) => {
        this.isLoadingTables = false;
        const statusCode = err?.status;
        const apiMessage =
          err?.error?.message ||
          err?.error?.errors?.[0] ||
          'Failed to load tables';
        if (statusCode) {
          this.toast.show(`Error ${statusCode}: ${apiMessage}`, 'error');
        } else {
          this.toast.show(apiMessage, 'error');
        }
      },
    });
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.totalRecords / this.pageSize));
  }

  onSearch(): void {
    this.currentPage = 1;
    this.loadTables(1);
  }

  clearSearch(): void {
    if (!this.searchText) return;
    this.searchText = '';
    this.currentPage = 1;
    this.loadTables(1);
  }

  countByStatus$(status: TableStatus): Observable<number> {
    return this.activeZone$.pipe(
      map((zone) => {
        const rows = zone === 'All' ? this.tables : this.tables.filter(t => t.zone === zone);
        return rows.filter(x => x.status === status).length;
      })
    );
  }

  statusColor(status: TableStatus): string {
    const map: Record<TableStatus, string> = {
      Available: 'var(--status-available)',
      Occupied:  'var(--status-occupied)',
      Reserved:  'var(--status-reserved)',
      Cleaning:  'var(--status-cleaning)',
    };
    return map[status];
  }

  openTable(table: Table): void {
    this.selectedTable = { ...table };
  }

  setStatus(status: TableStatus): void {
    if (!this.selectedTable) return;
    const tableId = Number(this.selectedTable.id);
    if (!Number.isFinite(tableId)) {
      this.toast.show('Invalid table id for status update', 'error');
      return;
    }

    this.isSubmitting = true;
    this.tableService.updateTableStatus(tableId, this.toApiStatus(status)).subscribe({
      next: (response: TableStatusUpdateResponse) => {
        const updatedStatus = this.toUiStatus(response?.status ?? status);
        const updatedZoneName =
          response?.zone?.name ??
          this.tables.find((t) => t.id === String(tableId))?.zone ??
          this.selectedTable?.zone ??
          '';

        this.tables = this.tables.map((t) => {
          if (t.id !== String(tableId)) return t;
          return {
            ...t,
            name: response?.table_number ?? t.name,
            capacity: Number(response?.seating_capacity ?? t.capacity),
            status: updatedStatus,
            notes: response?.notes ?? t.notes,
            zone: updatedZoneName,
          };
        });
        this.tables$.next(this.tables);
        this.toast.show(`Table ${response?.table_number ?? this.selectedTable?.name} set to ${updatedStatus}`, 'success');
        this.selectedTable = null;
        this.isSubmitting = false;
      },
      error: (err) => {
        this.isSubmitting = false;
        const apiMessage =
          err?.error?.message ||
          err?.error?.errors?.[0] ||
          'Failed to update table status';
        const codePrefix = err?.status ? `Error ${err.status}: ` : '';
        this.toast.show(`${codePrefix}${apiMessage}`, 'error');
      },
    });
  }

  deleteTable(table: Table, event: MouseEvent): void {
    event.stopPropagation();
    if (this.deletingTableId || this.isSubmitting) return;

    const tableId = Number(table.id);
    if (!Number.isFinite(tableId)) {
      this.toast.show('Invalid table id for delete', 'error');
      return;
    }

    Swal.fire({
      title: 'Are you sure?',
      text: `This action will permanently delete the table "${table.name}"!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (!result.isConfirmed) return;

      this.deletingTableId = table.id;
      this.tableService.deleteTable(tableId).subscribe({
        next: (response: TableDeleteResponse) => {
          const statusCode = response?.statusCode ?? 200;
          if (statusCode !== 200) {
            this.deletingTableId = null;
            const apiMessage = response?.message || 'Failed to delete table.';
            this.toast.show(`Error ${statusCode}: ${apiMessage}`, 'warning');
            return;
          }

          const message = response?.message || 'Table deleted successfully';

          this.tables = this.tables.filter((t) => t.id !== table.id);
          this.tables$.next(this.tables);

          if (this.selectedTable?.id === table.id) {
            this.selectedTable = null;
          }

          const shouldGoPrev = this.tables.length === 0 && this.currentPage > 1;
          const targetPage = shouldGoPrev ? this.currentPage - 1 : this.currentPage;

          this.toast.show(message, 'success');

          this.deletingTableId = null;
          this.loadTables(targetPage);
        },
        error: (err: HttpErrorResponse) => {
          this.deletingTableId = null;
          const apiMessage =
            err?.error?.message ||
            err?.error?.errors?.[0] ||
            'Failed to delete table';
          const codePrefix = err?.status ? `Error ${err.status}: ` : '';
          this.toast.show(`${codePrefix}${apiMessage}`, 'error');
        },
      });
    });
  }

  openEditModal(table: Table, event: MouseEvent): void {
    event.stopPropagation();
    const selectedZone = this.zoneItems.find((z) => z.name === table.zone);
    this.editTable = {
      id: table.id,
      name: table.name,
      capacity: table.capacity,
      zone: table.zone,
      zoneId: selectedZone?.id ?? null,
      notes: table.notes ?? '',
    };
    this.showEditModal = true;
  }

  onEditZoneChange(zoneName: string): void {
    const selectedZone = this.zoneItems.find((z) => z.name === zoneName);
    this.editTable.zone = zoneName;
    this.editTable.zoneId = selectedZone?.id ?? null;
  }

  updateTable(): void {
    const tableId = Number(this.editTable.id);
    const tableName = this.editTable.name.trim();
    const notes = this.editTable.notes.trim();
    const capacity = Number(this.editTable.capacity) || 1;
    const zoneId = this.editTable.zoneId;

    if (!Number.isFinite(tableId) || !tableName || zoneId === null || this.isSubmitting) return;

    this.isSubmitting = true;
    this.tableService.updateTable(tableId, {
      table_number: tableName,
      seating_capacity: capacity,
      zone_id: zoneId,
      notes,
    }).subscribe({
      next: (response) => {
        const updatedTable = response?.data ?? response;
        const updatedZoneId = Number(updatedTable?.zone_id ?? zoneId);
        const updatedZoneName =
          updatedTable?.zone?.name ??
          this.zoneItems.find((z) => z.id === updatedZoneId)?.name ??
          this.editTable.zone;

        this.tables = this.tables.map((t) => {
          if (t.id !== String(tableId)) return t;
          return {
            ...t,
            name: updatedTable?.table_number ?? tableName,
            capacity: Number(updatedTable?.seating_capacity ?? capacity),
            zone: updatedZoneName,
            notes: updatedTable?.notes ?? notes,
          };
        });
        this.tables$.next(this.tables);

        this.toast.show('Table updated successfully', 'success');
        this.showEditModal = false;
        this.isSubmitting = false;
      },
      error: (err) => {
        this.isSubmitting = false;
        const apiMessage =
          err?.error?.message ||
          err?.error?.errors?.[0] ||
          'Failed to update table';
        const codePrefix = err?.status ? `Error ${err.status}: ` : '';
        this.toast.show(`${codePrefix}${apiMessage}`, 'error');
      },
    });
  }

  openAddModal(): void {
    this.newTable = {
      name: '',
      capacity: 4,
      zone: this.zoneItems[0]?.name ?? this.zones.find(z => z !== 'All') ?? '',
      zoneId: this.zoneItems[0]?.id ?? null,
      shape: 'square',
      status: 'Available',
      notes: '',
    };
    this.clearAddTableErrors();
    this.showAddModal = true;
  }

  onTableNameChange(value: string): void {
    this.newTable.name = value;
    if (this.addTableErrors.name) this.addTableErrors.name = '';
  }

  onCapacityChange(value: number | string): void {
    const numeric = Number(value);
    this.newTable.capacity = Number.isFinite(numeric) ? numeric : 0;
    if (this.addTableErrors.capacity) this.addTableErrors.capacity = '';
  }

  onZoneChange(zoneName: string): void {
    const selectedZone = this.zoneItems.find(z => z.name === zoneName);
    this.newTable.zone = zoneName;
    this.newTable.zoneId = selectedZone?.id ?? null;
    if (this.addTableErrors.zone) this.addTableErrors.zone = '';
  }

  addTable(): void {
    const tableName = this.newTable.name.trim();
    const zoneName = this.newTable.zone.trim();
    const capacity = Number(this.newTable.capacity);

    if (this.isSubmitting) return;
    this.clearAddTableErrors();

    if (!tableName) {
      this.addTableErrors.name = 'Table name/number is required.';
    }
    if (!Number.isFinite(capacity) || capacity <= 0) {
      this.addTableErrors.capacity = 'Capacity is required.';
    }
    if (!zoneName || this.newTable.zoneId === null) {
      this.addTableErrors.zone = 'Zone is required.';
    }

    const firstError = this.addTableErrors.name || this.addTableErrors.capacity || this.addTableErrors.zone;
    if (firstError) {
      this.toast.show(firstError, 'warning');
      return;
    }
    const zoneId = this.newTable.zoneId as number;

    this.isSubmitting = true;
    this.tableService.createTable({
      table_number: tableName,
      seating_capacity: capacity,
      zone_id: zoneId,
      notes: this.newTable.notes.trim(),
      pos_x: 0,
      pos_y: 0,
    }).subscribe({
      next: (response) => {
        const createdTable = response?.data ?? response;
        const createdId =
          createdTable?.id ??
          `T${String(this.tables.length + 1).padStart(3, '0')}`;
        const createdZoneId = createdTable?.zone_id ?? this.newTable.zoneId;
        const createdZoneName =
          this.zoneItems.find(z => z.id === Number(createdZoneId))?.name ?? zoneName;

        this.tables = [{
          id: String(createdId),
          name: createdTable?.table_number ?? tableName,
          capacity: Number(createdTable?.seating_capacity ?? capacity),
          zone: createdZoneName,
          shape: this.newTable.shape,
          status: this.newTable.status,
          notes: createdTable?.notes ?? this.newTable.notes.trim(),
          mergedWith: null,
        }, ...this.tables];
        this.tables$.next(this.tables);

        this.toast.show(`Table ${createdTable?.table_number ?? tableName} added`, 'success');
        this.showAddModal = false;
        this.isSubmitting = false;
        this.loadTables(1);
      },
      error: (err) => {
        this.isSubmitting = false;

        if (err.status === 400) {
          const apiMessage =
            err.error?.message ||
            err.error?.errors?.[0] ||
            'Invalid table data. Please check the fields and try again.';
          this.toast.show(`Error 400: ${apiMessage}`, 'warning');
        } else if (err.status === 500) {
          this.toast.show('Error 500: Server error. Please try again later.', 'error');
        } else {
          const apiMessage =
            err.error?.message ||
            err.error?.errors?.[0] ||
            'Failed to create table. Please try again.';
          const codePrefix = err?.status ? `Error ${err.status}: ` : '';
          this.toast.show(`${codePrefix}${apiMessage}`, 'error');
        }
      },
    });
  }

  private clearAddTableErrors(): void {
    this.addTableErrors = { name: '', capacity: '', zone: '' };
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages && !this.isLoadingTables) {
      this.loadTables(this.currentPage + 1);
    }
  }

  prevPage(): void {
    if (this.currentPage > 1 && !this.isLoadingTables) {
      this.loadTables(this.currentPage - 1);
    }
  }
}
