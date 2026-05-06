import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GenericService } from './generic.service';

export interface LoginApiResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  staff: {
    id: number;
    employee_id: string;
    name: string;
    username: string;
    role: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
 constructor(
    private genricService: GenericService,
  ) {}

  login(credentials: { username: string; password: string }): Observable<LoginApiResponse> {
    return this.genricService.Post('auth/login', credentials);
  }

  forgotPassword(payload: any): Observable<any> {
    return this.genricService.Post('user/forgot-password', payload);
  }


  verificationCode(payload: {
    username: string;
    otp: string;
  }): Observable<any> {
    return this.genricService.Post('user/verify-otp', payload);
  }
}
