import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { IngredientsSelectionComponent } from './ingredients-selection/ingredients-selection.component';
import { PizzaPreviewComponent } from './pizza-preview/pizza-preview.component';
import {
  CheeseAmount,
  OrderFormGroup,
  Sauces,
  Toppings,
  ingredientsObject,
  sauces,
  smallToppings,
  toppings,
} from './types';
import { OrderSummaryComponent } from './order-summary/order-summary.component';

@Component({
  selector: 'app-new-order',
  standalone: true,
  imports: [PizzaPreviewComponent, IngredientsSelectionComponent, OrderSummaryComponent],
  templateUrl: './new-order.component.html',
  styleUrl: './new-order.component.scss',
})
export class NewOrderComponent {
  readonly formGroup: OrderFormGroup;

  constructor(private fb: FormBuilder) {
    const toppingsController = toppings.map((topping) => {
      return new FormControl<ingredientsObject<Toppings>>({
        name: topping,
        size: smallToppings.includes(topping) ? 'small' : 'medium',
        price: 10,
        part: 'none',
      });
    });

    const saucesController = sauces.map((sauce) => {
      return new FormControl<ingredientsObject<Sauces>>({
        name: sauce,
        price: 0,
        part: 'none',
      });
    });

    this.formGroup = this.fb.group({
      toppings: this.fb.array(toppingsController),
      sauce: this.fb.array(saucesController),
      cheese: this.fb.control<CheeseAmount>('none'),
    });
  }
}
