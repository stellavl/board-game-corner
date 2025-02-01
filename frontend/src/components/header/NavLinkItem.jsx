import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavLinkItem = ({ label, link, activeLink, setActiveLink }) => {
  return (
    <Nav.Item>
      <Link
        to={`/${link}`}
        className={`nav-link px-4 fs-5 text-nowrap ${activeLink === link ? 'text-decoration-underline' : ''}`}
        style={{ color: 'var(--color-soft-yellow)' }}
        onClick={() => setActiveLink(link)}
      >
        {label}
      </Link>
    </Nav.Item>
  );
};

export default NavLinkItem;