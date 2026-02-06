import React from 'react';

interface SkillRowProps {
  title: string;
  columns: number;
}

const SkillRow: React.FC<React.PropsWithChildren<SkillRowProps>> = ({
  title,
  columns,
  children,
}) => {
  return (
    <div className='w-full'>
      <h3>{title}</h3>
      <div className='mt-4'>
        <ul
          style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
          className='grid place-items-center list-none m-auto px-4 sm:w-6/12 sm:mt-8 sm:px-0'>
          {children}
        </ul>
      </div>
      <hr className='hidden mt-12 sm:block border-divider' />
    </div>
  );
};

export default SkillRow;
