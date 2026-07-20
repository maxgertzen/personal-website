'use client';

import React from 'react';
import { useInView } from '@/hooks/useInView';

type EmphasisProps = {
  variant: 'underline' | 'highlight';
  children: React.ReactNode;
};

export default function Emphasis({ variant, children }: EmphasisProps) {
  const { ref, inView } = useInView<HTMLSpanElement>();

  const className = ['emph', `emph--${variant}`, inView ? 'emph-in' : '']
    .filter(Boolean)
    .join(' ');

  return (
    <span ref={ref} className={className}>
      {children}
    </span>
  );
}
