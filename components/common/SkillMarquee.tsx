'use client';

import React, { useEffect, useRef } from 'react';
import { skillCategories } from '@/constants/skills';
import type { SkillDefinition } from '@/constants/skills';

const flat: SkillDefinition[] = skillCategories.flatMap((category) => category.skills);

const half = Math.ceil(flat.length / 2);
const rowA = flat.slice(0, half);
const rowB = flat.slice(half);

function Chip({ title, Icon }: SkillDefinition) {
  return (
    <span className="mq-chip">
      <span className="mq-chip__logo">
        <Icon aria-hidden="true" />
      </span>
      <span className="mq-chip__name">{title}</span>
    </span>
  );
}

function MarqueeRow({ items, dir }: { items: SkillDefinition[]; dir: 1 | -1 }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const row = rowRef.current;
    const track = trackRef.current;
    if (!row || !track) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let width = 0;
    let offset = 0;
    let hover = false;
    let drag = false;
    let lastX = 0;
    let raf = 0;
    const speed = 0.4;

    const measure = () => {
      width = track.scrollWidth / 2;
    };
    const wrap = () => {
      if (width > 0) {
        while (offset <= -width) offset += width;
        while (offset > 0) offset -= width;
      }
    };
    const apply = () => {
      track.style.transform = `translateX(${offset.toFixed(2)}px)`;
    };
    const frame = () => {
      if (!width) measure();
      if (!hover && !drag) offset += dir * speed;
      wrap();
      apply();
      raf = requestAnimationFrame(frame);
    };
    if (reduce) {
      // no auto-scroll for reduced-motion users; drag/wheel handlers still apply()
      measure();
      apply();
    } else {
      raf = requestAnimationFrame(frame);
    }

    const onEnter = () => {
      hover = true;
    };
    const onLeave = () => {
      // don't clear drag here: pointer capture keeps onUp/pointercancel firing
      hover = false;
    };
    const onDown = (e: PointerEvent) => {
      drag = true;
      lastX = e.clientX;
      row.classList.add('mq-row--drag');
      try {
        row.setPointerCapture(e.pointerId);
      } catch {
        /* setPointerCapture unsupported */
      }
    };
    const onMove = (e: PointerEvent) => {
      if (!drag) return;
      offset += e.clientX - lastX;
      lastX = e.clientX;
      wrap();
      apply();
    };
    const onUp = () => {
      drag = false;
      row.classList.remove('mq-row--drag');
    };
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return; // let vertical page scroll pass
      e.preventDefault();
      offset -= e.deltaX;
      wrap();
      apply();
    };
    const onResize = () => measure();

    row.addEventListener('mouseenter', onEnter);
    row.addEventListener('mouseleave', onLeave);
    row.addEventListener('pointerdown', onDown);
    row.addEventListener('pointermove', onMove);
    row.addEventListener('pointerup', onUp);
    row.addEventListener('pointercancel', onUp);
    row.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('resize', onResize, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      row.removeEventListener('mouseenter', onEnter);
      row.removeEventListener('mouseleave', onLeave);
      row.removeEventListener('pointerdown', onDown);
      row.removeEventListener('pointermove', onMove);
      row.removeEventListener('pointerup', onUp);
      row.removeEventListener('pointercancel', onUp);
      row.removeEventListener('wheel', onWheel);
      window.removeEventListener('resize', onResize);
    };
  }, [dir]);

  return (
    <div ref={rowRef} className="mq-row">
      <div ref={trackRef} className="mq-track">
        {[...items, ...items].map((item, i) => (
          <Chip key={`${item.title}-${i}`} {...item} />
        ))}
      </div>
    </div>
  );
}

export default function SkillMarquee() {
  return (
    <div className="mq" aria-label="Tools, frameworks and technologies">
      <MarqueeRow items={rowA} dir={-1} />
      <MarqueeRow items={rowB} dir={1} />
    </div>
  );
}
