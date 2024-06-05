import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IconComponent } from '../../../components/icon/icon.component';
import { OrderFormGroup } from '../types';
import { CheeseComponent } from './cheese/cheese.component';
import { IngredientComponent } from './ingredient/ingredient.component';

@Component({
  selector: 'app-ingredients-selection',
  standalone: true,
  imports: [
    IconComponent,
    IngredientComponent,
    ReactiveFormsModule,
    CheeseComponent,
    NgFor,
  ],
  templateUrl: './ingredients-selection.component.html',
  styleUrl: './ingredients-selection.component.scss',
})
export class IngredientsSelectionComponent {
  @Input({ required: true })
  form!: OrderFormGroup;
}
