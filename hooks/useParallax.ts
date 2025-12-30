import { useEffect, useRef } from 'react';

/**
 * High-performance parallax hook using direct DOM manipulation.
 * Avoids React re-renders on scroll.
 * @param speed Movement speed factor (0.5 means half the scroll speed)
 * @returns Ref object to attach to the target element
 */
export const useParallax = (speed: number = 0.5) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrameId: number;
    
    const loop = () => {
      if (ref.current) {
        const offset = window.scrollY * speed;
        // Use translate3d for GPU acceleration
        ref.current.style.transform = `translate3d(0, ${offset}px, 0)`;
      }
      animationFrameId = requestAnimationFrame(loop);
    };

    loop();

    return () => cancelAnimationFrame(animationFrameId);
  }, [speed]);

  return ref;
};