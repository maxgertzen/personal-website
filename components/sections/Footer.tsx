'use client';

import React from 'react';
import ScrollArrow from '../common/ScrollArrow';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className='bg-black text-white p-30 flex flex-col items-center gap-8'>
      <div className='mt-section-gap' />
      <ScrollArrow
        direction='up'
        className='hover:cursor-pointer border-white'
        type='arrows'
        onClick={scrollToTop}
      />
      <p>&copy; Built by Max Gertzen</p>
    </footer>
  );
};

export default Footer;
