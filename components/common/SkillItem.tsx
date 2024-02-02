import React from 'react';

interface SkillItemProps {
  icon: React.ReactNode;
  title: string;
}

function SkillItem({ icon, title }: SkillItemProps) {
  return (
    <div
      className={`flex flex-col items-center ${
        title === 'Php' ? 'self-center' : ''
      }`}>
      {React.cloneElement(icon as JSX.Element, {
        title,
      })}
      <span className='sr-only'>{title}</span>
    </div>
  );
}

export default SkillItem;
