import React from 'react';
import HeroBg from '!!url-loader!../../public/assets/hero.svg';

const HeroBackground: React.FC = () => {
  return (
    <div
      className='hidden sm:block hero-bg'
      style={{
        backgroundImage: `url(${HeroBg})`,
      }}></div>
  );
};

export default HeroBackground;
