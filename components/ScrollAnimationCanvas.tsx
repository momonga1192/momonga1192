import React, { useEffect, useRef } from 'react';

interface ScrollAnimationCanvasProps {
  startAnimation?: boolean;
}

export const ScrollAnimationCanvas: React.FC<ScrollAnimationCanvasProps> = ({ startAnimation = true }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // Cache metrics to avoid getBoundingClientRect in the loop
    let philTop = 0;
    let servTop = 0;

    const updateMetrics = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;

      // Calculate absolute positions relative to the top of the document
      const phil = document.getElementById('philosophy');
      const serv = document.getElementById('services');
      
      // We use pageYOffset + getBoundingClientRect().top to get the static document position
      if (phil) philTop = window.pageYOffset + phil.getBoundingClientRect().top;
      if (serv) servTop = window.pageYOffset + serv.getBoundingClientRect().top;
    };

    // Linear interpolation helper
    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    let animationFrameId: number;
    let currentRotation = 0;

    // Current animated values (Start from center)
    let currentX = width / 2;
    let currentY = height / 2;
    let currentScale = 1.5;
    let currentOpacity = 1;

    const render = () => {
      // Clear canvas
      ctx.clearRect(0, 0, width, height);
      
      const scrollY = window.scrollY;
      const viewportHeight = height; // cached window.innerHeight
      
      // Default state (Hero Section) - Big Circle
      let nextX = width / 2;
      let nextY = height / 2;
      let nextScale = 1.5; // Increased size for Hero
      let nextOpacity = 0.8;
      let rotationSpeed = 0.002;

      // If animation hasn't started (loading), keep rotation at 0 and state static
      if (!startAnimation) {
        rotationSpeed = 0;
        currentRotation = 0; // Lock rotation to match opening overlay end state
      }

      // 1. Philosophy Logic
      // Distance from the top of the viewport to the top of the Philosophy section
      const relativePhilTop = philTop - scrollY;
      
      // When Philosophy is entering the viewport
      if (relativePhilTop < viewportHeight && relativePhilTop > -viewportHeight) {
         const triggerPoint = viewportHeight * 0.8; 
         const progress = Math.min(1, Math.max(0, (triggerPoint - relativePhilTop) / (triggerPoint * 0.8)));

         const isMobile = width < 768;
         const targetXPos = isMobile ? width / 2 : width * 0.25;
         const targetYPos = isMobile ? viewportHeight * 0.4 : viewportHeight / 2;

         nextX = lerp(width / 2, targetXPos, progress);
         nextY = lerp(height / 2, targetYPos, progress);
         nextScale = lerp(1.5, isMobile ? 0.8 : 0.9, progress);
         nextOpacity = 1.0;
         rotationSpeed = 0.005;
      }

      // 2. Services Logic
      const relativeServTop = servTop - scrollY;
      
      if (relativeServTop < viewportHeight) {
         const triggerPoint = viewportHeight * 0.9;
         const progress = Math.min(1, Math.max(0, (triggerPoint - relativeServTop) / (triggerPoint * 0.8)));

         const isMobile = width < 768;
         const startX = isMobile ? width / 2 : width * 0.25;
         const startY = isMobile ? viewportHeight * 0.4 : viewportHeight / 2;
         
         const endX = width / 2;
         const endY = height / 2;

         nextX = lerp(startX, endX, progress);
         nextY = lerp(startY, endY, progress);
         nextScale = lerp(isMobile ? 0.8 : 0.9, 3.5, progress);
         nextOpacity = lerp(1.0, 0.15, progress);
         rotationSpeed = 0.001;
      }

      // Smooth interpolation for animation values
      const smoothFactor = 0.08; 
      currentX = lerp(currentX, nextX, smoothFactor);
      currentY = lerp(currentY, nextY, smoothFactor);
      currentScale = lerp(currentScale, nextScale, smoothFactor);
      currentOpacity = lerp(currentOpacity, nextOpacity, smoothFactor);
      
      if (startAnimation) {
         currentRotation += rotationSpeed;
      }

      // --- Drawing ---
      ctx.save();
      ctx.translate(currentX, currentY);
      ctx.scale(currentScale, currentScale);
      ctx.rotate(currentRotation);

      // Outer Arc (Blue) - 0 to 1.5 PI
      ctx.beginPath();
      ctx.arc(0, 0, 150, 0, Math.PI * 1.5);
      ctx.strokeStyle = `rgba(37, 99, 235, ${currentOpacity})`;
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      ctx.stroke();

      // Inner Arc (Slate)
      ctx.rotate(Math.PI); 
      ctx.beginPath();
      ctx.arc(0, 0, 120, 0, Math.PI * 1.2);
      ctx.strokeStyle = `rgba(71, 85, 105, ${currentOpacity})`;
      ctx.lineWidth = 8;
      ctx.lineCap = 'round';
      ctx.stroke();

      // Dot
      // Rotate back PI (from inner arc rotation) + 1.5 PI (to end of outer arc)
      // Current context is rotated by PI due to Inner Arc step.
      // We want to be at 1.5 PI relative to original 0.
      // So we rotate another 0.5 PI (PI + 0.5 PI = 1.5 PI).
      ctx.rotate(Math.PI * 0.5);
      
      ctx.fillStyle = `rgba(37, 99, 235, ${currentOpacity})`;
      ctx.beginPath();
      ctx.arc(150, 0, 8, 0, Math.PI * 2);
      ctx.fill();

      // Decorative ring (reset rotation context first if needed, but easier to just draw circle)
      // We need to match the "center" coordinate system
      // Currently rotated by 1.5 PI total relative to start.
      // A full circle doesn't care about rotation.
      ctx.beginPath();
      ctx.arc(0, 0, 140, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(200, 200, 200, ${currentOpacity * 0.3})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener('resize', updateMetrics);
    
    updateMetrics();
    setTimeout(updateMetrics, 100);
    
    render();

    return () => {
      window.removeEventListener('resize', updateMetrics);
      cancelAnimationFrame(animationFrameId);
    };
  }, [startAnimation]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
      role="presentation"
    />
  );
};