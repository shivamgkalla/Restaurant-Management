import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { ToastService } from '../../core/services/toast.service';
import {
  CategoryApiItem,
  CategoryPaginationResponse,
  CategoryService,
  CreateCategoryPayload,
  UpdateCategoryPayload,
} from '../../core/services/category.service';
import { ApiLoaderComponent } from '../../shared/components/api-loader/api-loader.component';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, ApiLoaderComponent],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
})
export class CategoryComponent implements OnInit {
  categories: CategoryApiItem[] = [];
  isLoading = false;
  isSubmitting = false;
  deletingId: number | null = null;
  showAddModal = false;
  showEditModal = false;
  searchInput = '';
  private appliedSearch = '';
  currentPage = 1;
  pageSize = 10;
  totalPages = 1;
  totalRecords = 0;

  fieldErrors = { name: '', taxConfigId: '' };
  editFieldErrors = { name: '', taxConfigId: '' };

  newCategory = { name: '', description: '', taxConfigId: 1 };
  editCategory = { id: 0, name: '', description: '', taxConfigId: 1 };

  get showCategoryLoader(): boolean {
    return this.isLoading || this.isSubmitting || this.deletingId !== null;
  }

  get hasActiveSearch(): boolean {
    return !!this.appliedSearch;
  }

  constructor(
    private toast: ToastService,
    private categoryService: CategoryService,
  ) {}

  ngOnInit(): void {
    this.loadCategories(1);
  }

  applySearch(): void {
    this.appliedSearch = this.searchInput.trim();
    this.loadCategories(1);
  }

  clearSearch(): void {
    if (!this.searchInput && !this.appliedSearch) return;
    this.searchInput = '';
    this.appliedSearch = '';
    this.loadCategories(1);
  }

  prevPage(): void {
    if (this.currentPage <= 1 || this.isLoading) return;
    this.loadCategories(this.currentPage - 1);
  }

  nextPage(): void {
    if (this.currentPage >= this.totalPages || this.isLoading) return;
    this.loadCategories(this.currentPage + 1);
  }

  openAddModal(): void {
    this.clearFieldErrors();
    this.newCategory = { name: '', description: '', taxConfigId: 1 };
    this.showAddModal = true;
  }

  preventModalBackdropClose(event: Event): void {
    event.stopPropagation();
  }

  openEditModal(category: CategoryApiItem): void {
    this.clearEditFieldErrors();
    this.editCategory = {
      id: category.id,
      name: category.name,
      description: category.description ?? '',
      taxConfigId: category.tax_config_id,
    };
    this.showEditModal = true;
  }

  createCategory(): void {
    if (this.isSubmitting || !this.validateCreateForm()) return;
    const payload: CreateCategoryPayload = {
      name: this.newCategory.name.trim(),
      description: this.newCategory.description.trim(),
      tax_config_id: Number(this.newCategory.taxConfigId),
    };
    this.isSubmitting = true;
    this.categoryService.createCategory(payload).subscribe({
      next: (res) => {
        this.isSubmitting = false;
        const statusCode = res.status;
        if (statusCode === 200 || statusCode === 201) {
          this.toast.show('Category created successfully', 'success');
          this.showAddModal = false;
          this.loadCategories(1);
          return;
        }
        if (statusCode === 400) {
          this.toast.show('Error 400: Invalid category data.', 'warning');
          return;
        }
        if (statusCode === 401) {
          this.toast.show('Error 401: Unauthorized access.', 'warning');
          return;
        }
        if (statusCode === 500) {
          this.toast.show('Error 500: Server error. Please try again later.', 'error');
          return;
        }
        this.toast.show(`Error ${statusCode}: Failed to create category.`, 'error');
      },
      error: (err: HttpErrorResponse) => {
        this.isSubmitting = false;
        const statusCode = err.status;
        const apiMessage = err.error?.message || err.error?.errors?.[0] || err.message;
        if (statusCode === 400) {
          this.toast.show(`Error 400: ${apiMessage || 'Invalid category data.'}`, 'warning');
          return;
        }
        if (statusCode === 401) {
          this.toast.show(`Error 401: ${apiMessage || 'Unauthorized access.'}`, 'warning');
          return;
        }
        if (statusCode === 500) {
          this.toast.show('Error 500: Server error. Please try again later.', 'error');
          return;
        }
        const prefix = statusCode ? `Error ${statusCode}: ` : '';
        this.toast.show(`${prefix}${apiMessage || 'Failed to create category.'}`, 'error');
      },
    });
  }

  updateCategory(): void {
    if (this.isSubmitting || !this.validateEditForm()) return;
    const payload: UpdateCategoryPayload = {
      name: this.editCategory.name.trim(),
      description: this.editCategory.description.trim(),
      tax_config_id: Number(this.editCategory.taxConfigId),
    };
    this.isSubmitting = true;
    this.categoryService.updateCategory(this.editCategory.id, payload).subscribe({
      next: (res) => {
        this.isSubmitting = false;
        const statusCode = res.status;
        if (statusCode === 200) {
          this.toast.show('Category updated successfully', 'success');
          this.showEditModal = false;
          this.loadCategories(this.currentPage);
          return;
        }
        if (statusCode === 400) {
          this.toast.show('Error 400: Invalid category data.', 'warning');
          return;
        }
        if (statusCode === 401) {
          this.toast.show('Error 401: Unauthorized access.', 'warning');
          return;
        }
        if (statusCode === 500) {
          this.toast.show('Error 500: Server error. Please try again later.', 'error');
          return;
        }
        this.toast.show(`Error ${statusCode}: Failed to update category.`, 'error');
      },
      error: (err: HttpErrorResponse) => {
        this.isSubmitting = false;
        const statusCode = err.status;
        const apiMessage = err.error?.message || err.error?.errors?.[0] || err.message;
        if (statusCode === 400) {
          this.toast.show(`Error 400: ${apiMessage || 'Invalid category data.'}`, 'warning');
          return;
        }
        if (statusCode === 401) {
          this.toast.show(`Error 401: ${apiMessage || 'Unauthorized access.'}`, 'warning');
          return;
        }
        if (statusCode === 500) {
          this.toast.show('Error 500: Server error. Please try again later.', 'error');
          return;
        }
        const prefix = statusCode ? `Error ${statusCode}: ` : '';
        this.toast.show(`${prefix}${apiMessage || 'Failed to update category.'}`, 'error');
      },
    });
  }

  deleteCategory(category: CategoryApiItem): void {
    if (this.deletingId !== null || this.isSubmitting || this.isLoading) return;
    Swal.fire({
      title: 'Are you sure?',
      text: `This action will permanently delete category "${category.name}"!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (!result.isConfirmed) return;
      this.deletingId = category.id;
      this.categoryService.deleteCategoryById(category.id).subscribe({
        next: (response: unknown) => {
          this.deletingId = null;
          const body = response as { statusCode?: number; message?: string } | null;
          const statusCode =
            body && typeof body === 'object' && body.statusCode != null
              ? Number(body.statusCode)
              : 200;
          if (statusCode === 200) {
            this.toast.show(`Category "${category.name}" deleted`, 'success');
            const willPageBeEmpty = this.categories.length === 1 && this.currentPage > 1;
            this.loadCategories(willPageBeEmpty ? this.currentPage - 1 : this.currentPage);
            return;
          }
          if (statusCode === 400) {
            this.toast.show(`Error 400: ${body?.message || 'Invalid delete request.'}`, 'warning');
            return;
          }
          if (statusCode === 401) {
            this.toast.show(`Error 401: ${body?.message || 'Unauthorized access.'}`, 'warning');
            return;
          }
          if (statusCode === 500) {
            this.toast.show('Error 500: Server error. Please try again later.', 'error');
            return;
          }
          this.toast.show(`Error ${statusCode}: ${body?.message || 'Failed to delete category.'}`, 'error');
        },
        error: (err: HttpErrorResponse) => {
          this.deletingId = null;
          const statusCode = err.status;
          const apiMessage = err.error?.message || err.error?.errors?.[0] || err.message;
          if (statusCode === 400) {
            this.toast.show(`Error 400: ${apiMessage || 'Invalid delete request.'}`, 'warning');
            return;
          }
          if (statusCode === 401) {
            this.toast.show(`Error 401: ${apiMessage || 'Unauthorized access.'}`, 'warning');
            return;
          }
          if (statusCode === 500) {
            this.toast.show('Error 500: Server error. Please try again later.', 'error');
            return;
          }
          const prefix = statusCode ? `Error ${statusCode}: ` : '';
          this.toast.show(`${prefix}${apiMessage || 'Failed to delete category.'}`, 'error');
        },
      });
    });
  }

  private loadCategories(page: number): void {
    this.isLoading = true;
    this.categoryService.categoryPagination({ page, limit: this.pageSize, search: this.appliedSearch || undefined }).subscribe({
      next: (response: CategoryPaginationResponse) => {
        this.isLoading = false;
        if (response?.statusCode && response.statusCode !== 200) {
          const msg = response?.message || 'Failed to load categories.';
          this.toast.show(`Error ${response.statusCode}: ${msg}`, 'warning');
          this.categories = [];
          return;
        }
        const rows = Array.isArray(response?.data) ? response.data : [];
        this.categories = rows;
        this.currentPage = response.meta?.page ?? page;
        this.pageSize = response.meta?.limit ?? this.pageSize;
        this.totalRecords = response.meta?.total ?? rows.length;
        this.totalPages = Math.max(1, response.meta?.total_pages ?? Math.ceil(this.totalRecords / this.pageSize));
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading = false;
        this.categories = [];
        const apiMessage = err.error?.message || err.error?.errors?.[0] || err.message || 'Failed to load categories.';
        const prefix = err.status ? `Error ${err.status}: ` : '';
        this.toast.show(`${prefix}${apiMessage}`, 'error');
      },
    });
  }

  private clearFieldErrors(): void {
    this.fieldErrors = { name: '', taxConfigId: '' };
  }

  private clearEditFieldErrors(): void {
    this.editFieldErrors = { name: '', taxConfigId: '' };
  }

  private validateCreateForm(): boolean {
    this.clearFieldErrors();
    const name = this.newCategory.name.trim();
    const taxConfigId = Number(this.newCategory.taxConfigId);
    if (!name) this.fieldErrors.name = 'Category name is required.';
    if (!Number.isInteger(taxConfigId) || taxConfigId <= 0) {
      this.fieldErrors.taxConfigId = 'Tax config id must be a positive number.';
    }
    const msg = this.fieldErrors.name || this.fieldErrors.taxConfigId;
    if (msg) {
      this.toast.show(msg, 'warning');
      return false;
    }
    return true;
  }

  private validateEditForm(): boolean {
    this.clearEditFieldErrors();
    const name = this.editCategory.name.trim();
    const taxConfigId = Number(this.editCategory.taxConfigId);
    if (!name) this.editFieldErrors.name = 'Category name is required.';
    if (!Number.isInteger(taxConfigId) || taxConfigId <= 0) {
      this.editFieldErrors.taxConfigId = 'Tax config id must be a positive number.';
    }
    const msg = this.editFieldErrors.name || this.editFieldErrors.taxConfigId;
    if (msg) {
      this.toast.show(msg, 'warning');
      return false;
    }
    return true;
  }
}
