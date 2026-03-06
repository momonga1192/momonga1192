import { createCanvas } from 'canvas';
import { writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outputDir = join(__dirname, '..', 'public', 'images');

// Ensure output directory exists
mkdirSync(outputDir, { recursive: true });

const WIDTH = 1200;
const HEIGHT = 630;

const canvas = createCanvas(WIDTH, HEIGHT);
const ctx = canvas.getContext('2d');

// Background gradient
const bgGrad = ctx.createLinearGradient(0, 0, WIDTH, HEIGHT);
bgGrad.addColorStop(0, '#f8fafc');
bgGrad.addColorStop(0.5, '#ffffff');
bgGrad.addColorStop(1, '#f1f5f9');
ctx.fillStyle = bgGrad;
ctx.fillRect(0, 0, WIDTH, HEIGHT);

// Decorative circles
const circles = [
  { x: 950, y: 120, r: 180, color: 'rgba(59,130,246,0.08)' },
  { x: 200, y: 500, r: 140, color: 'rgba(99,102,241,0.06)' },
  { x: 1050, y: 480, r: 100, color: 'rgba(20,184,166,0.07)' },
  { x: 150, y: 150, r: 80, color: 'rgba(168,85,247,0.05)' },
];
for (const c of circles) {
  ctx.beginPath();
  ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
  ctx.fillStyle = c.color;
  ctx.fill();
}

// Left accent bar
const accentGrad = ctx.createLinearGradient(0, 180, 0, 450);
accentGrad.addColorStop(0, '#3b82f6');
accentGrad.addColorStop(1, '#6366f1');
ctx.fillStyle = accentGrad;
ctx.fillRect(80, 180, 5, 270);

// Company name "Arcle"
ctx.fillStyle = '#1e293b';
ctx.font = 'bold 96px sans-serif';
ctx.fillText('Arcle', 110, 290);

// Tagline
ctx.fillStyle = '#64748b';
ctx.font = '32px sans-serif';
ctx.fillText('IT Consulting & DX Partner', 115, 345);

// Service keywords
const services = [
  { text: 'DX', color: '#3b82f6' },
  { text: 'Data', color: '#6366f1' },
  { text: 'AI', color: '#a855f7' },
  { text: 'Web', color: '#14b8a6' },
];

let xPos = 115;
for (const svc of services) {
  ctx.fillStyle = svc.color + '15';
  const textWidth = ctx.measureText(svc.text).width;
  const padding = 24;
  const pillWidth = textWidth + padding * 2;
  const pillHeight = 44;
  const pillY = 380;

  // Rounded rectangle
  const radius = 22;
  ctx.beginPath();
  ctx.moveTo(xPos + radius, pillY);
  ctx.lineTo(xPos + pillWidth - radius, pillY);
  ctx.arcTo(xPos + pillWidth, pillY, xPos + pillWidth, pillY + radius, radius);
  ctx.lineTo(xPos + pillWidth, pillY + pillHeight - radius);
  ctx.arcTo(xPos + pillWidth, pillY + pillHeight, xPos + pillWidth - radius, pillY + pillHeight, radius);
  ctx.lineTo(xPos + radius, pillY + pillHeight);
  ctx.arcTo(xPos, pillY + pillHeight, xPos, pillY + pillHeight - radius, radius);
  ctx.lineTo(xPos, pillY + radius);
  ctx.arcTo(xPos, pillY, xPos + radius, pillY, radius);
  ctx.closePath();
  ctx.fill();

  // Border
  ctx.strokeStyle = svc.color + '30';
  ctx.lineWidth = 1;
  ctx.stroke();

  // Text
  ctx.fillStyle = svc.color;
  ctx.font = 'bold 22px sans-serif';
  ctx.fillText(svc.text, xPos + padding, pillY + 30);

  xPos += pillWidth + 16;
}

// Location
ctx.fillStyle = '#94a3b8';
ctx.font = '22px sans-serif';
ctx.fillText('Aichi, Japan', 115, 475);

// Bottom border
const bottomGrad = ctx.createLinearGradient(0, 0, WIDTH, 0);
bottomGrad.addColorStop(0, '#3b82f6');
bottomGrad.addColorStop(0.33, '#6366f1');
bottomGrad.addColorStop(0.66, '#a855f7');
bottomGrad.addColorStop(1, '#14b8a6');
ctx.fillStyle = bottomGrad;
ctx.fillRect(0, HEIGHT - 6, WIDTH, 6);

// Save
const buffer = canvas.toBuffer('image/png');
writeFileSync(join(outputDir, 'ogp.png'), buffer);
console.log('OGP image generated: public/images/ogp.png');
