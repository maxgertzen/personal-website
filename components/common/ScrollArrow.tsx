import React from 'react';

type ScrollArrowProps = {
  direction: 'up' | 'down';
  type?: 'mouse' | 'arrows';
  className?: string;
  onClick?: () => void;
  'aria-label': string;
};

const ScrollArrow: React.FC<ScrollArrowProps> = ({
  direction,
  type = 'mouse',
  onClick,
  className = '',
  'aria-label': ariaLabel,
}) => {
  if (type === 'arrows') {
    return (
      <button
        className={`bg-transparent border-none p-0 cursor-pointer ${className}`}
        onClick={onClick}
        aria-label={ariaLabel}
      >
        <div
          className={`arrow ${
            direction === 'down' ? 'arrow-down down' : 'arrow-up up'
          }-arrow-1`}></div>
        <div
          className={`arrow ${
            direction === 'down' ? 'arrow-down down' : 'arrow-up up'
          }-arrow-2`}></div>
        <div
          className={`arrow ${
            direction === 'down' ? 'arrow-down down' : 'arrow-up up'
          }-arrow-3`}></div>
      </button>
    );
  }

  return (
    <button
      className={`scroller ${
        direction === 'down' ? 'scroll-down' : 'scroll-up'
      } ${className} bg-transparent p-0 cursor-pointer`}
      onClick={onClick}
      aria-label={ariaLabel}></button>
  );
};

export default ScrollArrow;
