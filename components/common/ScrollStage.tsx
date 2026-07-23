'use client';

import { useEffect, useRef } from 'react';

// warm→cool crossfade as a fraction of total scroll (ambient, stays global)
const COOL_START = 0.38;
const COOL_RANGE = 0.3;
// the sun completes its rise this far through the hero, so it always crests
// within the hero regardless of document height (mobile docs are proportionally taller)
const SUN_HERO_FRACTION = 0.55;
// horizon sits this far down the (frozen) viewport
const HORIZON_FRACTION = 0.6;
// hero scroll cue fades once the page has scrolled past this
const CUE_FADE_PX = 48;
// iOS toolbar collapse changes innerHeight by ~60-120px; only a larger height
// change (real window resize) re-anchors the stage
const HEIGHT_REMEASURE_PX = 200;
// canvas extends below the frozen viewport so iOS toolbar collapse (which grows
// the fixed stage) never reveals unpainted area
const CANVAS_SLACK = 0.25;

// ---- grid projection tuning ----
const FOCAL = 320; // perspective focal length
const CAM_H_MIN = 105; // camera height at scroll start — higher POV opens the row spacing near the horizon
const CAM_H_MAX = 215; // camera height at scroll end (plane opens up further)
const Z_NEAR = 60;
const ROW_SPACING = 140; // world units between horizontal lines
const COL_SPACING = 96; // world units between vertical lines
// depth at which the vertical fan must still cover the full viewport width
// (columns are counted from this so wide screens don't run out of lines)
const COL_COVER_Z = 2800;
const WARM_TRAVEL_ROWS = 6; // rows of travel toward the viewer over the full scroll
const COOL_SPACING_RATIO = 0.82; // cool grid is denser than the warm grid
const COOL_TRAVEL_ROWS = -3; // cool grid recedes

type Palette = { h: string; v: string; hAlpha: number; vAlpha: number };

// lineGlow: neon halo stroke alpha — reads as glow on dark, as a blurry smear on
// a light background, so light theme draws clean thin lines only.
const PALETTES: Record<
  string,
  { warm: Palette; cool: Palette; glow: string; glowAlpha: number; lineGlow: number }
> = {
  dark: {
    warm: { h: '255, 45, 149', v: '0, 229, 255', hAlpha: 0.85, vAlpha: 0.7 },
    cool: { h: '96, 165, 250', v: '96, 165, 250', hAlpha: 0.6, vAlpha: 0.6 },
    glow: '255, 170, 90',
    glowAlpha: 0.3,
    lineGlow: 0.28,
  },
  light: {
    warm: { h: '255, 90, 120', v: '255, 140, 60', hAlpha: 0.55, vAlpha: 0.5 },
    cool: { h: '37, 99, 235', v: '37, 99, 235', hAlpha: 0.4, vAlpha: 0.4 },
    glow: '255, 143, 94',
    glowAlpha: 0.12,
    lineGlow: 0,
  },
};

export default function ScrollStage() {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    if (!stage || !canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const root = document.documentElement;
    const clamp = (v: number) => Math.min(1, Math.max(0, v));
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const prev: Record<string, string> = {};
    const set = (el: HTMLElement, name: string, value: string) => {
      if (prev[name] !== value) {
        el.style.setProperty(name, value);
        prev[name] = value;
      }
    };

    // Frozen geometry: on iOS the URL bar collapses on first scroll, changing
    // both window.innerHeight and the height of the fixed stage (inset: 0).
    // Anything derived from the live viewport therefore slides at scroll-start.
    // Freeze the scroll denominator, the positional anchor (--stage-hz in px),
    // and the canvas size at load; refresh only on width/orientation change or
    // a real window resize — never on toolbar-sized height changes.
    let vw = window.innerWidth;
    let vh = window.innerHeight;
    let maxScroll = 1;
    let sunEnd = 1;
    let hzPx = Math.round(vh * HORIZON_FRACTION);
    let dpr = 1;

    const measure = () => {
      maxScroll = Math.max(1, root.scrollHeight - window.innerHeight);
      const hero = document.getElementById('hero');
      sunEnd = Math.max(1, (hero?.offsetHeight ?? window.innerHeight) * SUN_HERO_FRACTION);
      hzPx = Math.round(window.innerHeight * HORIZON_FRACTION);
      set(stage, '--stage-hz', `${hzPx}px`);
      set(stage, '--stage-vh', `${window.innerHeight}px`);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const cssW = window.innerWidth;
      const cssH = Math.round(window.innerHeight * (1 + CANVAS_SLACK));
      canvas.style.width = `${cssW}px`;
      canvas.style.height = `${cssH}px`;
      canvas.width = Math.round(cssW * dpr);
      canvas.height = Math.round(cssH * dpr);
    };

    // ---- canvas grid: strokes into one viewport-sized buffer per frame.
    // No DOM layer, no compositor tiles, no re-rasterization — the whole class
    // of iOS blank-tile/eviction artifacts cannot occur.
    // The ground plane has NO far cutoff and NO drawn horizon line: rows are
    // drawn until they converge sub-pixel into the horizon, fading out with a
    // crowding fade so the dissolve itself reads as the horizon; verticals fan
    // out of the true vanishing line. (An explicit line would float isolated
    // above the faded rows — see the note at the draw() call site.) ----
    const drawPass = (
      g: number,
      alpha: number,
      p: Palette,
      spacing: number,
      travelRows: number,
      lineGlow: number
    ) => {
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      const hz = hzPx;
      const cx = w / 2;
      const camH = CAM_H_MIN + (CAM_H_MAX - CAM_H_MIN) * g;

      // vertical lines: rays from the vanishing line at the horizon through
      // their near-plane positions, fading in just below the horizon so the
      // convergence point never becomes a hot cluster
      const yNear = hz + (camH * FOCAL) / Z_NEAR;
      const vGrad = ctx.createLinearGradient(0, hz, 0, hz + 24);
      vGrad.addColorStop(0, `rgba(${p.v}, 0)`);
      vGrad.addColorStop(1, `rgba(${p.v}, ${alpha * p.vAlpha})`);
      ctx.strokeStyle = vGrad;
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      const tEdge = (h - hz) / (yNear - hz);
      const cols = Math.min(120, Math.ceil((w / 2) * COL_COVER_Z / (FOCAL * COL_SPACING)));
      for (let j = -cols; j <= cols; j++) {
        const xNear = cx + (j * COL_SPACING * FOCAL) / Z_NEAR;
        ctx.moveTo(cx, hz);
        ctx.lineTo(cx + (xNear - cx) * tEdge, h);
      }
      ctx.stroke();

      // horizontal rows: from the near plane toward the horizon until they
      // converge sub-pixel into it, FADING with distance (screen-space depth
      // fade + crowding fade) so rows dissolve gently as they approach the
      // horizon rather than stacking into a bright band
      const phase = (((g * travelRows) % 1) + 1) % 1;
      let yPrevRow = Number.POSITIVE_INFINITY;
      for (let k = 0; k < 400; k++) {
        const z = Z_NEAR + (k + 1 - phase) * spacing;
        const y = hz + (camH * FOCAL) / z;
        if (y - hz < 0.6) break;
        if (y > h) {
          yPrevRow = y;
          continue;
        }
        const gap = yPrevRow - y;
        yPrevRow = y;
        if (gap < 0.35) break; // remaining rows are sub-pixel and faded out
        // screen-space depth: 1 at the near edge, 0 at the horizon
        const t = (y - hz) / (h - hz);
        // crowding fade: rows dim as they pack tighter toward the horizon
        const crowd = Math.min(1, gap / 2.2);
        const a = alpha * p.hAlpha * (0.08 + 0.92 * Math.pow(t, 0.85)) * crowd;
        if (a < 0.015) continue;
        ctx.strokeStyle = `rgba(${p.h}, ${a})`;
        const wLine = 1 + t * 1.6;
        if (lineGlow > 0 && a > 0.04) {
          ctx.lineWidth = wLine + 2.5;
          ctx.globalAlpha = lineGlow;
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(w, y);
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
        ctx.lineWidth = wLine;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }
    };

    let lastKey = '';
    const draw = (g: number, cool: number, sun: number) => {
      const dark = root.classList.contains('dark');
      const key = `${g.toFixed(4)}|${cool.toFixed(4)}|${sun.toFixed(4)}|${dark}|${canvas.width}x${canvas.height}`;
      if (key === lastKey) return;
      lastKey = key;
      const pal = PALETTES[dark ? 'dark' : 'light'];
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      // sunlight reflected on the grid: an elliptical pool spreading down from
      // below the sun, tracking the sun's rise and fading out in the cool phase
      const reflect = sun * (1 - cool);
      if (reflect > 0.01) {
        ctx.save();
        ctx.translate(w / 2, hzPx);
        ctx.scale(1, 0.45);
        const pool = ctx.createRadialGradient(0, 0, 0, 0, 0, w * 0.55);
        pool.addColorStop(0, `rgba(${pal.glow}, ${pal.glowAlpha * reflect})`);
        pool.addColorStop(0.5, `rgba(${pal.warm.h}, ${0.4 * pal.glowAlpha * reflect})`);
        pool.addColorStop(1, `rgba(${pal.warm.h}, 0)`);
        ctx.fillStyle = pool;
        ctx.fillRect(-w / 2, 0, w, (h - hzPx) / 0.45);
        ctx.restore();
      }

      // NO explicit horizon line: with the distance fade, the grid dissolving
      // into the sky IS the horizon. A drawn line would float isolated above the
      // faded rows — do not add one.
      if (cool < 1)
        drawPass(g, (1 - cool) * 0.95, pal.warm, ROW_SPACING, WARM_TRAVEL_ROWS, pal.lineGlow);
      if (cool > 0)
        drawPass(g, cool * 0.9, pal.cool, ROW_SPACING * COOL_SPACING_RATIO, COOL_TRAVEL_ROWS, pal.lineGlow);
    };

    measure();

    // re-measure only on a real width/orientation change or a large height
    // change — never on iOS toolbar-sized height deltas (which must not move
    // the frozen anchors)
    const shouldRemeasure = () =>
      window.innerWidth !== vw || Math.abs(window.innerHeight - vh) > HEIGHT_REMEASURE_PX;

    if (reducedMotion) {
      set(stage, '--g', '0');
      set(stage, '--sun', '0');
      set(stage, '--cool', '0');
      const redraw = () => draw(0, 0, 0);
      redraw();
      const onStaticResize = () => {
        if (!shouldRemeasure()) return;
        vw = window.innerWidth;
        vh = window.innerHeight;
        measure(); // resizes (and clears) the canvas, so repaint the static grid
        redraw();
      };
      // track theme + viewport so the static grid stays correct
      const themeObserver = new MutationObserver(redraw);
      themeObserver.observe(root, { attributes: true, attributeFilter: ['class'] });
      window.addEventListener('resize', onStaticResize, { passive: true });
      return () => {
        themeObserver.disconnect();
        window.removeEventListener('resize', onStaticResize);
      };
    }

    let sunMax = 0;
    let ticking = false;
    let lastG = 0;
    let lastCool = 0;

    const tick = () => {
      ticking = false;
      const y = window.scrollY;
      const g = clamp(y / maxScroll);
      sunMax = Math.max(sunMax, clamp(y / sunEnd));
      const cool = clamp((g - COOL_START) / COOL_RANGE);
      set(stage, '--g', g.toFixed(4));
      set(stage, '--sun', sunMax.toFixed(4));
      set(stage, '--cool', cool.toFixed(4));
      // hero scroll cue: binary flag, flips rarely; its CSS transition smooths it
      set(root, '--scrolled', y > CUE_FADE_PX ? '1' : '0');
      lastG = g;
      lastCool = cool;
      draw(g, cool, sunMax);
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(tick);
      }
    };

    const onResize = () => {
      if (!shouldRemeasure()) return; // ignore iOS toolbar resizes
      vw = window.innerWidth;
      vh = window.innerHeight;
      measure();
      onScroll();
    };

    // theme switch repaints the grid in the new palette (one cheap canvas draw)
    const themeObserver = new MutationObserver(() => draw(lastG, lastCool, sunMax));
    themeObserver.observe(root, { attributes: true, attributeFilter: ['class'] });

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    tick();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      themeObserver.disconnect();
    };
  }, []);

  return (
    <div id="scroll-stage" ref={stageRef} aria-hidden="true">
      <div className="stage-sky stage-sky--warm" />
      <div className="stage-sky stage-sky--cool" />
      <div className="stage-sunwrap">
        <div className="stage-sun-glow" />
        <div className="stage-sun" />
      </div>
      <canvas ref={canvasRef} className="stage-grid-canvas" />
      <div className="stage-scan" />
    </div>
  );
}
