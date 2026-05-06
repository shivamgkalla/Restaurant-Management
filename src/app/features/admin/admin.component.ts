import { Component, OnInit } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { StateService } from '../../core/services/state.service';
import { ToastService } from '../../core/services/toast.service';
import { Settings } from '../../core/models';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf, FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent implements OnInit {
  settings$!: Observable<Settings>;

  constructor(private state: StateService, private toast: ToastService) {}

  ngOnInit(): void {
    this.settings$ = this.state.select('settings');
  }
}
