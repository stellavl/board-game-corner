import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

const NavLinkItem = ({ label, to, setActiveLink }) => {
  const location = useLocation(); // Get current route
  const [hover, setHover] = useState(false);

  const isActive = location.pathname.startsWith(to);

  return (
    <Nav.Item>
      <Link
        to={to} 
        className={`nav-link px-4 fs-5 text-nowrap ${isActive ? 'text-decoration-underline' : ''}`}
        style={{ 
          color: 'var(--color-soft-yellow)',
          transform: hover ? 'scale(1.05)' : 'scale(1)',
          transition: 'background-color 0.1s, transform 0.1s'
        }}
        onClick={() => setActiveLink(to)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {label}
      </Link>
    </Nav.Item>
  );
};

export default NavLinkItem;