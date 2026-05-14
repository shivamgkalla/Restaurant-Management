export type UserRole = 'Admin' | 'Manager' | 'Captain' | 'Cashier' | 'Kitchen';
export type TableStatus = 'Available' | 'Occupied' | 'Reserved' | 'Cleaning';
export type OrderStatus = 'Pending' | 'Preparing' | 'Served' | 'Completed' | 'Cancelled';
export type ItemStatus = 'Pending' | 'Preparing' | 'Ready' | 'Served';
export type BillStatus = 'Pending' | 'Paid' | 'Cancelled';
export type RfidStatus = 'Active' | 'Available' | 'Blocked' | 'Lost';
export type CustomerType = 'New' | 'Regular' | 'VIP';
export type PaymentMethod = 'Cash' | 'Online' | 'RFID' | 'Card';
export type SpiceLevel = 'mild' | 'medium' | 'hot' | 'extra-hot';
export type TableShape = 'round' | 'square' | 'rectangle';

export interface Restaurant {
  name: string;
  tagline: string;
  address: string;
  phone: string;
  gstin: string;
  email: string;
}

export interface Staff {
  id: string;
  name: string;
  role: UserRole;
  username: string;
  password: string;
  phone: string;
  email: string;
  doj: string;
  status: 'Active' | 'Inactive';
  photo: string | null;
  address: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  order: number;
  active: boolean;
  gstRate: number;
}

export interface MenuItem {
  id: string;
  name: string;
  sku: string;
  categoryId: string;
  stationId?: string;
  description: string;
  price: number;
  prepTime: number;
  veg: boolean;
  spiceLevel: SpiceLevel | null;
  chefSpecial: boolean;
  isNew: boolean;
  available: boolean;
  station: string;
  variants: string[];
}

export interface Table {
  id: string;
  name: string;
  capacity: number;
  zone: string;
  shape: TableShape;
  status: TableStatus;
  notes: string;
  mergedWith: string | null;
}

export interface Zone {
  id: string;
  name: string;
  description: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  dob: string;
  notes: string;
  type: CustomerType;
  regDate: string;
  active: boolean;
}

export interface OrderItem {
  itemId: string;
  name: string;
  variant: string;
  qty: number;
  price: number;
  instructions: string;
  status: ItemStatus;
}

export interface Order {
  id: string;
  tableId: string;
  captainId: string;
  customerId: string | null;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  /** Server order total (e.g. list API `total_amount`); when set, list UI prefers this over summing lines. */
  totalAmount?: number;
  items: OrderItem[];
}

export interface Payment {
  method: PaymentMethod;
  amount: number;
}

export interface Bill {
  id: string;
  orderId: string;
  tableId: string;
  captainId: string;
  customerId: string | null;
  subtotal: number;
  discountType: 'percentage' | 'fixed' | null;
  discountValue: number;
  discountAmount: number;
  discountReason: string;
  cgst: number;
  sgst: number;
  totalTax: number;
  total: number;
  payments: Payment[];
  status: BillStatus;
  createdAt: string;
}

export interface RfidLoadEntry {
  amount: number;
  mode: string;
  date: string;
  balance: number;
}

export interface RfidCard {
  id: string;
  cardNo: string;
  customerId: string | null;
  customerName?: string | null;
  balance: number;
  status: RfidStatus;
  loadHistory: RfidLoadEntry[];
}

export interface Due {
  id: string;
  customerId: string;
  orderId: string;
  amount: number;
  dueDate: string;
  daysPending: number;
  settled: boolean;
  notes: string;
}

export interface KitchenStation {
  id: string;
  name: string;
  printer: string;
  categories: string[];
}

export interface Settings {
  maxDiscountPct: number;
  discountThreshold: number;
  discountReasons: string[];
  taxMode: 'exclusive' | 'inclusive';
  approvalMode: string;
  kitchenStations: KitchenStation[];
}

export interface SalesSummaryEntry {
  revenue: number;
  orders: number;
  avgOrderValue: number;
  customers: number;
}

export interface DailySale {
  date: string;
  revenue: number;
  orders: number;
}

export interface TopItem {
  name: string;
  qty: number;
  revenue: number;
}

export interface CaptainPerformance {
  captainId: string;
  name: string;
  orders: number;
  revenue: number;
  avgValue: number;
}

export interface RevenueLeakage {
  type: string;
  date: string;
  orderId: string;
  tableId: string;
  captain: string;
  amount: number;
  reason: string;
}

export interface AppState {
  orders: Order[];
  zones: Zone[];
  tables: Table[];
  customers: Customer[];
  menuItems: MenuItem[];
  categories: Category[];
  staff: Staff[];
  rfidCards: RfidCard[];
  dues: Due[];
  bills: Bill[];
  settings: Settings;
}

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
}

export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  Admin:   ['dashboard','zones','customers','category','menu','tables','orders','kitchen-kot-view','kitchen-station','staff','billing','rfid','reports','admin'],
  Manager: ['dashboard','customers','category','tables','orders','kitchen-kot-view','kitchen-station','billing','reports','admin'],
  Captain: ['dashboard','tables','orders','kitchen-kot-view'],
  Cashier: ['dashboard','billing','rfid','customers'],
  Kitchen: ['dashboard','orders','kitchen-kot-view','kitchen-station'],
};
