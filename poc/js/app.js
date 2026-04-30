// ============================================================
// APP.JS — Router, Auth, State, and Page Orchestration
// ============================================================

let currentUser = null;
let appState = {
  route: 'dashboard',
  orders: JSON.parse(JSON.stringify(DB.orders)),
  tables: JSON.parse(JSON.stringify(DB.tables)),
  customers: JSON.parse(JSON.stringify(DB.customers)),
  menuItems: JSON.parse(JSON.stringify(DB.menuItems)),
  categories: JSON.parse(JSON.stringify(DB.categories)),
  staff: JSON.parse(JSON.stringify(DB.staff)),
  rfidCards: JSON.parse(JSON.stringify(DB.rfidCards)),
  dues: JSON.parse(JSON.stringify(DB.dues)),
  bills: JSON.parse(JSON.stringify(DB.bills)),
  settings: JSON.parse(JSON.stringify(DB.settings)),
  activeOrderDraft: null,  // current draft for new order
  billDraft: null,         // current bill being settled
};

// ── Utility helpers ──────────────────────────────────────────
function fmt(n) { return '₹' + parseFloat(n).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
function fmtNum(n) { return parseFloat(n).toLocaleString('en-IN'); }
function fmtDate(d) { return new Date(d).toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'numeric' }); }
function fmtTime(d) { return new Date(d).toLocaleTimeString('en-IN', { hour:'2-digit', minute:'2-digit' }); }
function fmtDateTime(d) { return fmtDate(d) + ', ' + fmtTime(d); }
function genId(prefix) { return prefix + '-' + Date.now().toString(36).toUpperCase(); }
function debounce(fn, ms) { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); }; }

// ── Toast ────────────────────────────────────────────────────
function toast(msg, type='success', duration=3000) {
  const icons = { success:'✅', error:'❌', warning:'⚠️', info:'ℹ️' };
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  t.innerHTML = `<span>${icons[type]}</span><span>${msg}</span>`;
  document.getElementById('toast-container').appendChild(t);
  setTimeout(() => { t.style.opacity='0'; t.style.transform='translateX(100%)'; t.style.transition='all 0.3s'; setTimeout(()=>t.remove(), 300); }, duration);
}

// ── Auth ─────────────────────────────────────────────────────
function login(username, password) {
  const user = appState.staff.find(s => s.username === username && s.password === password && s.status === 'Active');
  if (!user) return false;
  currentUser = user;
  document.getElementById('login-screen').style.display = 'none';
  document.getElementById('app').classList.add('logged-in');
  renderSidebar();
  navigate('dashboard');
  return true;
}

function logout() {
  currentUser = null;
  document.getElementById('login-screen').style.display = 'flex';
  document.getElementById('app').classList.remove('logged-in');
}

function canAccess(module) {
  if (!currentUser) return false;
  const perms = ROLE_PERMISSIONS[currentUser.role] || [];
  return perms.includes(module);
}

// ── Sidebar ──────────────────────────────────────────────────
const ALL_NAV = [
  { id:'dashboard',  icon:'📊', label:'Dashboard',           section:'MAIN' },
  { id:'tables',     icon:'🪑', label:'Table Management',    section:'OPERATIONS' },
  { id:'orders',     icon:'📋', label:'Order Management',    section:'OPERATIONS' },
  { id:'billing',    icon:'🧾', label:'Billing & Settlement',section:'OPERATIONS' },
  { id:'rfid',       icon:'💳', label:'RFID Card System',    section:'OPERATIONS' },
  { id:'customers',  icon:'👥', label:'Customer Management', section:'MANAGEMENT' },
  { id:'menu',       icon:'🍽️', label:'Menu Management',     section:'MANAGEMENT' },
  { id:'staff',      icon:'👤', label:'Staff Management',    section:'MANAGEMENT' },
  { id:'reports',    icon:'📈', label:'MIS Reports',         section:'ANALYTICS' },
  { id:'admin',      icon:'⚙️', label:'Admin Controls',      section:'SETTINGS' },
];

function renderSidebar() {
  const nav = document.getElementById('sidebar-nav');
  const footer = document.getElementById('sidebar-footer');
  let lastSection = null;
  let html = '';
  ALL_NAV.forEach(item => {
    if (!canAccess(item.id)) return;
    if (item.section !== lastSection) {
      html += `<div class="nav-section-label">${item.section}</div>`;
      lastSection = item.section;
    }
    const activeOrders = appState.orders.filter(o => ['Pending','Preparing','Served'].includes(o.status)).length;
    const badge = item.id === 'orders' && activeOrders > 0 ? `<span class="nav-badge">${activeOrders}</span>` : '';
    html += `<div class="nav-item" id="nav-${item.id}" onclick="navigate('${item.id}')">
      <span class="nav-icon">${item.icon}</span>
      <span>${item.label}</span>
      ${badge}
    </div>`;
  });
  nav.innerHTML = html;

  const initials = currentUser.name.split(' ').map(n=>n[0]).join('').slice(0,2);
  footer.innerHTML = `
    <div class="user-info">
      <div class="user-avatar">${initials}</div>
      <div>
        <div class="user-name">${currentUser.name}</div>
        <span class="user-role">${currentUser.role}</span>
      </div>
    </div>
    <button class="btn btn-secondary btn-full btn-sm" onclick="logout()">🚪 Sign Out</button>
  `;
}

// ── Router ───────────────────────────────────────────────────
function navigate(route, params={}) {
  if (!canAccess(route)) { toast('Access denied for your role', 'error'); return; }
  appState.route = route;
  appState.routeParams = params;

  // Update nav active state
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
  const activeNav = document.getElementById(`nav-${route}`);
  if (activeNav) activeNav.classList.add('active');

  // Render page
  const content = document.getElementById('page-content');
  const topbar = document.getElementById('topbar-info');
  
  const pages = {
    dashboard: renderDashboard,
    tables: renderTables,
    orders: renderOrders,
    billing: renderBilling,
    rfid: renderRFID,
    customers: renderCustomers,
    menu: renderMenu,
    staff: renderStaff,
    reports: renderReports,
    admin: renderAdmin,
  };

  content.innerHTML = '';
  if (pages[route]) pages[route](content, params);
}

// ════════════════════════════════════════════════════════════
// PAGE: DASHBOARD
// ════════════════════════════════════════════════════════════
function renderDashboard(container) {
  const activeOrders = appState.orders.filter(o => ['Pending','Preparing','Served'].includes(o.status));
  const todaySales = DB.salesSummary.today;
  const availTables = appState.tables.filter(t => t.status === 'Available').length;
  const occupiedTables = appState.tables.filter(t => t.status === 'Occupied').length;

  container.innerHTML = `
    <div class="section-header">
      <div class="section-header-left">
        <h2>Good ${getGreeting()}, ${currentUser.name.split(' ')[0]}! 👋</h2>
        <p>Here's what's happening at Spice Garden today — ${fmtDate(new Date())}</p>
      </div>
    </div>

    <div class="stats-grid">
      <div class="stat-card" style="--stat-color: var(--accent-gold)">
        <span class="stat-icon">💰</span>
        <div class="stat-value">${fmt(todaySales.revenue)}</div>
        <div class="stat-label">Today's Revenue</div>
        <div class="stat-change up">↑ 9.4% vs yesterday</div>
      </div>
      <div class="stat-card" style="--stat-color: var(--accent-blue)">
        <span class="stat-icon">📋</span>
        <div class="stat-value">${todaySales.orders}</div>
        <div class="stat-label">Orders Today</div>
        <div class="stat-change up">↑ 6 from yesterday</div>
      </div>
      <div class="stat-card" style="--stat-color: var(--status-available)">
        <span class="stat-icon">🪑</span>
        <div class="stat-value">${availTables} / ${appState.tables.length}</div>
        <div class="stat-label">Tables Available</div>
        <div class="stat-change">${occupiedTables} occupied</div>
      </div>
      <div class="stat-card" style="--stat-color: var(--accent-purple)">
        <span class="stat-icon">👥</span>
        <div class="stat-value">${todaySales.customers}</div>
        <div class="stat-label">Guests Served</div>
        <div class="stat-change up">Avg. ${fmt(todaySales.avgOrderValue)}/order</div>
      </div>
    </div>

    <div class="grid-2" style="gap: 20px; margin-bottom: 24px;">
      <!-- Active Orders -->
      <div class="card">
        <div class="card-header">
          <span style="font-size:20px">📋</span>
          <div>
            <div class="card-title">Active Orders</div>
            <div class="card-subtitle">${activeOrders.length} orders in progress</div>
          </div>
          ${canAccess('orders') ? `<button class="btn btn-primary btn-sm" onclick="navigate('orders')" style="margin-left:auto">View All</button>` : ''}
        </div>
        ${activeOrders.length === 0 ? `<div class="empty-state"><div class="empty-icon">🎉</div><p>All orders fulfilled!</p></div>` :
          activeOrders.map(o => {
            const tbl = appState.tables.find(t => t.id === o.tableId);
            const captain = appState.staff.find(s => s.id === o.captainId);
            const total = o.items.reduce((sum,i) => sum + i.price*i.qty, 0);
            return `<div class="flex items-center gap-md" style="padding: 10px 0; border-bottom: 1px solid var(--border);">
              <div style="min-width:60px">
                <div class="font-bold">${tbl?.name || o.tableId}</div>
                <div class="text-muted" style="font-size:11px">${tbl?.zone || ''}</div>
              </div>
              <div style="flex:1">
                <div style="font-size:13px">${o.items.length} items</div>
                <div class="text-secondary" style="font-size:11px">${captain?.name || ''}</div>
              </div>
              <div style="text-align:right">
                <div class="font-bold text-gold">${fmt(total)}</div>
                <span class="badge badge-${o.status.toLowerCase()}">${o.status}</span>
              </div>
            </div>`;
          }).join('')
        }
      </div>

      <!-- Weekly Sales Chart -->
      <div class="card">
        <div class="card-header">
          <span style="font-size:20px">📈</span>
          <div>
            <div class="card-title">Weekly Revenue</div>
            <div class="card-subtitle">Last 7 days</div>
          </div>
        </div>
        ${renderBarChart(DB.dailySales)}
      </div>
    </div>

    <div class="grid-2" style="gap:20px;">
      <!-- Top Items -->
      <div class="card">
        <div class="card-header">
          <span style="font-size:20px">🏆</span>
          <div><div class="card-title">Top Selling Items</div><div class="card-subtitle">This week</div></div>
        </div>
        <table class="data-table">
          <thead><tr><th>#</th><th>Item</th><th>Qty</th><th>Revenue</th></tr></thead>
          <tbody>
            ${DB.topItems.map((item,i) => `
              <tr>
                <td class="text-muted font-mono">${i+1}</td>
                <td class="font-bold">${item.name}</td>
                <td>${fmtNum(item.qty)}</td>
                <td class="text-gold font-bold">${fmt(item.revenue)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <!-- Table Status Overview -->
      <div class="card">
        <div class="card-header">
          <span style="font-size:20px">🗺️</span>
          <div><div class="card-title">Floor Overview</div><div class="card-subtitle">Current table status</div></div>
          ${canAccess('tables') ? `<button class="btn btn-secondary btn-sm" onclick="navigate('tables')" style="margin-left:auto">Manage</button>` : ''}
        </div>
        <div style="display:grid; grid-template-columns: repeat(4, 1fr); gap:8px;">
          ${appState.tables.map(t => `
            <div class="table-card ${t.status.toLowerCase().replace('/',' ')}" onclick="${canAccess('tables') ? `navigate('tables')` : ''}">
              <div class="table-number">${t.name}</div>
              <div class="table-capacity">👥 ${t.capacity}</div>
              <div class="mt-sm"><span class="table-status-dot"></span><span style="font-size:10px;color:var(--text-secondary)">${t.status}</span></div>
            </div>
          `).join('')}
        </div>
        <div class="flex gap-md mt-md" style="flex-wrap:wrap">
          ${[['Available','available'],['Occupied','occupied'],['Reserved','reserved'],['Cleaning','cleaning']].map(([l,c]) =>
            `<span><span class="table-status-dot" style="background:var(--status-${c})"></span> <span style="font-size:12px">${l} (${appState.tables.filter(t=>t.status===l).length})</span></span>`
          ).join('')}
        </div>
      </div>
    </div>

    <!-- Customer Ordering Page Link -->
    <div class="card" style="margin-top:20px;background:linear-gradient(135deg,rgba(245,166,35,0.08),rgba(245,100,35,0.04));border-color:rgba(245,166,35,0.25)">
      <div style="display:flex;align-items:center;gap:20px;flex-wrap:wrap">
        <span style="font-size:40px">🛍️</span>
        <div style="flex:1">
          <div style="font-size:16px;font-weight:700;margin-bottom:4px">Customer Ordering Page</div>
          <div style="font-size:13px;color:var(--text-secondary)">Share this link with customers so they can browse the menu, add to cart, and place pickup orders online.</div>
        </div>
        <button class="btn btn-primary" onclick="showCustomerOrderView()" style="white-space:nowrap;flex-shrink:0">
          Open Ordering Page →
        </button>
      </div>
    </div>
  `;
}

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'morning';
  if (h < 17) return 'afternoon';
  return 'evening';
}

function renderBarChart(data) {
  const maxVal = Math.max(...data.map(d => d.revenue));
  return `<div class="bar-chart">
    ${data.map(d => {
      const pct = (d.revenue / maxVal) * 100;
      return `<div class="bar-col">
        <div style="flex:1; display:flex; align-items:flex-end; width:100%">
          <div class="bar" style="height:${pct}%"></div>
        </div>
        <div class="bar-label">${d.date}</div>
      </div>`;
    }).join('')}
  </div>`;
}

// ════════════════════════════════════════════════════════════
// PAGE: TABLE MANAGEMENT
// ════════════════════════════════════════════════════════════
function renderTables(container, params={}) {
  const zones = [...new Set(appState.tables.map(t => t.zone))];
  let filterZone = params.zone || 'All';
  let filterStatus = params.status || 'All';

  function render() {
    let filtered = appState.tables;
    if (filterZone !== 'All') filtered = filtered.filter(t => t.zone === filterZone);
    if (filterStatus !== 'All') filtered = filtered.filter(t => t.status === filterStatus);

    container.innerHTML = `
      <div class="section-header">
        <div class="section-header-left">
          <h2>Table Management</h2>
          <p>Visual floor plan with real-time status | ${appState.tables.filter(t=>t.status==='Occupied').length} occupied, ${appState.tables.filter(t=>t.status==='Available').length} available</p>
        </div>
        <div class="flex gap-sm">
          <button class="btn btn-secondary" onclick="showMergeModal()">🔗 Merge Tables</button>
          <button class="btn btn-primary" onclick="showAddTableModal()">+ Add Table</button>
        </div>
      </div>

      <!-- Zone Filters -->
      <div class="filter-bar">
        <span class="text-secondary" style="font-size:13px;font-weight:600">Zone:</span>
        ${['All', ...zones].map(z => `<span class="filter-chip ${filterZone===z?'active':''}" onclick="tableFilterZone('${z}')">${z}</span>`).join('')}
        <span class="divider" style="height:20px;width:1px;background:var(--border);margin:0 4px"></span>
        <span class="text-secondary" style="font-size:13px;font-weight:600">Status:</span>
        ${['All','Available','Occupied','Reserved','Cleaning'].map(s => `<span class="filter-chip ${filterStatus===s?'active':''}" onclick="tableFilterStatus('${s}')">${s}</span>`).join('')}
      </div>

      <!-- Summary Row -->
      <div class="stats-grid" style="grid-template-columns: repeat(4,1fr); margin-bottom:20px">
        ${[['Available','🟢',appState.tables.filter(t=>t.status==='Available').length],
           ['Occupied','🔴',appState.tables.filter(t=>t.status==='Occupied').length],
           ['Reserved','🟡',appState.tables.filter(t=>t.status==='Reserved').length],
           ['Cleaning','⚪',appState.tables.filter(t=>t.status==='Cleaning').length]].map(([s,icon,count]) =>
          `<div class="stat-card" style="--stat-color:var(--status-${s.toLowerCase()});padding:16px">
            <div style="display:flex;justify-content:space-between;align-items:center">
              <div><div class="stat-value">${count}</div><div class="stat-label">${s}</div></div>
              <span style="font-size:24px">${icon}</span>
            </div>
          </div>`
        ).join('')}
      </div>

      <!-- Floor Plan -->
      <div class="card">
        <div class="card-header">
          <span style="font-size:20px">🗺️</span>
          <div class="card-title">Floor Plan — ${filterZone === 'All' ? 'All Zones' : filterZone}</div>
        </div>
        <div class="floor-plan">
          ${filtered.map(t => {
            const statusClass = t.status.toLowerCase().replace(' ','').replace('/','');
            const order = appState.orders.find(o => o.tableId === t.id && ['Pending','Preparing','Served'].includes(o.status));
            const orderTotal = order ? order.items.reduce((s,i)=>s+i.price*i.qty,0) : 0;
            return `<div class="table-card ${statusClass}" onclick="showTableDetail('${t.id}')">
              <div class="table-number">${t.name}</div>
              <div class="table-capacity">👥 ${t.capacity} seats</div>
              <div class="table-zone">${t.zone}</div>
              ${order ? `<div style="margin-top:8px;font-size:11px;color:var(--accent-gold);font-weight:700">${fmt(orderTotal)}</div>` : ''}
              <div class="mt-sm"><span class="table-status-dot"></span><span style="font-size:10px;color:var(--text-secondary)">${t.status}</span></div>
              ${t.notes ? `<div style="font-size:10px;color:var(--text-muted);margin-top:4px;font-style:italic">${t.notes}</div>` : ''}
            </div>`;
          }).join('')}
        </div>
      </div>
    `;
  }

  window.tableFilterZone = (z) => { filterZone = z; render(); };
  window.tableFilterStatus = (s) => { filterStatus = s; render(); };
  render();
}

window.showTableDetail = function(tableId) {
  const t = appState.tables.find(t => t.id === tableId);
  const order = appState.orders.find(o => o.tableId === tableId && ['Pending','Preparing','Served'].includes(o.status));
  const captain = order ? appState.staff.find(s => s.id === order?.captainId) : null;
  const orderTotal = order ? order.items.reduce((s,i)=>s+i.price*i.qty,0) : 0;
  const statuses = ['Available','Occupied','Reserved','Cleaning'];

  showModal('tableDetailModal', `
    <div class="modal-header">
      <h2>📍 ${t.name} — ${t.zone}</h2>
      <button class="btn btn-ghost btn-icon" onclick="closeModal('tableDetailModal')">✕</button>
    </div>
    <div class="modal-body">
      <div class="flex gap-md mb-md" style="align-items:start">
        <div class="card" style="flex:1;padding:16px">
          <div style="font-size:13px;color:var(--text-secondary)">Capacity</div>
          <div class="font-bold" style="font-size:20px">👥 ${t.capacity} seats</div>
        </div>
        <div class="card" style="flex:1;padding:16px">
          <div style="font-size:13px;color:var(--text-secondary)">Status</div>
          <span class="badge badge-${t.status.toLowerCase()}" style="font-size:14px;margin-top:4px">${t.status}</span>
        </div>
      </div>
      ${t.notes ? `<div class="card" style="padding:12px;margin-bottom:16px;border-color:rgba(245,166,35,0.2)"><span style="font-size:12px;color:var(--text-muted)">📝 Note: </span><span style="font-size:13px">${t.notes}</span></div>` : ''}

      ${order ? `
        <div class="card" style="padding:16px;margin-bottom:16px;border-color:rgba(59,130,246,0.3)">
          <div class="flex justify-between items-center mb-md">
            <div><div class="font-bold">Active Order: ${order.id}</div><div style="font-size:12px;color:var(--text-secondary)">Captain: ${captain?.name} | ${fmtTime(order.createdAt)}</div></div>
            <span class="badge badge-${order.status.toLowerCase()}">${order.status}</span>
          </div>
          ${order.items.map(item => `
            <div class="flex justify-between" style="font-size:13px;padding:4px 0;border-bottom:1px solid var(--border)">
              <span>${item.qty}× ${item.name} (${item.variant})</span>
              <span class="text-gold">${fmt(item.price * item.qty)}</span>
            </div>
          `).join('')}
          <div class="flex justify-between font-bold mt-md"><span>Total</span><span class="text-gold">${fmt(orderTotal)}</span></div>
        </div>
      ` : ''}

      <div class="form-group">
        <label class="form-label">Update Status</label>
        <div class="flex gap-sm" style="flex-wrap:wrap">
          ${statuses.map(s => `<button class="btn btn-sm ${t.status===s?'btn-primary':'btn-secondary'}" onclick="updateTableStatus('${t.id}','${s}')">${s}</button>`).join('')}
        </div>
      </div>

      <div class="divider"></div>
      <div class="flex gap-sm justify-between">
        ${order && canAccess('orders') ? `<button class="btn btn-secondary" onclick="closeModal('tableDetailModal');navigate('orders',{tableId:'${tableId}'})">📋 View Full Order</button>` : '<div></div>'}
        ${canAccess('billing') && order && order.status === 'Served' ? `<button class="btn btn-primary" onclick="closeModal('tableDetailModal');initBilling('${order.id}')">🧾 Generate Bill</button>` : ''}
        <button class="btn btn-secondary btn-sm" onclick="showTransferModal('${tableId}')">↔️ Transfer Order</button>
      </div>
    </div>
  `);
};

window.updateTableStatus = function(tableId, status) {
  const t = appState.tables.find(t => t.id === tableId);
  t.status = status;
  toast(`${t.name} status → ${status}`, 'success');
  closeModal('tableDetailModal');
  renderTables(document.getElementById('page-content'));
};

window.showAddTableModal = function() {
  showModal('addTableModal', `
    <div class="modal-header">
      <h2>➕ Add New Table</h2>
      <button class="btn btn-ghost btn-icon" onclick="closeModal('addTableModal')">✕</button>
    </div>
    <div class="modal-body">
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Table Name/Number <span class="required">*</span></label>
          <input id="new-table-name" class="form-input" placeholder="e.g. T-13">
        </div>
        <div class="form-group">
          <label class="form-label">Seating Capacity <span class="required">*</span></label>
          <input id="new-table-cap" type="number" class="form-input" placeholder="4" min="1" max="50">
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Zone <span class="required">*</span></label>
          <select id="new-table-zone" class="form-select">
            <option>Indoor</option><option>Outdoor</option><option>Private Room</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Shape</label>
          <select id="new-table-shape" class="form-select">
            <option>square</option><option>round</option><option>rectangle</option>
          </select>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Special Notes</label>
        <input id="new-table-notes" class="form-input" placeholder="e.g. Near window, AC area...">
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" onclick="closeModal('addTableModal')">Cancel</button>
      <button class="btn btn-primary" onclick="addTable()">Add Table</button>
    </div>
  `);
};

window.addTable = function() {
  const name = document.getElementById('new-table-name').value.trim();
  const cap = parseInt(document.getElementById('new-table-cap').value);
  if (!name || !cap) { toast('Please fill required fields','error'); return; }
  const newTable = {
    id: 'T' + (appState.tables.length + 1).toString().padStart(2,'0'),
    name, capacity: cap,
    zone: document.getElementById('new-table-zone').value,
    shape: document.getElementById('new-table-shape').value,
    status: 'Available',
    notes: document.getElementById('new-table-notes').value,
    mergedWith: null
  };
  appState.tables.push(newTable);
  toast(`Table ${name} added successfully`, 'success');
  closeModal('addTableModal');
  renderTables(document.getElementById('page-content'));
};

window.showMergeModal = function() {
  const avail = appState.tables.filter(t => t.status === 'Available' || t.status === 'Occupied');
  showModal('mergeModal', `
    <div class="modal-header">
      <h2>🔗 Merge Tables</h2>
      <button class="btn btn-ghost btn-icon" onclick="closeModal('mergeModal')">✕</button>
    </div>
    <div class="modal-body">
      <p class="text-secondary mb-md">Select two or more tables to merge for a large group. A unified billing will be created.</p>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Primary Table</label>
          <select id="merge-primary" class="form-select">
            ${avail.map(t => `<option value="${t.id}">${t.name} (${t.zone}, ${t.capacity} seats)</option>`).join('')}
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Merge With</label>
          <select id="merge-secondary" class="form-select">
            ${avail.map(t => `<option value="${t.id}">${t.name} (${t.zone}, ${t.capacity} seats)</option>`).join('')}
          </select>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" onclick="closeModal('mergeModal')">Cancel</button>
      <button class="btn btn-primary" onclick="confirmMerge()">🔗 Merge Tables</button>
    </div>
  `);
};

window.confirmMerge = function() {
  const p = document.getElementById('merge-primary').value;
  const s = document.getElementById('merge-secondary').value;
  if (p === s) { toast('Select two different tables', 'error'); return; }
  const tp = appState.tables.find(t=>t.id===p);
  const ts = appState.tables.find(t=>t.id===s);
  tp.mergedWith = s; ts.mergedWith = p;
  toast(`${tp.name} merged with ${ts.name}`, 'success');
  closeModal('mergeModal');
};

window.showTransferModal = function(fromTableId) {
  const from = appState.tables.find(t=>t.id===fromTableId);
  const targets = appState.tables.filter(t=>t.id!==fromTableId && t.status==='Available');
  showModal('transferModal', `
    <div class="modal-header">
      <h2>↔️ Transfer Order from ${from.name}</h2>
      <button class="btn btn-ghost btn-icon" onclick="closeModal('transferModal')">✕</button>
    </div>
    <div class="modal-body">
      <div class="form-group">
        <label class="form-label">Transfer To</label>
        <select id="transfer-dest" class="form-select">
          ${targets.length ? targets.map(t=>`<option value="${t.id}">${t.name} — ${t.zone} (${t.capacity} seats)</option>`).join('') : '<option disabled>No available tables</option>'}
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Reason</label>
        <input id="transfer-reason" class="form-input" placeholder="e.g. Customer request, larger group...">
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" onclick="closeModal('transferModal')">Cancel</button>
      <button class="btn btn-primary" onclick="confirmTransfer('${fromTableId}')">↔️ Confirm Transfer</button>
    </div>
  `);
};

window.confirmTransfer = function(fromTableId) {
  const destId = document.getElementById('transfer-dest').value;
  const reason = document.getElementById('transfer-reason').value;
  const order = appState.orders.find(o=>o.tableId===fromTableId && ['Pending','Preparing','Served'].includes(o.status));
  if (order) {
    order.tableId = destId;
    const fromT = appState.tables.find(t=>t.id===fromTableId);
    const destT = appState.tables.find(t=>t.id===destId);
    fromT.status = 'Available';
    destT.status = 'Occupied';
    toast(`Order transferred from ${fromT.name} to ${destT.name}`, 'success');
  } else {
    toast('No active order to transfer', 'warning');
  }
  closeModal('transferModal');
  renderTables(document.getElementById('page-content'));
};

// ════════════════════════════════════════════════════════════
// PAGE: ORDER MANAGEMENT
// ════════════════════════════════════════════════════════════
function renderOrders(container, params={}) {
  let activeTab = params.tab || 'all';
  let filterTable = params.tableId || 'all';

  function render() {
    let orders = appState.orders;
    if (activeTab === 'active') orders = orders.filter(o => ['Pending','Preparing','Served'].includes(o.status));
    if (activeTab === 'completed') orders = orders.filter(o => o.status === 'Completed');
    if (filterTable !== 'all') orders = orders.filter(o => o.tableId === filterTable);

    container.innerHTML = `
      <div class="section-header">
        <div class="section-header-left">
          <h2>Order Management</h2>
          <p>Captain-driven ordering with KOT generation</p>
        </div>
        <div class="flex gap-sm">
          ${canAccess('orders') ? `<button class="btn btn-primary" onclick="showNewOrderModal()">+ New Order</button>` : ''}
        </div>
      </div>

      <div class="tabs">
        <div class="tab ${activeTab==='all'?'active':''}" onclick="ordersTab('all')">All Orders (${appState.orders.length})</div>
        <div class="tab ${activeTab==='active'?'active':''}" onclick="ordersTab('active')">Active (${appState.orders.filter(o=>['Pending','Preparing','Served'].includes(o.status)).length})</div>
        <div class="tab ${activeTab==='completed'?'active':''}" onclick="ordersTab('completed')">Completed (${appState.orders.filter(o=>o.status==='Completed').length})</div>
      </div>

      ${orders.length === 0 ? `<div class="empty-state"><div class="empty-icon">📋</div><h3>No Orders</h3><p>No orders match the current filter.</p></div>` :
        `<div style="display:flex; flex-direction:column; gap:12px;">
          ${orders.map(o => renderOrderCard(o)).join('')}
        </div>`
      }
    `;
  }

  window.ordersTab = (tab) => { activeTab = tab; render(); };
  render();
}

function renderOrderCard(o) {
  const tbl = appState.tables.find(t => t.id === o.tableId);
  const captain = appState.staff.find(s => s.id === o.captainId);
  const customer = o.customerId ? appState.customers.find(c => c.id === o.customerId) : null;
  const total = o.items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const statusColors = { Pending: 'pending', Preparing: 'preparing', Served: 'served', Completed: 'completed' };

  return `<div class="card" style="padding:0;overflow:hidden">
    <div style="padding:16px 20px; display:flex; align-items:center; gap:16px; border-bottom:1px solid var(--border)">
      <div>
        <div class="flex gap-sm items-center">
          <span class="font-bold font-mono" style="font-size:13px">${o.id}</span>
          <span class="badge badge-${statusColors[o.status]}">${o.status}</span>
        </div>
        <div style="font-size:12px;color:var(--text-secondary);margin-top:2px">${fmtDateTime(o.createdAt)}</div>
      </div>
      <div class="flex gap-md items-center" style="margin-left:auto">
        <div style="text-align:center">
          <div class="font-bold" style="font-size:16px">${tbl?.name || o.tableId}</div>
          <div style="font-size:11px;color:var(--text-muted)">${tbl?.zone || ''}</div>
        </div>
        <div style="text-align:center">
          <div style="font-size:13px">${captain?.name?.split(' ')[0] || 'N/A'}</div>
          <div style="font-size:11px;color:var(--text-muted)">Captain</div>
        </div>
        ${customer ? `<div style="text-align:center"><div style="font-size:13px">${customer.name}</div><div style="font-size:11px;color:var(--text-muted)">Customer</div></div>` : ''}
        <div style="text-align:right">
          <div class="font-bold text-gold" style="font-size:18px">${fmt(total)}</div>
          <div style="font-size:11px;color:var(--text-muted)">${o.items.length} items</div>
        </div>
      </div>
    </div>
    <div style="padding:12px 20px">
      <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:12px">
        ${o.items.map(item => `
          <div style="background:var(--bg-input);border:1px solid var(--border);border-radius:var(--radius-sm);padding:4px 8px;font-size:12px">
            <span class="font-bold">${item.qty}×</span> ${item.name} <span class="text-muted">(${item.variant})</span>
            <span style="background:rgba(${item.status==='Ready'?'16,185,129':item.status==='Preparing'?'59,130,246':'245,158,11'},0.15);color:var(--status-${item.status.toLowerCase()});padding:1px 6px;border-radius:99px;font-size:10px;margin-left:4px">${item.status}</span>
          </div>
        `).join('')}
      </div>
      <div class="flex gap-sm" style="flex-wrap:wrap">
        <button class="btn btn-secondary btn-sm" onclick="showKOT('${o.id}')">🖨 View KOT</button>
        ${['Pending','Preparing'].includes(o.status) ? `
          <button class="btn btn-secondary btn-sm" onclick="showEditOrder('${o.id}')">✏️ Modify Order</button>
          <button class="btn btn-sm" style="background:rgba(16,185,129,0.15);color:var(--success);border:1px solid rgba(16,185,129,0.3)" onclick="updateOrderStatus('${o.id}','Served')">✅ Mark Served</button>
        ` : ''}
        ${o.status === 'Served' && canAccess('billing') ? `<button class="btn btn-primary btn-sm" onclick="initBilling('${o.id}')">🧾 Settle Bill</button>` : ''}
        ${o.status === 'Pending' && currentUser.role === 'Admin' ? `<button class="btn btn-danger btn-sm" onclick="cancelOrder('${o.id}')">🗑 Cancel</button>` : ''}
      </div>
    </div>
  </div>`;
}

window.updateOrderStatus = function(orderId, status) {
  const order = appState.orders.find(o => o.id === orderId);
  order.status = status;
  const tbl = appState.tables.find(t => t.id === order.tableId);
  if (status === 'Completed' && tbl) tbl.status = 'Available';
  toast(`Order ${orderId} → ${status}`, 'success');
  renderOrders(document.getElementById('page-content'));
};

window.cancelOrder = function(orderId) {
  if (!confirm('Cancel this order? This action will be logged.')) return;
  const order = appState.orders.find(o => o.id === orderId);
  order.status = 'Completed'; // soft cancel
  const tbl = appState.tables.find(t => t.id === order.tableId);
  if (tbl) tbl.status = 'Available';
  // log leakage
  DB.revenuLeakage.unshift({ type: 'Order Cancellation', date: new Date().toISOString(), orderId, tableId: order.tableId, captain: currentUser.name, amount: order.items.reduce((s,i)=>s+i.price*i.qty,0), reason: 'Admin cancelled' });
  toast('Order cancelled and logged', 'warning');
  renderOrders(document.getElementById('page-content'));
};

window.showKOT = function(orderId) {
  const o = appState.orders.find(o => o.id === orderId);
  const tbl = appState.tables.find(t => t.id === o.tableId);
  const captain = appState.staff.find(s => s.id === o.captainId);
  showModal('kotModal', `
    <div class="modal-header">
      <h2>🖨️ Kitchen Order Ticket (KOT)</h2>
      <button class="btn btn-ghost btn-icon" onclick="closeModal('kotModal')">✕</button>
    </div>
    <div class="modal-body">
      <div class="kot-slip">
        <div class="kot-header">
          <div class="kot-title">⭐ KOT ⭐</div>
          <div>${DB.restaurant.name}</div>
          <div style="font-size:11px;color:#666">Table: <strong>${tbl?.name}</strong> | ${fmtDateTime(o.createdAt)}</div>
          <div style="font-size:11px">Order: ${o.id}</div>
          <div style="font-size:11px">Captain: ${captain?.name}</div>
        </div>
        ${o.items.map(item => `
          <div>
            <div class="kot-row"><span><strong>${item.qty}x ${item.name}</strong></span><span>${item.variant}</span></div>
            ${item.instructions ? `<div style="font-size:11px;color:#666;padding-left:12px">→ ${item.instructions}</div>` : ''}
          </div>
          <hr class="kot-divider">
        `).join('')}
        <div class="kot-row" style="font-size:11px;color:#666"><span>Station: </span><span>Auto-routed</span></div>
        <div class="kot-row" style="font-size:11px;color:#666"><span>Priority:</span><span>Normal</span></div>
      </div>
      <div class="flex gap-sm justify-center mt-md">
        <button class="btn btn-secondary" onclick="toast('KOT sent to kitchen printer','info')">🖨️ Print KOT</button>
        ${['Pending','Preparing'].includes(o.status) ? `<button class="btn btn-success" onclick="updateOrderStatus('${o.id}','Served');closeModal('kotModal')">✅ Mark Served</button>` : ''}
      </div>
    </div>
  `);
};

window.showNewOrderModal = function() {
  const availTables = appState.tables.filter(t => t.status === 'Available' || t.status === 'Occupied');
  appState.activeOrderDraft = { tableId: availTables[0]?.id || '', items: [], customerId: null, specialNotes: '' };

  function renderDraft() {
    const draft = appState.activeOrderDraft;
    const draftTotal = draft.items.reduce((s,i) => s + i.price*i.qty, 0);
    const tax = draftTotal * 0.05;

    const modalEl = document.getElementById('modal-neworder');
    if (!modalEl) return;
    modalEl.querySelector('.order-cart-content').innerHTML = `
      ${draft.items.length === 0 ? `<div class="empty-state" style="padding:24px"><div class="empty-icon">🛒</div><p>Add items from the menu</p></div>` :
        draft.items.map((item,idx) => `
          <div class="cart-item">
            <div style="flex:1">
              <div class="cart-item-name">${item.name}</div>
              <div class="cart-item-variant">${item.variant}</div>
              ${item.instructions ? `<div style="font-size:10px;color:var(--text-muted);font-style:italic">${item.instructions}</div>` : ''}
            </div>
            <div class="cart-item-qty">
              <button class="qty-btn" onclick="draftQty(${idx},-1)">−</button>
              <span class="qty-val">${item.qty}</span>
              <button class="qty-btn" onclick="draftQty(${idx},1)">+</button>
            </div>
            <div class="cart-item-price">${fmt(item.price*item.qty)}</div>
          </div>
        `).join('')
      }
      <div class="cart-footer">
        <div class="cart-summary-row"><span>Subtotal</span><span>${fmt(draftTotal)}</span></div>
        <div class="cart-summary-row"><span>GST (5%)</span><span>${fmt(tax)}</span></div>
        <div class="cart-summary-row total"><span>Total</span><span>${fmt(draftTotal+tax)}</span></div>
        <button class="btn btn-primary btn-full mt-md" onclick="confirmNewOrder()" ${draft.items.length===0?'disabled':''}>
          🧾 Place Order & Print KOT
        </button>
      </div>
    `;
  }

  window.draftQty = (idx, delta) => {
    const draft = appState.activeOrderDraft;
    draft.items[idx].qty = Math.max(0, draft.items[idx].qty + delta);
    if (draft.items[idx].qty === 0) draft.items.splice(idx, 1);
    renderDraft();
  };

  window.addToDraft = (itemId, variant, price) => {
    const draft = appState.activeOrderDraft;
    const item = appState.menuItems.find(m => m.id === itemId);
    const exist = draft.items.find(i => i.itemId === itemId && i.variant === variant);
    if (exist) exist.qty++;
    else draft.items.push({ itemId, name: item.name, variant, price, qty: 1, instructions: '', status: 'Pending' });
    renderDraft();
    toast(`${item.name} added`, 'success');
  };

  const allItems = appState.menuItems.filter(m => m.available);
  const catHtml = appState.categories.filter(c => c.active).map(cat => {
    const items = allItems.filter(m => m.categoryId === cat.id);
    if (!items.length) return '';
    return `<div class="mb-md">
      <div style="font-size:12px;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:.06em;padding:8px 0 4px">${cat.icon} ${cat.name}</div>
      <div style="display:flex;flex-direction:column;gap:4px">
        ${items.map(item => `
          <div class="flex items-center gap-sm" style="padding:8px;border-radius:var(--radius-sm);border:1px solid var(--border);background:var(--bg-input);cursor:pointer;transition:var(--transition)" onmouseenter="this.style.borderColor='var(--accent-gold)'" onmouseleave="this.style.borderColor='var(--border)'">
            <span class="veg-indicator ${item.veg?'veg':'non-veg'}"></span>
            <div style="flex:1;min-width:0">
              <div style="font-size:13px;font-weight:600">${item.name}</div>
              <div style="font-size:11px;color:var(--text-muted)">${item.variants.join(' / ')}</div>
            </div>
            <div style="text-align:right;flex-shrink:0">
              <div class="text-gold font-bold" style="font-size:13px">${fmt(item.price)}</div>
              <div style="display:flex;gap:4px;margin-top:2px">
                ${item.variants.map(v => `<button class="btn btn-primary btn-sm" style="padding:2px 8px;font-size:10px" onclick="addToDraft('${item.id}','${v}',${item.price})">+${v}</button>`).join('')}
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>`;
  }).join('');

  showModal('neworder', `
    <div class="modal-header">
      <h2>📋 New Order</h2>
      <button class="btn btn-ghost btn-icon" onclick="closeModal('neworder')">✕</button>
    </div>
    <div class="modal-body" style="padding:0">
      <div style="display:grid;grid-template-columns:1fr 320px;height:70vh">
        <div style="overflow-y:auto;padding:20px;border-right:1px solid var(--border)">
          <div class="form-row mb-md">
            <div class="form-group" style="margin-bottom:0">
              <label class="form-label">Table</label>
              <select id="order-table-select" class="form-select" onchange="appState.activeOrderDraft.tableId=this.value">
                ${availTables.map(t=>`<option value="${t.id}">${t.name} — ${t.zone} (${t.capacity} seats, ${t.status})</option>`).join('')}
              </select>
            </div>
            <div class="form-group" style="margin-bottom:0">
              <label class="form-label">Customer (optional)</label>
              <select id="order-cust-select" class="form-select" onchange="appState.activeOrderDraft.customerId=this.value||null">
                <option value="">Walk-in Guest</option>
                ${appState.customers.map(c=>`<option value="${c.id}">${c.name} (${c.phone})</option>`).join('')}
              </select>
            </div>
          </div>
          <div class="search-bar mb-md">
            <span class="search-icon">🔍</span>
            <input type="text" placeholder="Search menu items..." oninput="filterMenuDraft(this.value)">
          </div>
          <div id="menu-draft-list">${catHtml}</div>
        </div>
        <div class="order-cart" style="border:none;border-radius:0">
          <div class="cart-header">
            <div class="font-bold">🛒 Current Order</div>
            <div style="font-size:12px;color:var(--text-secondary)">Captain: ${currentUser.name}</div>
          </div>
          <div class="order-cart-content" style="flex:1;overflow-y:auto;display:flex;flex-direction:column"></div>
        </div>
      </div>
    </div>
  `, 'modal-xl');

  window.filterMenuDraft = debounce((q) => {
    const list = document.getElementById('menu-draft-list');
    if (!list) return;
    const items = list.querySelectorAll('[onmouseenter]');
    items.forEach(el => { el.style.display = el.textContent.toLowerCase().includes(q.toLowerCase()) ? '' : 'none'; });
  }, 200);

  renderDraft();
};

window.confirmNewOrder = function() {
  const draft = appState.activeOrderDraft;
  if (!draft.items.length) { toast('Add at least one item', 'error'); return; }
  const tableSelect = document.getElementById('order-table-select');
  draft.tableId = tableSelect ? tableSelect.value : draft.tableId;
  draft.customerId = document.getElementById('order-cust-select')?.value || null;

  const newOrder = {
    id: 'ORD-2026-' + (Math.floor(Math.random()*900)+100),
    tableId: draft.tableId,
    captainId: currentUser.id,
    customerId: draft.customerId,
    status: 'Pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    items: draft.items.map(i => ({ ...i, status: 'Pending' }))
  };
  appState.orders.unshift(newOrder);
  const tbl = appState.tables.find(t => t.id === draft.tableId);
  if (tbl) tbl.status = 'Occupied';
  appState.activeOrderDraft = null;
  closeModal('neworder');
  toast(`Order ${newOrder.id} placed & KOT sent to kitchen 🎉`, 'success');
  renderOrders(document.getElementById('page-content'));
};

window.showEditOrder = function(orderId) {
  const o = appState.orders.find(o => o.id === orderId);
  appState.activeOrderDraft = {
    tableId: o.tableId, items: JSON.parse(JSON.stringify(o.items)),
    customerId: o.customerId, editOrderId: orderId
  };

  function renderEdit() {
    const draft = appState.activeOrderDraft;
    const total = draft.items.reduce((s,i)=>s+i.price*i.qty,0);
    const modal = document.getElementById('modal-editorder');
    if (!modal) return;
    modal.querySelector('.edit-items').innerHTML = draft.items.map((item,idx) => `
      <div class="cart-item">
        <div style="flex:1">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-variant">${item.variant}</div>
        </div>
        <div class="cart-item-qty">
          <button class="qty-btn" onclick="editDraftQty(${idx},-1)">−</button>
          <span class="qty-val">${item.qty}</span>
          <button class="qty-btn" onclick="editDraftQty(${idx},1)">+</button>
        </div>
        <div class="cart-item-price">${fmt(item.price*item.qty)}</div>
      </div>
    `).join('') + `<div class="cart-summary-row total mt-md"><span>Total</span><span>${fmt(total)}</span></div>`;
  }

  window.editDraftQty = (idx, delta) => {
    const draft = appState.activeOrderDraft;
    draft.items[idx].qty = Math.max(0, draft.items[idx].qty + delta);
    if (draft.items[idx].qty === 0) draft.items.splice(idx, 1);
    renderEdit();
  };

  const tbl = appState.tables.find(t => t.id === o.tableId);
  showModal('editorder', `
    <div class="modal-header">
      <h2>✏️ Modify Order — ${o.id}</h2>
      <button class="btn btn-ghost btn-icon" onclick="closeModal('editorder')">✕</button>
    </div>
    <div class="modal-body">
      <div class="mb-md text-secondary" style="font-size:13px">Table: <strong>${tbl?.name}</strong> | Captain: <strong>${appState.staff.find(s=>s.id===o.captainId)?.name}</strong></div>
      <div class="edit-items"></div>
      <p class="text-secondary mt-md" style="font-size:12px">💡 To add new items, close and place a new KOT against this table.</p>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" onclick="closeModal('editorder')">Cancel</button>
      <button class="btn btn-primary" onclick="saveEditOrder('${orderId}')">💾 Save Changes & Reprint KOT</button>
    </div>
  `);
  renderEdit();
};

window.saveEditOrder = function(orderId) {
  const draft = appState.activeOrderDraft;
  const order = appState.orders.find(o => o.id === orderId);
  order.items = draft.items;
  order.updatedAt = new Date().toISOString();
  // Log leakage
  DB.revenuLeakage.unshift({ type: 'Order Modification', date: new Date().toISOString(), orderId, tableId: order.tableId, captain: currentUser.name, amount: 0, reason: 'Items modified' });
  toast('Order updated & new KOT sent', 'success');
  closeModal('editorder');
  renderOrders(document.getElementById('page-content'));
};

// ════════════════════════════════════════════════════════════
// PAGE: BILLING & SETTLEMENT
// ════════════════════════════════════════════════════════════
function renderBilling(container) {
  const pendingBills = appState.orders.filter(o => o.status === 'Served');

  container.innerHTML = `
    <div class="section-header">
      <div class="section-header-left">
        <h2>Billing & Settlement</h2>
        <p>Generate bills, apply GST, split payments</p>
      </div>
    </div>

    <div class="grid-2" style="gap:20px">
      <!-- Pending Bills -->
      <div class="card">
        <div class="card-header">
          <span style="font-size:20px">⏳</span>
          <div><div class="card-title">Pending Settlement</div><div class="card-subtitle">${pendingBills.length} orders awaiting billing</div></div>
        </div>
        ${pendingBills.length === 0 ? `<div class="empty-state" style="padding:24px"><div class="empty-icon">✅</div><p>All bills settled!</p></div>` :
          pendingBills.map(o => {
            const tbl = appState.tables.find(t=>t.id===o.tableId);
            const total = o.items.reduce((s,i)=>s+i.price*i.qty, 0);
            return `<div class="flex items-center gap-md" style="padding:12px 0;border-bottom:1px solid var(--border)">
              <div>
                <div class="font-bold">${tbl?.name}</div>
                <div style="font-size:11px;color:var(--text-secondary)">${o.id}</div>
              </div>
              <div style="flex:1;text-align:center">
                <div style="font-size:13px">${o.items.length} items</div>
                <div style="font-size:11px;color:var(--text-muted)">${fmtTime(o.createdAt)}</div>
              </div>
              <div style="text-align:right">
                <div class="font-bold text-gold">${fmt(total)}</div>
                <button class="btn btn-primary btn-sm mt-sm" onclick="initBilling('${o.id}')">🧾 Bill</button>
              </div>
            </div>`;
          }).join('')
        }
      </div>

      <!-- Recent Bills -->
      <div class="card">
        <div class="card-header">
          <span style="font-size:20px">📄</span>
          <div><div class="card-title">Recent Bills</div><div class="card-subtitle">Last settled bills</div></div>
        </div>
        ${appState.bills.map(b => {
          const o = appState.orders.find(o=>o.id===b.orderId);
          const tbl = appState.tables.find(t=>t.id===b.tableId);
          return `<div class="flex items-center gap-md" style="padding:10px 0;border-bottom:1px solid var(--border)">
            <div>
              <div class="font-bold font-mono" style="font-size:12px">${b.id}</div>
              <div style="font-size:11px;color:var(--text-secondary)">${tbl?.name} | ${fmtDate(b.createdAt)}</div>
            </div>
            <div style="flex:1;text-align:center">
              ${b.payments.map(p=>`<span class="badge badge-active" style="font-size:10px">${p.method}: ${fmt(p.amount)}</span>`).join(' ')}
            </div>
            <div style="text-align:right">
              <div class="font-bold text-gold">${fmt(b.total)}</div>
              <button class="btn btn-ghost btn-sm" onclick="showBillPreview('${b.id}')">View</button>
            </div>
          </div>`;
        }).join('')}
      </div>
    </div>
  `;
}

window.initBilling = function(orderId) {
  const o = appState.orders.find(o => o.id === orderId);
  if (!o) { toast('Order not found', 'error'); return; }

  const subtotal = o.items.reduce((s,i) => s+i.price*i.qty, 0);
  const gstRate = 5;
  let discountType = 'none';
  let discountValue = 0;
  let discountReason = '';
  let splitPayments = [{ method: 'Cash', amount: 0 }];

  function calcTotals() {
    let discountAmt = 0;
    if (discountType === 'percentage') discountAmt = subtotal * discountValue / 100;
    else if (discountType === 'fixed') discountAmt = discountValue;
    const taxable = subtotal - discountAmt;
    const cgst = taxable * gstRate / 2 / 100;
    const sgst = taxable * gstRate / 2 / 100;
    return { discountAmt, taxable, cgst, sgst, total: taxable + cgst + sgst };
  }

  function renderBillModal() {
    const { discountAmt, taxable, cgst, sgst, total } = calcTotals();
    const splitTotal = splitPayments.reduce((s,p)=>s+parseFloat(p.amount||0),0);
    const remaining = total - splitTotal;

    const modal = document.getElementById('modal-billing');
    if (!modal) return;

    modal.querySelector('.bill-calc').innerHTML = `
      <div class="bill-preview">
        <div class="bill-brand">
          <h2>${DB.restaurant.name}</h2>
          <p>${DB.restaurant.address}</p>
          <p>GSTIN: ${DB.restaurant.gstin}</p>
        </div>
        <hr class="bill-divider">
        <div class="bill-row"><span>Bill No:</span><span>BILL-2026-${Math.floor(Math.random()*100)+184}</span></div>
        <div class="bill-row"><span>Table:</span><span>${appState.tables.find(t=>t.id===o.tableId)?.name}</span></div>
        <div class="bill-row"><span>Date:</span><span>${fmtDateTime(new Date())}</span></div>
        <hr class="bill-divider">
        ${o.items.map(item=>`<div class="bill-row"><span>${item.qty}x ${item.name} (${item.variant})</span><span>${fmt(item.price*item.qty)}</span></div>`).join('')}
        <hr class="bill-divider">
        <div class="bill-row"><span>Subtotal</span><span>${fmt(subtotal)}</span></div>
        ${discountAmt > 0 ? `<div class="bill-row" style="color:#ef4444"><span>Discount (${discountReason || discountType})</span><span>−${fmt(discountAmt)}</span></div>` : ''}
        <div class="bill-row"><span>Taxable Amount</span><span>${fmt(taxable)}</span></div>
        <div class="bill-row" style="font-size:11px;color:#666"><span>CGST (${gstRate/2}%)</span><span>${fmt(cgst)}</span></div>
        <div class="bill-row" style="font-size:11px;color:#666"><span>SGST (${gstRate/2}%)</span><span>${fmt(sgst)}</span></div>
        <hr class="bill-divider">
        <div class="bill-row total"><span>TOTAL PAYABLE</span><span>${fmt(total)}</span></div>
        <hr class="bill-divider">
        <div style="text-align:center;font-size:11px;color:#888;margin-top:8px">Thank you for dining at Spice Garden! 🌟</div>
      </div>
    `;

    modal.querySelector('.split-payments').innerHTML = `
      ${splitPayments.map((p,idx) => `
        <div class="flex gap-sm items-center mb-sm">
          <select class="form-select" style="flex:1" onchange="splitPayments[${idx}].method=this.value">
            ${['Cash','Online','RFID','Due (Credit)','Complimentary'].map(m=>`<option ${p.method===m?'selected':''}>${m}</option>`).join('')}
          </select>
          <input type="number" class="form-input" style="flex:1" value="${p.amount||''}" placeholder="${fmt(remaining)}"
            oninput="splitPayments[${idx}].amount=parseFloat(this.value)||0;renderBillModal()">
          ${idx>0?`<button class="btn btn-danger btn-icon btn-sm" onclick="splitPayments.splice(${idx},1);renderBillModal()">✕</button>`:''}
        </div>
      `).join('')}
      <button class="btn btn-secondary btn-sm" onclick="splitPayments.push({method:'Online',amount:0});renderBillModal()">+ Split Payment</button>
      <div class="flex justify-between mt-md font-bold"><span>Remaining:</span><span style="color:${remaining>0?'var(--danger)':'var(--success)'}">${fmt(Math.max(0,remaining))}</span></div>
    `;
  }

  showModal('billing', `
    <div class="modal-header">
      <h2>🧾 Bill Settlement — ${orderId}</h2>
      <button class="btn btn-ghost btn-icon" onclick="closeModal('billing')">✕</button>
    </div>
    <div class="modal-body" style="padding:0">
      <div style="display:grid;grid-template-columns:1fr 1fr;min-height:400px">
        <div style="padding:20px;border-right:1px solid var(--border)">
          <div class="form-group">
            <label class="form-label">Discount Type</label>
            <select class="form-select" onchange="discountType=this.value;renderBillModal()">
              <option value="none">No Discount</option>
              <option value="percentage">Percentage (%)</option>
              <option value="fixed">Fixed Amount (₹)</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Discount Value</label>
            <input type="number" class="form-input" placeholder="0" oninput="discountValue=parseFloat(this.value)||0;renderBillModal()">
          </div>
          <div class="form-group">
            <label class="form-label">Discount Reason</label>
            <select class="form-select" onchange="discountReason=this.value;renderBillModal()">
              <option value="">Select reason</option>
              ${appState.settings.discountReasons.map(r=>`<option>${r}</option>`).join('')}
            </select>
          </div>
          <div class="divider"></div>
          <div style="font-weight:700;margin-bottom:12px">💳 Payment Mode</div>
          <div class="split-payments"></div>
        </div>
        <div style="padding:20px">
          <div class="bill-calc"></div>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" onclick="toast('Bill printed','info')">🖨️ Print</button>
      <button class="btn btn-secondary" onclick="closeModal('billing')">Cancel</button>
      <button class="btn btn-primary" onclick="settleBill('${orderId}')">✅ Settle & Close</button>
    </div>
  `, 'modal-xl');

  renderBillModal();
};

window.settleBill = function(orderId) {
  const o = appState.orders.find(o => o.id === orderId);
  const { discountAmt, cgst, sgst, total, taxable } = (() => {
    const subtotal = o.items.reduce((s,i)=>s+i.price*i.qty,0);
    let discountAmt = 0;
    const discType = document.querySelector('#modal-billing select')?.value || 'none';
    const discVal = parseFloat(document.querySelector('#modal-billing input[type=number]')?.value||0);
    if (discType==='percentage') discountAmt = subtotal*discVal/100;
    else if (discType==='fixed') discountAmt = discVal;
    const taxable = subtotal - discountAmt;
    const cgst = taxable*2.5/100; const sgst = taxable*2.5/100;
    return { discountAmt, cgst, sgst, total: taxable+cgst+sgst, taxable };
  })();

  const newBill = {
    id: 'BILL-2026-' + (appState.bills.length + 182),
    orderId, tableId: o.tableId, captainId: o.captainId, customerId: o.customerId,
    subtotal: o.items.reduce((s,i)=>s+i.price*i.qty,0),
    discountType:'none', discountValue:0, discountAmount: discountAmt,
    cgst, sgst, totalTax: cgst+sgst, total,
    payments: [{ method: 'Cash', amount: total }],
    status: 'Paid', createdAt: new Date().toISOString()
  };
  appState.bills.unshift(newBill);
  o.status = 'Completed';
  const tbl = appState.tables.find(t=>t.id===o.tableId);
  if (tbl) tbl.status = 'Available';
  closeModal('billing');
  toast(`Bill ${newBill.id} settled successfully! 🎉`, 'success');
  if (canAccess('billing')) renderBilling(document.getElementById('page-content'));
};

window.showBillPreview = function(billId) {
  const b = appState.bills.find(b=>b.id===billId);
  const o = appState.orders.find(o=>o.id===b.orderId);
  const tbl = appState.tables.find(t=>t.id===b.tableId);
  showModal('billpreview',`
    <div class="modal-header"><h2>🧾 Bill Preview</h2><button class="btn btn-ghost btn-icon" onclick="closeModal('billpreview')">✕</button></div>
    <div class="modal-body">
      <div class="bill-preview">
        <div class="bill-brand"><h2>${DB.restaurant.name}</h2><p>${DB.restaurant.address}</p><p>GSTIN: ${DB.restaurant.gstin}</p></div>
        <hr class="bill-divider">
        <div class="bill-row"><span>Bill No:</span><span>${b.id}</span></div>
        <div class="bill-row"><span>Table:</span><span>${tbl?.name}</span></div>
        <div class="bill-row"><span>Date:</span><span>${fmtDateTime(b.createdAt)}</span></div>
        <hr class="bill-divider">
        ${o?.items.map(i=>`<div class="bill-row"><span>${i.qty}x ${i.name}</span><span>${fmt(i.price*i.qty)}</span></div>`).join('')||''}
        <hr class="bill-divider">
        <div class="bill-row"><span>Subtotal</span><span>${fmt(b.subtotal)}</span></div>
        ${b.discountAmount>0?`<div class="bill-row" style="color:red"><span>Discount</span><span>−${fmt(b.discountAmount)}</span></div>`:''}
        <div class="bill-row" style="font-size:11px;color:#666"><span>CGST (2.5%)</span><span>${fmt(b.cgst)}</span></div>
        <div class="bill-row" style="font-size:11px;color:#666"><span>SGST (2.5%)</span><span>${fmt(b.sgst)}</span></div>
        <hr class="bill-divider">
        <div class="bill-row total"><span>TOTAL</span><span>${fmt(b.total)}</span></div>
        <hr class="bill-divider">
        ${b.payments.map(p=>`<div class="bill-row"><span>Paid via ${p.method}</span><span>${fmt(p.amount)}</span></div>`).join('')}
        <hr class="bill-divider">
        <div style="text-align:center;font-size:11px;color:#888">Thank you! Visit again 🌟</div>
      </div>
    </div>
  `);
};

// ════════════════════════════════════════════════════════════
// PAGE: RFID CARD SYSTEM
// ════════════════════════════════════════════════════════════
function renderRFID(container) {
  let tab = 'inventory';

  function render() {
    container.innerHTML = `
      <div class="section-header">
        <div class="section-header-left">
          <h2>RFID Card System</h2>
          <p>Virtual credit system — bind, load, deduct, and clear cards</p>
        </div>
        <button class="btn btn-primary" onclick="showBindCard()">+ Bind New Card</button>
      </div>

      <div class="stats-grid" style="grid-template-columns:repeat(4,1fr);margin-bottom:20px">
        ${[['Active','🟢',appState.rfidCards.filter(c=>c.status==='Active').length],
           ['Available','⚪',appState.rfidCards.filter(c=>c.status==='Available').length],
           ['Blocked','🔴',appState.rfidCards.filter(c=>c.status==='Blocked').length],
           ['Total Balance','💰',fmt(appState.rfidCards.filter(c=>c.status==='Active').reduce((s,c)=>s+c.balance,0))]
        ].map(([label,icon,val])=>`<div class="stat-card" style="--stat-color:var(--accent-blue);padding:16px">
          <div class="flex justify-between items-center"><div><div class="stat-value">${val}</div><div class="stat-label">${label}</div></div><span style="font-size:24px">${icon}</span></div>
        </div>`).join('')}
      </div>

      <div class="tabs">
        <div class="tab ${tab==='inventory'?'active':''}" onclick="rfidTab('inventory')">Card Inventory</div>
        <div class="tab ${tab==='scan'?'active':''}" onclick="rfidTab('scan')">Scan & Pay</div>
      </div>

      ${tab === 'inventory' ? renderRFIDInventory() : renderRFIDScan()}
    `;
    window.rfidTab = (t) => { tab = t; render(); };
  }

  render();
}

function renderRFIDInventory() {
  return `<div class="card">
    <table class="data-table">
      <thead><tr><th>Card No</th><th>Customer</th><th>Balance</th><th>Status</th><th>Load History</th><th>Actions</th></tr></thead>
      <tbody>
        ${appState.rfidCards.map(card => {
          const customer = card.customerId ? appState.customers.find(c=>c.id===card.customerId) : null;
          return `<tr>
            <td class="font-mono text-gold">${card.cardNo}</td>
            <td>${customer ? `<div class="font-bold">${customer.name}</div><div style="font-size:11px;color:var(--text-secondary)">${customer.phone}</div>` : '<span class="text-muted">—</span>'}</td>
            <td class="font-bold text-gold">${fmt(card.balance)}</td>
            <td><span class="badge badge-${card.status.toLowerCase()}">${card.status}</span></td>
            <td style="font-size:12px">${card.loadHistory.length} transactions</td>
            <td class="actions">
              ${card.status==='Active' ? `
                <button class="btn btn-sm btn-secondary" onclick="showLoadBalance('${card.id}')">💰 Load</button>
                <button class="btn btn-sm btn-danger" onclick="blockCard('${card.id}','Blocked')">🚫 Block</button>
              ` : ''}
              ${card.status==='Available' ? `<button class="btn btn-sm btn-primary" onclick="showBindCard('${card.id}')">🔗 Bind</button>` : ''}
              ${card.status==='Blocked' ? `<button class="btn btn-sm btn-success" onclick="blockCard('${card.id}','Available')">✅ Unblock</button>` : ''}
              <button class="btn btn-sm btn-ghost" onclick="showCardHistory('${card.id}')">📋 History</button>
            </td>
          </tr>`;
        }).join('')}
      </tbody>
    </table>
  </div>`;
}

function renderRFIDScan() {
  return `<div class="card" id="rfid-scan-panel">
    <div style="max-width:500px;margin:0 auto;text-align:center">
      <div style="font-size:80px;margin:32px 0;animation:pulse 2s infinite">📡</div>
      <h3 style="font-size:20px;font-weight:700;margin-bottom:8px">Scan RFID Card</h3>
      <p class="text-secondary mb-lg">Tap the RFID reader or enter card ID manually to retrieve card info</p>
      <div class="flex gap-sm mb-lg">
        <input id="rfid-input" class="form-input" placeholder="Enter card number (e.g. 4A:2B:9C:7D)" style="text-align:center;font-family:var(--font-mono);">
        <button class="btn btn-primary" onclick="scanRFIDCard()">Scan</button>
      </div>
      <div id="rfid-result"></div>
    </div>
  </div>`;
}

window.scanRFIDCard = function() {
  const input = document.getElementById('rfid-input').value.trim();
  const card = appState.rfidCards.find(c => c.cardNo.toLowerCase() === input.toLowerCase() || c.id === input);
  const result = document.getElementById('rfid-result');
  if (!card) { result.innerHTML = `<div class="card" style="border-color:var(--danger)"><p class="text-danger">❌ Card not found</p></div>`; return; }
  const customer = card.customerId ? appState.customers.find(c=>c.id===card.customerId) : null;
  result.innerHTML = `
    <div class="rfid-card-visual" style="margin-bottom:20px;text-align:left">
      <div class="rfid-chip"></div>
      <div class="rfid-card-number">${card.cardNo}</div>
      <div class="rfid-balance">${fmt(card.balance)}</div>
      <div class="rfid-balance-label">Available Balance</div>
      ${customer ? `<div style="margin-top:12px;font-size:13px;color:var(--text-secondary)">${customer.name} • ${customer.phone}</div>` : '<div style="margin-top:12px;font-size:13px;color:var(--text-muted)">No customer linked</div>'}
      <span class="badge badge-${card.status.toLowerCase()}" style="margin-top:8px">${card.status}</span>
    </div>
    ${card.status==='Active' ? `
      <div class="flex gap-sm justify-center">
        <button class="btn btn-primary" onclick="showLoadBalance('${card.id}')">💰 Load Balance</button>
        <button class="btn btn-secondary" onclick="showDeductBalance('${card.id}')">⬇️ Deduct Payment</button>
        <button class="btn btn-danger" onclick="clearCard('${card.id}')">🔄 Clear & Release</button>
      </div>
    ` : `<p class="text-muted">Card is ${card.status.toLowerCase()}.</p>`}
  `;
};

window.showLoadBalance = function(cardId) {
  const card = appState.rfidCards.find(c=>c.id===cardId);
  showModal('loadbal',`
    <div class="modal-header"><h2>💰 Load Balance — ${card.cardNo}</h2><button class="btn btn-ghost btn-icon" onclick="closeModal('loadbal')">✕</button></div>
    <div class="modal-body">
      <div class="rfid-card-visual mb-md"><div class="rfid-chip"></div><div class="rfid-card-number">${card.cardNo}</div><div class="rfid-balance">${fmt(card.balance)}</div><div class="rfid-balance-label">Current Balance</div></div>
      <div class="form-row">
        <div class="form-group"><label class="form-label">Load Amount (₹)</label><input id="load-amt" type="number" class="form-input" placeholder="500" min="100"></div>
        <div class="form-group"><label class="form-label">Payment Mode</label><select id="load-mode" class="form-select"><option>Cash</option><option>Online</option></select></div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" onclick="closeModal('loadbal')">Cancel</button>
      <button class="btn btn-primary" onclick="confirmLoad('${cardId}')">💰 Load Balance</button>
    </div>
  `);
};

window.confirmLoad = function(cardId) {
  const amt = parseFloat(document.getElementById('load-amt').value);
  const mode = document.getElementById('load-mode').value;
  if (!amt || amt < 100) { toast('Minimum load ₹100', 'error'); return; }
  const card = appState.rfidCards.find(c=>c.id===cardId);
  card.balance += amt;
  card.loadHistory.push({ amount: amt, mode, date: new Date().toISOString().split('T')[0], balance: card.balance });
  toast(`₹${amt} loaded to card ${card.cardNo}`, 'success');
  closeModal('loadbal');
  renderRFID(document.getElementById('page-content'));
};

window.showDeductBalance = function(cardId) {
  const card = appState.rfidCards.find(c=>c.id===cardId);
  showModal('deductbal',`
    <div class="modal-header"><h2>⬇️ Deduct Payment</h2><button class="btn btn-ghost btn-icon" onclick="closeModal('deductbal')">✕</button></div>
    <div class="modal-body">
      <div class="rfid-card-visual mb-md"><div class="rfid-chip"></div><div class="rfid-card-number">${card.cardNo}</div><div class="rfid-balance">${fmt(card.balance)}</div><div class="rfid-balance-label">Available Balance</div></div>
      <div class="form-group"><label class="form-label">Deduction Amount (₹)</label><input id="deduct-amt" type="number" class="form-input" placeholder="0" max="${card.balance}"></div>
      <div class="form-group"><label class="form-label">Order Reference</label><input id="deduct-order" class="form-input" placeholder="e.g. ORD-2026-0425"></div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" onclick="closeModal('deductbal')">Cancel</button>
      <button class="btn btn-primary" onclick="confirmDeduct('${cardId}')">✅ Deduct</button>
    </div>
  `);
};

window.confirmDeduct = function(cardId) {
  const amt = parseFloat(document.getElementById('deduct-amt').value);
  const card = appState.rfidCards.find(c=>c.id===cardId);
  if (!amt || amt <= 0) { toast('Enter valid amount','error'); return; }
  if (amt > card.balance) { toast(`Insufficient balance. Available: ${fmt(card.balance)}`,'error'); return; }
  card.balance -= amt;
  card.loadHistory.push({ amount: -amt, mode: 'Deduction', date: new Date().toISOString().split('T')[0], balance: card.balance });
  toast(`${fmt(amt)} deducted from card`, 'success');
  closeModal('deductbal');
  renderRFID(document.getElementById('page-content'));
};

window.clearCard = function(cardId) {
  if (!confirm('Clear this card and release it to the pool? If balance remains, refund first.')) return;
  const card = appState.rfidCards.find(c=>c.id===cardId);
  if (card.balance > 0) { toast(`Refund ${fmt(card.balance)} to customer first`, 'warning'); return; }
  card.customerId = null; card.status = 'Available';
  toast('Card cleared and available for reassignment', 'success');
  renderRFID(document.getElementById('page-content'));
};

window.blockCard = function(cardId, status) {
  const card = appState.rfidCards.find(c=>c.id===cardId);
  card.status = status;
  toast(`Card ${card.cardNo} → ${status}`, status==='Blocked'?'warning':'success');
  renderRFID(document.getElementById('page-content'));
};

window.showBindCard = function(cardId) {
  const availCards = appState.rfidCards.filter(c=>c.status==='Available');
  showModal('bindcard',`
    <div class="modal-header"><h2>🔗 Bind RFID Card</h2><button class="btn btn-ghost btn-icon" onclick="closeModal('bindcard')">✕</button></div>
    <div class="modal-body">
      <div class="form-row">
        <div class="form-group"><label class="form-label">Select Card</label>
          <select id="bind-card-id" class="form-select">
            ${availCards.map(c=>`<option value="${c.id}" ${c.id===cardId?'selected':''}>${c.cardNo}</option>`).join('')}
          </select>
        </div>
        <div class="form-group"><label class="form-label">Customer</label>
          <select id="bind-cust-id" class="form-select">
            <option value="">Walk-in (no customer link)</option>
            ${appState.customers.map(c=>`<option value="${c.id}">${c.name} (${c.phone})</option>`).join('')}
          </select>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group"><label class="form-label">Initial Load Amount (₹)</label><input id="bind-amount" type="number" class="form-input" placeholder="500" min="0"></div>
        <div class="form-group"><label class="form-label">Payment Mode</label><select id="bind-mode" class="form-select"><option>Cash</option><option>Online</option></select></div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" onclick="closeModal('bindcard')">Cancel</button>
      <button class="btn btn-primary" onclick="confirmBind()">✅ Bind & Activate</button>
    </div>
  `);
};

window.confirmBind = function() {
  const cardId = document.getElementById('bind-card-id').value;
  const custId = document.getElementById('bind-cust-id').value || null;
  const amt = parseFloat(document.getElementById('bind-amount').value) || 0;
  const mode = document.getElementById('bind-mode').value;
  const card = appState.rfidCards.find(c=>c.id===cardId);
  card.customerId = custId; card.status = 'Active'; card.balance = amt;
  if (amt > 0) card.loadHistory.push({ amount: amt, mode, date: new Date().toISOString().split('T')[0], balance: amt });
  toast('Card bound and activated', 'success');
  closeModal('bindcard');
  renderRFID(document.getElementById('page-content'));
};

window.showCardHistory = function(cardId) {
  const card = appState.rfidCards.find(c=>c.id===cardId);
  const customer = card.customerId ? appState.customers.find(c=>c.id===card.customerId) : null;
  showModal('cardhistory',`
    <div class="modal-header"><h2>📋 Card Transactions — ${card.cardNo}</h2><button class="btn btn-ghost btn-icon" onclick="closeModal('cardhistory')">✕</button></div>
    <div class="modal-body">
      <div class="mb-md flex gap-md items-center">
        <div class="rfid-card-visual" style="flex:1"><div class="rfid-chip"></div><div class="rfid-card-number">${card.cardNo}</div><div class="rfid-balance">${fmt(card.balance)}</div><div class="rfid-balance-label">Current Balance</div>${customer?`<div style="margin-top:8px;font-size:13px">${customer.name}</div>`:''}</div>
      </div>
      <table class="data-table">
        <thead><tr><th>Date</th><th>Type</th><th>Amount</th><th>Balance</th></tr></thead>
        <tbody>
          ${card.loadHistory.length ? card.loadHistory.map(h=>`<tr>
            <td>${h.date}</td>
            <td>${h.mode}</td>
            <td style="color:${h.amount<0?'var(--danger)':'var(--success)'}">${h.amount<0?'':'+'}${fmt(h.amount)}</td>
            <td class="font-bold">${fmt(h.balance)}</td>
          </tr>`).join('') : '<tr><td colspan="4" class="text-center text-muted">No transactions</td></tr>'}
        </tbody>
      </table>
    </div>
  `);
};

// ════════════════════════════════════════════════════════════
// PAGE: CUSTOMER MANAGEMENT
// ════════════════════════════════════════════════════════════
function renderCustomers(container) {
  let search = '';
  let filterType = 'All';
  let tab = 'directory';

  function render() {
    let customers = appState.customers;
    if (filterType !== 'All') customers = customers.filter(c => c.type === filterType);
    if (search) customers = customers.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.phone.includes(search) || c.id.includes(search));

    container.innerHTML = `
      <div class="section-header">
        <div class="section-header-left">
          <h2>Customer Management</h2>
          <p>${appState.customers.filter(c=>c.active).length} active customers | ${appState.customers.filter(c=>c.type==='VIP').length} VIP</p>
        </div>
        <button class="btn btn-primary" onclick="showAddCustomer()">+ Add Customer</button>
      </div>

      <div class="tabs">
        <div class="tab ${tab==='directory'?'active':''}" onclick="custTab('directory')">Customer Directory</div>
        <div class="tab ${tab==='dues'?'active':''}" onclick="custTab('dues')">Outstanding Dues (${appState.dues.filter(d=>!d.settled).length})</div>
        <div class="tab ${tab==='analytics'?'active':''}" onclick="custTab('analytics')">Customer Analytics</div>
      </div>

      ${tab === 'directory' ? `
        <div class="flex gap-sm mb-lg" style="flex-wrap:wrap">
          <div class="search-bar" style="flex:1;min-width:200px"><span class="search-icon">🔍</span><input type="text" placeholder="Search by name, phone, or ID..." value="${search}" oninput="custSearch(this.value)"></div>
          ${['All','VIP','Regular','New'].map(t=>`<span class="filter-chip ${filterType===t?'active':''}" onclick="custFilterType('${t}')">${t}</span>`).join('')}
        </div>
        <div class="card" style="padding:0;overflow:hidden">
          <table class="data-table">
            <thead><tr><th>ID</th><th>Customer</th><th>Phone</th><th>Type</th><th>Visits</th><th>Since</th><th>Notes</th><th>Actions</th></tr></thead>
            <tbody>
              ${customers.map(c => `<tr>
                <td class="font-mono text-muted" style="font-size:11px">${c.id}</td>
                <td>
                  <div class="font-bold">${c.name}</div>
                  ${c.email ? `<div style="font-size:11px;color:var(--text-secondary)">${c.email}</div>` : ''}
                </td>
                <td class="font-mono">${c.phone}</td>
                <td><span class="badge badge-${c.type.toLowerCase()}">${c.type}</span></td>
                <td>${Math.floor(Math.random()*20)+2}</td>
                <td>${fmtDate(c.regDate)}</td>
                <td style="font-size:11px;color:var(--text-secondary);max-width:150px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${c.notes || '—'}</td>
                <td class="actions">
                  <button class="btn btn-sm btn-secondary" onclick="showCustomerDetail('${c.id}')">View</button>
                  <button class="btn btn-sm btn-ghost" onclick="toggleCustStatus('${c.id}')">${c.active?'Deactivate':'Activate'}</button>
                </td>
              </tr>`).join('')}
            </tbody>
          </table>
        </div>
      ` : tab === 'dues' ? renderDuesTab() : renderCustomerAnalytics()}
    `;

    window.custSearch = debounce((v) => { search = v; render(); }, 200);
    window.custFilterType = (t) => { filterType = t; render(); };
    window.custTab = (t) => { tab = t; render(); };
  }

  render();
}

function renderDuesTab() {
  const pendingDues = appState.dues.filter(d => !d.settled);
  return `<div class="card">
    ${pendingDues.length === 0 ? `<div class="empty-state"><div class="empty-icon">✅</div><h3>No Pending Dues</h3></div>` :
      `<table class="data-table">
        <thead><tr><th>Customer</th><th>Order</th><th>Amount</th><th>Due Date</th><th>Days Pending</th><th>Notes</th><th>Actions</th></tr></thead>
        <tbody>
          ${pendingDues.map(d => {
            const c = appState.customers.find(c=>c.id===d.customerId);
            const ageColor = d.daysPending > 10 ? 'var(--danger)' : d.daysPending > 5 ? 'var(--warning)' : 'var(--success)';
            return `<tr>
              <td><div class="font-bold">${c?.name}</div><div style="font-size:11px;color:var(--text-secondary)">${c?.phone}</div></td>
              <td class="font-mono" style="font-size:11px">${d.orderId}</td>
              <td class="font-bold text-gold">${fmt(d.amount)}</td>
              <td>${fmtDate(d.dueDate)}</td>
              <td><span style="color:${ageColor};font-weight:700">${d.daysPending}d</span></td>
              <td style="font-size:12px;color:var(--text-secondary)">${d.notes||'—'}</td>
              <td><button class="btn btn-success btn-sm" onclick="settleDue('${d.id}')">✅ Settle</button></td>
            </tr>`;
          }).join('')}
        </tbody>
      </table>`
    }
  </div>`;
}

function renderCustomerAnalytics() {
  const sorted = [...appState.customers].sort((a,b) => Math.random()-0.5);
  return `<div class="grid-2" style="gap:20px">
    <div class="card">
      <div class="card-header"><span style="font-size:20px">🏆</span><div class="card-title">Top Customers by Spend</div></div>
      <table class="data-table">
        <thead><tr><th>#</th><th>Customer</th><th>Type</th><th>Lifetime Spend</th></tr></thead>
        <tbody>
          ${appState.customers.slice(0,6).map((c,i)=>`<tr>
            <td class="text-muted">${i+1}</td>
            <td><div class="font-bold">${c.name}</div><div style="font-size:11px;color:var(--text-secondary)">${c.phone}</div></td>
            <td><span class="badge badge-${c.type.toLowerCase()}">${c.type}</span></td>
            <td class="font-bold text-gold">${fmt(Math.floor(Math.random()*50000)+5000)}</td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
    <div class="card">
      <div class="card-header"><span style="font-size:20px">📊</span><div class="card-title">Customer Breakdown</div></div>
      ${[['VIP', appState.customers.filter(c=>c.type==='VIP').length, appState.customers.length],
         ['Regular', appState.customers.filter(c=>c.type==='Regular').length, appState.customers.length],
         ['New', appState.customers.filter(c=>c.type==='New').length, appState.customers.length]
      ].map(([label, count, total])=>`
        <div class="mb-md">
          <div class="flex justify-between mb-sm"><span class="font-bold">${label}</span><span>${count} (${Math.round(count/total*100)}%)</span></div>
          <div class="progress-bar"><div class="progress-fill" style="width:${count/total*100}%"></div></div>
        </div>
      `).join('')}
      <div class="divider"></div>
      <div class="flex justify-between" style="font-size:13px"><span class="text-secondary">Total Customers:</span><span class="font-bold">${appState.customers.length}</span></div>
      <div class="flex justify-between" style="font-size:13px"><span class="text-secondary">Active:</span><span class="font-bold text-gold">${appState.customers.filter(c=>c.active).length}</span></div>
    </div>
  </div>`;
}

window.settleDue = function(dueId) {
  const due = appState.dues.find(d=>d.id===dueId);
  due.settled = true;
  toast('Due settled successfully', 'success');
  renderCustomers(document.getElementById('page-content'));
};

window.toggleCustStatus = function(custId) {
  const c = appState.customers.find(c=>c.id===custId);
  c.active = !c.active;
  toast(`${c.name} ${c.active?'activated':'deactivated'}`, 'success');
  renderCustomers(document.getElementById('page-content'));
};

window.showCustomerDetail = function(custId) {
  const c = appState.customers.find(c=>c.id===custId);
  const custOrders = appState.orders.filter(o=>o.customerId===custId);
  const totalSpend = custOrders.filter(o=>o.status==='Completed').reduce((s,o)=>s+o.items.reduce((si,i)=>si+i.price*i.qty,0),0);
  showModal('custdetail',`
    <div class="modal-header"><h2>👤 ${c.name}</h2><button class="btn btn-ghost btn-icon" onclick="closeModal('custdetail')">✕</button></div>
    <div class="modal-body">
      <div class="grid-2 mb-md" style="gap:12px">
        <div class="card" style="padding:12px"><div class="text-muted" style="font-size:11px">Customer ID</div><div class="font-mono font-bold">${c.id}</div></div>
        <div class="card" style="padding:12px"><div class="text-muted" style="font-size:11px">Type</div><span class="badge badge-${c.type.toLowerCase()}">${c.type}</span></div>
        <div class="card" style="padding:12px"><div class="text-muted" style="font-size:11px">Phone</div><div class="font-bold">${c.phone}</div></div>
        <div class="card" style="padding:12px"><div class="text-muted" style="font-size:11px">Email</div><div>${c.email||'—'}</div></div>
        <div class="card" style="padding:12px"><div class="text-muted" style="font-size:11px">Address</div><div style="font-size:13px">${c.address||'—'}</div></div>
        <div class="card" style="padding:12px"><div class="text-muted" style="font-size:11px">DOB</div><div>${c.dob?fmtDate(c.dob):'—'}</div></div>
      </div>
      ${c.notes ? `<div class="card mb-md" style="padding:12px;border-color:rgba(245,166,35,0.3)"><span class="text-muted" style="font-size:11px">Notes: </span>${c.notes}</div>` : ''}
      <div class="stats-grid" style="grid-template-columns:repeat(3,1fr)">
        <div class="stat-card" style="--stat-color:var(--accent-gold);padding:12px"><div class="stat-value">${fmt(totalSpend)}</div><div class="stat-label">Lifetime Spend</div></div>
        <div class="stat-card" style="--stat-color:var(--accent-blue);padding:12px"><div class="stat-value">${custOrders.length}</div><div class="stat-label">Total Orders</div></div>
        <div class="stat-card" style="--stat-color:var(--status-available);padding:12px"><div class="stat-value">${fmtDate(c.regDate)}</div><div class="stat-label">Member Since</div></div>
      </div>
      ${custOrders.length > 0 ? `
        <div class="mt-md"><div class="font-bold mb-sm">Order History</div>
        ${custOrders.slice(0,3).map(o=>`<div class="flex justify-between items-center" style="padding:8px 0;border-bottom:1px solid var(--border)">
          <div><div class="font-bold" style="font-size:13px">${o.id}</div><div style="font-size:11px;color:var(--text-secondary)">${o.items.length} items • ${fmtDate(o.createdAt)}</div></div>
          <div style="text-align:right"><div class="text-gold font-bold">${fmt(o.items.reduce((s,i)=>s+i.price*i.qty,0))}</div><span class="badge badge-${o.status.toLowerCase()}">${o.status}</span></div>
        </div>`).join('')}
        </div>
      ` : ''}
    </div>
  `);
};

window.showAddCustomer = function() {
  showModal('addcust',`
    <div class="modal-header"><h2>➕ Add Customer</h2><button class="btn btn-ghost btn-icon" onclick="closeModal('addcust')">✕</button></div>
    <div class="modal-body">
      <div class="form-row">
        <div class="form-group"><label class="form-label">Name <span class="required">*</span></label><input id="c-name" class="form-input" placeholder="Full name"></div>
        <div class="form-group"><label class="form-label">Phone <span class="required">*</span></label><input id="c-phone" class="form-input" placeholder="9XXXXXXXXX"></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label class="form-label">Email</label><input id="c-email" class="form-input" placeholder="email@example.com"></div>
        <div class="form-group"><label class="form-label">Date of Birth</label><input id="c-dob" type="date" class="form-input"></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label class="form-label">Customer Type</label><select id="c-type" class="form-select"><option>Regular</option><option>VIP</option><option>New</option></select></div>
        <div class="form-group"><label class="form-label">Address</label><input id="c-addr" class="form-input" placeholder="City, Area"></div>
      </div>
      <div class="form-group"><label class="form-label">Notes / Preferences</label><textarea id="c-notes" class="form-textarea" placeholder="Dietary restrictions, seating preferences, etc."></textarea></div>
    </div>
    <div class="modal-footer"><button class="btn btn-secondary" onclick="closeModal('addcust')">Cancel</button><button class="btn btn-primary" onclick="confirmAddCustomer()">Add Customer</button></div>
  `);
};

window.confirmAddCustomer = function() {
  const name = document.getElementById('c-name').value.trim();
  const phone = document.getElementById('c-phone').value.trim();
  if (!name || !phone) { toast('Name and phone are required', 'error'); return; }
  const exist = appState.customers.find(c=>c.phone===phone);
  if (exist) { toast('Phone number already registered', 'error'); return; }
  appState.customers.push({
    id: 'CUST' + String(appState.customers.length+1).padStart(3,'0'),
    name, phone, email: document.getElementById('c-email').value, address: document.getElementById('c-addr').value,
    dob: document.getElementById('c-dob').value, notes: document.getElementById('c-notes').value,
    type: document.getElementById('c-type').value, regDate: new Date().toISOString().split('T')[0], active: true
  });
  toast(`Customer ${name} registered`, 'success');
  closeModal('addcust');
  renderCustomers(document.getElementById('page-content'));
};

// ════════════════════════════════════════════════════════════
// PAGE: MENU MANAGEMENT
// ════════════════════════════════════════════════════════════
function renderMenu(container) {
  let filterCat = 'All';
  let filterAvail = 'All';
  let search = '';
  let tab = 'items';

  function render() {
    let items = appState.menuItems;
    if (filterCat !== 'All') items = items.filter(m => m.categoryId === filterCat);
    if (filterAvail === 'Available') items = items.filter(m => m.available);
    if (filterAvail === 'Out of Stock') items = items.filter(m => !m.available);
    if (search) items = items.filter(m => m.name.toLowerCase().includes(search.toLowerCase()) || m.sku.toLowerCase().includes(search.toLowerCase()));

    container.innerHTML = `
      <div class="section-header">
        <div class="section-header-left">
          <h2>Menu Management</h2>
          <p>${appState.menuItems.filter(m=>m.available).length} available of ${appState.menuItems.length} items across ${appState.categories.filter(c=>c.active).length} categories</p>
        </div>
        <div class="flex gap-sm">
          <button class="btn btn-secondary" onclick="menuTab('categories')">🗂 Categories</button>
          <button class="btn btn-primary" onclick="showAddMenuItem()">+ Add Item</button>
        </div>
      </div>

      <div class="tabs">
        <div class="tab ${tab==='items'?'active':''}" onclick="menuTab('items')">Menu Items</div>
        <div class="tab ${tab==='categories'?'active':''}" onclick="menuTab('categories')">Categories</div>
      </div>

      ${tab === 'items' ? `
        <div class="flex gap-sm mb-lg" style="flex-wrap:wrap">
          <div class="search-bar" style="flex:1;min-width:200px"><span class="search-icon">🔍</span><input type="text" placeholder="Search items or SKU..." value="${search}" oninput="menuSearch(this.value)"></div>
          <select class="form-select" style="width:auto" onchange="menuFilterCat(this.value)">
            <option value="All">All Categories</option>
            ${appState.categories.map(c=>`<option value="${c.id}" ${filterCat===c.id?'selected':''}>${c.icon} ${c.name}</option>`).join('')}
          </select>
          ${['All','Available','Out of Stock'].map(s=>`<span class="filter-chip ${filterAvail===s?'active':''}" onclick="menuFilterAvail('${s}')">${s}</span>`).join('')}
        </div>
        <div class="menu-grid">
          ${items.map(item => {
            const cat = appState.categories.find(c=>c.id===item.categoryId);
            return `<div class="menu-item-card ${item.veg?'veg':'non-veg'} ${item.available?'':'unavailable'}">
              <div class="menu-item-header"></div>
              <div class="menu-item-body">
                <div class="menu-item-meta">
                  <span class="veg-indicator ${item.veg?'veg':'non-veg'}"></span>
                  ${item.chefSpecial?`<span class="tag tag-chef">⭐ Chef's Special</span>`:''}
                  ${item.isNew?`<span class="tag tag-new">✨ New</span>`:''}
                  ${!item.available?`<span class="tag" style="background:rgba(239,68,68,0.1);color:var(--danger)">Out of Stock</span>`:''}
                  <span class="tag">${cat?.icon} ${cat?.name}</span>
                </div>
                <div class="menu-item-name">${item.name}</div>
                <div class="menu-item-desc">${item.description}</div>
                <div style="font-size:11px;color:var(--text-muted)">SKU: ${item.sku} | Prep: ${item.prepTime}min | Station: ${item.station}</div>
                ${item.spiceLevel ? `<div style="font-size:11px;margin-top:4px">🌶 ${item.spiceLevel}</div>` : ''}
                <div style="font-size:11px;margin-top:4px;color:var(--text-secondary)">Variants: ${item.variants.join(', ')}</div>
              </div>
              <div class="menu-item-footer">
                <div class="menu-item-price">${fmt(item.price)}</div>
                <div class="flex gap-sm">
                  <button class="btn btn-sm btn-secondary" onclick="toggleItemAvail('${item.id}')">${item.available?'Mark OOS':'Mark Available'}</button>
                  <button class="btn btn-sm btn-ghost" onclick="showEditMenuItem('${item.id}')">✏️</button>
                </div>
              </div>
            </div>`;
          }).join('')}
        </div>
      ` : renderCategoriesTab()}
    `;

    window.menuSearch = debounce((v)=>{search=v;render();},200);
    window.menuFilterCat = (v)=>{filterCat=v;render();};
    window.menuFilterAvail = (v)=>{filterAvail=v;render();};
    window.menuTab = (t)=>{tab=t;render();};
  }

  render();
}

function renderCategoriesTab() {
  return `<div class="card">
    <div class="card-header">
      <div class="card-title">Menu Categories</div>
      <button class="btn btn-primary btn-sm" onclick="showAddCategory()" style="margin-left:auto">+ Add Category</button>
    </div>
    <table class="data-table">
      <thead><tr><th>Icon</th><th>Category</th><th>Description</th><th>GST Rate</th><th>Items</th><th>Status</th><th>Actions</th></tr></thead>
      <tbody>
        ${appState.categories.map(cat=>`<tr>
          <td style="font-size:24px">${cat.icon}</td>
          <td class="font-bold">${cat.name}</td>
          <td class="text-secondary" style="font-size:12px">${cat.description}</td>
          <td>${cat.gstRate}%</td>
          <td>${appState.menuItems.filter(m=>m.categoryId===cat.id).length}</td>
          <td><span class="badge badge-${cat.active?'active':'inactive'}">${cat.active?'Active':'Inactive'}</span></td>
          <td class="actions">
            <button class="btn btn-sm btn-secondary" onclick="toggleCatStatus('${cat.id}')">${cat.active?'Deactivate':'Activate'}</button>
          </td>
        </tr>`).join('')}
      </tbody>
    </table>
  </div>`;
}

window.toggleItemAvail = function(itemId) {
  const item = appState.menuItems.find(m=>m.id===itemId);
  item.available = !item.available;
  toast(`${item.name} → ${item.available?'Available':'Out of Stock'}`, 'success');
  renderMenu(document.getElementById('page-content'));
};

window.toggleCatStatus = function(catId) {
  const cat = appState.categories.find(c=>c.id===catId);
  cat.active = !cat.active;
  toast(`${cat.name} ${cat.active?'activated':'deactivated'}`, 'success');
  renderMenu(document.getElementById('page-content'));
};

window.showAddMenuItem = function() {
  showModal('additem',`
    <div class="modal-header"><h2>➕ Add Menu Item</h2><button class="btn btn-ghost btn-icon" onclick="closeModal('additem')">✕</button></div>
    <div class="modal-body">
      <div class="form-row">
        <div class="form-group"><label class="form-label">Item Name <span class="required">*</span></label><input id="ai-name" class="form-input" placeholder="e.g. Butter Paneer Masala"></div>
        <div class="form-group"><label class="form-label">SKU / Item Code</label><input id="ai-sku" class="form-input" placeholder="e.g. MC-020"></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label class="form-label">Category <span class="required">*</span></label>
          <select id="ai-cat" class="form-select">${appState.categories.map(c=>`<option value="${c.id}">${c.icon} ${c.name}</option>`).join('')}</select>
        </div>
        <div class="form-group"><label class="form-label">Base Price (₹) <span class="required">*</span></label><input id="ai-price" type="number" class="form-input" placeholder="0"></div>
      </div>
      <div class="form-group"><label class="form-label">Description</label><textarea id="ai-desc" class="form-textarea" placeholder="Brief description of the dish..."></textarea></div>
      <div class="form-row">
        <div class="form-group"><label class="form-label">Type</label><select id="ai-veg" class="form-select"><option value="true">🟢 Vegetarian</option><option value="false">🔴 Non-Vegetarian</option></select></div>
        <div class="form-group"><label class="form-label">Spice Level</label><select id="ai-spice" class="form-select"><option value="">None</option><option>mild</option><option>medium</option><option>hot</option><option>extra-hot</option></select></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label class="form-label">Prep Time (min)</label><input id="ai-prep" type="number" class="form-input" placeholder="15"></div>
        <div class="form-group"><label class="form-label">Kitchen Station</label><select id="ai-station" class="form-select"><option>Grill</option><option>Main</option><option>Tandoor</option><option>Beverages</option><option>Desserts</option><option>Fry</option><option>Biryani</option></select></div>
      </div>
      <div class="form-group"><label class="form-label">Variants (comma separated)</label><input id="ai-variants" class="form-input" placeholder="Regular, Large, Jumbo"></div>
      <div class="flex gap-md">
        <label class="flex items-center gap-sm"><input type="checkbox" id="ai-chef"> Chef's Special</label>
        <label class="flex items-center gap-sm"><input type="checkbox" id="ai-new"> Mark as New</label>
      </div>
    </div>
    <div class="modal-footer"><button class="btn btn-secondary" onclick="closeModal('additem')">Cancel</button><button class="btn btn-primary" onclick="confirmAddMenuItem()">Add Item</button></div>
  `);
};

window.confirmAddMenuItem = function() {
  const name = document.getElementById('ai-name').value.trim();
  const price = parseFloat(document.getElementById('ai-price').value);
  const catId = document.getElementById('ai-cat').value;
  if (!name || !price || !catId) { toast('Fill required fields','error'); return; }
  const variants = document.getElementById('ai-variants').value.split(',').map(v=>v.trim()).filter(Boolean) || ['Regular'];
  appState.menuItems.push({
    id: 'ITEM' + String(appState.menuItems.length+1).padStart(3,'0'),
    name, sku: document.getElementById('ai-sku').value || 'NEW-001',
    categoryId: catId, description: document.getElementById('ai-desc').value,
    price, prepTime: parseInt(document.getElementById('ai-prep').value)||15,
    veg: document.getElementById('ai-veg').value === 'true',
    spiceLevel: document.getElementById('ai-spice').value || null,
    chefSpecial: document.getElementById('ai-chef').checked,
    isNew: document.getElementById('ai-new').checked,
    available: true, station: document.getElementById('ai-station').value,
    variants: variants.length ? variants : ['Regular']
  });
  toast(`${name} added to menu`, 'success');
  closeModal('additem');
  renderMenu(document.getElementById('page-content'));
};

window.showEditMenuItem = function(itemId) {
  const item = appState.menuItems.find(m=>m.id===itemId);
  showModal('edititem',`
    <div class="modal-header"><h2>✏️ Edit — ${item.name}</h2><button class="btn btn-ghost btn-icon" onclick="closeModal('edititem')">✕</button></div>
    <div class="modal-body">
      <div class="form-row">
        <div class="form-group"><label class="form-label">Name</label><input id="ei-name" class="form-input" value="${item.name}"></div>
        <div class="form-group"><label class="form-label">Price (₹)</label><input id="ei-price" type="number" class="form-input" value="${item.price}"></div>
      </div>
      <div class="form-group"><label class="form-label">Description</label><textarea id="ei-desc" class="form-textarea">${item.description}</textarea></div>
      <div class="form-row">
        <div class="form-group"><label class="form-label">Prep Time (min)</label><input id="ei-prep" type="number" class="form-input" value="${item.prepTime}"></div>
        <div class="form-group"><label class="form-label">Variants</label><input id="ei-variants" class="form-input" value="${item.variants.join(', ')}"></div>
      </div>
      <div class="flex gap-md">
        <label class="flex items-center gap-sm"><input type="checkbox" id="ei-chef" ${item.chefSpecial?'checked':''}> Chef's Special</label>
        <label class="flex items-center gap-sm"><input type="checkbox" id="ei-new" ${item.isNew?'checked':''}> New</label>
        <label class="flex items-center gap-sm"><input type="checkbox" id="ei-avail" ${item.available?'checked':''}> Available</label>
      </div>
    </div>
    <div class="modal-footer"><button class="btn btn-secondary" onclick="closeModal('edititem')">Cancel</button><button class="btn btn-primary" onclick="confirmEditMenuItem('${itemId}')">Save Changes</button></div>
  `);
};

window.confirmEditMenuItem = function(itemId) {
  const item = appState.menuItems.find(m=>m.id===itemId);
  item.name = document.getElementById('ei-name').value;
  item.price = parseFloat(document.getElementById('ei-price').value) || item.price;
  item.description = document.getElementById('ei-desc').value;
  item.prepTime = parseInt(document.getElementById('ei-prep').value) || item.prepTime;
  item.variants = document.getElementById('ei-variants').value.split(',').map(v=>v.trim()).filter(Boolean);
  item.chefSpecial = document.getElementById('ei-chef').checked;
  item.isNew = document.getElementById('ei-new').checked;
  item.available = document.getElementById('ei-avail').checked;
  toast(`${item.name} updated`, 'success');
  closeModal('edititem');
  renderMenu(document.getElementById('page-content'));
};

window.showAddCategory = function() {
  showModal('addcat',`
    <div class="modal-header"><h2>➕ Add Category</h2><button class="btn btn-ghost btn-icon" onclick="closeModal('addcat')">✕</button></div>
    <div class="modal-body">
      <div class="form-row">
        <div class="form-group"><label class="form-label">Name <span class="required">*</span></label><input id="ac-name" class="form-input" placeholder="Category name"></div>
        <div class="form-group"><label class="form-label">Icon (emoji)</label><input id="ac-icon" class="form-input" placeholder="🍽️"></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label class="form-label">Description</label><input id="ac-desc" class="form-input" placeholder="Brief description"></div>
        <div class="form-group"><label class="form-label">GST Rate (%)</label><select id="ac-gst" class="form-select"><option>5</option><option>12</option><option>18</option><option>28</option></select></div>
      </div>
    </div>
    <div class="modal-footer"><button class="btn btn-secondary" onclick="closeModal('addcat')">Cancel</button><button class="btn btn-primary" onclick="confirmAddCategory()">Add Category</button></div>
  `);
};

window.confirmAddCategory = function() {
  const name = document.getElementById('ac-name').value.trim();
  if (!name) { toast('Category name required','error'); return; }
  appState.categories.push({ id:'CAT00'+(appState.categories.length+1), name, icon: document.getElementById('ac-icon').value||'🍽️', description: document.getElementById('ac-desc').value, gstRate: parseInt(document.getElementById('ac-gst').value), order: appState.categories.length+1, active: true });
  toast(`Category ${name} added`,'success');
  closeModal('addcat');
  renderMenu(document.getElementById('page-content'));
};

// ════════════════════════════════════════════════════════════
// PAGE: STAFF MANAGEMENT
// ════════════════════════════════════════════════════════════
function renderStaff(container) {
  let tab = 'directory';

  function render() {
    container.innerHTML = `
      <div class="section-header">
        <div class="section-header-left">
          <h2>Staff Management</h2>
          <p>${appState.staff.filter(s=>s.status==='Active').length} active staff | ${appState.staff.length} total</p>
        </div>
        ${currentUser.role === 'Admin' ? `<button class="btn btn-primary" onclick="showAddStaff()">+ Add Staff</button>` : ''}
      </div>

      <div class="stats-grid" style="grid-template-columns:repeat(5,1fr);margin-bottom:20px">
        ${['Admin','Manager','Captain','Cashier','Kitchen'].map(role => {
          const count = appState.staff.filter(s=>s.role===role).length;
          const icons = {Admin:'👑',Manager:'📊',Captain:'🍽️',Cashier:'💰',Kitchen:'🔪'};
          return `<div class="stat-card" style="--stat-color:var(--accent-gold);padding:12px">
            <div class="flex justify-between items-center"><div><div class="stat-value">${count}</div><div class="stat-label">${role}</div></div><span style="font-size:20px">${icons[role]||'👤'}</span></div>
          </div>`;
        }).join('')}
      </div>

      <div class="card" style="padding:0;overflow:hidden">
        <table class="data-table">
          <thead><tr><th>ID</th><th>Staff Member</th><th>Role</th><th>Phone</th><th>Joined</th><th>Username</th><th>Status</th>${currentUser.role==='Admin'?'<th>Actions</th>':''}</tr></thead>
          <tbody>
            ${appState.staff.map(s=>`<tr>
              <td class="font-mono text-muted" style="font-size:11px">${s.id}</td>
              <td>
                <div class="flex items-center gap-sm">
                  <div class="user-avatar" style="width:32px;height:32px;font-size:12px">${s.name.split(' ').map(n=>n[0]).join('').slice(0,2)}</div>
                  <div>
                    <div class="font-bold">${s.name}</div>
                    <div style="font-size:11px;color:var(--text-secondary)">${s.email||''}</div>
                  </div>
                </div>
              </td>
              <td>
                <span class="badge" style="background:rgba(${s.role==='Admin'?'245,166,35':s.role==='Manager'?'139,92,246':s.role==='Captain'?'78,137,255':s.role==='Cashier'?'16,185,129':'107,114,128'},0.15);color:${s.role==='Admin'?'var(--accent-gold)':s.role==='Manager'?'var(--accent-purple)':s.role==='Captain'?'var(--accent-blue)':s.role==='Cashier'?'var(--success)':'var(--status-cleaning)'}">
                  ${s.role}
                </span>
              </td>
              <td class="font-mono">${s.phone}</td>
              <td style="font-size:12px">${fmtDate(s.doj)}</td>
              <td class="font-mono text-secondary" style="font-size:12px">${s.username}</td>
              <td><span class="badge badge-${s.status.toLowerCase()}">${s.status}</span></td>
              ${currentUser.role==='Admin' ? `<td class="actions">
                <button class="btn btn-sm btn-secondary" onclick="showEditStaff('${s.id}')">✏️ Edit</button>
                <button class="btn btn-sm btn-ghost" onclick="toggleStaffStatus('${s.id}')">${s.status==='Active'?'Deactivate':'Activate'}</button>
              </td>` : ''}
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  render();
}

window.toggleStaffStatus = function(staffId) {
  const s = appState.staff.find(s=>s.id===staffId);
  if (s.id === currentUser.id) { toast("You can't deactivate yourself",'error'); return; }
  s.status = s.status === 'Active' ? 'Inactive' : 'Active';
  toast(`${s.name} ${s.status==='Active'?'reactivated':'deactivated'}`,'success');
  renderStaff(document.getElementById('page-content'));
};

window.showAddStaff = function() {
  showModal('addstaff',`
    <div class="modal-header"><h2>➕ Add Staff Member</h2><button class="btn btn-ghost btn-icon" onclick="closeModal('addstaff')">✕</button></div>
    <div class="modal-body">
      <div class="form-row">
        <div class="form-group"><label class="form-label">Full Name <span class="required">*</span></label><input id="s-name" class="form-input" placeholder="Full name"></div>
        <div class="form-group"><label class="form-label">Employee ID <span class="required">*</span></label><input id="s-emp" class="form-input" placeholder="EMP008"></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label class="form-label">Phone <span class="required">*</span></label><input id="s-phone" class="form-input" placeholder="9XXXXXXXXX"></div>
        <div class="form-group"><label class="form-label">Email</label><input id="s-email" class="form-input" placeholder="employee@spicegarden.in"></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label class="form-label">Role <span class="required">*</span></label>
          <select id="s-role" class="form-select"><option>Captain</option><option>Cashier</option><option>Kitchen</option><option>Manager</option><option>Admin</option></select>
        </div>
        <div class="form-group"><label class="form-label">Date of Joining</label><input id="s-doj" type="date" class="form-input" value="${new Date().toISOString().split('T')[0]}"></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label class="form-label">Username <span class="required">*</span></label><input id="s-user" class="form-input" placeholder="username"></div>
        <div class="form-group"><label class="form-label">Password <span class="required">*</span></label><input id="s-pass" type="password" class="form-input" placeholder="••••••••"></div>
      </div>
      <div class="form-group"><label class="form-label">Address</label><input id="s-addr" class="form-input" placeholder="Area, City"></div>
    </div>
    <div class="modal-footer"><button class="btn btn-secondary" onclick="closeModal('addstaff')">Cancel</button><button class="btn btn-primary" onclick="confirmAddStaff()">Add Staff</button></div>
  `);
};

window.confirmAddStaff = function() {
  const name = document.getElementById('s-name').value.trim();
  const empId = document.getElementById('s-emp').value.trim();
  const phone = document.getElementById('s-phone').value.trim();
  const username = document.getElementById('s-user').value.trim();
  const password = document.getElementById('s-pass').value;
  if (!name||!empId||!phone||!username||!password) { toast('Fill all required fields','error'); return; }
  const exist = appState.staff.find(s=>s.username===username||s.id===empId);
  if (exist) { toast('Username or Employee ID already exists','error'); return; }
  appState.staff.push({
    id: empId, name, phone, email: document.getElementById('s-email').value,
    role: document.getElementById('s-role').value, username, password,
    doj: document.getElementById('s-doj').value, status: 'Active',
    address: document.getElementById('s-addr').value, photo: null
  });
  toast(`${name} added as ${document.getElementById('s-role').value}`,'success');
  closeModal('addstaff');
  renderStaff(document.getElementById('page-content'));
};

window.showEditStaff = function(staffId) {
  const s = appState.staff.find(s=>s.id===staffId);
  showModal('editstaff',`
    <div class="modal-header"><h2>✏️ Edit Staff — ${s.name}</h2><button class="btn btn-ghost btn-icon" onclick="closeModal('editstaff')">✕</button></div>
    <div class="modal-body">
      <div class="form-row">
        <div class="form-group"><label class="form-label">Full Name</label><input id="es-name" class="form-input" value="${s.name}"></div>
        <div class="form-group"><label class="form-label">Phone</label><input id="es-phone" class="form-input" value="${s.phone}"></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label class="form-label">Email</label><input id="es-email" class="form-input" value="${s.email||''}"></div>
        <div class="form-group"><label class="form-label">Role</label>
          <select id="es-role" class="form-select">${['Captain','Cashier','Kitchen','Manager','Admin'].map(r=>`<option${s.role===r?' selected':''}>${r}</option>`).join('')}</select>
        </div>
      </div>
      <div class="form-group"><label class="form-label">Address</label><input id="es-addr" class="form-input" value="${s.address||''}"></div>
    </div>
    <div class="modal-footer"><button class="btn btn-secondary" onclick="closeModal('editstaff')">Cancel</button><button class="btn btn-primary" onclick="confirmEditStaff('${staffId}')">Save Changes</button></div>
  `);
};

window.confirmEditStaff = function(staffId) {
  const s = appState.staff.find(s=>s.id===staffId);
  s.name = document.getElementById('es-name').value;
  s.phone = document.getElementById('es-phone').value;
  s.email = document.getElementById('es-email').value;
  s.role = document.getElementById('es-role').value;
  s.address = document.getElementById('es-addr').value;
  toast(`${s.name} updated`,'success');
  closeModal('editstaff');
  renderStaff(document.getElementById('page-content'));
};

// ════════════════════════════════════════════════════════════
// PAGE: MIS REPORTS & ANALYTICS
// ════════════════════════════════════════════════════════════
function renderReports(container) {
  let period = 'today';
  let tab = 'sales';

  function render() {
    const data = period === 'today' ? DB.salesSummary.today : period === 'week' ? DB.salesSummary.thisWeek : DB.salesSummary.thisMonth;

    container.innerHTML = `
      <div class="section-header">
        <div class="section-header-left">
          <h2>MIS Reports & Analytics</h2>
          <p>Comprehensive business intelligence — Sales, Customer, Leakage reports</p>
        </div>
        <div class="flex gap-sm">
          <button class="btn btn-secondary btn-sm" onclick="toast('PDF export initiated','info')">📄 Export PDF</button>
          <button class="btn btn-secondary btn-sm" onclick="toast('CSV export initiated','info')">📊 Export CSV</button>
          <button class="btn btn-secondary btn-sm" onclick="toast('Printing report...','info')">🖨 Print</button>
        </div>
      </div>

      <!-- Period Selector -->
      <div class="filter-bar mb-lg">
        <span class="text-secondary font-bold" style="font-size:13px">Period:</span>
        ${[['today','Today'],['week','This Week'],['month','This Month']].map(([k,l])=>`<span class="filter-chip ${period===k?'active':''}" onclick="reportsPeriod('${k}')">${l}</span>`).join('')}
        <div class="flex gap-sm items-center" style="margin-left:auto">
          <input type="date" class="form-input" style="width:140px;padding:6px 10px;font-size:12px">
          <span class="text-muted">→</span>
          <input type="date" class="form-input" style="width:140px;padding:6px 10px;font-size:12px">
          <button class="btn btn-primary btn-sm">Apply</button>
        </div>
      </div>

      <!-- KPIs -->
      <div class="stats-grid" style="margin-bottom:24px">
        <div class="stat-card" style="--stat-color:var(--accent-gold)">
          <span class="stat-icon">💰</span>
          <div class="stat-value">${fmt(data.revenue)}</div>
          <div class="stat-label">Total Revenue</div>
          <div class="stat-change up">↑ 8.2% vs previous</div>
        </div>
        <div class="stat-card" style="--stat-color:var(--accent-blue)">
          <span class="stat-icon">📋</span>
          <div class="stat-value">${fmtNum(data.orders)}</div>
          <div class="stat-label">Total Orders</div>
          <div class="stat-change up">↑ 12 orders</div>
        </div>
        <div class="stat-card" style="--stat-color:var(--accent-purple)">
          <span class="stat-icon">💵</span>
          <div class="stat-value">${fmt(data.avgOrderValue)}</div>
          <div class="stat-label">Avg. Order Value</div>
          <div class="stat-change up">↑ ₹45</div>
        </div>
        <div class="stat-card" style="--stat-color:var(--status-available)">
          <span class="stat-icon">👥</span>
          <div class="stat-value">${fmtNum(data.customers)}</div>
          <div class="stat-label">Customers Served</div>
          <div class="stat-change up">↑ 5.3%</div>
        </div>
      </div>

      <!-- Report Tabs -->
      <div class="tabs">
        <div class="tab ${tab==='sales'?'active':''}" onclick="reportsTab('sales')">Sales Report</div>
        <div class="tab ${tab==='items'?'active':''}" onclick="reportsTab('items')">Item-wise Sales</div>
        <div class="tab ${tab==='captain'?'active':''}" onclick="reportsTab('captain')">Captain Performance</div>
        <div class="tab ${tab==='customer'?'active':''}" onclick="reportsTab('customer')">Customer Report</div>
        <div class="tab ${tab==='leakage'?'active':''}" onclick="reportsTab('leakage')">Revenue Leakage</div>
      </div>

      <div id="report-content"></div>
    `;

    window.reportsPeriod = (p) => { period = p; render(); };
    window.reportsTab = (t) => { tab = t; renderReportTab(); };

    function renderReportTab() {
      const rc = document.getElementById('report-content');
      if (!rc) return;
      if (tab === 'sales') rc.innerHTML = renderSalesReport();
      else if (tab === 'items') rc.innerHTML = renderItemsReport();
      else if (tab === 'captain') rc.innerHTML = renderCaptainReport();
      else if (tab === 'customer') rc.innerHTML = renderCustomerReport();
      else if (tab === 'leakage') rc.innerHTML = renderLeakageReport();
    }
    renderReportTab();
  }

  render();
}

function renderSalesReport() {
  return `<div class="grid-2" style="gap:20px">
    <div class="card">
      <div class="card-title mb-md">📊 Day-wise Revenue</div>
      ${renderBarChart(DB.dailySales)}
      <table class="data-table mt-md">
        <thead><tr><th>Date</th><th>Revenue</th><th>Orders</th><th>Avg. Order</th></tr></thead>
        <tbody>${DB.dailySales.map(d=>`<tr><td>${d.date}</td><td class="font-bold text-gold">${fmt(d.revenue)}</td><td>${d.orders}</td><td>${fmt(d.revenue/d.orders)}</td></tr>`).join('')}</tbody>
      </table>
    </div>
    <div class="card">
      <div class="card-title mb-md">⏰ Peak Hours Analysis</div>
      ${[['12:00–13:00','Lunch Rush',85],['13:00–14:00','Peak',92],['19:00–20:00','Dinner Rush',78],['20:00–21:00','Peak',88],['21:00–22:00','Wind Down',55]].map(([t,l,pct])=>`
        <div class="mb-md">
          <div class="flex justify-between mb-sm"><span class="font-bold">${t}</span><span class="text-secondary">${l} — ${pct}%</span></div>
          <div class="progress-bar"><div class="progress-fill" style="width:${pct}%;background:linear-gradient(90deg,var(--accent-blue),var(--accent-purple))"></div></div>
        </div>
      `).join('')}
    </div>
  </div>`;
}

function renderItemsReport() {
  return `<div class="card">
    <div class="card-title mb-md">🏆 Item-wise Sales Performance</div>
    <table class="data-table">
      <thead><tr><th>Rank</th><th>Item</th><th>Category</th><th>Qty Sold</th><th>Revenue</th><th>Popularity</th></tr></thead>
      <tbody>
        ${DB.topItems.map((item,i)=>{
          const cat = appState.categories.find(c => appState.menuItems.find(m=>m.name===item.name)?.categoryId === c.id);
          return `<tr>
            <td><span style="font-size:16px">${i===0?'🥇':i===1?'🥈':i===2?'🥉':'#'+(i+1)}</span></td>
            <td class="font-bold">${item.name}</td>
            <td class="text-secondary" style="font-size:12px">${cat?.name||'—'}</td>
            <td>${fmtNum(item.qty)}</td>
            <td class="font-bold text-gold">${fmt(item.revenue)}</td>
            <td style="width:150px"><div class="progress-bar"><div class="progress-fill" style="width:${item.qty/150*100}%"></div></div></td>
          </tr>`;
        }).join('')}
      </tbody>
    </table>
  </div>`;
}

function renderCaptainReport() {
  return `<div class="card">
    <div class="card-title mb-md">👨‍🍳 Captain / Waiter Performance</div>
    <table class="data-table">
      <thead><tr><th>Rank</th><th>Captain</th><th>Orders Handled</th><th>Total Revenue</th><th>Avg. Order Value</th><th>Performance</th></tr></thead>
      <tbody>
        ${DB.captainPerformance.map((c,i)=>`<tr>
          <td><span style="font-size:16px">${i===0?'🥇':'🥈'}</span></td>
          <td class="font-bold">${c.name}</td>
          <td>${c.orders}</td>
          <td class="font-bold text-gold">${fmt(c.revenue)}</td>
          <td>${fmt(c.avgValue)}</td>
          <td style="width:150px"><div class="progress-bar"><div class="progress-fill" style="width:${c.revenue/100000*100}%"></div></div></td>
        </tr>`).join('')}
      </tbody>
    </table>
  </div>`;
}

function renderCustomerReport() {
  return `<div class="grid-2" style="gap:20px">
    <div class="card">
      <div class="card-title mb-md">💎 Top Customers by Spend</div>
      <table class="data-table">
        <thead><tr><th>#</th><th>Customer</th><th>Type</th><th>Visits</th><th>Total Spend</th></tr></thead>
        <tbody>
          ${appState.customers.map((c,i)=>`<tr>
            <td class="text-muted">${i+1}</td>
            <td><div class="font-bold">${c.name}</div><div style="font-size:11px;color:var(--text-secondary)">${c.phone}</div></td>
            <td><span class="badge badge-${c.type.toLowerCase()}">${c.type}</span></td>
            <td>${Math.floor(Math.random()*30)+5}</td>
            <td class="font-bold text-gold">${fmt(Math.floor(Math.random()*80000)+10000)}</td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
    <div class="card">
      <div class="card-title mb-md">📅 Customer Trends</div>
      ${[['New Customers','23%',23,'var(--accent-purple)'],['Returning Customers','61%',61,'var(--accent-blue)'],['VIP Customers','16%',16,'var(--accent-gold)']].map(([l,pct,n,c])=>`
        <div class="mb-lg">
          <div class="flex justify-between mb-sm"><span class="font-bold">${l}</span><span style="color:${c}">${pct}</span></div>
          <div class="progress-bar"><div class="progress-fill" style="width:${n}%;background:${c}"></div></div>
        </div>
      `).join('')}
      <div class="card" style="padding:12px;background:var(--bg-input)">
        <div class="flex justify-between"><span class="text-secondary">Outstanding Dues</span><span class="font-bold text-danger">${fmt(appState.dues.filter(d=>!d.settled).reduce((s,d)=>s+d.amount,0))}</span></div>
        <div class="flex justify-between mt-sm"><span class="text-secondary">Customers with Dues</span><span class="font-bold">${appState.dues.filter(d=>!d.settled).length}</span></div>
      </div>
    </div>
  </div>`;
}

function renderLeakageReport() {
  const total = DB.revenuLeakage.reduce((s,l)=>s+l.amount,0);
  return `<div class="card">
    <div class="flex justify-between items-center mb-lg">
      <div class="card-title">⚠️ Revenue Leakage Report</div>
      <div class="font-bold" style="color:var(--danger)">Total Leakage: ${fmt(total)}</div>
    </div>
    <table class="data-table">
      <thead><tr><th>Date & Time</th><th>Type</th><th>Order ID</th><th>Table</th><th>Captain</th><th>Amount</th><th>Reason</th></tr></thead>
      <tbody>
        ${DB.revenuLeakage.map(l=>`<tr>
          <td style="font-size:11px">${fmtDateTime(l.date)}</td>
          <td>
            <span class="badge" style="background:rgba(${l.type.includes('Cancellation')?'239,68,68':l.type.includes('KOT')?'59,130,246':'245,158,11'},0.15);color:${l.type.includes('Cancellation')?'var(--danger)':l.type.includes('KOT')?'var(--accent-blue)':'var(--warning)'}">
              ${l.type}
            </span>
          </td>
          <td class="font-mono" style="font-size:11px">${l.orderId}</td>
          <td>${l.tableId}</td>
          <td>${l.captain}</td>
          <td class="font-bold" style="color:var(--danger)">${l.amount > 0 ? fmt(l.amount) : '—'}</td>
          <td class="text-secondary" style="font-size:12px">${l.reason}</td>
        </tr>`).join('')}
      </tbody>
    </table>
  </div>`;
}

// ════════════════════════════════════════════════════════════
// PAGE: ADMIN CONTROLS
// ════════════════════════════════════════════════════════════
function renderAdmin(container) {
  let tab = 'roles';

  function render() {
    container.innerHTML = `
      <div class="section-header">
        <div class="section-header-left">
          <h2>Admin Controls & Settings</h2>
          <p>System-wide configuration, permissions, and controls</p>
        </div>
      </div>

      <div class="tabs">
        <div class="tab ${tab==='roles'?'active':''}" onclick="adminTab('roles')">Role Permissions</div>
        <div class="tab ${tab==='discount'?'active':''}" onclick="adminTab('discount')">Discount Config</div>
        <div class="tab ${tab==='gst'?'active':''}" onclick="adminTab('gst')">GST & Tax</div>
        <div class="tab ${tab==='kitchen'?'active':''}" onclick="adminTab('kitchen')">Kitchen Stations</div>
        <div class="tab ${tab==='order-del'?'active':''}" onclick="adminTab('order-del')">Order Deletion</div>
      </div>

      <div id="admin-content"></div>
    `;

    window.adminTab = (t) => { tab = t; renderAdminTab(); };
    renderAdminTab();

    function renderAdminTab() {
      const ac = document.getElementById('admin-content');
      if (!ac) return;
      if (tab === 'roles') ac.innerHTML = renderRolesTab();
      else if (tab === 'discount') ac.innerHTML = renderDiscountConfig();
      else if (tab === 'gst') ac.innerHTML = renderGSTConfig();
      else if (tab === 'kitchen') ac.innerHTML = renderKitchenConfig();
      else if (tab === 'order-del') ac.innerHTML = renderOrderDeletion();
    }
  }

  render();
}

function renderRolesTab() {
  const roles = ['Admin','Manager','Captain','Cashier','Kitchen'];
  const modules = [['dashboard','Dashboard'],['customers','Customers'],['menu','Menu'],['tables','Tables'],['orders','Orders'],['billing','Billing'],['rfid','RFID Cards'],['reports','Reports'],['admin','Admin']];
  return `<div class="card" style="overflow:auto">
    <div class="card-title mb-md">🔐 Module-level Access Control</div>
    <table class="data-table" style="min-width:700px">
      <thead>
        <tr>
          <th>Module</th>
          ${roles.map(r=>`<th style="text-align:center">${r}</th>`).join('')}
        </tr>
      </thead>
      <tbody>
        ${modules.map(([id,label])=>`<tr>
          <td class="font-bold">${label}</td>
          ${roles.map(r=>`<td style="text-align:center">
            <span style="font-size:16px">${(ROLE_PERMISSIONS[r]||[]).includes(id)?'✅':'—'}</span>
          </td>`).join('')}
        </tr>`).join('')}
      </tbody>
    </table>
    <div class="mt-md">
      <p class="text-secondary" style="font-size:12px">💡 Role changes take effect on next login. Contact system administrator to modify permissions.</p>
    </div>
  </div>`;
}

function renderDiscountConfig() {
  return `<div class="grid-2" style="gap:20px">
    <div class="card">
      <div class="card-title mb-md">⚙️ Discount Settings</div>
      <div class="form-group">
        <label class="form-label">Maximum Discount Percentage Allowed</label>
        <div class="flex gap-sm items-center">
          <input type="number" class="form-input" value="${appState.settings.maxDiscountPct}" oninput="appState.settings.maxDiscountPct=parseInt(this.value)">
          <span class="text-secondary">%</span>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Approval Threshold (discounts above this need approval)</label>
        <div class="flex gap-sm items-center">
          <span class="text-secondary">₹</span>
          <input type="number" class="form-input" value="${appState.settings.discountThreshold}" oninput="appState.settings.discountThreshold=parseInt(this.value)">
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Approval Mode</label>
        <select class="form-select" onchange="appState.settings.approvalMode=this.value">
          <option value="email_otp" ${appState.settings.approvalMode==='email_otp'?'selected':''}>Email OTP</option>
          <option value="manager_pin">Manager PIN</option>
          <option value="auto">Auto-approve</option>
        </select>
      </div>
      <button class="btn btn-primary" onclick="toast('Discount settings saved','success')">💾 Save Settings</button>
    </div>
    <div class="card">
      <div class="card-title mb-md">📝 Discount Reasons</div>
      ${appState.settings.discountReasons.map((r,i)=>`
        <div class="flex gap-sm items-center mb-sm">
          <input class="form-input" value="${r}" oninput="appState.settings.discountReasons[${i}]=this.value">
          <button class="btn btn-danger btn-icon btn-sm" onclick="appState.settings.discountReasons.splice(${i},1);renderAdmin(document.getElementById('page-content'))">✕</button>
        </div>
      `).join('')}
      <button class="btn btn-secondary btn-sm mt-sm" onclick="appState.settings.discountReasons.push('New Reason');renderAdmin(document.getElementById('page-content'))">+ Add Reason</button>
    </div>
  </div>`;
}

function renderGSTConfig() {
  return `<div class="grid-2" style="gap:20px">
    <div class="card">
      <div class="card-title mb-md">🇮🇳 GST Configuration</div>
      <div class="form-group">
        <label class="form-label">Tax Mode</label>
        <select class="form-select" onchange="appState.settings.taxMode=this.value">
          <option value="exclusive" ${appState.settings.taxMode==='exclusive'?'selected':''}>Tax Exclusive (tax added on top)</option>
          <option value="inclusive" ${appState.settings.taxMode==='inclusive'?'selected':''}>Tax Inclusive (tax included in price)</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">GST Type</label>
        <div class="flex gap-md">
          <label class="flex items-center gap-sm"><input type="radio" name="gst-type" value="cgst_sgst" checked> CGST + SGST (Intra-state)</label>
          <label class="flex items-center gap-sm"><input type="radio" name="gst-type" value="igst"> IGST (Inter-state)</label>
        </div>
      </div>
      <button class="btn btn-primary" onclick="toast('GST config saved','success')">💾 Save</button>
    </div>
    <div class="card">
      <div class="card-title mb-md">📋 Category-wise GST Rates</div>
      <table class="data-table">
        <thead><tr><th>Category</th><th>GST Rate</th><th>CGST</th><th>SGST</th></tr></thead>
        <tbody>
          ${appState.categories.map(c=>`<tr>
            <td>${c.icon} ${c.name}</td>
            <td>
              <select class="form-select" style="width:80px;padding:4px 8px" onchange="c.gstRate=parseInt(this.value)">
                ${[5,12,18,28].map(r=>`<option ${c.gstRate===r?'selected':''}>${r}%</option>`).join('')}
              </select>
            </td>
            <td>${c.gstRate/2}%</td>
            <td>${c.gstRate/2}%</td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
  </div>`;
}

function renderKitchenConfig() {
  return `<div class="card">
    <div class="card-title mb-md">🍳 Kitchen Station Configuration</div>
    <table class="data-table">
      <thead><tr><th>Station</th><th>Printer</th><th>Assigned Categories</th><th>Status</th><th>Actions</th></tr></thead>
      <tbody>
        ${appState.settings.kitchenStations.map(ks=>`<tr>
          <td class="font-bold">${ks.name}</td>
          <td class="font-mono text-secondary" style="font-size:12px">${ks.printer}</td>
          <td>${ks.categories.map(cid => {
            const cat = appState.categories.find(c=>c.id===cid);
            return `<span class="tag">${cat?.icon} ${cat?.name||cid}</span>`;
          }).join(' ')}</td>
          <td><span class="badge badge-active">Online</span></td>
          <td><button class="btn btn-sm btn-secondary" onclick="toast('Test print sent to '+ks.name,'info')">🧪 Test Print</button></td>
        </tr>`).join('')}
      </tbody>
    </table>
    <button class="btn btn-primary mt-md" onclick="toast('Station config saved','success')">💾 Save Configuration</button>
  </div>`;
}

function renderOrderDeletion() {
  return `<div class="card">
    <div class="card-title mb-md">🗑️ Order Deletion Authorization</div>
    <div class="card" style="padding:16px;border-color:rgba(239,68,68,0.3);background:rgba(239,68,68,0.05);margin-bottom:20px">
      <p style="color:var(--danger);font-weight:600">⚠️ Warning: Order deletion is a sensitive operation and requires admin authorization.</p>
      <p class="text-secondary mt-sm" style="font-size:13px">All deletions are logged in the Revenue Leakage report for audit purposes.</p>
    </div>
    <div class="form-group">
      <label class="form-label">Deletion Type</label>
      <div class="flex gap-md">
        <label class="flex items-center gap-sm"><input type="radio" name="del-type" value="soft" checked> Soft Delete (archive, recoverable)</label>
        <label class="flex items-center gap-sm"><input type="radio" name="del-type" value="hard"> Hard Delete (permanent)</label>
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Who Can Delete Orders</label>
      <select class="form-select"><option>Admin Only</option><option>Admin + Manager</option></select>
    </div>
    <div class="divider"></div>
    <div class="card-title mb-md mt-md">Recent Completed Orders (Admin Delete)</div>
    <table class="data-table">
      <thead><tr><th>Order ID</th><th>Table</th><th>Amount</th><th>Status</th><th>Action</th></tr></thead>
      <tbody>
        ${appState.orders.filter(o=>o.status==='Completed').slice(0,3).map(o=>`<tr>
          <td class="font-mono" style="font-size:12px">${o.id}</td>
          <td>${appState.tables.find(t=>t.id===o.tableId)?.name||o.tableId}</td>
          <td class="text-gold">${fmt(o.items.reduce((s,i)=>s+i.price*i.qty,0))}</td>
          <td><span class="badge badge-completed">Completed</span></td>
          <td><button class="btn btn-danger btn-sm" onclick="cancelOrder('${o.id}');toast('Order deleted and logged','warning')">🗑 Delete</button></td>
        </tr>`).join('')}
      </tbody>
    </table>
  </div>`;
}

// ════════════════════════════════════════════════════════════
// MODAL HELPERS
// ════════════════════════════════════════════════════════════
function showModal(id, content, sizeClass='') {
  closeModal(id);
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.id = `overlay-${id}`;
  overlay.onclick = (e) => { if (e.target === overlay) closeModal(id); };
  overlay.innerHTML = `<div class="modal ${sizeClass}" id="modal-${id}">${content}</div>`;
  document.body.appendChild(overlay);
}

function closeModal(id) {
  const el = document.getElementById(`overlay-${id}`);
  if (el) el.remove();
}
window.closeModal = closeModal;

// ════════════════════════════════════════════════════════════
// INIT
// ════════════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  // Login form
  document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const user = document.getElementById('login-username').value;
    const pass = document.getElementById('login-password').value;
    if (!login(user, pass)) {
      toast('Invalid credentials or account inactive', 'error');
      document.getElementById('login-password').value = '';
    }
  });

  // Quick role login buttons
  document.querySelectorAll('.role-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.role-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const creds = JSON.parse(btn.dataset.creds);
      document.getElementById('login-username').value = creds.u;
      document.getElementById('login-password').value = creds.p;
    });
  });
});

// ════════════════════════════════════════════════════════════
// CUSTOMER ORDERING MODULE
// Public route: index.html#order — no login required
// Cart → Cart Drawer → Checkout → Confirmation
// ════════════════════════════════════════════════════════════

(function() {
  // ── Module state ───────────────────────────────────────────
  const coCart = [];   // [{ itemId, name, variant, price, qty }]
  let coCaptchaAnswer = 0;
  let coInitialized = false;

  // ── Helpers ────────────────────────────────────────────────
  const coFmt = (n) => '₹' + parseFloat(n).toLocaleString('en-IN', { maximumFractionDigits: 0 });
  const coGenId = () => 'SG-' + Date.now().toString(36).toUpperCase().slice(-6);

  function coToast(msg) {
    const t = document.createElement('div');
    t.className = 'toast success';
    t.innerHTML = `<span>✅</span><span>${msg}</span>`;
    document.getElementById('toast-container').appendChild(t);
    setTimeout(() => { t.style.opacity='0'; t.style.transition='opacity 0.3s'; setTimeout(()=>t.remove(),300); }, 2500);
  }

  // ── Pickup time slots ──────────────────────────────────────
  function coTimeSlots() {
    const slots = [];
    const now = new Date();
    const startMin = Math.ceil((now.getHours()*60 + now.getMinutes() + 30) / 30) * 30;
    const endMin = 22 * 60;
    for (let m = startMin; m <= endMin; m += 30) {
      const h = Math.floor(m/60), min = m%60;
      const suffix = h >= 12 ? 'PM' : 'AM';
      const dh = h > 12 ? h-12 : (h===0 ? 12 : h);
      slots.push(`${dh}:${min.toString().padStart(2,'0')} ${suffix}`);
    }
    if (!slots.length) {
      for (let m = 11*60; m <= 22*60; m += 30) {
        const h = Math.floor(m/60), min = m%60;
        const suffix = h >= 12 ? 'PM' : 'AM';
        const dh = h > 12 ? h-12 : (h===0 ? 12 : h);
        slots.push(`${dh}:${min.toString().padStart(2,'0')} ${suffix} (Tomorrow)`);
      }
    }
    return slots;
  }

  // ── CAPTCHA ────────────────────────────────────────────────
  function coNewCaptcha() {
    const a = Math.floor(Math.random()*12)+1, b = Math.floor(Math.random()*12)+1;
    const ops = [
      { sym:'+', ans:a+b, q:`${a} + ${b}` },
      { sym:'×', ans:a*b, q:`${a} × ${b}` },
      { sym:'−', ans:Math.abs(a-b), q:`${Math.max(a,b)} − ${Math.min(a,b)}` },
    ];
    const op = ops[Math.floor(Math.random()*ops.length)];
    coCaptchaAnswer = op.ans;
    const el = document.getElementById('co-captcha-q');
    if (el) el.textContent = `${op.q} = ?`;
    const inp = document.getElementById('co-captcha-inp');
    if (inp) inp.value = '';
  }

  // ── Cart totals ────────────────────────────────────────────
  function coTotal() { return coCart.reduce((s,i) => s + i.price*i.qty, 0); }
  function coCount() { return coCart.reduce((s,i) => s + i.qty, 0); }

  // ── Add / change qty ───────────────────────────────────────
  function coAdd(itemId, variant, price) {
    const item = DB.menuItems.find(m => m.id === itemId);
    const ex = coCart.find(i => i.itemId===itemId && i.variant===variant);
    if (ex) ex.qty++;
    else coCart.push({ itemId, name:item.name, variant, price, qty:1 });
    coUpdateUI();
    coRenderGrid(document.querySelector('.co-cat-pill.active')?.dataset?.cat || 'all');
    coToast(`${item.name} added to cart`);
  }
  window.coAdd = coAdd;

  function coChangeQty(itemId, variant, delta) {
    const idx = coCart.findIndex(i => i.itemId===itemId && i.variant===variant);
    if (idx===-1) return;
    coCart[idx].qty = Math.max(0, coCart[idx].qty + delta);
    if (coCart[idx].qty === 0) coCart.splice(idx,1);
    coUpdateUI();
    coRenderGrid(document.querySelector('.co-cat-pill.active')?.dataset?.cat || 'all');
  }
  window.coChangeQty = coChangeQty;

  function coUpdateVariantBtn(itemId, variant, price) {
    const card = document.querySelector(`[data-co-item="${itemId}"]`);
    if (!card) return;
    const wrap = card.querySelector('.co-btn-wrap');
    const cartItem = coCart.find(i => i.itemId===itemId && i.variant===variant);
    if (cartItem) {
      wrap.innerHTML = coQtyCtrl(itemId, variant, cartItem.qty);
    } else {
      wrap.innerHTML = `<button class="co-add-btn" onclick="coAdd('${itemId}','${variant}',${price})">+ Add</button>`;
    }
  }
  window.coUpdateVariantBtn = coUpdateVariantBtn;

  function coQtyCtrl(itemId, variant, qty) {
    return `<div class="co-qty-ctrl">
      <button class="qty-btn" onclick="coChangeQty('${itemId}','${variant}',-1)">−</button>
      <span class="qty-val">${qty}</span>
      <button class="qty-btn" onclick="coChangeQty('${itemId}','${variant}',1)">+</button>
    </div>`;
  }

  // ── Update header / bubble counts ─────────────────────────
  function coUpdateUI() {
    const count = coCount(), total = coTotal();
    const countEl = document.getElementById('co-cart-count');
    const bubbleCount = document.getElementById('co-bubble-count');
    const bubbleTotal = document.getElementById('co-bubble-total');
    const bubble = document.getElementById('co-bubble');
    if (countEl) countEl.textContent = count;
    if (bubbleCount) bubbleCount.textContent = `${count} item${count!==1?'s':''}`;
    if (bubbleTotal) bubbleTotal.textContent = coFmt(total);
    if (bubble) bubble.classList.toggle('show', count > 0);
    coRenderCartList();
  }

  // ── Render cart item list ──────────────────────────────────
  function coRenderCartList() {
    const list = document.getElementById('co-cart-list');
    const empty = document.getElementById('co-cart-empty');
    const summary = document.getElementById('co-cart-summary');
    const proceedBtn = document.getElementById('co-proceed-btn');
    if (!list) return;

    if (coCart.length === 0) {
      list.innerHTML = '';
      if (empty) empty.style.display = 'flex';
      if (summary) summary.innerHTML = '';
      if (proceedBtn) proceedBtn.style.display = 'none';
      return;
    }

    if (empty) empty.style.display = 'none';
    if (proceedBtn) proceedBtn.style.display = 'flex';

    const subtotal = coTotal(), gst = Math.round(subtotal*0.05), grand = subtotal+gst;

    list.innerHTML = coCart.map(item => `
      <div class="co-cart-row">
        <div class="co-cart-info">
          <div class="co-cart-name">${item.name}</div>
          <div class="co-cart-variant">${item.variant}</div>
          <div class="co-cart-price">${coFmt(item.price * item.qty)}</div>
          <div class="co-cart-qty">
            <button class="qty-btn" onclick="coChangeQty('${item.itemId}','${item.variant}',-1)">−</button>
            <span class="qty-val">${item.qty}</span>
            <button class="qty-btn" onclick="coChangeQty('${item.itemId}','${item.variant}',1)">+</button>
          </div>
        </div>
      </div>
    `).join('');

    const summaryHTML = `
      <div class="co-sum-row"><span>Subtotal (${coCount()} items)</span><span>${coFmt(subtotal)}</span></div>
      <div class="co-sum-row"><span>GST (5%)</span><span>${coFmt(gst)}</span></div>
      <div class="co-sum-row total"><span>Total Payable</span><span>${coFmt(grand)}</span></div>
    `;
    if (summary) summary.innerHTML = summaryHTML;

    // Sync checkout order summary
    const chkSummary = document.getElementById('co-checkout-summary');
    if (chkSummary) {
      chkSummary.innerHTML = coCart.map(i =>
        `<div class="co-sum-row"><span>${i.qty}× ${i.name} (${i.variant})</span><span>${coFmt(i.price*i.qty)}</span></div>`
      ).join('') + `
        <div class="co-sum-row" style="border-top:1px solid var(--border);padding-top:8px;margin-top:6px"><span>GST (5%)</span><span>${coFmt(gst)}</span></div>
        <div class="co-sum-row total"><span>Total</span><span>${coFmt(grand)}</span></div>
      `;
    }
  }

  // ── Menu grid ──────────────────────────────────────────────
  function coRenderGrid(filterCat) {
    const grid = document.getElementById('co-menu-grid');
    if (!grid) return;
    let items = DB.menuItems;
    if (filterCat && filterCat !== 'all') items = items.filter(m => m.categoryId === filterCat);

    // Update active pill
    document.querySelectorAll('.co-cat-pill').forEach(p => p.classList.toggle('active', p.dataset.cat === filterCat));

    grid.innerHTML = items.map(item => {
      const cartItem = coCart.find(i => i.itemId===item.id && i.variant===item.variants[0]);
      return `
        <div class="co-item-card ${item.available ? '' : 'oos'}" data-co-item="${item.id}">
          <div class="co-item-accent ${item.veg ? 'veg' : 'non-veg'}"></div>
          <div class="co-item-body">
            <div class="co-item-meta">
              <span class="veg-indicator ${item.veg ? 'veg' : 'non-veg'}"></span>
              ${item.chefSpecial ? `<span class="tag tag-chef">⭐ Chef's Special</span>` : ''}
              ${item.isNew ? `<span class="tag tag-new">✨ New</span>` : ''}
              ${!item.available ? `<span class="badge badge-inactive">Out of Stock</span>` : ''}
            </div>
            <div class="co-item-name">${item.name}</div>
            <div class="co-item-desc">${item.description}</div>
          </div>
          <div class="co-item-footer">
            <div>
              <div class="co-item-price">${coFmt(item.price)}</div>
              <div class="co-item-prep">🕐 ${item.prepTime} min</div>
            </div>
            <div style="display:flex;flex-direction:column;align-items:flex-end;gap:6px">
              ${item.variants.length > 1
                ? `<select class="co-variant-sel" onchange="coUpdateVariantBtn('${item.id}',this.value,${item.price})">
                    ${item.variants.map(v=>`<option value="${v}">${v}</option>`).join('')}
                   </select>`
                : ''}
              <div class="co-btn-wrap">
                ${item.available
                  ? (cartItem
                      ? coQtyCtrl(item.id, item.variants[0], cartItem.qty)
                      : `<button class="co-add-btn" onclick="coAdd('${item.id}','${item.variants[0]}',${item.price})">+ Add</button>`)
                  : ''}
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }
  window.coRenderGrid = coRenderGrid;

  // ── Category bar ───────────────────────────────────────────
  function coRenderCatBar() {
    const bar = document.getElementById('co-cat-bar');
    if (!bar) return;
    const cats = DB.categories.filter(c => c.active && DB.menuItems.some(m => m.categoryId===c.id));
    bar.innerHTML = `
      <button class="co-cat-pill active" data-cat="all" onclick="coRenderGrid('all')">🍽️ All Items</button>
      ${cats.map(c => `<button class="co-cat-pill" data-cat="${c.id}" onclick="coRenderGrid('${c.id}')">${c.icon} ${c.name}</button>`).join('')}
    `;
  }

  // ── Drawer show/hide ───────────────────────────────────────
  function coOpenDrawer() {
    document.getElementById('co-drawer').classList.add('open');
    coShowCartPanel();
  }
  function coCloseDrawer() { document.getElementById('co-drawer').classList.remove('open'); }

  function coShowCartPanel() {
    document.getElementById('co-cart-panel').style.display = 'block';
    document.getElementById('co-checkout-panel').style.display = 'none';
    document.getElementById('co-proceed-btn').style.display = coCart.length ? 'flex' : 'none';
    document.getElementById('co-submit-btn').style.display = 'none';
    const t = document.getElementById('co-drawer-title');
    if (t) t.textContent = '🛒 Your Cart';
  }

  function coShowCheckoutPanel() {
    if (!coCart.length) { coToast('Add items to cart first'); return; }
    document.getElementById('co-cart-panel').style.display = 'none';
    document.getElementById('co-checkout-panel').style.display = 'block';
    document.getElementById('co-proceed-btn').style.display = 'none';
    document.getElementById('co-submit-btn').style.display = 'flex';
    const t = document.getElementById('co-drawer-title');
    if (t) t.textContent = '📋 Checkout';

    // Populate time slots
    const sel = document.getElementById('co-pickup');
    if (sel) {
      sel.innerHTML = '<option value="">Select a time slot</option>' +
        coTimeSlots().map(s => `<option value="${s}">${s}</option>`).join('');
    }
    coRenderCartList();
    coNewCaptcha();
  }

  // ── Validate & submit ──────────────────────────────────────
  function coSubmit() {
    let valid = true;
    const name = document.getElementById('co-name').value.trim();
    const phone = document.getElementById('co-phone').value.trim();
    const time = document.getElementById('co-pickup').value;
    const capVal = parseInt(document.getElementById('co-captcha-inp').value);

    const setErr = (id, msg) => {
      const el = document.getElementById(id);
      if (el) { el.textContent = msg; el.classList.toggle('show', !!msg); }
    };

    if (!name || name.length < 2) { setErr('co-err-name','Please enter your full name'); valid=false; }
    else setErr('co-err-name','');

    if (!phone || !/^[6-9]\d{9}$/.test(phone)) { setErr('co-err-phone','Enter a valid 10-digit Indian mobile number'); valid=false; }
    else setErr('co-err-phone','');

    if (!time) { setErr('co-err-time','Please select a pickup time'); valid=false; }
    else setErr('co-err-time','');

    if (isNaN(capVal) || capVal !== coCaptchaAnswer) {
      setErr('co-err-captcha','Incorrect answer — please try again');
      coNewCaptcha(); valid=false;
    } else setErr('co-err-captcha','');

    if (!valid) return;

    // Show confirmation
    const subtotal = coTotal(), gst = Math.round(subtotal*0.05), grand = subtotal+gst;
    const orderId = coGenId();

    document.getElementById('co-confirm-id-val').textContent = orderId;
    document.getElementById('co-confirm-name').textContent = name;
    document.getElementById('co-confirm-phone').textContent = phone;
    document.getElementById('co-confirm-time').textContent = time;
    document.getElementById('co-confirm-items').textContent = coCart.map(i=>`${i.qty}× ${i.name}`).join(', ');
    document.getElementById('co-confirm-total').textContent = coFmt(grand);
    document.getElementById('co-confirm-screen').classList.add('show');
    coCloseDrawer();
  }

  function coResetOrder() {
    coCart.length = 0;
    document.getElementById('co-confirm-screen').classList.remove('show');
    coUpdateUI();
    coRenderGrid('all');
    ['co-name','co-phone'].forEach(id => { const el = document.getElementById(id); if (el) el.value=''; });
    coShowCartPanel();

    // Reset category pills
    document.querySelectorAll('.co-cat-pill').forEach(p => p.classList.toggle('active', p.dataset.cat==='all'));
    window.scrollTo({ top:0, behavior:'smooth' });
  }

  // ── Init (called once when view becomes active) ────────────
  window.coInitOrderPage = function() {
    if (coInitialized) { coUpdateUI(); coRenderGrid('all'); return; }
    coInitialized = true;

    coRenderCatBar();
    coRenderGrid('all');
    coNewCaptcha();

    const bind = (id, fn) => { const el = document.getElementById(id); if (el) el.addEventListener('click', fn); };
    bind('co-cart-btn-header', coOpenDrawer);
    bind('co-bubble', coOpenDrawer);
    bind('co-drawer-close', coCloseDrawer);
    bind('co-proceed-btn', coShowCheckoutPanel);
    bind('co-checkout-back', coShowCartPanel);
    bind('co-captcha-refresh', coNewCaptcha);
    bind('co-submit-btn', coSubmit);
    bind('co-new-order-btn', coResetOrder);

    // Phone numbers only
    const phoneEl = document.getElementById('co-phone');
    if (phoneEl) phoneEl.addEventListener('input', function() { this.value = this.value.replace(/\D/g,'').slice(0,10); });

    coUpdateUI();
  };
})();
