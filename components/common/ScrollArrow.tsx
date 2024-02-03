import React from 'react';

type ScrollArrowProps = {
  direction: 'up' | 'down';
  type?: 'mouse' | 'arrows';
  className?: string;
  onClick?: () => void;
};

const ScrollArrow: React.FC<ScrollArrowProps> = ({
  direction,
  type = 'mouse',
  onClick,
  className = '',
}) => {
  if (type === 'arrows') {
    return (
      <div className={className} onClick={onClick}>
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
      </div>
    );
  }

  return (
    <div
      className={`scroller ${
        direction === 'down' ? 'scroll-down' : 'scroll-up'
      } ${className}`}
      onClick={onClick}></div>
  );
};

export default ScrollArrow;
