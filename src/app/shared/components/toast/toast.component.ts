import { Component } from '@angular/core';
import { AsyncPipe, NgFor } from '@angular/common';
import { ToastService } from '../../../core/services/toast.service';
import { Toast } from '../../../core/models';

const ICONS: Record<Toast['type'], string> = {
  success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️',
};

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [AsyncPipe, NgFor],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css',
})
export class ToastComponent {
  icons = ICONS;
  constructor(public toastService: ToastService) {}
}
