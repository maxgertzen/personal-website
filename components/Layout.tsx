import React from 'react';

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <main>{children}</main>;
};

export default Layout;
