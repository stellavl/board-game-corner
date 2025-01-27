import React from "react";
import { Navbar, Nav } from 'react-bootstrap';
import LoginButton from './LoginButton';

function Header() {

  return (
    <Navbar className="py-4 px-5 d-flex justify-content-between" style={{ backgroundColor: 'var(--color-blue)' }}>
      <Navbar.Brand href="#home" className="font-calligraphic fs-md-2 fs-4" style={{ color: 'var(--color-soft-yellow)'}} > 
        Board Game Corner
      </Navbar.Brand>
      <Nav className="d-flex align-items-center ml-auto">
        <Nav.Link className="px-4 fs-5" style={{ color: 'var(--color-soft-yellow)'}}>
          Αρχική
        </Nav.Link>
        <Nav.Link className="px-4 fs-5 text-nowrap" style={{ color: 'var(--color-soft-yellow)'}}>
          Επιτραπέζια Παιχνίδια
        </Nav.Link>
        <Nav.Link className="fs-5 px-4 me-5" style={{ color: 'var(--color-soft-yellow)'}}>
          Παιχνιδοκαφέ
        </Nav.Link>
        <LoginButton />
      </Nav>
    </Navbar>
  );
}

export default Header;