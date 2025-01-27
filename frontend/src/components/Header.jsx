import React, { useState } from "react";
import { Navbar, Nav, Container } from 'react-bootstrap';
import LoginButton from './LoginButton';
import NavLinkItem from './NavLinkItem';

function Header() {
  const [activeLink, setActiveLink] = useState('home');

  return (
    <Navbar className="py-4 px-5" style={{ backgroundColor: 'var(--color-blue)' }} expand="lg">
      <Container fluid>
        <Navbar.Brand href="#home" className="font-calligraphic fs-md-2 fs-4" style={{ color: 'var(--color-soft-yellow)'}}>
          Board Game Corner
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="d-flex align-items-center ml-auto justify-content-end w-100">
            <NavLinkItem label="Αρχική" link="home" activeLink={activeLink} setActiveLink={setActiveLink} />
            <NavLinkItem label="Επιτραπέζια Παιχνίδια" link="games" activeLink={activeLink} setActiveLink={setActiveLink} />
            <NavLinkItem label="Παιχνιδοκαφέ" link="cafe" activeLink={activeLink} setActiveLink={setActiveLink} />
            <LoginButton />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;