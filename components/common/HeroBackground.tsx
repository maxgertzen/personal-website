import React from 'react';

const HeroBackground: React.FC = () => {
  return (
    <div
      className='hidden sm:block hero-bg'
      style={{
        backgroundImage: 'url(/assets/hero.svg)',
      }}></div>
  );
};

export default HeroBackground;
