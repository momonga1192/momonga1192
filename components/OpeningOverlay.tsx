import React, { useEffect, useRef, useState } from 'react';

interface OpeningOverlayProps {
  onComplete: () => void;
}

export const OpeningOverlay: React.FC<OpeningOverlayProps> = ({ onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    let animationFrameId: number;
    let progress = 0; // 0 to 1
    const duration = 1200; // 1.2 seconds drawing
    const startTime = performance.now();

    const draw = (timestamp: number) => {
      const elapsed = timestamp - startTime;
      progress = Math.min(1, elapsed / duration);
      
      // Easing function (easeOutQuart)
      const easeProgress = 1 - Math.pow(1 - progress, 4);

      ctx.clearRect(0, 0, width, height);
      
      const centerX = width / 2;
      const centerY = height / 2;
      const baseScale = 1.5;

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.scale(baseScale, baseScale);

      // Outer Arc (Blue) - Max angle is 1.5 * PI
      const maxAngle = Math.PI * 1.5;
      const currentAngle = maxAngle * easeProgress;

      ctx.beginPath();
      ctx.arc(0, 0, 150, 0, currentAngle);
      ctx.strokeStyle = '#2563eb'; // blue-600
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      ctx.stroke();

      // Inner Arc (Slate)
      ctx.save();
      ctx.rotate(Math.PI);
      ctx.beginPath();
      ctx.arc(0, 0, 120, 0, (Math.PI * 1.2) * easeProgress);
      ctx.strokeStyle = '#475569'; // slate-600
      ctx.lineWidth = 8;
      ctx.lineCap = 'round';
      ctx.stroke();
      ctx.restore();

      // Dot (Blue) - Follows the tip of the outer arc
      // Calculate position based on currentAngle
      const dotX = 150 * Math.cos(currentAngle);
      const dotY = 150 * Math.sin(currentAngle);

      ctx.fillStyle = '#2563eb';
      ctx.beginPath();
      ctx.arc(dotX, dotY, 8, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(draw);
      } else {
        // Animation finished
        setTimeout(() => {
          setIsFading(true);
          setTimeout(onComplete, 400); // Wait for CSS transition
        }, 100);
      }
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);
    animationFrameId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [onComplete]);

  if (!canvasRef) return null;

  return (
    <div 
      ref={containerRef}
      className={`fixed inset-0 z-[100] bg-white transition-opacity duration-[400ms] flex items-center justify-center ${isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
    >
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
};