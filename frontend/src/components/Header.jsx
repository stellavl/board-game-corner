import React, { useState } from "react";
import { Navbar, Nav, Container } from 'react-bootstrap';
import LoginButton from './LoginButton';

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
            <Nav.Link 
              className={`px-4 fs-5 ${activeLink === 'home' ? 'text-decoration-underline' : ''}`} 
              style={{ color: 'var(--color-soft-yellow)'}} 
              onClick={() => setActiveLink('home')}
            >
              Αρχική
            </Nav.Link>
            <Nav.Link 
              className={`px-4 fs-5 text-nowrap ${activeLink === 'games' ? 'text-decoration-underline' : ''}`} 
              style={{ color: 'var(--color-soft-yellow)'}} 
              onClick={() => setActiveLink('games')}
            >
              Επιτραπέζια Παιχνίδια
            </Nav.Link>
            <Nav.Link 
              className={`fs-5 px-4 me-5 ${activeLink === 'cafe' ? 'text-decoration-underline' : ''}`} 
              style={{ color: 'var(--color-soft-yellow)'}} 
              onClick={() => setActiveLink('cafe')}
            >
              Παιχνιδοκαφέ
            </Nav.Link>
            <LoginButton />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
