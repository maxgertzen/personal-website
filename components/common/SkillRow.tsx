import { Divider, Spacer } from '@nextui-org/react';
import React from 'react';

interface SkillRowProps {
  title: string;
  isMusic?: boolean;
}

const SkillRow: React.FC<React.PropsWithChildren<SkillRowProps>> = ({
  title,
  isMusic = false,
  children,
}) => {
  return (
    <div className='w-[100%]'>
      <h3 className='sm:text-2xl'>{title}</h3>
      <Spacer y={4} />
      <ul
        className={`flex justify-between ${
          isMusic
            ? 'items-center w-[80%] flex-wrap content-center gap-4'
            : 'items-baseline w-[100%]'
        } list-none m-auto sm:w-6/12 sm:mt-8`}>
        {children}
      </ul>
      <Divider className='hidden mt-12 sm:block' />
    </div>
  );
};

export default SkillRow;
