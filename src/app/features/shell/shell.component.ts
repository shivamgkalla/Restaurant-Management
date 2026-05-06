import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AsyncPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { Observable, Subscription, interval } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AuthService } from '../../core/services/auth.service';
import { StateService } from '../../core/services/state.service';
import { Staff } from '../../core/models';

interface NavItem {
  id: string;
  icon: string;
  label: string;
  section: string;
  route: string;
}

const ALL_NAV: NavItem[] = [
  { id:'dashboard', icon:'📊', label:'Dashboard',            section:'MAIN',        route:'/app/dashboard' },
  { id:'zones',     icon:'📍', label:'Zone Management',      section:'OPERATIONS',  route:'/app/zones'     },
  { id:'tables',    icon:'🪑', label:'Table Management',     section:'OPERATIONS',  route:'/app/tables'    },
  { id:'orders',    icon:'📋', label:'Order Management',     section:'OPERATIONS',  route:'/app/orders'    },
  { id:'kitchen-station', icon:'🍳', label:'Kitchen Station Management', section:'OPERATIONS', route:'/app/kitchen-station' },
  { id:'billing',   icon:'🧾', label:'Billing & Settlement', section:'OPERATIONS',  route:'/app/billing'   },
  { id:'rfid',      icon:'💳', label:'RFID Card System',     section:'OPERATIONS',  route:'/app/rfid'      },
  { id:'customers', icon:'👥', label:'Customer Management',  section:'MANAGEMENT',  route:'/app/customers' },
  { id:'category',  icon:'🗂️', label:'Menu Category Management', section:'MANAGEMENT', route:'/app/category' },
  { id:'menu',      icon:'🍽️', label:'Menu Management',      section:'MANAGEMENT',  route:'/app/menu'      },
  { id:'staff',     icon:'👤', label:'Staff Management',     section:'MANAGEMENT',  route:'/app/staff'     },
  { id:'reports',   icon:'📈', label:'MIS Reports',          section:'ANALYTICS',   route:'/app/reports'   },
  { id:'admin',     icon:'⚙️', label:'Admin Controls',       section:'SETTINGS',    route:'/app/admin'     },
];

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, AsyncPipe, NgFor, NgIf],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.css',
})
export class ShellComponent implements OnInit, OnDestroy {
  visibleNav: NavItem[] = [];
  activeOrderCount$!: Observable<number>;
  currentUser$!: Observable<Staff | null>;
  clock = '';
  pageTitle = 'Dashboard';

  private clockSub!: Subscription;
  private routerSub!: Subscription;

  constructor(
    private auth: AuthService,
    private state: StateService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.currentUser$ = this.auth.currentUser$;
    this.visibleNav = ALL_NAV.filter(item => this.auth.canAccess(item.id));

    this.activeOrderCount$ = this.state.select('orders').pipe(
      map(orders => orders.filter(o => ['Pending','Preparing','Served'].includes(o.status)).length)
    );

    this.clockSub = interval(1000).pipe(startWith(0)).subscribe(() => {
      this.clock = new Date().toLocaleTimeString('en-IN', { hour12: true, hour: '2-digit', minute: '2-digit', second: '2-digit' });
    });

    this.routerSub = this.router.events.subscribe(() => {
      const url = this.router.url.split('?')[0].split('/').pop() ?? '';
      this.pageTitle = PAGE_TITLES[url] ?? 'Spice Garden';
    });
  }

  ngOnDestroy(): void {
    this.clockSub?.unsubscribe();
    this.routerSub?.unsubscribe();
  }

  isFirstInSection(index: number): boolean {
    if (index === 0) return true;
    return this.visibleNav[index].section !== this.visibleNav[index - 1].section;
  }

  initials(name: string): string {
    return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  }

  logout(): void {
    this.auth.logout();
  }
}

const PAGE_TITLES: Record<string, string> = {
  dashboard: 'Dashboard',
  zones:     'Zone Management',
  tables:    'Table Management',
  orders:    'Order Management',
  'kitchen-station': 'Kitchen Station Management',
  billing:   'Billing & Settlement',
  rfid:      'RFID Card System',
  customers: 'Customer Management',
  category:  'Menu Category Management',
  menu:      'Menu Management',
  staff:     'Staff Management',
  reports:   'MIS Reports & Analytics',
  admin:     'Admin Controls',
};
