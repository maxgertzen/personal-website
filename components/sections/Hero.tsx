'use client';

import React from 'react';
import Section from '../common/Section';
import ScrollArrow from '../common/ScrollArrow';
import HeroBackground from '../common/HeroBackground';
import { useScrollTo } from '@/hooks/useScrollTo';

const Hero: React.FC = () => {
  const { scrollToElement } = useScrollTo();

  return (
    <>
      <HeroBackground />
      <Section
        id='hero'
        className='mt-36 px-[3rem] sm:items-start sm:px-20 sm:w-[100%]'
        fullHeight>
        <h1 className='self-start'>
          Max
          <br />
          Gertzen
        </h1>
        <p className='self-start text-subtitle font-bold tracking-[.02rem] ml-2 sm:mt-2 sm:font-light'>
          Full-Stack Developer. Creator. Musician. Human.
        </p>
        <div className='absolute bottom-80 sm:bottom-60 self-center'>
          <div className='block sm:hidden'>
            <ScrollArrow
              direction='down'
              type='arrows'
              aria-label='Scroll to about section'
              onClick={() => scrollToElement('about')}
            />
          </div>
          <div className='hidden sm:block'>
            <ScrollArrow
              direction='down'
              type='mouse'
              aria-label='Scroll to about section'
              onClick={() => scrollToElement('about')}
            />
          </div>
        </div>
      </Section>
    </>
  );
};

export default Hero;
