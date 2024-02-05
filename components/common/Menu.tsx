import React from 'react';
import NavigationMenu from './NavigationMenu';

interface MenuItem {
  id: string;
  label: string;
}

interface MenuProps {
  items: MenuItem[];
}

const Menu: React.FC<MenuProps> = ({ items }) => {
  const [activeSection, setActiveSection] = React.useState<string>('hero');
  const [isUserScroll, setIsUserScroll] = React.useState(true);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  let lastScrollY = typeof window !== 'undefined' ? window.scrollY : 0;

  const handleScroll = () => {
    if (!isUserScroll) {
      setIsUserScroll(true);
      return;
    }

    const currentScrollY = window.scrollY;

    lastScrollY = currentScrollY;

    items.forEach((item) => {
      const section = document.getElementById(item.id);
      if (section) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 3 && rect.bottom >= 0) {
          setActiveSection(item.id);
        }
      }
    });
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [items]);

  const scrollToSection = (id: string) => {
    setIsUserScroll(false);
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {isMenuOpen && (
        <div
          className='fixed inset-0 bg-black bg-opacity-50 z-40'
          onClick={() => setIsMenuOpen(false)}></div>
      )}
      <NavigationMenu
        items={items}
        onMenuItemClick={(id) => {
          scrollToSection(id);
        }}
        activeSection={activeSection}
        isMenuOpen={isMenuOpen}
        toggleMenuOpen={toggleMenu}
      />
    </>
  );
};

export default Menu;
