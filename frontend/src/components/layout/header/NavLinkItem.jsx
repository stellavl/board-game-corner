import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

const NavLinkItem = ({ label, to, setActiveLink }) => {
  const location = useLocation(); // Get current route

  const isActive = location.pathname.startsWith(to);

  return (
    <Nav.Item>
      <Link
        to={to} 
        className={`nav-link px-4 fs-5 text-nowrap ${isActive ? 'text-decoration-underline' : ''}`}
        style={{ color: 'var(--color-soft-yellow)' }}
        onClick={() => setActiveLink(to)}
      >
        {label}
      </Link>
    </Nav.Item>
  );
};

export default NavLinkItem;
