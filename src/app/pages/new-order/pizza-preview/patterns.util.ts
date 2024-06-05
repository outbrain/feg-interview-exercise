export function createSaucePattern(
  ctx: CanvasRenderingContext2D,
  backgroundColor: string,
  spotColor: string,
  spotAmount = 50,
  spotRadius = 3
): CanvasPattern {
  const patternCanvas = document.createElement('canvas');
  patternCanvas.width = 100;
  patternCanvas.height = 100;
  const patternCtx = patternCanvas.getContext('2d')!;

  patternCtx.fillStyle = backgroundColor;
  patternCtx.fillRect(0, 0, patternCanvas.width, patternCanvas.height);

  for (let i = 0; i < spotAmount; i++) {
    patternCtx.beginPath();
    const x = Math.random() * patternCanvas.width;
    const y = Math.random() * patternCanvas.height;
    const radius = Math.random() * spotRadius;
    patternCtx.arc(x, y, radius, 0, 2 * Math.PI, false);
    patternCtx.fillStyle = spotColor;
    patternCtx.fill();
  }

  return ctx.createPattern(patternCanvas, 'repeat')!;
}

export function createCheesePattern(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  radius: number,
  crustWidth: number,
  passes: number
): CanvasPattern {
  const patternCanvas = document.createElement('canvas');
  patternCanvas.width = canvas.width;
  patternCanvas.height = canvas.height;
  const patternCtx = patternCanvas.getContext('2d')!;

  patternCtx.globalAlpha = 0.5; // More transparent cheese layer

  // Define a larger variety of colors for the cheese effect
  const cheeseColors = [
    'rgba(255, 255, 224, 0.7)', // Light yellow
    'rgba(255, 233, 160, 0.7)', // Medium yellow
    'rgba(255, 210, 160, 0.7)', // Darker yellow
    'rgba(255, 190, 128, 0.7)', // Orange-yellow
    'rgba(255, 250, 205, 0.7)', // Lemon chiffon
    'rgba(255, 239, 213, 0.7)', // Papaya whip
  ];

  // Helper function to calculate random x, y coordinates
  const getRandomCoordinates = (radiusMultiplier: number) => {
    const angle = Math.random() * 2 * Math.PI;
    const distance = Math.min(
      Math.random() * (radius - crustWidth) * radiusMultiplier,
      radius - crustWidth / 2
    );
    const x = canvas.width / 2 + distance * Math.cos(angle);
    const y = canvas.height / 2 + distance * Math.sin(angle);
    return { x, y };
  };

  // Draw multiple fine strokes with varying colors and sizes
  for (let i = 0; i < passes; i++) {
    const color = cheeseColors[Math.floor(Math.random() * cheeseColors.length)];
    patternCtx.strokeStyle = color;
    patternCtx.lineWidth = Math.random() * 2 + 1;

    patternCtx.beginPath();
    const { x: startX, y: startY } = getRandomCoordinates(2);
    patternCtx.moveTo(startX, startY);

    for (let j = 0; j < 5; j++) {
      const { x, y } = getRandomCoordinates(5);
      patternCtx.lineTo(x, y);
    }

    patternCtx.stroke();
  }

  return ctx.createPattern(patternCanvas, 'repeat')!;
}
