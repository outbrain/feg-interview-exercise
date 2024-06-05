import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  CheeseAmount,
  OrderForm,
  Sauces,
  Toppings,
  ingredientsObject,
} from '../types';
import { CanvasOperationsService } from './canvas-operations.service';
import { createCheesePattern, createSaucePattern } from './patterns.util';
import { ToppingsService } from './toppings.service';

@Component({
  selector: 'app-pizza-preview',
  standalone: true,
  providers: [CanvasOperationsService, ToppingsService],
  templateUrl: './pizza-preview.component.html',
  styleUrl: './pizza-preview.component.scss',
})
export class PizzaPreviewComponent implements OnInit, OnChanges {
  @ViewChild('pizzaCanvas', { static: true })
  private canvas!: ElementRef<HTMLCanvasElement>;

  @Input({ required: true })
  order!: OrderForm;

  private saucePattern!: Record<Sauces, CanvasPattern>;
  private cheesePattern!: Record<Exclude<CheeseAmount, 'none'>, CanvasPattern>;
  private noise!: number[];

  constructor(
    private canvasService: CanvasOperationsService,
    private toppingsService: ToppingsService
  ) {}

  ngOnInit(): void {
    this.init();
    this.render();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (!this.noise) {
      return;
    }

    const order = changes['order'];

    if (!order) {
      return;
    }

    const { sauce, toppings, cheese } = order.currentValue as OrderForm;

    this.render(sauce, toppings, cheese);
  }

  render(
    sauce?: (ingredientsObject<Sauces> | null)[],
    toppings?: (ingredientsObject<Toppings> | null)[],
    cheese?: CheeseAmount | null
  ): void {
    this.canvasService.drawPizzaDough();

    sauce?.forEach((sauce) => {
      if (!sauce) {
        return;
      }

      this.canvasService.addSauce(this.saucePattern[sauce.name], sauce.part);
    });

    if (cheese && cheese !== 'none') {
      this.canvasService.addCheese(this.cheesePattern[cheese]);
    }

    toppings?.forEach((topping) => {
      if (!topping) {
        return;
      }

      this.toppingsService.addTopping(
        this.canvasService['ctx'],
        this.canvasService['centerX'],
        this.canvasService['centerY'],
        this.canvasService['radius'],
        this.canvasService['crustWidth'],
        this.noise,
        topping
      );
    });
  }

  init(): void {
    this.noise = this.generateNoise(2);
    this.canvasService.init(this.canvas, this.noise);
    this.toppingsService.loadToppingImages();

    this.saucePattern = {
      'Tomato Sauce': createSaucePattern(
        this.canvasService['ctx'],
        'rgba(255, 99, 71, 0.7)',
        'rgba(255, 69, 0, 0.8)'
      ),
      'Pesto Sauce': createSaucePattern(
        this.canvasService['ctx'],
        'rgba(85, 107, 47, 0.7)',
        'rgba(34, 139, 34, 0.8)'
      ),
    };

    this.cheesePattern = {
      normal: createCheesePattern(
        this.canvas.nativeElement,
        this.canvasService['ctx'],
        this.canvasService['radius'],
        this.canvasService['crustWidth'],
        100
      ),
      extra: createCheesePattern(
        this.canvas.nativeElement,
        this.canvasService['ctx'],
        this.canvasService['radius'],
        this.canvasService['crustWidth'],
        150
      ),
    };
  }

  private generateNoise(noiseLimit: number): number[] {
    const noise = [];
    for (let i = 0; i <= 360; i++) {
      noise.push((Math.random() - 0.5) * noiseLimit);
    }
    return noise;
  }
}
