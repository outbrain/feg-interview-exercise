import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { OrderForm } from '../types';

@Component({
  selector: 'app-order-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.scss',
})
export class OrderSummaryComponent {
  @Input({ required: true })
  order!: OrderForm;
}
