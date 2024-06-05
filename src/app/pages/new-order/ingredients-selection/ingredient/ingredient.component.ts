import { NgClass, NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SvgIconComponent } from 'angular-svg-icon';
import { ingredientsObject, pizzaPart } from '../../types';

type parts = Exclude<pizzaPart, 'none'>;

@Component({
  selector: 'app-ingredient',
  standalone: true,
  imports: [NgClass, SvgIconComponent, NgFor],
  templateUrl: './ingredient.component.html',
  styleUrl: './ingredient.component.scss',
})
export class IngredientComponent {
  @Input({ required: true })
  ingredient!: FormControl<ingredientsObject | null>;

  parts: parts[] = ['left', 'right', 'full'] as const;
  iconsMap: Record<parts, string> = {
    left: '/assets/half pizza.svg',
    right: '/assets/half pizza.svg',
    full: '/assets/full pizza.svg',
  };

  get ingredientIcon(): string {
    return '/assets/ingredients/' + this.ingredient.value?.name + '.svg';
  }

  select(part: parts) {
    const ingredient = this.ingredient.value as ingredientsObject;

    const setNone = ingredient.part === part;
    const partValue = setNone ? 'none' : part;

    this.ingredient?.setValue({
      ...ingredient,
      part: partValue,
    });
  }
}
