import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { finalize } from 'rxjs/operators';
import { AuthService } from '../../core/services/auth.service';
import { ToastService } from '../../core/services/toast.service';
import { LoginService } from '../../core/services/login.service';
import { ApiLoaderComponent } from '../../shared/components/api-loader/api-loader.component';
interface QuickRole {
  label: string;
  icon: string;
  username: string;
  password: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf, ApiLoaderComponent,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  username = '';
  password = '';
  showPassword = false;
  errorMsg = '';
  /** Prevents double submit while login request is in flight */
  isSubmitting = false;

  quickRoles: QuickRole[] = [
    { label:'Admin',     icon:'👑', username:'admin',    password:'admin123'   },
    { label:'Manager',   icon:'📊', username:'manager',  password:'manager123' },
    { label:'Captain',   icon:'🍽️', username:'captain1', password:'cap123'     },
    { label:'Cashier',   icon:'💰', username:'cashier',  password:'cash123'    },
    { label:'Kitchen',   icon:'🔪', username:'kitchen',  password:'kitchen123' },
    { label:'Captain 2', icon:'🍽️', username:'captain2', password:'cap456'     },
  ];

  constructor(
    private auth: AuthService,
    private router: Router,
    private toast: ToastService,
    private loginService: LoginService,
  ) {}

  quickLogin(role: QuickRole): void {
    this.username = role.username;
    this.password = role.password;
    this.doLogin();
  }

  onSubmit(): void {
    this.doLogin();
  }

  private doLogin(): void {
    if (this.isSubmitting) {
      return;
    }
    this.errorMsg = '';
    const username = this.username.trim();
    const password = this.password;
    if (!username || !password) {
      this.errorMsg = 'Please enter username/username and password.';
      return;
    }

    this.isSubmitting = true;
    this.loginService
      .login({ username, password })
      .pipe(finalize(() => (this.isSubmitting = false)))
      .subscribe({
      next: (res) => {
        const responseCode = Number((res as any)?.responseCode ?? 200);
        const responseMessage = (res as any)?.message as string | undefined;

        // Handle wrapped API response codes first.
        if (responseCode === 400) {
          this.errorMsg = responseMessage ?? 'Invalid request. Please check your credentials.';
          return;
        }
        if (responseCode === 404) {
          this.errorMsg = responseMessage ?? 'User not found.'; 
          return;
        }
        if (responseCode === 500) {
          this.errorMsg = responseMessage ?? 'Server error. Please try again later.';
          return;
        }
        if (responseCode !== 200) {
          this.errorMsg = responseMessage ?? `Login failed with code ${responseCode}.`;
          return;
        }

        // Support both direct and wrapped success payloads.
        const payload: any = (res as any)?.access_token
          ? res
          : (res as any)?.data ?? (res as any)?.result ?? res;
        const accessToken = payload.access_token ?? payload.accessToken;
        const refreshToken = payload.refresh_token ?? payload.refreshToken;
        const staff = payload.staff;

        if (!accessToken || !refreshToken || !staff?.role) {
          this.errorMsg = 'Login failed: invalid server response.';
          return;
        }

        this.auth.setSession({ accessToken, refreshToken, staff });
        this.toast.show(`Welcome back, ${staff?.name?.split(' ')[0] ?? 'User'}!`);
        this.router.navigate(['/app/dashboard']);
      },
      error: (err) => {
        const status = Number(err?.status);
        const serverMessage = err?.error?.message ?? err?.message;

        if (status === 400) {
          this.errorMsg = serverMessage ?? 'Invalid request. Please check your credentials.';
          return;
        }
        if (status === 404) {
          this.errorMsg = serverMessage ?? 'User not found.';
          return;
        }
        if (status === 500) {
          this.errorMsg = serverMessage ?? 'Server error. Please try again later.';
          return;
        }

        this.errorMsg = serverMessage ?? 'Login failed. Please try again.';
      },
    });
  }
}
