import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NgFor, NgIf, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { KotService, KotDetailsMeta, KotOrderApi } from '../../core/services/kot.service';
import { ToastService } from '../../core/services/toast.service';
import { ApiLoaderComponent } from '../../shared/components/api-loader/api-loader.component';

export interface KotItem {
  orderItemId: number;
  menuItemId: number;
  itemId: string;
  name: string;
  qty: number;
  isPrepared: boolean;
  categoryId: string;
  categoryName: string;
  categoryIcon: string;
  variant: string;
  instructions: string;
  updating?: boolean;
}

export interface KotCard {
  orderApiId: number;
  orderId: string;
  tableId: string;
  tableName: string;
  zone: string;
  items: KotItem[];
  urgency: 'normal' | 'warning' | 'critical';
}

export interface CategorySummary {
  id: string;
  name: string;
  icon: string;
  expanded: boolean;
  items: { name: string; qty: number }[];
  get totalQty(): number;
}

export interface CategoryFilterOption {
  id: number;
  name: string;
}

@Component({
  selector: 'app-kitchen-kot-view',
  standalone: true,
  imports: [NgFor, NgIf, NgClass, FormsModule, ApiLoaderComponent],
  templateUrl: './kitchen-kot-view.component.html',
  styleUrl: './kitchen-kot-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KitchenKotViewComponent implements OnInit {
  allCards: KotCard[] = [];
  categorySummaries: CategorySummary[] = [];
  /** Distinct categories (for filter dropdown), merged across loads. */
  categoryFilterOptions: CategoryFilterOption[] = [];
  private readonly knownCategories = new Map<number, string>();

  /** Bound to the search input (does not hit API until Enter). */
  searchInput = '';
  /** Last value sent to `GET kot/details` as `search`. */
  appliedSearch = '';
  selectedCategoryId = '';

  readonly pageLimit = 12;
  currentPage = 1;
  totalPages = 1;
  isListLoading = false;

  constructor(
    private kot: KotService,
    private toast: ToastService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadKotDetails();
  }

  /** True when any line item is calling toggle-prepared (overlay loader). */
  get anyToggleInFlight(): boolean {
    return this.allCards.some((c) => c.items.some((i) => i.updating));
  }

  loadKotDetails(options?: { silent?: boolean }): void {
    const silent = options?.silent === true;
    if (!silent) {
      this.isListLoading = true;
      this.cdr.markForCheck();
    }

    const categoryId = this.selectedCategoryId
      ? Number(this.selectedCategoryId)
      : undefined;

    this.kot
      .getKotDetails({
        page: this.currentPage,
        limit: this.pageLimit,
        search: this.appliedSearch || undefined,
        category_id: categoryId != null && !Number.isNaN(categoryId) ? categoryId : undefined,
      })
      .pipe(
        finalize(() => {
          if (!silent) {
            this.isListLoading = false;
          }
          this.cdr.markForCheck();
        }),
      )
      .subscribe({
        next: (res) => {
          if (!this.isWrappedApiSuccess(res)) {
            this.toast.show(
              this.formatApiFailureMessage(res?.message, res?.statusCode, undefined),
              'error',
            );
            this.allCards = [];
            this.categorySummaries = [];
            this.cdr.markForCheck();
            return;
          }
          const rows = res.data ?? [];
          this.applyMeta(res.meta);

          if (rows.length === 0 && (res.meta?.total ?? 0) > 0 && this.currentPage > 1) {
            this.currentPage -= 1;
            this.loadKotDetails({ silent });
            return;
          }

          this.allCards = rows.map((o) => this.mapOrderToCard(o));
          this.mergeCategoryFilterOptions(rows);
          this.buildCategorySummaries();
          this.cdr.markForCheck();
        },
        error: (err: HttpErrorResponse) => {
          this.toast.show(this.formatHttpErrorMessage(err, 'Could not load KOT details.'), 'error');
          this.allCards = [];
          this.categorySummaries = [];
          this.cdr.markForCheck();
        },
      });
  }

  /** True when there is draft text and/or an active search filter to clear. */
  get canClearSearch(): boolean {
    return !!(this.searchInput?.trim() || this.appliedSearch);
  }

  /**
   * Apply search: only runs when the user presses Enter or clicks Search
   * (not on every keystroke).
   */
  applySearch(): void {
    this.appliedSearch = this.searchInput.trim();
    this.currentPage = 1;
    this.loadKotDetails();
  }

  private isWrappedApiSuccess(res: {
    success?: boolean;
    statusCode?: number;
  } | null | undefined): boolean {
    if (res == null) {
      return false;
    }
    if (res.success === false) {
      return false;
    }
    if (res.statusCode != null && res.statusCode !== 200) {
      return false;
    }
    return true;
  }

  private formatApiFailureMessage(
    message: string | undefined,
    statusCode: number | undefined,
    httpStatus: number | undefined,
  ): string {
    const base = message?.trim() || 'Request failed.';
    const parts: string[] = [base];
    if (statusCode != null) {
      parts.push(`Code: ${statusCode}`);
    } else if (httpStatus != null && httpStatus > 0) {
      parts.push(`HTTP ${httpStatus}`);
    }
    return parts.join(' · ');
  }

  private formatHttpErrorMessage(err: HttpErrorResponse, fallback: string): string {
    const body = err.error as { message?: string; statusCode?: number } | undefined;
    return this.formatApiFailureMessage(
      body?.message ?? err.message ?? fallback,
      body?.statusCode,
      err.status,
    );
  }

  private applyMeta(meta: KotDetailsMeta | undefined): void {
    if (!meta) {
      this.totalPages = 1;
      this.currentPage = 1;
      return;
    }
    this.totalPages = Math.max(1, meta.total_pages ?? 1);
    if (meta.page != null) {
      this.currentPage = Math.min(this.totalPages, Math.max(1, meta.page));
    }
  }

  private mapOrderToCard(o: KotOrderApi): KotCard {
    const items = this.flattenStationItems(o);
    return {
      orderApiId: o.order_id,
      orderId: o.order_number ?? String(o.order_id),
      tableId: String(o.table_id),
      tableName: o.table_name ?? `Table ${o.table_id}`,
      zone: '',
      items,
      urgency: 'normal',
    };
  }

  private flattenStationItems(o: KotOrderApi): KotItem[] {
    const list: KotItem[] = [];
    for (const st of o.stations ?? []) {
      for (const it of st.items ?? []) {
        list.push({
          orderItemId: it.order_item_id,
          menuItemId: it.menu_item_id,
          itemId: String(it.order_item_id),
          name: it.menu_item_name ?? 'Item',
          qty: Math.max(0, Number(it.quantity) || 0),
          isPrepared: !!it.is_prepared,
          categoryId: String(it.category_id ?? ''),
          categoryName: it.category_name ?? 'Other',
          categoryIcon: '🍽️',
          variant: '',
          instructions: it.special_instructions ?? '',
        });
      }
    }
    return list;
  }

  private mergeCategoryFilterOptions(orders: KotOrderApi[]): void {
    for (const o of orders) {
      for (const c of o.categories ?? []) {
        if (c.category_id != null) {
          this.knownCategories.set(c.category_id, c.category_name ?? '');
        }
      }
    }
    this.categoryFilterOptions = Array.from(this.knownCategories.entries())
      .map(([id, name]) => ({ id, name }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  /** Sidebar: category name, item name, count — only items not yet prepared. */
  private buildCategorySummaries(): void {
    const catMap = new Map<string, { name: string; icon: string; items: Map<string, number> }>();

    for (const card of this.allCards) {
      for (const item of card.items) {
        if (item.isPrepared) {
          continue;
        }
        const cid = item.categoryId || '0';
        if (!catMap.has(cid)) {
          catMap.set(cid, {
            name: item.categoryName,
            icon: item.categoryIcon,
            items: new Map(),
          });
        }
        const entry = catMap.get(cid)!;
        const prev = entry.items.get(item.name) ?? 0;
        entry.items.set(item.name, prev + item.qty);
      }
    }

    this.categorySummaries = Array.from(catMap.entries())
      .map(([id, v]) => {
        const items = Array.from(v.items.entries()).map(([name, qty]) => ({ name, qty }));
        return {
          id,
          name: v.name,
          icon: v.icon,
          expanded: true,
          items,
          get totalQty() {
            return this.items.reduce((s, i) => s + i.qty, 0);
          },
        } as CategorySummary;
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  onFilterChange(): void {
    this.currentPage = 1;
    this.loadKotDetails();
  }

  setPage(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.currentPage = page;
    this.loadKotDetails();
  }

  clearSearchAndReload(): void {
    debugger
    this.searchInput = '';
    this.appliedSearch = '';
    this.currentPage = 1;
    this.loadKotDetails();
  }

  clearFilters(): void {
    this.searchInput = '';
    this.appliedSearch = '';
    this.selectedCategoryId = '';
    this.currentPage = 1;
    this.loadKotDetails();
  }

  toggleItemPrepared(card: KotCard, item: KotItem): void {
    if (item.updating) {
      return;
    }
    item.updating = true;
    this.cdr.markForCheck();

    this.kot
      .toggleItemPrepared(item.orderItemId, item.menuItemId)
      .pipe(
        finalize(() => {
          item.updating = false;
          this.cdr.markForCheck();
        }),
      )
      .subscribe({
        next: (res) => {
          if (!this.isWrappedApiSuccess(res)) {
            this.toast.show(
              this.formatApiFailureMessage(res?.message, res?.statusCode, undefined),
              'error',
            );
            return;
          }
          const nextPrepared = res.data?.is_prepared;
          if (typeof nextPrepared === 'boolean') {
            item.isPrepared = nextPrepared;
          } else {
            item.isPrepared = !item.isPrepared;
          }
          this.buildCategorySummaries();
          if (this.isCardFullyReady(card)) {
            this.loadKotDetails({ silent: true });
          }
          this.cdr.markForCheck();
        },
        error: (err: HttpErrorResponse) => {
          this.toast.show(this.formatHttpErrorMessage(err, 'Could not update item.'), 'error');
          this.cdr.markForCheck();
        },
      });
  }

  toggleCategory(summary: CategorySummary): void {
    summary.expanded = !summary.expanded;
    this.cdr.markForCheck();
  }

  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  itemsByCategory(card: KotCard): { catId: string; catName: string; catIcon: string; items: KotItem[] }[] {
    const map = new Map<string, { catId: string; catName: string; catIcon: string; items: KotItem[] }>();
    for (const item of card.items) {
      if (!map.has(item.categoryId)) {
        map.set(item.categoryId, {
          catId: item.categoryId,
          catName: item.categoryName,
          catIcon: item.categoryIcon,
          items: [],
        });
      }
      map.get(item.categoryId)!.items.push(item);
    }
    return Array.from(map.values());
  }

  statusClass(item: KotItem): string {
    return item.isPrepared ? 'status-ready' : 'status-pending';
  }

  isCardFullyReady(card: KotCard): boolean {
    return card.items.length > 0 && card.items.every((i) => i.isPrepared);
  }

  trackByOrderId(_: number, c: KotCard): string {
    return c.orderId;
  }
  trackByCatId(_: number, g: { catId: string }): string {
    return g.catId;
  }
  trackByItemId(_: number, i: KotItem): string {
    return i.itemId;
  }
}
