import React from 'react';

interface SkillItemProps {
  icon: React.ReactNode;
  title: string;
}

function SkillItem({ icon, title }: SkillItemProps) {
  return (
    <li
      className={`flex flex-col items-center ${
        title === 'Php' ? 'self-center' : ''
      }`}>
      {React.cloneElement(icon as JSX.Element, {
        title,
      })}
      <span className='sr-only'>{title}</span>
    </li>
  );
}

export default SkillItem;
