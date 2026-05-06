import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Toast } from '../models';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private _toasts$ = new BehaviorSubject<Toast[]>([]);
  readonly toasts$ = this._toasts$.asObservable();

  show(message: string, type: Toast['type'] = 'success', duration = 3000): void {
    const id = Date.now().toString(36);
    const toast: Toast = { id, message, type };
    this._toasts$.next([...this._toasts$.value, toast]);
    setTimeout(() => this.dismiss(id), duration);
  }

  dismiss(id: string): void {
    this._toasts$.next(this._toasts$.value.filter(t => t.id !== id));
  }
}
