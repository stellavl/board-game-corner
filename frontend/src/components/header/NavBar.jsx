import React, { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import LoginButton from "../auth/LoginButton";
import NavLinkItem from "./NavLinkItem";

function NavBar() {
  const [activeLink, setActiveLink] = useState("/home");

  return (
    <Navbar className="py-4 px-5" style={{ backgroundColor: "var(--color-blue)" }} expand="lg">
      <Container fluid>
        <Navbar.Brand className="fs-4 fs-sm-6" style={{ color: "var(--color-soft-yellow)", fontFamily: "var(--font-calligraphic)" }}>
          Board Game Corner
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="d-flex align-items-center ml-auto justify-content-end w-100">
            <NavLinkItem label="Αρχική" to="/home" activeLink={activeLink} setActiveLink={setActiveLink} />
            <NavLinkItem label="Επιτραπέζια Παιχνίδια" to="/boardgames" activeLink={activeLink} setActiveLink={setActiveLink} />
            <NavLinkItem label="Παιχνιδοκαφέ" to="/boardgamecafes" activeLink={activeLink} setActiveLink={setActiveLink} />
            <LoginButton />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;