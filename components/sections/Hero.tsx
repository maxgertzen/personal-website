import React from 'react';
import Section from '../common/Section';
import { Spacer } from '@nextui-org/react';
import ScrollArrow from '../common/ScrollArrow';

const Hero: React.FC = () => {
  return (
    <Section id='hero' className='mt-36' fullHeight>
      <h1>
        Max
        <br />
        Gertzen
      </h1>
      <h5 className='tracking-[.02rem]'>Develop. Code. Design. Music.</h5>
      <div className='absolute bottom-80'>
        <ScrollArrow direction='down' />
      </div>
    </Section>
  );
};

export default Hero;
