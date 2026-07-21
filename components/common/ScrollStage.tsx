'use client';

import { useEffect } from 'react';

// warm→cool crossfade as a fraction of total scroll (ambient, stays global)
const COOL_START = 0.38;
const COOL_RANGE = 0.3;
// the sun completes its rise this far through the hero, so it always crests
// within the hero regardless of document height (mobile docs are proportionally taller)
const SUN_HERO_FRACTION = 0.55;

export default function ScrollStage() {
  useEffect(() => {
    const root = document.documentElement;
    const clamp = (v: number) => Math.min(1, Math.max(0, v));

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      root.style.setProperty('--g', '0');
      root.style.setProperty('--sun', '0');
      root.style.setProperty('--cool', '0');
      return;
    }

    let sunMax = 0;
    let ticking = false;
    let prevG = -1;
    let prevSun = -1;
    let prevCool = -1;

    // Frozen scroll denominator: on iOS the URL bar collapses on first scroll,
    // changing window.innerHeight (and, via any vh-sized content, scrollHeight),
    // which would move the progress denominator and make the stage jump. Cache
    // the whole denominator and refresh only on width/orientation change.
    let vw = window.innerWidth;
    let maxScroll = 1;
    let sunEnd = 1;
    const measure = () => {
      maxScroll = Math.max(1, root.scrollHeight - window.innerHeight);
      const hero = document.getElementById('hero');
      sunEnd = Math.max(1, (hero?.offsetHeight ?? window.innerHeight) * SUN_HERO_FRACTION);
    };
    measure();

    const tick = () => {
      ticking = false;
      const g = clamp(window.scrollY / maxScroll);
      sunMax = Math.max(sunMax, clamp(window.scrollY / sunEnd));
      const cool = clamp((g - COOL_START) / COOL_RANGE);
      if (g !== prevG) {
        root.style.setProperty('--g', g.toFixed(4));
        prevG = g;
      }
      if (sunMax !== prevSun) {
        root.style.setProperty('--sun', sunMax.toFixed(4));
        prevSun = sunMax;
      }
      if (cool !== prevCool) {
        root.style.setProperty('--cool', cool.toFixed(4));
        prevCool = cool;
      }
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(tick);
      }
    };

    const onResize = () => {
      if (window.innerWidth === vw) return; // ignore iOS toolbar height-only resizes
      vw = window.innerWidth;
      measure();
      onScroll();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    tick();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div id="scroll-stage" aria-hidden="true">
      <div className="stage-sky stage-sky--warm" />
      <div className="stage-sky stage-sky--cool" />
      <div className="stage-sunwrap">
        <div className="stage-sun" />
      </div>
      <div className="stage-horizon" />
      <div className="stage-grid stage-grid--warm" />
      <div className="stage-grid stage-grid--cool" />
      <div className="stage-scan" />
    </div>
  );
}
