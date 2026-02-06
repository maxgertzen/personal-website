'use client';

import React from 'react';
import ScrollArrow from '../common/ScrollArrow';
import { useScrollTo } from '@/hooks/useScrollTo';

const Footer: React.FC = () => {
  const { scrollToTop } = useScrollTo();

  return (
    <footer className='p-30 flex flex-col items-center gap-8'>
      <div className='mt-section-gap' />
      <ScrollArrow
        direction='up'
        type='arrows'
        aria-label='Scroll to top'
        onClick={scrollToTop}
      />
      <p>&copy; Built by Max Gertzen</p>
    </footer>
  );
};

export default Footer;
