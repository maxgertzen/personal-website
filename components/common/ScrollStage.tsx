'use client';

import { useEffect } from 'react';

// scroll-progress (0..1) keyframes: when the sun rises and when warm→cool crossfades
const SUN_START = 0.08;
const SUN_RANGE = 0.14;
const COOL_START = 0.38;
const COOL_RANGE = 0.3;

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

    const tick = () => {
      ticking = false;
      const max = root.scrollHeight - window.innerHeight;
      const g = max > 0 ? clamp(window.scrollY / max) : 0;
      sunMax = Math.max(sunMax, clamp((g - SUN_START) / SUN_RANGE));
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

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    tick();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
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
