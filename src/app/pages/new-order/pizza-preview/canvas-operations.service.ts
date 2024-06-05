import { Injectable, ElementRef } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CanvasOperationsService {
  private ctx!: CanvasRenderingContext2D;
  private centerX!: number;
  private centerY!: number;
  private radius: number = 120;
  private noise!: number[];
  private crustWidth: number = 20;

  init(canvas: ElementRef<HTMLCanvasElement>, noise: number[]): void {
    this.ctx = canvas.nativeElement.getContext('2d')!;
    this.centerX = canvas.nativeElement.width / 2;
    this.centerY = canvas.nativeElement.height / 2;
    this.noise = noise;
  }

  drawPizzaDough(): void {
    this.ctx.clearRect(0, 0, this.centerX * 2, this.centerY * 2);

    this.ctx.moveTo(this.centerX, this.centerY + this.radius);
    this.ctx.beginPath();

    for (let i = 0; i <= 360; i++) {
      const angle = (i * Math.PI) / 180;
      const x = this.centerX + (this.radius + this.noise[i]) * Math.cos(angle);
      const y = this.centerY + (this.radius + this.noise[i]) * Math.sin(angle);
      this.ctx.lineTo(x, y);
    }

    this.ctx.closePath();
    this.ctx.fillStyle = '#F5D6B0';
    this.ctx.fill();
    this.ctx.strokeStyle = '#D4B183';
    this.ctx.lineWidth = this.crustWidth;
    this.ctx.stroke();
  }

  addSauce(saucePattern: CanvasPattern, part: string): void {
    if (part === 'none') {
      return;
    }

    this.ctx.save();
    this.ctx.moveTo(this.centerX, this.centerY + this.radius);
    this.ctx.beginPath();

    for (let i = 0; i <= 360; i++) {
      const angle = (i * Math.PI) / 180;
      const x =
        this.centerX +
        (this.radius + this.noise[i] - this.crustWidth / 2) * Math.cos(angle);
      const y =
        this.centerY +
        (this.radius + this.noise[i] - this.crustWidth / 2) * Math.sin(angle);

      if (part === 'left' && x - 1 > this.centerX) {
        continue;
      } else if (part === 'right' && x + 1 < this.centerX) {
        continue;
      }

      this.ctx.lineTo(x, y);
    }

    this.ctx.closePath();
    this.ctx.clip();

    this.ctx.fillStyle = saucePattern;
    this.ctx.fillRect(0, 0, this.centerX * 2, this.centerY * 2);

    this.ctx.restore();
  }

  addCheese(cheesePattern: CanvasPattern): void {
    this.ctx.save();
    this.ctx.fillStyle = cheesePattern;
    this.ctx.fillRect(
      this.centerX - this.radius + this.crustWidth / 2,
      this.centerY - this.radius + this.crustWidth / 2,
      (this.radius - this.crustWidth / 2) * 2,
      (this.radius - this.crustWidth / 2) * 2
    );
    this.ctx.restore();
  }
}
