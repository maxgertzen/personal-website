import { useCallback } from 'react';

export function useScrollTo() {
  const scrollToElement = useCallback((elementId: string) => {
    document.getElementById(elementId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return { scrollToElement, scrollToTop };
}
