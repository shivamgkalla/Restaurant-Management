# 🌿 Spice Garden — Restaurant Management System PoC

A fully navigable, browser-based proof-of-concept for a custom restaurant management software — built to replace PetPooja. Covers all 9 modules from the SRS with role-based access, realistic mock data, and a production-quality dark UI.

---

## 🚀 Getting Started

No build step, no server, no dependencies.

```bash
# Just open in your browser
open poc/index.html
```

Or navigate to the file directly:
```
file:///Users/kiki/Office_Work_Stuff/restaurant_management/poc/index.html
```

---

## 🔐 Demo Credentials

| Role | Username | Password | Access |
|------|----------|----------|--------|
| **Admin** | `admin` | `admin123` | All 9 modules |
| **Manager** | `manager` | `manager123` | Orders, Tables, Billing, Reports, Admin |
| **Captain** | `captain1` | `cap123` | Tables, Orders |
| **Captain 2** | `captain2` | `cap456` | Tables, Orders |
| **Cashier** | `cashier` | `cash123` | Billing, RFID, Customers |
| **Kitchen** | `kitchen` | `kitchen123` | Orders (KOT view) |

Quick-login buttons are available on the login screen for each role.

---

## 📦 Modules Covered

All 9 modules from the Feature Documentation SRS are implemented end-to-end.

### 1. 👥 Customer Management
- Customer directory with search by name, phone, or customer ID
- Add new customers with all SRS fields (name, phone, email, DOB, address, notes, type)
- Customer profile detail — order history, lifetime spend, visit count
- Customer type classification: VIP / Regular / New
- Outstanding dues tracking with aging (days pending), due date, settlement
- Customer analytics: top spenders, type breakdown, retention metrics

### 2. 🍽️ Menu Management
- Menu item grid grouped by category with veg/non-veg indicators
- Chef's special ⭐ and New ✨ item badges
- Full item CRUD: name, SKU, price, description, prep time, spice level, variants, kitchen station
- Item availability toggle (Available / Out of Stock) — real-time across the UI
- Category management: add/edit, GST rate per category, activate/deactivate
- Search and filter by category and availability

### 3. 🪑 Table Management
- Visual floor plan with colour-coded status cards (green/red/amber/grey)
- Filter by zone (Indoor, Outdoor, Private Room) and status
- Table detail modal: current order summary, status override
- Merge tables for large groups
- Transfer orders between tables with reason capture
- Add new tables with zone, capacity, shape, and notes

### 4. 📋 Order Management
- Active / Completed order tabs with live badge count in sidebar
- New Order modal: table selection, optional customer link, menu browse by category, search, cart with qty controls
- KOT (Kitchen Order Ticket) modal with print action and item-level status
- Modify existing orders with leakage logging
- Mark order as Served → triggers Settle Bill flow
- Admin-only order cancellation with Revenue Leakage logging

### 5. 👤 Staff Management
- Full staff directory with role-colour-coded badges
- Add staff: name, employee ID, phone, email, role, joining date, username, password, address
- Edit staff details and change role
- Activate / Deactivate staff (soft, not deleted — maintains audit trail)
- Shows username for each staff member (for login reference)

### 6. 🧾 Billing & Settlement
- Order-to-bill conversion pulled by table
- Live CGST + SGST calculation per category GST rate
- Discount: percentage or fixed amount with reason dropdown and approval threshold
- Split payment across: Cash, Online, RFID, Due (Credit), Complimentary
- Bill preview (thermal-receipt style) with GSTIN, itemised list, tax breakdown
- Bill history with payment method breakdown and reprint/view option

### 7. 💳 RFID Card System
- Card inventory with status (Active / Available / Blocked)
- Bind card to customer + initial balance load
- Scan & Pay: manual card number entry to retrieve balance and customer info
- Visual credit-card UI showing card number and available balance
- Load / Reload balance with payment mode (Cash or Online)
- Deduct payment with order reference and balance validation
- Block / Unblock cards
- Clear and release card back to available pool
- Full transaction history per card

### 8. 📈 MIS Reports & Analytics
- Switchable period: Today / This Week / This Month / Custom date range
- **Sales Report**: day-wise revenue bar chart, table with avg order value, peak hours analysis
- **Item-wise Sales**: quantity and revenue per item, popularity bar, top/bottom sellers
- **Captain Performance**: orders handled, revenue generated, avg order value, ranking
- **Customer Report**: top customers by spend, new vs returning breakdown, dues summary
- **Revenue Leakage**: KOT modifications, order changes, cancellations — with amount and captain attribution
- Export buttons: PDF, CSV, Print

### 9. ⚙️ Admin Controls
- **Role Permissions Matrix**: visual module-by-module access grid for all 5 roles
- **Discount Configuration**: max discount %, approval threshold, approval mode (Email OTP / Manager PIN), configurable reason list
- **GST & Tax**: tax mode (exclusive/inclusive), CGST+SGST or IGST toggle, per-category GST rate override
- **Kitchen Stations**: station-to-printer mapping, category routing, test print per station
- **Order Deletion**: soft vs hard delete toggle, role restriction, admin delete with leakage logging

---

## 🗂️ Project Structure

```
poc/
├── index.html          # App shell — login screen + sidebar + topbar + router mount point
├── css/
│   └── main.css        # Full design system: tokens, layout, components, animations
└── js/
    ├── data.js         # All mock data — staff, menu, tables, orders, customers, RFID, reports
    └── app.js          # Router, auth, state, and all 9 module page renderers
```

---

## 🎨 Design System

- **Theme**: Dark mode (`#0b0d14` background) with gold accent (`#f5a623`)
- **Font**: Inter (Google Fonts)
- **Status colours**: Green (Available), Red (Occupied), Amber (Reserved/Pending), Blue (Preparing), Indigo (Served)
- **Components**: Glassmorphism cards, pill badges, data tables, modals with backdrop blur, CSS bar charts, animated RFID card UI
- **Animations**: fade-slide-up on page navigation, pulse on occupied table status dots, hover lifts on all cards

---

## ⚙️ Technical Constraints (by design)

| Constraint | Detail |
|------------|--------|
| **Frontend only** | No backend, no API calls, no database |
| **All data hardcoded** | Realistic mock data in `js/data.js` |
| **State management** | Client-side only via `appState` object |
| **No build tooling** | Plain HTML + CSS + Vanilla JS — opens directly in browser |
| **No frameworks** | No React, Vue, or Tailwind — zero dependencies |

---

## 🏢 About This PoC

**Restaurant:** Spice Garden, Fine Dining & Casual — Koramangala, Bengaluru  
**Purpose:** Client pitch proof-of-concept to replace PetPooja  
**SRS version:** 1.1 (April 15, 2026) — prepared by Microlent Team  
**Approach:** Live browser demo on client call, fully navigable by any stakeholder independently
