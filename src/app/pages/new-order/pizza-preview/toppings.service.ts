import { Injectable } from '@angular/core';
import { toppings, Toppings, ingredientsObject, pizzaPart } from '../types';

@Injectable({
  providedIn: 'root',
})
export class ToppingsService {
  private toppingImages: Record<Toppings, HTMLImageElement> = {} as Record<
    Toppings,
    HTMLImageElement
  >;

  loadToppingImages(): void {
    this.toppingImages = toppings.reduce((toppingMap, topping) => {
      const img = new Image();
      img.width = 12;
      img.height = 12;
      img.src = `assets/toppings/${topping}.png`;
      toppingMap[topping] = img;

      return toppingMap;
    }, {} as Record<Toppings, HTMLImageElement>);
  }

  addTopping(
    ctx: CanvasRenderingContext2D,
    centerX: number,
    centerY: number,
    radius: number,
    crustWidth: number,
    noise: number[],
    topping: ingredientsObject<Toppings>
  ): void {
    const { name, size, part } = topping;

    if (!this.shouldAddTopping(part, name)) {
      return;
    }

    const image = this.toppingImages[name];
    const amount = this.getToppingAmount(size);

    for (let i = 0; i < amount; i++) {
      const angle =
        (i * Math.PI) / 180 + this.getNumberInRange(name, noise, i, 360);
      const distance =
        radius * 0.2 +
        this.getNumberInRange(name, noise, i, radius * 0.75 - crustWidth);
      const rotation = this.getNumberInRange(name + 'rotation', noise, i, 360);
      const x = centerX + distance * Math.cos(angle);
      const y = centerY + distance * Math.sin(angle);

      if (part === 'left' && x > centerX) {
        continue;
      } else if (part === 'right' && x < centerX) {
        continue;
      }

      const ratioX = ctx.canvas.width / image.naturalWidth;
      const ratioY = ctx.canvas.height / image.naturalHeight;
      const ratio = Math.min(ratioX, ratioY);
      const maxWidth = this.getToppingSize(size);
      const maxHeight = this.getToppingSize(size);
      const width = image.naturalWidth * ratio;
      const height = image.naturalHeight * ratio;
      const scaleFactor = Math.min(maxWidth / width, maxHeight / height);
      const scaledWidth = width * scaleFactor;
      const scaledHeight = height * scaleFactor;
      const scaledX = x - scaledWidth / 2;
      const scaledY = y - scaledHeight / 2;

      ctx.save();
      ctx.translate(scaledX + crustWidth / 2, scaledY + crustWidth / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.drawImage(
        image,
        -(scaledWidth / 2),
        -(scaledHeight / 2),
        scaledWidth,
        scaledHeight
      );
      ctx.restore();
    }
  }

  private shouldAddTopping(part: pizzaPart, name: Toppings) {
    const isImageLoaded =
      this.toppingImages[name].complete &&
      this.toppingImages[name].naturalHeight !== 0;

    return part !== 'none' && isImageLoaded;
  }

  private getNumberInRange(
    str: string,
    numArray: number[],
    singleNum: number,
    limit: number
  ): number {
    const inputString = `${str}-${numArray.join(',')}-${singleNum}`;
    const hash = this.customHash(inputString);
    return hash % limit;
  }

  private customHash(input: string): number {
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
      const char = input.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0;
    }
    return Math.abs(hash);
  }

  private getToppingAmount(size: ingredientsObject<Toppings>['size']): number {
    switch (size) {
      case 'small':
        return 45;
      case 'medium':
        return 30;
      case 'large':
        return 15;
      default:
        return 30;
    }
  }

  private getToppingSize(size: ingredientsObject<Toppings>['size']): number {
    switch (size) {
      case 'small':
        return 12;
      case 'medium':
        return 24;
      case 'large':
        return 36;
      default:
        return 24;
    }
  }
}
