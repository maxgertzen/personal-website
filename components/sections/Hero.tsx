import React from 'react';
import Section from '../common/Section';
import ScrollArrow from '../common/ScrollArrow';
import { useDevice } from '../../context/DeviceContext';

const Hero: React.FC = () => {
  const { isMobile } = useDevice();
  const scrollToAbout = () => {
    const about = document.getElementById('about');
    about?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <Section id='hero' className='mt-36' fullHeight>
      <h1>
        Max
        <br />
        Gertzen
      </h1>
      <h5 className='tracking-[.02rem] ml-2'>Develop. Code. Design. Music.</h5>
      <div className='absolute bottom-80'>
        <ScrollArrow
          direction='down'
          className='hover:cursor-pointer'
          type={isMobile ? 'arrows' : 'mouse'}
          onClick={scrollToAbout}
        />
      </div>
    </Section>
  );
};

export default Hero;
