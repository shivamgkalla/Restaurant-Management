import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { customerAuthGuard, customerGuestGuard } from './core/guards/customer-auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./features/login/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'customer/login',
    loadComponent: () =>
      import('./features/customer-login/customer-login.component').then(m => m.CustomerLoginComponent),
    canActivate: [customerGuestGuard],
  },
  {
    path: 'order',
    loadComponent: () => import('./features/customer-order/customer-order.component').then(m => m.CustomerOrderComponent),
    canActivate: [customerAuthGuard],
  },
  {
    path: 'app',
    loadComponent: () => import('./features/shell/shell.component').then(m => m.ShellComponent),
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent), canActivate: [authGuard], data: { module: 'dashboard' } },
      { path: 'zones',     loadComponent: () => import('./features/zones/zones.component').then(m => m.ZonesComponent),          canActivate: [authGuard], data: { module: 'zones' } },
      { path: 'tables',    loadComponent: () => import('./features/tables/tables.component').then(m => m.TablesComponent),       canActivate: [authGuard], data: { module: 'tables' } },
      { path: 'orders',    loadComponent: () => import('./features/orders/orders.component').then(m => m.OrdersComponent),       canActivate: [authGuard], data: { module: 'orders' } },
      { path: 'kitchen-kot-view', loadComponent: () => import('./features/kitchen-kot-view/kitchen-kot-view.component').then(m => m.KitchenKotViewComponent), canActivate: [authGuard], data: { module: 'kitchen-kot-view' } },
      { path: 'kitchen-station', loadComponent: () => import('./features/kitchen-station/kitchen-station.component').then(m => m.KitchenStationComponent), canActivate: [authGuard], data: { module: 'kitchen-station' } },
      { path: 'billing',   loadComponent: () => import('./features/billing/billing.component').then(m => m.BillingComponent),    canActivate: [authGuard], data: { module: 'billing' } },
      { path: 'rfid',      loadComponent: () => import('./features/rfid/rfid.component').then(m => m.RfidComponent),             canActivate: [authGuard], data: { module: 'rfid' } },
      { path: 'customers', loadComponent: () => import('./features/customers/customers.component').then(m => m.CustomersComponent), canActivate: [authGuard], data: { module: 'customers' } },
      { path: 'category',  loadComponent: () => import('./features/category/category.component').then(m => m.CategoryComponent), canActivate: [authGuard], data: { module: 'category' } },
      { path: 'menu',      loadComponent: () => import('./features/menu/menu.component').then(m => m.MenuComponent),             canActivate: [authGuard], data: { module: 'menu' } },
      { path: 'staff',     loadComponent: () => import('./features/staff/staff.component').then(m => m.StaffComponent),          canActivate: [authGuard], data: { module: 'staff' } },
      { path: 'reports',   loadComponent: () => import('./features/reports/reports.component').then(m => m.ReportsComponent),    canActivate: [authGuard], data: { module: 'reports' } },
      { path: 'admin',     loadComponent: () => import('./features/admin/admin.component').then(m => m.AdminComponent),          canActivate: [authGuard], data: { module: 'admin' } },
    ],
  },
  { path: '**', redirectTo: 'login' },
];
