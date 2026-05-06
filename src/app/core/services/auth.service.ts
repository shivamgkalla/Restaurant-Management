import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { ROLE_PERMISSIONS, Staff, UserRole } from '../models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private static readonly ACCESS_TOKEN_KEY = 'spicegarden_access_token';
  private static readonly REFRESH_TOKEN_KEY = 'spicegarden_refresh_token';
  private static readonly CURRENT_USER_KEY = 'spicegarden_current_user';

  private _currentUser$ = new BehaviorSubject<Staff | null>(null);
  readonly currentUser$: Observable<Staff | null> = this._currentUser$.asObservable();
  readonly isLoggedIn$: Observable<boolean> = this._currentUser$.pipe(map(u => u !== null));

  constructor(private router: Router) {
    this.restoreFromStorage();
  }

  get currentUser(): Staff | null {
    return this._currentUser$.value;
  }

  setSession(payload: {
    accessToken: string;
    refreshToken: string;
    staff: { id: number | string; employee_id?: string; name: string; username: string; role: string };
  }): void {
    const role = normalizeRole(payload.staff.role);
    const user: Staff = {
      id: String(payload.staff.employee_id ?? payload.staff.id),
      name: payload.staff.name,
      role,
      username: payload.staff.username,
      password: '',
      phone: '',
      email: '',
      doj: '',
      status: 'Active',
      photo: null,
      address: '',
    };

    localStorage.setItem(AuthService.ACCESS_TOKEN_KEY, payload.accessToken);
    localStorage.setItem(AuthService.REFRESH_TOKEN_KEY, payload.refreshToken);
    localStorage.setItem(AuthService.CURRENT_USER_KEY, JSON.stringify(user));
    this._currentUser$.next(user);
  }

  logout(): void {
    this._currentUser$.next(null);
    try {
      localStorage.clear();
    } catch {
      localStorage.removeItem(AuthService.ACCESS_TOKEN_KEY);
      localStorage.removeItem(AuthService.REFRESH_TOKEN_KEY);
      localStorage.removeItem(AuthService.CURRENT_USER_KEY);
    }
    void this.router.navigate(['/login'], { replaceUrl: true });
  }

  canAccess(module: string): boolean {
    const user = this._currentUser$.value;
    if (!user) return false;
    return (ROLE_PERMISSIONS[user.role] ?? []).includes(module);
  }

  canAccess$(module: string): Observable<boolean> {
    return this._currentUser$.pipe(
      map(user => {
        if (!user) return false;
        return (ROLE_PERMISSIONS[user.role] ?? []).includes(module);
      })
    );
  }

  getAllowedRoutes(): string[] {
    const user = this._currentUser$.value;
    if (!user) return [];
    return ROLE_PERMISSIONS[user.role] ?? [];
  }

  getAccessToken(): string | null {
    return localStorage.getItem(AuthService.ACCESS_TOKEN_KEY);
  }

  private restoreFromStorage(): void {
    const raw = localStorage.getItem(AuthService.CURRENT_USER_KEY);
    if (!raw) return;
    try {
      const user = JSON.parse(raw) as Staff;
      if (!user?.username) return;
      this._currentUser$.next(user);
    } catch {
      // ignore corrupted storage
    }
  }
}

function normalizeRole(role: string): UserRole {
  const r = (role ?? '').trim().toLowerCase();
  if (r === 'admin') return 'Admin';
  if (r === 'manager') return 'Manager';
  if (r === 'captain') return 'Captain';
  if (r === 'cashier') return 'Cashier';
  if (r === 'kitchen') return 'Kitchen';
  // fallback: safest default (least privilege) could be 'Captain'
  return 'Captain';
}
