import React from 'react';

const SocialRow: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="w-[80%] m-auto sm:w-5/12">
      <ul className="flex justify-center items-center gap-12 sm:gap-16 w-[100%] list-none m-auto">
        {children}
      </ul>
    </div>
  );
};

export default SocialRow;
