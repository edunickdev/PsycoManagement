import React from 'react';
import { NavLink } from 'react-router-dom';

const NavItem = ({ to, children, hidden }) => {
  if (hidden) return null;

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
          isActive
            ? 'bg-primary text-navy-900 shadow-lg shadow-primary/20'
            : 'text-gray-300 hover:text-white hover:bg-white/10'
        }`
      }
    >
      {children}
    </NavLink>
  );
};

export default NavItem;
