import { NgClass, NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CheeseAmount, cheeseAmount } from '../../types';

@Component({
  selector: 'app-cheese',
  standalone: true,
  imports: [NgClass, NgFor],
  templateUrl: './cheese.component.html',
  styleUrl: './cheese.component.scss',
})
export class CheeseComponent {
  @Input({ required: true })
  ingredient!: FormControl<CheeseAmount | null>;

  amounts = cheeseAmount;

  select(amount: CheeseAmount) {
    this.ingredient?.setValue(amount);
  }
}
