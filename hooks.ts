import { useEffect, useRef, useState } from 'react';

// --- Types ---

export interface NavItem {
  label: string;
  href: string;
}

// --- Hooks ---

/**
 * Custom hook to track when an element enters the viewport.
 * Used for scroll reveal animations.
 */
export const useIntersectionObserver = (options: IntersectionObserverInit = { threshold: 0.1, rootMargin: '0px' }) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        if (elementRef.current) {
          observer.unobserve(elementRef.current);
        }
      }
    }, options);

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(elementRef.current);
      }
    };
  }, [options]);

  return { elementRef, isVisible };
};

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
        ref.current.style.transform = `translate3d(0, ${offset}px, 0)`;
      }
      animationFrameId = requestAnimationFrame(loop);
    };

    loop();

    return () => cancelAnimationFrame(animationFrameId);
  }, [speed]);

  return ref;
};
