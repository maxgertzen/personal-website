import React from "react";
import HamburgerIcon from "./HamburgerIcon";

interface MenuItem {
  id: string;
  label: string;
}

interface NavigationMenuProps {
  items: MenuItem[];
  onMenuItemClick: (id: string) => void;
  activeSection?: string;
  isMenuOpen: boolean;
  toggleMenuOpen: () => void;
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({
  items,
  activeSection,
  isMenuOpen,
  toggleMenuOpen,
  onMenuItemClick,
}) => {
  return (
    <nav
      className={`menu shadow-lg sm:shadow-none ${isMenuOpen ? "open" : ""}`}
      aria-label="Main navigation"
    >
      <ul className="flex flex-col mt-32 sm:flex-row sm:space-x-4 sm:mt-0">
        {items.map((item) => (
          <li key={item.id}>
            <div
              className={`menu-circle ${
                activeSection === item.id ? "active" : ""
              }`}
            ></div>
            <button
              onClick={() => {
                onMenuItemClick(item.id);
              }}
              className="menu-item"
              style={{ all: "unset", cursor: "pointer" }}
            >
              <span className="link-animate">{item.label}</span>
            </button>
          </li>
        ))}
      </ul>
      <HamburgerIcon isOpen={isMenuOpen} onClick={toggleMenuOpen} />
    </nav>
  );
};

export default NavigationMenu;
