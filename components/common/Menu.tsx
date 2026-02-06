'use client';

import { FC } from 'react';
import { NavBar } from '@/components/ui';
import { useSectionObserver } from '@/hooks/useSectionObserver';

interface MenuItem {
  id: string;
  label: string;
}

interface MenuProps {
  items: MenuItem[];
}

export const Menu: FC<MenuProps> = ({ items }) => {
  const activeSection = useSectionObserver(
    items.map((i) => i.id),
    ['hero']
  );

  return <NavBar items={items} activeSection={activeSection} />;
};

export default Menu;
