'use client';

import React, { useState } from 'react';
import {
  Link,
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from '@nextui-org/react';

interface NavBarItem {
  id: string;
  label: string;
}

interface NavBarProps {
  items: NavBarItem[];
  activeSection: string;
}

const NavBar: React.FC<NavBarProps> = ({ items, activeSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar
      maxWidth="full"
      onMenuOpenChange={setIsMenuOpen}
      className="backdrop-opacity-75"
    >
      <NavbarMenuToggle
        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        className="sm:hidden"
      />
      <NavbarContent className="hidden sm:flex" justify="end">
        {items.map(({ id, label }, index) => (
          <NavbarItem key={index} isActive={activeSection === id}>
            <Link
              color={activeSection === id ? 'warning' : 'foreground'}
              href={`#${id}`}
            >
              {label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarMenu className="backdrop-opacity-50">
        {items.map(({ id, label }, index) => (
          <NavbarMenuItem key={index} isActive={activeSection === id}>
            <Link
              color={activeSection === id ? 'warning' : 'foreground'}
              href={`#${id}`}
            >
              {label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default NavBar;
