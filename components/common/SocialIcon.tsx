import React from 'react';

interface SocialIconProps {
  icon: React.ReactNode;
  title: string;
  link: string;
  animationIndex: number;
  className?: string;
}

const animations: Record<number, string> = {
  0: 'bounce',
  1: 'shakeX',
  2: 'pulse',
  3: 'wobble',
};

function SocialIcon({
  icon,
  title,
  className,
  link,
  animationIndex,
}: SocialIconProps) {
  const handleClick = () => {
    window.open(link, '_blank', 'noopener noreferrer');
  };
  return (
    <li
      className={`flex flex-col items-center hover:cursor-pointer animate__animated animate__${animations[animationIndex]}-hover`}
      onClick={handleClick}>
      {React.cloneElement(icon as JSX.Element, {
        title,
        className,
      })}
      <span className='sr-only'>{title}</span>
    </li>
  );
}

export default SocialIcon;
