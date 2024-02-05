import React from 'react';

const SocialRow: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className='w-[80%] m-auto sm:w-6/12'>
      <ul className='flex justify-between items-center w-[100%] list-none m-auto'>
        {children}
      </ul>
    </div>
  );
};

export default SocialRow;
