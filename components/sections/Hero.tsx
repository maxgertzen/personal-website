import React from 'react';
import Section from '../common/Section';
import ScrollArrow from '../common/ScrollArrow';
import { useDevice } from '../../context/DeviceContext';
import HeroBackground from '../common/HeroBackground';

const Hero: React.FC = () => {
  const { isMobile } = useDevice();
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
        <h1 className='self-start sm:text-9xl'>
          Max
          <br />
          Gertzen
        </h1>
        <h5 className='self-start tracking-[.02rem] ml-2 sm:text-4xl sm:mt-2 sm:font-light'>
          Full-Stack Developer. Creator. Musician. Human.
        </h5>
        <div className='absolute bottom-80 sm:bottom-60 self-center'>
          <ScrollArrow
            direction='down'
            className='hover:cursor-pointer'
            type={isMobile ? 'arrows' : 'mouse'}
            onClick={scrollToAbout}
          />
        </div>
      </Section>
    </>
  );
};

export default Hero;
