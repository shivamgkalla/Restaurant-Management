import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { GenericService } from './generic.service';

export interface CustomerAuthUser {
  id: number;
  name: string;
  phone: string;
}

export interface CustomerLoginPayload {
  phone: string;
  password: string;
}

export interface CustomerRegisterPayload {
  name: string;
  phone: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class CustomerAuthService {
  private static readonly ACCESS_TOKEN_KEY = 'spicegarden_customer_access_token';
  private static readonly REFRESH_TOKEN_KEY = 'spicegarden_customer_refresh_token';
  private static readonly USER_KEY = 'spicegarden_customer_user';

  private readonly user$ = new BehaviorSubject<CustomerAuthUser | null>(null);
  readonly currentCustomer$: Observable<CustomerAuthUser | null> = this.user$.asObservable();
  readonly isLoggedIn$: Observable<boolean> = this.user$.pipe(map(u => u !== null));

  constructor(
    private generic: GenericService,
    private router: Router,
  ) {
    this.restoreFromStorage();
  }

  get currentCustomer(): CustomerAuthUser | null {
    return this.user$.value;
  }

  login(payload: CustomerLoginPayload): Observable<unknown> {
    return this.generic.Post('customer-auth/login', payload);
  }

  register(payload: CustomerRegisterPayload): Observable<unknown> {
    return this.generic.Post('customer-auth/register', payload);
  }

  setSession(payload: {
    accessToken: string;
    refreshToken?: string;
    customer: CustomerAuthUser;
  }): void {
    localStorage.setItem(CustomerAuthService.ACCESS_TOKEN_KEY, payload.accessToken);
    if (payload.refreshToken) {
      localStorage.setItem(CustomerAuthService.REFRESH_TOKEN_KEY, payload.refreshToken);
    }
    localStorage.setItem(CustomerAuthService.USER_KEY, JSON.stringify(payload.customer));
    this.user$.next(payload.customer);
  }

  logout(navigate = true): void {
    this.user$.next(null);
    localStorage.removeItem(CustomerAuthService.ACCESS_TOKEN_KEY);
    localStorage.removeItem(CustomerAuthService.REFRESH_TOKEN_KEY);
    localStorage.removeItem(CustomerAuthService.USER_KEY);
    if (navigate) {
      void this.router.navigate(['/customer/login'], { replaceUrl: true });
    }
  }

  getAccessToken(): string | null {
    return localStorage.getItem(CustomerAuthService.ACCESS_TOKEN_KEY);
  }

  applyAuthResponse(res: unknown, fallback?: { name?: string; phone?: string }): boolean {
    const parsed = this.parseAuthResponse(res, fallback);
    if (!parsed) return false;
    this.setSession(parsed);
    return true;
  }

  private parseAuthResponse(
    res: unknown,
    fallback?: { name?: string; phone?: string },
  ): {
    accessToken: string;
    refreshToken?: string;
    customer: CustomerAuthUser;
  } | null {
    const root = res as Record<string, unknown> | null;
    if (!root) return null;

    const responseCode = Number(root['responseCode'] ?? root['statusCode'] ?? 200);
    if (responseCode !== 200 && responseCode !== 201) return null;
    if (root['success'] === false) return null;

    const data = root['data'];
    const result = root['result'];
    const payload: Record<string, unknown> =
      root['access_token'] || root['accessToken']
        ? root
        : data && typeof data === 'object'
          ? (data as Record<string, unknown>)
          : result && typeof result === 'object'
            ? (result as Record<string, unknown>)
            : root;

    const accessToken = String(
      payload['access_token'] ?? payload['accessToken'] ?? '',
    ).trim();
    if (!accessToken) return null;

    const refreshToken = String(
      payload['refresh_token'] ?? payload['refreshToken'] ?? '',
    ).trim();

    const customerRaw =
      (payload['customer'] as Record<string, unknown> | undefined) ??
      (payload['user'] as Record<string, unknown> | undefined) ??
      payload;

    const id = Number(customerRaw['id'] ?? customerRaw['customer_id'] ?? 0);
    const name =
      String(customerRaw['name'] ?? '').trim() ||
      fallback?.name?.trim() ||
      'Customer';
    const phone = String(customerRaw['phone'] ?? '').trim() || fallback?.phone?.trim() || '';
    if (!phone) return null;

    return {
      accessToken,
      refreshToken: refreshToken || undefined,
      customer: { id, name, phone },
    };
  }

  private restoreFromStorage(): void {
    const raw = localStorage.getItem(CustomerAuthService.USER_KEY);
    if (!raw || !localStorage.getItem(CustomerAuthService.ACCESS_TOKEN_KEY)) return;
    try {
      const user = JSON.parse(raw) as CustomerAuthUser;
      if (user?.id && user?.phone) {
        this.user$.next(user);
      }
    } catch {
      // ignore corrupted storage
    }
  }
}
