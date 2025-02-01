import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

const NavLinkItem = ({ label, to, setActiveLink }) => {
  const location = useLocation(); // Get current route

  return (
    <Nav.Item>
      <Link
        to={to} // Use the correct full route path
        className={`nav-link px-4 fs-5 text-nowrap ${location.pathname === to ? 'text-decoration-underline' : ''}`}
        style={{ color: 'var(--color-soft-yellow)' }}
        onClick={() => setActiveLink(to)} // Store full route path in state
      >
        {label}
      </Link>
    </Nav.Item>
  );
};

export default NavLinkItem;
