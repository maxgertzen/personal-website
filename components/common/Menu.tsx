'use client';

import { FC, useEffect, useRef, useState } from 'react';
import {
  Link,
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from '@nextui-org/react';

interface MenuItem {
  id: string;
  label: string;
}

interface MenuProps {
  items: MenuItem[];
}

export const Menu: FC<MenuProps> = ({ items }) => {
  const [activeSection, setActiveSection] = useState<string>(
    items[0]?.id || ''
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    observer.current = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '-50px 0px -50% 0px',
      threshold: 0.2,
    });

    const heroSection = document.getElementById('hero');
    if (heroSection) {
      observer.current?.observe(heroSection);
    }

    items.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) {
        observer.current?.observe(section);
      }
    });

    return () => {
      items.forEach(({ id }) => {
        const section = document.getElementById(id);
        if (section) {
          observer.current?.unobserve(section);
        }
      });
      observer.current?.disconnect();
    };
  }, []);

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

export default Menu;
