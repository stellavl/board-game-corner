import React from 'react';
import { Nav } from 'react-bootstrap';

const NavLinkItem = ({ label, link, activeLink, setActiveLink }) => {
  return (
    <Nav.Link
      className={`px-4 fs-5 text-nowrap ${activeLink === link ? 'text-decoration-underline' : ''}`}
      style={{ color: 'var(--color-soft-yellow)' }}
      onClick={() => setActiveLink(link)}
    >
      {label}
    </Nav.Link>
  );
};

export default NavLinkItem;