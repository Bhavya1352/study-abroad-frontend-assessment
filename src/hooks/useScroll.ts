// Custom hooks for scrolling features

import { useEffect, useState, useCallback, useRef } from 'react';

/**
 * Hook for smooth scrolling to specific elements
 */
export const useSmoothScroll = () => {
  const scrollToElement = useCallback((elementId: string, offset = 100) => {
    const element = document.getElementById(elementId);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth',
      });
    }
  }, []);

  return { scrollToElement };
};

/**
 * Hook to detect scroll direction (up/down)
 */
export const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
  const prevScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (Math.abs(currentScrollY - prevScrollY.current) < 5) {
        return; // Ignore small scrolls
      }

      setScrollDirection(currentScrollY > prevScrollY.current ? 'down' : 'up');
      prevScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollDirection;
};

/**
 * Hook to detect when element comes into view
 */
export const useInView = (ref: React.RefObject<HTMLElement>, options = {}) => {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    }, { threshold: 0.1, ...options });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, options]);

  return isInView;
};

/**
 * Hook to get current scroll position
 */
export const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition({
        x: window.scrollX,
        y: window.scrollY,
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollPosition;
};

/**
 * Hook for scroll lock (prevent scrolling)
 */
export const useScrollLock = () => {
  const lock = useCallback(() => {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollbarWidth}px`;
  }, []);

  const unlock = useCallback(() => {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  }, []);

  return { lock, unlock };
};

/**
 * Hook to track scroll percentage through an element
 */
export const useScrollPercentage = (ref: React.RefObject<HTMLElement>) => {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;

      const { top, bottom } = ref.current.getBoundingClientRect();
      const visible = Math.max(0, Math.min(bottom, window.innerHeight)) - Math.max(top, 0);
      const percentage = (visible / window.innerHeight) * 100;

      setScrollPercentage(Math.max(0, Math.min(100, percentage)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [ref]);

  return scrollPercentage;
};
