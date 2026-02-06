'use client';

import React from 'react';
import Section from '../common/Section';
import ScrollArrow from '../common/ScrollArrow';
import HeroBackground from '../common/HeroBackground';

const Hero: React.FC = () => {
  const scrollToAbout = () => {
    const about = document.getElementById('about');
    about?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

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
        <h5 className='self-start tracking-[.02rem] ml-2 sm:mt-2 sm:font-light'>
          Full-Stack Developer. Creator. Musician. Human.
        </h5>
        <div className='absolute bottom-80 sm:bottom-60 self-center'>
          <div className='block sm:hidden'>
            <ScrollArrow
              direction='down'
              className='hover:cursor-pointer'
              type='arrows'
              onClick={scrollToAbout}
            />
          </div>
          <div className='hidden sm:block'>
            <ScrollArrow
              direction='down'
              className='hover:cursor-pointer'
              type='mouse'
              onClick={scrollToAbout}
            />
          </div>
        </div>
      </Section>
    </>
  );
};

export default Hero;
