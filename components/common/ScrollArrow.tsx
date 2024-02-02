import React from 'react';

type ScrollArrowProps = {
  direction: 'up' | 'down';
  className?: string;
};

const ScrollArrow: React.FC<ScrollArrowProps> = ({
  direction,
  className = '',
}) => {
  return (
    <div
      className={`scroller ${
        direction === 'down' ? 'scroll-down' : 'scroll-up'
      } ${className}`}></div>
  );
};

export default ScrollArrow;
