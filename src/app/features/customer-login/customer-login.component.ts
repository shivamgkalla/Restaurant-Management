import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { CustomerAuthService } from '../../core/services/customer-auth.service';
import { ToastService } from '../../core/services/toast.service';
import { ApiLoaderComponent } from '../../shared/components/api-loader/api-loader.component';

type CustomerAuthMode = 'login' | 'register';

@Component({
  selector: 'app-customer-login',
  standalone: true,
  imports: [FormsModule, NgIf, RouterLink, ApiLoaderComponent],
  templateUrl: './customer-login.component.html',
  styleUrl: './customer-login.component.css',
})
export class CustomerLoginComponent implements OnInit {
  mode: CustomerAuthMode = 'login';
  name = '';
  phone = '';
  password = '';
  showPassword = false;
  errorMsg = '';
  isSubmitting = false;

  constructor(
    private customerAuth: CustomerAuthService,
    private router: Router,
    private toast: ToastService,
  ) {}

  ngOnInit(): void {
    if (this.customerAuth.currentCustomer) {
      void this.router.navigate(['/order'], { replaceUrl: true });
    }
  }

  setMode(mode: CustomerAuthMode): void {
    this.mode = mode;
    this.errorMsg = '';
  }

  onSubmit(): void {
    if (this.isSubmitting) return;
    this.errorMsg = '';

    const phone = this.phone.trim();
    const password = this.password;

    if (!phone || !password) {
      this.errorMsg = 'Please enter phone and password.';
      return;
    }

    if (this.mode === 'register') {
      const name = this.name.trim();
      if (!name) {
        this.errorMsg = 'Please enter your name.';
        return;
      }
      if (password.length < 6) {
        this.errorMsg = 'Password must be at least 6 characters.';
        return;
      }
      this.submitRegister({ name, phone, password });
      return;
    }

    this.submitLogin({ phone, password });
  }

  private submitLogin(payload: { phone: string; password: string }): void {
    this.isSubmitting = true;
    this.customerAuth
      .login(payload)
      .pipe(finalize(() => (this.isSubmitting = false)))
      .subscribe({
        next: (res) => {
          if (this.isAuthFailure(res)) {
            this.errorMsg = this.extractMessage(res) ?? 'Login failed. Please check your credentials.';
            return;
          }
          if (this.customerAuth.applyAuthResponse(res, { phone: payload.phone })) {
            this.toast.show('Welcome! You can now browse the menu.');
            void this.router.navigate(['/order']);
            return;
          }
          this.errorMsg = this.extractMessage(res) ?? 'Login failed. Please check your credentials.';
        },
        error: (err: HttpErrorResponse) => this.handleError(err, 'Login failed. Please try again.'),
      });
  }

  private submitRegister(payload: { name: string; phone: string; password: string }): void {
    this.isSubmitting = true;
    this.customerAuth
      .register(payload)
      .pipe(finalize(() => (this.isSubmitting = false)))
      .subscribe({
        next: (res) => {
          if (this.isAuthFailure(res)) {
            this.errorMsg = this.extractMessage(res) ?? 'Registration failed.';
            return;
          }
          if (
            this.customerAuth.applyAuthResponse(res, {
              name: payload.name,
              phone: payload.phone,
            })
          ) {
            this.toast.show('Account created. Welcome!');
            void this.router.navigate(['/order']);
            return;
          }
          const responseCode = Number((res as { responseCode?: number; statusCode?: number })?.responseCode
            ?? (res as { statusCode?: number })?.statusCode ?? 200);
          if (responseCode === 200 || responseCode === 201) {
            this.toast.show('Registration successful. Please sign in.');
            this.mode = 'login';
            this.password = '';
            return;
          }
          this.errorMsg = this.extractMessage(res) ?? 'Registration failed.';
        },
        error: (err: HttpErrorResponse) => this.handleError(err, 'Registration failed. Please try again.'),
      });
  }

  private handleError(err: HttpErrorResponse, fallback: string): void {
    const status = err.error?.statusCode ?? err.status;
    const apiMessage = err.error?.message || err.error?.errors?.[0] || err.message;
    const prefix = status ? `Error ${status}: ` : '';
    this.errorMsg = `${prefix}${apiMessage || fallback}`;
  }

  private extractMessage(res: unknown): string | undefined {
    if (!res || typeof res !== 'object') return undefined;
    const msg = (res as { message?: string }).message;
    return typeof msg === 'string' && msg.trim() ? msg.trim() : undefined;
  }

  private isAuthFailure(res: unknown): boolean {
    if (!res || typeof res !== 'object') return false;
    const root = res as { responseCode?: number; statusCode?: number; success?: boolean };
    const code = Number(root.responseCode ?? root.statusCode ?? 200);
    if (root.success === false) return true;
    return code !== 200 && code !== 201;
  }
}
