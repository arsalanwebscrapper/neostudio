
import { useEffect, useRef } from 'react';

const ScrollAnimations = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement;
            const animationType = element.dataset.animation;
            
            switch (animationType) {
              case 'slide-up':
                element.classList.add('animate-slide-up');
                break;
              case 'slide-left':
                element.classList.add('animate-slide-in-left');
                break;
              case 'slide-right':
                element.classList.add('animate-slide-in-right');
                break;
              case 'scale':
                element.classList.add('animate-scale-in');
                break;
              default:
                element.classList.add('animate-slide-up');
            }
            
            element.style.opacity = '1';
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    const animatedElements = document.querySelectorAll('[data-animation]');
    animatedElements.forEach((el) => {
      if (observerRef.current) {
        observerRef.current.observe(el);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return null;
};

export default ScrollAnimations;
