import type { FormArray, FormControl, FormGroup } from '@angular/forms';

export interface ingredientsObject<T extends string = string> {
  name: T;
  size?: 'small' | 'medium' | 'large';
  price: number;
  part: pizzaPart;
}

export type pizzaPart = 'left' | 'right' | 'full' | 'none';

export const toppings = [
  'Mushrooms',
  'Peppers',
  'Tomato',
  'Pineapple',
  'Black Olives',
  'Green Olives',
  'White Onions',
  'Purple Onions',
] as const;
export const smallToppings = ['Black Olives', 'Green Olives', 'Pineapple'];
export const sauces = ['Tomato Sauce', 'Pesto Sauce'] as const;
export const cheeseAmount = ['none', 'normal', 'extra'] as const;

export type Toppings = (typeof toppings)[number];
export type Sauces = (typeof sauces)[number];
export type CheeseAmount = (typeof cheeseAmount)[number];

export type OrderFormGroup = FormGroup<{
  toppings: FormArray<FormControl<ingredientsObject<Toppings> | null>>;
  sauce: FormArray<FormControl<ingredientsObject<Sauces> | null>>;
  cheese: FormControl<CheeseAmount | null>;
}>;

export type OrderForm = OrderFormGroup['value'];
