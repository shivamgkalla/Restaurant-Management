import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { ToastService } from '../../core/services/toast.service';
import { MenuItem, SpiceLevel } from '../../core/models';
import { MenuService, MenuFoodType, MenuApiItem, MenuPaginationResponse, MenuItemResponse } from '../../core/services/menu.service';
import { ApiLoaderComponent } from '../../shared/components/api-loader/api-loader.component';
import { CategoryApiItem, CategoryService } from '../../core/services/category.service';
import { KitchenStationApiItem, KitchenStationService } from '../../core/services/kitchen-station.service';
import { FieldSchema, ValidationService } from '../../core/services/validation.service';

type MenuSchemaKey = 'name' | 'price' | 'description';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, ApiLoaderComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent implements OnInit {
  menuItems: MenuItem[] = [];
  menuIdMap: Record<string, number> = {};
  categories: CategoryApiItem[] = [];
  kitchenStations: KitchenStationApiItem[] = [];
  searchInput = '';
  private appliedSearch = '';
  selectedCat = '';
  currentPage = 1;
  pageSize = 10;
  totalPages = 1;
  totalRecords = 0;
  isLoadingMenu = false;
  showAddModal = false;
  showEditModal = false;
  isCreating = false;
  isUpdating = false;
  deletingItemId: string | null = null;
  submitAttempted = false;
  editSubmitAttempted = false;
  menuFieldErrors = { name: '', price: '', description: '' };
  editMenuFieldErrors = { name: '', price: '', description: '' };

  private readonly menuSchemas: Record<MenuSchemaKey, FieldSchema> = {
    name: {
      label: 'Item name',
      rules: [
        { type: 'required' },
        { type: 'minLength', value: 3 },
        { type: 'maxLength', value: 60 },
      ],
    },
    price: {
      label: 'Price',
      rules: [
        { type: 'required' },
        { type: 'min', value: 10 },
        { type: 'max', value: 20000 },
      ],
    },
    description: {
      label: 'Description',
      rules: [{ type: 'maxLength', value: 500 }],
    },
  };

  newMenu = {
    stationId: '',
    name: '',
    categoryId: '',
    price: 0,
    description: '',
    foodType: '' as MenuFoodType | '',
    isChefSpecial: false,
  };
  editMenu = {
    itemId: '',
    stationId: '',
    name: '',
    categoryId: '',
    price: 0,
    description: '',
    foodType: '' as MenuFoodType | '',
    isChefSpecial: false,
  };

  get showMenuLoader(): boolean {
    return this.isLoadingMenu || this.isCreating || this.isUpdating || this.deletingItemId !== null;
  }

  get hasActiveSearch(): boolean {
    return !!this.appliedSearch;
  }

  constructor(
    private toast: ToastService,
    private menuService: MenuService,
    private categoryService: CategoryService,
    private kitchenStationService: KitchenStationService,
    private validation: ValidationService,
  ) {}

  onAddMenuFieldInput(field: MenuSchemaKey, value: string | number): void {
    if (field === 'price') {
      const numeric = Number(value);
      this.newMenu.price = Number.isFinite(numeric) ? numeric : 0;
    } else {
      this.newMenu[field] = String(value ?? '');
    }
    this.menuFieldErrors = {
      ...this.menuFieldErrors,
      [field]: this.validation.validateField(value, this.menuSchemas[field]),
    };
  }

  onEditMenuFieldInput(field: MenuSchemaKey, value: string | number): void {
    if (field === 'price') {
      const numeric = Number(value);
      this.editMenu.price = Number.isFinite(numeric) ? numeric : 0;
    } else {
      this.editMenu[field] = String(value ?? '');
    }
    this.editMenuFieldErrors = {
      ...this.editMenuFieldErrors,
      [field]: this.validation.validateField(value, this.menuSchemas[field]),
    };
  }

  private clearMenuFieldErrors(): void {
    this.menuFieldErrors = { name: '', price: '', description: '' };
  }

  private clearEditMenuFieldErrors(): void {
    this.editMenuFieldErrors = { name: '', price: '', description: '' };
  }

  private runMenuSchemaValidation(target: 'add' | 'edit'): boolean {
    const data = target === 'add' ? this.newMenu : this.editMenu;
    const errors = target === 'add' ? this.menuFieldErrors : this.editMenuFieldErrors;
    (Object.keys(this.menuSchemas) as MenuSchemaKey[]).forEach((field) => {
      errors[field] = this.validation.validateField(data[field], this.menuSchemas[field]);
    });
    if (target === 'add') {
      this.menuFieldErrors = { ...errors };
    } else {
      this.editMenuFieldErrors = { ...errors };
    }
    return !this.validation.hasErrors(errors);
  }

  ngOnInit(): void {
    this.loadCategories();
    this.loadKitchenStations();
    this.loadMenu(1);
  }

  toggleAvailability(item: MenuItem): void {
    const apiItemId = this.menuIdMap[item.id];
    if (!apiItemId) {
      this.toast.show('Unable to identify menu item');
      return;
    }
    this.menuService.toggleAvailability(apiItemId).subscribe({
      next: (response: MenuItemResponse) => {
        if (response?.statusCode !== 200) {
          this.toast.show(response?.message || 'Failed to update availability', 'warning');
          return;
        }
        const isAvailable = !!response?.data?.is_available;
        this.menuItems = this.menuItems.map((m) =>
          m.id === item.id ? { ...m, available: isAvailable } : m
        );
        this.toast.show(`${item.name} marked as ${isAvailable ? 'Available' : 'Unavailable'}`);
      },
      error: (err: HttpErrorResponse) => {
        const apiMessage =
          err.error?.message || err.error?.errors?.[0] || err.message || 'Failed to update availability.';
        const prefix = err.status ? `Error ${err.status}: ` : '';
        this.toast.show(`${prefix}${apiMessage}`, 'error');
      },
    });
  }

  applySearch(): void {
    this.appliedSearch = this.searchInput.trim();
    this.loadMenu(1);
  }

  clearSearch(): void {
    if (!this.searchInput && !this.appliedSearch) return;
    this.searchInput = '';
    this.appliedSearch = '';
    this.loadMenu(1);
  }

  onCategoryChange(): void {
    this.loadMenu(1);
  }

  prevPage(): void {
    if (this.currentPage <= 1 || this.isLoadingMenu) return;
    this.loadMenu(this.currentPage - 1);
  }

  nextPage(): void {
    if (this.currentPage >= this.totalPages || this.isLoadingMenu) return;
    this.loadMenu(this.currentPage + 1);
  }

  openAddModal(): void {
    this.submitAttempted = false;
    this.clearMenuFieldErrors();
    this.newMenu = {
      stationId: this.kitchenStations[0] ? String(this.kitchenStations[0].id) : '',
      name: '',
      categoryId: this.categories[0] ? String(this.categories[0].id) : '',
      price: 0,
      description: '',
      foodType: '',
      isChefSpecial: false,
    };
    this.showAddModal = true;
  }

  openEditModal(item: MenuItem): void {
    this.editSubmitAttempted = false;
    this.clearEditMenuFieldErrors();
    this.editMenu = {
      itemId: item.id,
      stationId: item.stationId || (this.kitchenStations[0] ? String(this.kitchenStations[0].id) : ''),
      name: item.name,
      categoryId: item.categoryId,
      price: item.price,
      description: item.description,
      foodType: item.veg ? 'veg' : 'non_veg',
      isChefSpecial: item.chefSpecial,
    };
    this.showEditModal = true;
  }

  setFoodType(foodType: MenuFoodType): void {
    this.newMenu.foodType = foodType;
  }

  setEditFoodType(foodType: MenuFoodType): void {
    this.editMenu.foodType = foodType;
  }

  private toCategoryIdNumber(categoryId: string): number | null {
    const numeric = Number(categoryId);
    if (Number.isInteger(numeric) && numeric > 0) {
      return numeric;
    }

    const digitsOnly = categoryId.replace(/\D+/g, '');
    const parsed = Number(digitsOnly);
    if (Number.isInteger(parsed) && parsed > 0) {
      return parsed;
    }

    return null;
  }

  addMenuItem(): void {
    this.submitAttempted = true;
    if (this.isCreating) return;
    if (!this.runMenuSchemaValidation('add')) return;
    const name = this.newMenu.name.trim();
    const description = this.newMenu.description.trim();
    const price = Number(this.newMenu.price);
    const hasValidFoodType = this.newMenu.foodType === 'veg' || this.newMenu.foodType === 'non_veg';
    if (!this.newMenu.categoryId || !this.newMenu.stationId || !hasValidFoodType) return;
    const categoryIdForApi = this.toCategoryIdNumber(this.newMenu.categoryId);
    if (categoryIdForApi === null) {
      this.toast.show('Invalid category selected');
      return;
    }
    const stationIdForApi = this.toStationIdNumber(this.newMenu.stationId);
    if (stationIdForApi === null) {
      this.toast.show('Invalid kitchen station selected');
      return;
    }

    this.isCreating = true;
    this.menuService.createMenu({
      category_id: categoryIdForApi,
      station_id: stationIdForApi,
      name,
      description,
      base_price: price,
      food_type: this.newMenu.foodType as MenuFoodType,
      is_chef_special: this.newMenu.isChefSpecial,
    }).subscribe({
      next: () => {
        this.toast.show(`${name} added to menu`);
        this.showAddModal = false;
        this.loadMenu(1);
        this.isCreating = false;
      },
      error: () => {
        this.toast.show('Failed to create menu item');
        this.isCreating = false;
      },
    });
  }

  updateMenuItem(): void {
    this.editSubmitAttempted = true;
    if (this.isUpdating) return;
    if (!this.runMenuSchemaValidation('edit')) return;
    const name = this.editMenu.name.trim();
    const description = this.editMenu.description.trim();
    const price = Number(this.editMenu.price);
    const hasValidFoodType = this.editMenu.foodType === 'veg' || this.editMenu.foodType === 'non_veg';
    if (!this.editMenu.categoryId || !this.editMenu.stationId || !hasValidFoodType) return;
    const categoryIdForApi = this.toCategoryIdNumber(this.editMenu.categoryId);
    if (categoryIdForApi === null) {
      this.toast.show('Invalid category selected');
      return;
    }
    const stationIdForApi = this.toStationIdNumber(this.editMenu.stationId);
    if (stationIdForApi === null) {
      this.toast.show('Invalid kitchen station selected');
      return;
    }
    const apiItemId = this.menuIdMap[this.editMenu.itemId];
    if (!apiItemId) {
      this.toast.show('Unable to identify menu item');
      return;
    }

    this.isUpdating = true;
    this.menuService
      .editMenu(apiItemId, {
        category_id: categoryIdForApi,
        station_id: stationIdForApi,
        name,
        description,
        base_price: price,
        food_type: this.editMenu.foodType as MenuFoodType,
        is_chef_special: this.editMenu.isChefSpecial,
      })
      .subscribe({
        next: () => {
          this.toast.show(`${name} updated successfully`);
          this.showEditModal = false;
          this.loadMenu(this.currentPage);
          this.isUpdating = false;
        },
        error: () => {
          this.toast.show('Failed to update menu item');
          this.isUpdating = false;
        },
      });
  }

  deleteMenuItem(item: MenuItem): void {
    if (this.deletingItemId || this.isLoadingMenu) return;
    const apiItemId = this.menuIdMap[item.id];
    if (!apiItemId) {
      this.toast.show('Unable to identify menu item');
      return;
    }
    Swal.fire({
      title: 'Are you sure?',
      text: `This action will archive menu item "${item.name}"!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, archive it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (!result.isConfirmed) return;

      this.deletingItemId = item.id;
      this.menuService.deleteMenuById(apiItemId).subscribe({
        next: () => {
          this.toast.show(`${item.name} archived`);
          this.loadMenu(this.currentPage);
          this.deletingItemId = null;
        },
        error: () => {
          this.toast.show('Failed to archive menu item');
          this.deletingItemId = null;
        },
      });
    });
  }

  private loadMenu(page: number): void {
    this.isLoadingMenu = true;
    this.menuService
      .menuPagination({
        page,
        limit: this.pageSize,
        search: this.appliedSearch || undefined,
        category_id: this.toCategoryIdNumber(this.selectedCat) ?? undefined,
      })
      .subscribe({
        next: (response: MenuPaginationResponse) => {
          this.isLoadingMenu = false;
          const statusCode = response?.statusCode;
          if (statusCode !== undefined && statusCode !== 200) {
            this.toast.show(response?.message || 'Failed to load menu items', 'warning');
            this.menuItems = [];
            return;
          }
          const rows = Array.isArray(response?.data) ? response.data : [];
          this.menuIdMap = {};
          rows.forEach((r) => {
            this.menuIdMap[`ITEM${r.id}`] = r.id;
          });
          this.menuItems = rows.map((row) => this.mapApiItemToMenuItem(row));
          this.currentPage = response.meta?.page ?? page;
          this.pageSize = response.meta?.limit ?? this.pageSize;
          this.totalRecords = response.meta?.total ?? rows.length;
          this.totalPages = Math.max(
            1,
            response.meta?.total_pages ?? Math.ceil(this.totalRecords / this.pageSize)
          );
        },
        error: (err: HttpErrorResponse) => {
          this.isLoadingMenu = false;
          this.menuItems = [];
          const apiMessage =
            err.error?.message || err.error?.errors?.[0] || err.message || 'Failed to load menu items.';
          const prefix = err.status ? `Error ${err.status}: ` : '';
          this.toast.show(`${prefix}${apiMessage}`, 'error');
        },
      });
  }

  private loadCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (response) => {
        const statusCode = response?.statusCode;
        if (statusCode !== undefined && statusCode !== 200) {
          this.toast.show(response?.message || 'Failed to load categories', 'warning');
          this.categories = [];
          return;
        }
        this.categories = Array.isArray(response?.data) ? response.data : [];
      },
      error: (err: HttpErrorResponse) => {
        this.categories = [];
        const apiMessage =
          err.error?.message || err.error?.errors?.[0] || err.message || 'Failed to load categories.';
        const prefix = err.status ? `Error ${err.status}: ` : '';
        this.toast.show(`${prefix}${apiMessage}`, 'error');
      },
    });
  }

  private loadKitchenStations(): void {
    this.kitchenStationService.getAllStations().subscribe({
      next: (response) => {
        const statusCode = response?.statusCode;
        if (statusCode !== undefined && statusCode !== 200) {
          this.toast.show(response?.message || 'Failed to load kitchen stations', 'warning');
          this.kitchenStations = [];
          return;
        }
        this.kitchenStations = Array.isArray(response?.data)
          ? response.data.filter((station) => station?.is_active !== false)
          : [];
      },
      error: (err: HttpErrorResponse) => {
        this.kitchenStations = [];
        const apiMessage =
          err.error?.message || err.error?.errors?.[0] || err.message || 'Failed to load kitchen stations.';
        const prefix = err.status ? `Error ${err.status}: ` : '';
        this.toast.show(`${prefix}${apiMessage}`, 'error');
      },
    });
  }

  private toStationIdNumber(stationId: string): number | null {
    const numeric = Number(stationId);
    if (Number.isInteger(numeric) && numeric > 0) {
      return numeric;
    }
    return null;
  }

  private mapApiItemToMenuItem(item: MenuApiItem): MenuItem {
    return {
      id: `ITEM${item.id}`,
      name: item.name,
      sku: item.sku,
      categoryId: String(item.category_id),
      stationId: item.station_id ? String(item.station_id) : '',
      description: item.description ?? '',
      price: item.base_price,
      prepTime: item.prep_time_minutes,
      veg: item.food_type === 'veg',
      spiceLevel: this.toSpiceLevel(item.spice_level),
      chefSpecial: item.is_chef_special,
      isNew: false,
      available: item.is_available,
      station: item.station_name ?? 'Main',
      variants: ['Regular'],
    };
  }

  private toSpiceLevel(spiceLevel: number | null): SpiceLevel | null {
    if (spiceLevel == null) return null;
    if (spiceLevel <= 0) return 'mild';
    if (spiceLevel === 1) return 'medium';
    if (spiceLevel === 2) return 'hot';
    return 'extra-hot';
  }
}
