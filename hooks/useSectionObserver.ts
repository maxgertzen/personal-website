import { useEffect, useState } from 'react';

export function useSectionObserver(
  sectionIds: string[],
  extraIds: string[] = []
): string {
  const [activeSection, setActiveSection] = useState<string>(sectionIds[0] || '');

  const sectionKey = sectionIds.join(',');
  const extraKey = extraIds.join(',');

  useEffect(() => {
    const allIds = [...extraIds, ...sectionIds];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { root: null, rootMargin: '-50px 0px -50% 0px', threshold: 0.2 }
    );

    const elements: Element[] = [];
    allIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
        elements.push(el);
      }
    });

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, [sectionKey, extraKey]);

  return activeSection;
}
