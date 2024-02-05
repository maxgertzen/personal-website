import React from 'react';

interface HamburgerIconProps {
  isOpen: boolean;
  onClick: () => void;
}

const HamburgerIcon: React.FC<HamburgerIconProps> = ({ isOpen, onClick }) => {
  return (
    <div className='hamburger-container' role='button' onClick={onClick}>
      <div
        id='hamburger-button'
        className={`z-52 ${isOpen ? 'open' : ''}`}
        onClick={onClick}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default HamburgerIcon;
