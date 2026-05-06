import { Component, OnInit } from '@angular/core';
import { AsyncPipe, NgFor, NgIf, LowerCasePipe, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { StateService } from '../../core/services/state.service';
import { ToastService } from '../../core/services/toast.service';
import { RfidCard } from '../../core/models';

@Component({
  selector: 'app-rfid',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf, LowerCasePipe, DecimalPipe, FormsModule],
  templateUrl: './rfid.component.html',
  styleUrl: './rfid.component.css',
})
export class RfidComponent implements OnInit {
  cards$!: Observable<RfidCard[]>;
  selected: RfidCard | null = null;
  loadAmount: number | null = null;

  constructor(private state: StateService, private toast: ToastService) {}

  ngOnInit(): void {
    this.cards$ = this.state.select('rfidCards');
  }

  customerName(id: string | null): string {
    if (!id) return '—';
    return this.state.snapshot.customers.find(c => c.id === id)?.name ?? id;
  }

  select(card: RfidCard): void {
    this.selected = { ...card, loadHistory: [...card.loadHistory] };
    this.loadAmount = null;
  }

  loadBalance(): void {
    if (!this.selected || !this.loadAmount || this.loadAmount <= 0) {
      this.toast.show('Enter a valid amount', 'warning');
      return;
    }
    const newBalance = this.selected.balance + this.loadAmount;
    const updated: RfidCard = {
      ...this.selected,
      balance: newBalance,
      status: 'Active',
      loadHistory: [
        ...this.selected.loadHistory,
        { amount: this.loadAmount, mode: 'Cash', date: new Date().toISOString().slice(0, 10), balance: newBalance }
      ],
    };
    this.state.updateRfidCard(updated);
    this.toast.show(`₹${this.loadAmount} loaded to ${this.selected.cardNo}`);
    this.selected = null;
  }
}
