// ============================================================
// MOCK DATA — Restaurant Management Software PoC
// Restaurant: Spice Garden — Fine Dining & Casual
// ============================================================

const DB = {
  restaurant: {
    name: "Spice Garden",
    tagline: "Fine Dining & Casual",
    address: "42, MG Road, Koramangala, Bengaluru – 560095",
    phone: "+91 80 4123 5678",
    gstin: "29AABCU9603R1ZX",
    email: "manager@spicegarden.in"
  },

  // ─── STAFF ────────────────────────────────────────────────
  staff: [
    { id: "EMP001", name: "Rahul Sharma", role: "Admin", username: "admin", password: "admin123", phone: "9812345678", email: "rahul@spicegarden.in", doj: "2020-01-15", status: "Active", photo: null, address: "HSR Layout, Bengaluru" },
    { id: "EMP002", name: "Priya Menon", role: "Manager", username: "manager", password: "manager123", phone: "9876543210", email: "priya@spicegarden.in", doj: "2021-03-20", status: "Active", photo: null, address: "Indiranagar, Bengaluru" },
    { id: "EMP003", name: "Arjun Das", role: "Captain", username: "captain1", password: "cap123", phone: "9123456780", email: "arjun@spicegarden.in", doj: "2022-06-01", status: "Active", photo: null, address: "Jayanagar, Bengaluru" },
    { id: "EMP004", name: "Kavya Nair", role: "Captain", username: "captain2", password: "cap456", phone: "9234567890", email: "kavya@spicegarden.in", doj: "2022-09-15", status: "Active", photo: null, address: "Whitefield, Bengaluru" },
    { id: "EMP005", name: "Rohit Verma", role: "Cashier", username: "cashier", password: "cash123", phone: "9345678901", email: "rohit@spicegarden.in", doj: "2021-11-10", status: "Active", photo: null, address: "BTM Layout, Bengaluru" },
    { id: "EMP006", name: "Sanjay Kumar", role: "Kitchen", username: "kitchen", password: "kitchen123", phone: "9456789012", email: "sanjay@spicegarden.in", doj: "2023-01-05", status: "Active", photo: null, address: "RT Nagar, Bengaluru" },
    { id: "EMP007", name: "Meera Pillai", role: "Captain", username: "captain3", password: "cap789", phone: "9567890123", email: "meera@spicegarden.in", doj: "2023-04-18", status: "Inactive", photo: null, address: "Marathahalli, Bengaluru" },
  ],

  // ─── CATEGORIES ──────────────────────────────────────────
  categories: [
    { id: "CAT001", name: "Appetizers", description: "Starters and small plates", icon: "🥗", order: 1, active: true, gstRate: 5 },
    { id: "CAT002", name: "Main Course", description: "Full meals and curries", icon: "🍛", order: 2, active: true, gstRate: 5 },
    { id: "CAT003", name: "Breads", description: "Tandoor specialties", icon: "🫓", order: 3, active: true, gstRate: 5 },
    { id: "CAT004", name: "Beverages", description: "Hot and cold drinks", icon: "🥤", order: 4, active: true, gstRate: 12 },
    { id: "CAT005", name: "Desserts", description: "Sweet endings", icon: "🍮", order: 5, active: true, gstRate: 5 },
    { id: "CAT006", name: "Soups", description: "Hearty soups and broths", icon: "🍲", order: 6, active: true, gstRate: 5 },
  ],

  // ─── MENU ITEMS ──────────────────────────────────────────
  menuItems: [
    { id: "ITEM001", name: "Paneer Tikka", sku: "APP-001", categoryId: "CAT001", description: "Cottage cheese marinated in spiced yogurt, grilled in tandoor", price: 280, prepTime: 15, veg: true, spiceLevel: "medium", chefSpecial: true, isNew: false, available: true, station: "Grill", variants: ["Regular", "Jumbo"] },
    { id: "ITEM002", name: "Chicken Seekh Kebab", sku: "APP-002", categoryId: "CAT001", description: "Minced chicken mixed with aromatic spices, cooked on skewers", price: 320, prepTime: 18, veg: false, spiceLevel: "hot", chefSpecial: false, isNew: false, available: true, station: "Grill", variants: ["Half", "Full"] },
    { id: "ITEM003", name: "Veg Spring Rolls", sku: "APP-003", categoryId: "CAT001", description: "Crispy rolls with fresh vegetable filling", price: 180, prepTime: 12, veg: true, spiceLevel: "mild", chefSpecial: false, isNew: true, available: true, station: "Fry", variants: ["4 pcs", "8 pcs"] },
    { id: "ITEM004", name: "Prawn Koliwada", sku: "APP-004", categoryId: "CAT001", description: "Juicy prawns in spiced Maharashtra-style batter", price: 420, prepTime: 20, veg: false, spiceLevel: "extra-hot", chefSpecial: true, isNew: false, available: false, station: "Fry", variants: ["Regular", "Large"] },
    { id: "ITEM005", name: "Dal Makhani", sku: "MC-001", categoryId: "CAT002", description: "Slow-cooked black lentils in rich tomato-butter gravy", price: 260, prepTime: 25, veg: true, spiceLevel: "mild", chefSpecial: true, isNew: false, available: true, station: "Main", variants: ["Regular", "Large"] },
    { id: "ITEM006", name: "Butter Chicken", sku: "MC-002", categoryId: "CAT002", description: "Tender chicken in velvety tomato-cream sauce", price: 340, prepTime: 20, veg: false, spiceLevel: "mild", chefSpecial: false, isNew: false, available: true, station: "Main", variants: ["Half", "Full"] },
    { id: "ITEM007", name: "Mutton Rogan Josh", sku: "MC-003", categoryId: "CAT002", description: "Kashmiri style slow-cooked tender mutton", price: 420, prepTime: 30, veg: false, spiceLevel: "hot", chefSpecial: true, isNew: false, available: true, station: "Main", variants: ["Regular"] },
    { id: "ITEM008", name: "Palak Paneer", sku: "MC-004", categoryId: "CAT002", description: "Cottage cheese cubes in creamy spinach gravy", price: 280, prepTime: 18, veg: true, spiceLevel: "mild", chefSpecial: false, isNew: false, available: true, station: "Main", variants: ["Regular", "Large"] },
    { id: "ITEM009", name: "Chicken Biryani", sku: "MC-005", categoryId: "CAT002", description: "Aromatic basmati rice with spiced chicken, dum cooked", price: 380, prepTime: 35, veg: false, spiceLevel: "medium", chefSpecial: true, isNew: false, available: true, station: "Biryani", variants: ["Half", "Full", "Jumbo"] },
    { id: "ITEM010", name: "Naan", sku: "BR-001", categoryId: "CAT003", description: "Soft leavened bread baked in tandoor", price: 50, prepTime: 8, veg: true, spiceLevel: null, chefSpecial: false, isNew: false, available: true, station: "Tandoor", variants: ["Plain", "Butter", "Garlic", "Cheese"] },
    { id: "ITEM011", name: "Roti", sku: "BR-002", categoryId: "CAT003", description: "Whole wheat flatbread, freshly made", price: 30, prepTime: 6, veg: true, spiceLevel: null, chefSpecial: false, isNew: false, available: true, station: "Tandoor", variants: ["Plain", "Butter"] },
    { id: "ITEM012", name: "Paratha", sku: "BR-003", categoryId: "CAT003", description: "Layered whole wheat bread", price: 60, prepTime: 8, veg: true, spiceLevel: null, chefSpecial: false, isNew: false, available: true, station: "Tandoor", variants: ["Aloo", "Paneer", "Plain"] },
    { id: "ITEM013", name: "Mango Lassi", sku: "BEV-001", categoryId: "CAT004", description: "Chilled yogurt drink with fresh Alphonso mango", price: 120, prepTime: 5, veg: true, spiceLevel: null, chefSpecial: false, isNew: false, available: true, station: "Beverages", variants: ["Regular", "Large"] },
    { id: "ITEM014", name: "Masala Chai", sku: "BEV-002", categoryId: "CAT004", description: "Classic spiced Indian tea", price: 60, prepTime: 5, veg: true, spiceLevel: null, chefSpecial: false, isNew: false, available: true, station: "Beverages", variants: ["Half Cup", "Full Cup"] },
    { id: "ITEM015", name: "Cold Coffee", sku: "BEV-003", categoryId: "CAT004", description: "Blended cold coffee with milk and ice cream", price: 150, prepTime: 7, veg: true, spiceLevel: null, chefSpecial: false, isNew: true, available: true, station: "Beverages", variants: ["Regular", "Large"] },
    { id: "ITEM016", name: "Gulab Jamun", sku: "DES-001", categoryId: "CAT005", description: "Soft milk-solid balls soaked in sugar syrup", price: 100, prepTime: 5, veg: true, spiceLevel: null, chefSpecial: false, isNew: false, available: true, station: "Desserts", variants: ["2 pcs", "4 pcs"] },
    { id: "ITEM017", name: "Rasmalai", sku: "DES-002", categoryId: "CAT005", description: "Soft cottage cheese dumplings in saffron milk", price: 140, prepTime: 5, veg: true, spiceLevel: null, chefSpecial: true, isNew: false, available: true, station: "Desserts", variants: ["2 pcs", "4 pcs"] },
    { id: "ITEM018", name: "Tomato Soup", sku: "SOP-001", categoryId: "CAT006", description: "Freshly made creamy tomato soup", price: 120, prepTime: 10, veg: true, spiceLevel: "mild", chefSpecial: false, isNew: false, available: true, station: "Main", variants: ["Regular", "Large"] },
    { id: "ITEM019", name: "Hot & Sour Soup", sku: "SOP-002", categoryId: "CAT006", description: "Indo-Chinese style spiced soup with vegetables", price: 140, prepTime: 12, veg: true, spiceLevel: "hot", chefSpecial: false, isNew: false, available: true, station: "Main", variants: ["Veg", "Chicken"] },
  ],

  // ─── TABLES ──────────────────────────────────────────────
  tables: [
    { id: "T01", name: "T-01", capacity: 2, zone: "Indoor", shape: "round", status: "Available", notes: "Near window", mergedWith: null },
    { id: "T02", name: "T-02", capacity: 4, zone: "Indoor", shape: "square", status: "Occupied", notes: "", mergedWith: null },
    { id: "T03", name: "T-03", capacity: 4, zone: "Indoor", shape: "square", status: "Available", notes: "AC area", mergedWith: null },
    { id: "T04", name: "T-04", capacity: 6, zone: "Indoor", shape: "rectangle", status: "Reserved", notes: "Birthday booking - 7PM", mergedWith: null },
    { id: "T05", name: "T-05", capacity: 6, zone: "Indoor", shape: "rectangle", status: "Occupied", notes: "", mergedWith: null },
    { id: "T06", name: "T-06", capacity: 4, zone: "Outdoor", shape: "square", status: "Available", notes: "Garden facing", mergedWith: null },
    { id: "T07", name: "T-07", capacity: 4, zone: "Outdoor", shape: "square", status: "Occupied", notes: "", mergedWith: null },
    { id: "T08", name: "T-08", capacity: 8, zone: "Outdoor", shape: "rectangle", status: "Cleaning", notes: "Under maintenance", mergedWith: null },
    { id: "T09", name: "T-09", capacity: 10, zone: "Private Room", shape: "rectangle", status: "Reserved", notes: "Corporate lunch", mergedWith: null },
    { id: "T10", name: "T-10", capacity: 4, zone: "Indoor", shape: "square", status: "Available", notes: "", mergedWith: null },
    { id: "T11", name: "T-11", capacity: 2, zone: "Indoor", shape: "round", status: "Available", notes: "Near bar", mergedWith: null },
    { id: "T12", name: "T-12", capacity: 6, zone: "Private Room", shape: "rectangle", status: "Available", notes: "", mergedWith: null },
  ],

  // ─── CUSTOMERS ───────────────────────────────────────────
  customers: [
    { id: "CUST001", name: "Vikram Anand", phone: "9811223344", email: "vikram.anand@email.com", address: "Koramangala, Bengaluru", dob: "1985-07-12", notes: "Prefers window seat, no garlic", type: "VIP", regDate: "2023-01-20", active: true },
    { id: "CUST002", name: "Sunita Rao", phone: "9822334455", email: "sunita.rao@gmail.com", address: "Indiranagar, Bengaluru", dob: "1990-03-25", notes: "Vegan, allergy to nuts", type: "Regular", regDate: "2023-04-15", active: true },
    { id: "CUST003", name: "Ramesh Patil", phone: "9833445566", email: "", address: "Whitefield, Bengaluru", dob: "", notes: "Prefers less spicy food", type: "Regular", regDate: "2023-06-08", active: true },
    { id: "CUST004", name: "Neha Joshi", phone: "9844556677", email: "neha.j@corpmail.com", address: "HSR Layout, Bengaluru", dob: "1992-11-30", notes: "Corporate client - requires GST invoice", type: "VIP", regDate: "2022-11-01", active: true },
    { id: "CUST005", name: "Arun Krishnan", phone: "9855667788", email: "arun.k@gmail.com", address: "Jayanagar, Bengaluru", dob: "1978-05-18", notes: "", type: "Regular", regDate: "2024-01-10", active: true },
    { id: "CUST006", name: "Lakshmi Devi", phone: "9866778899", email: "lakshmi@yahoo.com", address: "Malleswaram, Bengaluru", dob: "1965-09-05", notes: "Senior citizen - 10% discount", type: "Regular", regDate: "2023-08-22", active: true },
    { id: "CUST007", name: "Manish Gupta", phone: "9877889900", email: "manish.g@startupmail.com", address: "BTM Layout, Bengaluru", dob: "1988-02-14", notes: "Frequent visitor – Friday evenings", type: "VIP", regDate: "2022-06-15", active: true },
    { id: "CUST008", name: "Deepa Suresh", phone: "9888990011", email: "deepa.s@personalmail.in", address: "Banashankari, Bengaluru", dob: "1995-12-20", notes: "", type: "New", regDate: "2026-03-30", active: true },
  ],

  // ─── ORDERS ──────────────────────────────────────────────
  orders: [
    {
      id: "ORD-2026-0421", tableId: "T02", captainId: "EMP003", customerId: "CUST001",
      status: "Preparing", createdAt: "2026-04-17T15:30:00", updatedAt: "2026-04-17T15:35:00",
      items: [
        { itemId: "ITEM001", name: "Paneer Tikka", variant: "Regular", qty: 2, price: 280, instructions: "Less spicy", status: "Preparing" },
        { itemId: "ITEM010", name: "Naan", variant: "Butter", qty: 4, price: 50, instructions: "", status: "Preparing" },
        { itemId: "ITEM005", name: "Dal Makhani", variant: "Regular", qty: 1, price: 260, instructions: "Extra butter", status: "Pending" },
        { itemId: "ITEM013", name: "Mango Lassi", variant: "Large", qty: 2, price: 120, instructions: "", status: "Ready" },
      ]
    },
    {
      id: "ORD-2026-0420", tableId: "T05", captainId: "EMP004", customerId: "CUST004",
      status: "Served", createdAt: "2026-04-17T14:00:00", updatedAt: "2026-04-17T14:45:00",
      items: [
        { itemId: "ITEM009", name: "Chicken Biryani", variant: "Full", qty: 2, price: 380, instructions: "Extra raita", status: "Served" },
        { itemId: "ITEM002", name: "Chicken Seekh Kebab", variant: "Full", qty: 1, price: 320, instructions: "", status: "Served" },
        { itemId: "ITEM015", name: "Cold Coffee", variant: "Large", qty: 2, price: 150, instructions: "Extra ice", status: "Served" },
      ]
    },
    {
      id: "ORD-2026-0419", tableId: "T07", captainId: "EMP003", customerId: null,
      status: "Pending", createdAt: "2026-04-17T16:10:00", updatedAt: "2026-04-17T16:10:00",
      items: [
        { itemId: "ITEM018", name: "Tomato Soup", variant: "Regular", qty: 2, price: 120, instructions: "", status: "Pending" },
        { itemId: "ITEM006", name: "Butter Chicken", variant: "Full", qty: 1, price: 340, instructions: "No cream", status: "Pending" },
        { itemId: "ITEM010", name: "Naan", variant: "Garlic", qty: 3, price: 50, instructions: "", status: "Pending" },
      ]
    },
    {
      id: "ORD-2026-0418", tableId: "T02", captainId: "EMP003", customerId: "CUST002",
      status: "Completed", createdAt: "2026-04-17T13:00:00", updatedAt: "2026-04-17T13:50:00",
      items: [
        { itemId: "ITEM005", name: "Dal Makhani", variant: "Large", qty: 1, price: 260, instructions: "", status: "Served" },
        { itemId: "ITEM008", name: "Palak Paneer", variant: "Regular", qty: 1, price: 280, instructions: "No onion", status: "Served" },
        { itemId: "ITEM011", name: "Roti", variant: "Plain", qty: 4, price: 30, instructions: "", status: "Served" },
        { itemId: "ITEM016", name: "Gulab Jamun", variant: "4 pcs", qty: 1, price: 100, instructions: "", status: "Served" },
      ]
    },
    {
      id: "ORD-2026-0417", tableId: "T09", captainId: "EMP004", customerId: "CUST007",
      status: "Completed", createdAt: "2026-04-17T12:00:00", updatedAt: "2026-04-17T13:30:00",
      items: [
        { itemId: "ITEM007", name: "Mutton Rogan Josh", variant: "Regular", qty: 3, price: 420, instructions: "", status: "Served" },
        { itemId: "ITEM009", name: "Chicken Biryani", variant: "Jumbo", qty: 2, price: 380, instructions: "", status: "Served" },
        { itemId: "ITEM010", name: "Naan", variant: "Cheese", qty: 6, price: 50, instructions: "", status: "Served" },
        { itemId: "ITEM017", name: "Rasmalai", variant: "4 pcs", qty: 2, price: 140, instructions: "", status: "Served" },
        { itemId: "ITEM013", name: "Mango Lassi", variant: "Large", qty: 3, price: 120, instructions: "", status: "Served" },
      ]
    },
  ],

  // ─── BILLS ───────────────────────────────────────────────
  bills: [
    {
      id: "BILL-2026-0181", orderId: "ORD-2026-0418", tableId: "T02",
      captainId: "EMP003", customerId: "CUST002",
      subtotal: 790, discountType: "percentage", discountValue: 10, discountAmount: 79, discountReason: "Regular customer",
      cgst: 19.75, sgst: 19.75, totalTax: 39.50, total: 750.5,
      payments: [{ method: "Online", amount: 750.5 }],
      status: "Paid", createdAt: "2026-04-17T13:50:00",
    },
    {
      id: "BILL-2026-0180", orderId: "ORD-2026-0417", tableId: "T09",
      captainId: "EMP004", customerId: "CUST007",
      subtotal: 3380, discountType: "fixed", discountValue: 200, discountAmount: 200, discountReason: "VIP customer",
      cgst: 79.5, sgst: 79.5, totalTax: 159, total: 3339,
      payments: [{ method: "RFID", amount: 2000 }, { method: "Online", amount: 1339 }],
      status: "Paid", createdAt: "2026-04-17T13:30:00",
    },
    {
      id: "BILL-2026-0179", orderId: "ORD-2026-0416", tableId: "T04",
      captainId: "EMP003", customerId: "CUST004",
      subtotal: 1540, discountType: null, discountValue: 0, discountAmount: 0, discountReason: "",
      cgst: 38.5, sgst: 38.5, totalTax: 77, total: 1617,
      payments: [{ method: "Cash", amount: 617 }, { method: "Online", amount: 1000 }],
      status: "Paid", createdAt: "2026-04-16T20:30:00",
    },
  ],

  // ─── RFID CARDS ──────────────────────────────────────────
  rfidCards: [
    { id: "RFID-001", cardNo: "4A:2B:9C:7D", customerId: "CUST001", balance: 1850, status: "Active", loadHistory: [{ amount: 2000, mode: "Cash", date: "2026-04-10", balance: 2000 }, { amount: 150, mode: "Deduction", date: "2026-04-15", balance: 1850 }] },
    { id: "RFID-002", cardNo: "8F:3C:1A:5E", customerId: "CUST007", balance: 0, status: "Available", loadHistory: [{ amount: 3500, mode: "Online", date: "2026-04-05", balance: 3500 }, { amount: 3500, mode: "Deduction", date: "2026-04-14", balance: 0 }] },
    { id: "RFID-003", cardNo: "2D:7G:4B:8F", customerId: null, balance: 0, status: "Available", loadHistory: [] },
    { id: "RFID-004", cardNo: "6E:1A:3C:9B", customerId: "CUST004", balance: 5000, status: "Active", loadHistory: [{ amount: 5000, mode: "Online", date: "2026-04-12", balance: 5000 }] },
    { id: "RFID-005", cardNo: "3B:5D:8G:2A", customerId: null, balance: 0, status: "Blocked", loadHistory: [] },
    { id: "RFID-006", cardNo: "7C:2E:5A:1D", customerId: null, balance: 0, status: "Available", loadHistory: [] },
  ],

  // ─── DUES ────────────────────────────────────────────────
  dues: [
    { id: "DUE-001", customerId: "CUST003", orderId: "ORD-2026-0415", amount: 780, dueDate: "2026-04-20", daysPending: 5, settled: false, notes: "Customer promised to pay on Friday" },
    { id: "DUE-002", customerId: "CUST005", orderId: "ORD-2026-0410", amount: 1200, dueDate: "2026-04-14", daysPending: 12, settled: false, notes: "Repeated follow-ups" },
    { id: "DUE-003", customerId: "CUST006", orderId: "ORD-2026-0401", amount: 450, dueDate: "2026-04-25", daysPending: 2, settled: false, notes: "" },
  ],

  // ─── REPORTS SUMMARY ─────────────────────────────────────
  salesSummary: {
    today: { revenue: 48750, orders: 34, avgOrderValue: 1434, customers: 89 },
    thisWeek: { revenue: 285400, orders: 198, avgOrderValue: 1441, customers: 512 },
    thisMonth: { revenue: 1124800, orders: 789, avgOrderValue: 1425, customers: 2034 },
  },

  dailySales: [
    { date: "Apr 11", revenue: 38500, orders: 28 },
    { date: "Apr 12", revenue: 42100, orders: 31 },
    { date: "Apr 13", revenue: 52300, orders: 38 },
    { date: "Apr 14", revenue: 61200, orders: 46 },
    { date: "Apr 15", revenue: 48800, orders: 35 },
    { date: "Apr 16", revenue: 44500, orders: 32 },
    { date: "Apr 17", revenue: 48750, orders: 34 },
  ],

  topItems: [
    { name: "Chicken Biryani", qty: 145, revenue: 55100 },
    { name: "Butter Chicken", qty: 132, revenue: 44880 },
    { name: "Dal Makhani", qty: 118, revenue: 30680 },
    { name: "Paneer Tikka", qty: 98, revenue: 27440 },
    { name: "Naan (Butter)", qty: 312, revenue: 15600 },
    { name: "Mango Lassi", qty: 87, revenue: 10440 },
  ],

  captainPerformance: [
    { captainId: "EMP003", name: "Arjun Das", orders: 78, revenue: 98400, avgValue: 1262 },
    { captainId: "EMP004", name: "Kavya Nair", orders: 65, revenue: 87200, avgValue: 1341 },
  ],

  revenuLeakage: [
    { type: "Order Cancellation", date: "2026-04-17T14:20:00", orderId: "ORD-2026-0412", tableId: "T03", captain: "Arjun Das", amount: 680, reason: "Customer left" },
    { type: "KOT Modification", date: "2026-04-17T12:15:00", orderId: "ORD-2026-0409", tableId: "T08", captain: "Kavya Nair", amount: 280, reason: "Item changed after KOT" },
    { type: "Order Modification", date: "2026-04-16T19:30:00", orderId: "ORD-2026-0398", tableId: "T05", captain: "Arjun Das", amount: 150, reason: "Item removed by customer" },
    { type: "Order Cancellation", date: "2026-04-16T13:10:00", orderId: "ORD-2026-0385", tableId: "T02", captain: "Kavya Nair", amount: 940, reason: "Wrong table order" },
  ],

  // ─── ADMIN SETTINGS ──────────────────────────────────────
  settings: {
    maxDiscountPct: 20,
    discountThreshold: 500,
    discountReasons: ["Regular customer", "VIP customer", "Birthday offer", "Corporate deal", "Staff meal", "Manager override"],
    taxMode: "exclusive",
    approvalMode: "email_otp",
    kitchenStations: [
      { id: "KS001", name: "Grill", printer: "KOT-Printer-1", categories: ["CAT001"] },
      { id: "KS002", name: "Main", printer: "KOT-Printer-2", categories: ["CAT002", "CAT006"] },
      { id: "KS003", name: "Tandoor", printer: "KOT-Printer-3", categories: ["CAT003"] },
      { id: "KS004", name: "Beverages", printer: "KOT-Printer-4", categories: ["CAT004"] },
      { id: "KS005", name: "Desserts", printer: "KOT-Printer-5", categories: ["CAT005"] },
    ]
  }
};

// Role permissions map
const ROLE_PERMISSIONS = {
  Admin: ["dashboard", "customers", "menu", "tables", "orders", "staff", "billing", "rfid", "reports", "admin"],
  Manager: ["dashboard", "customers", "tables", "orders", "billing", "reports", "admin"],
  Captain: ["dashboard", "tables", "orders"],
  Cashier: ["dashboard", "billing", "rfid", "customers"],
  Kitchen: ["dashboard", "orders"],
};
