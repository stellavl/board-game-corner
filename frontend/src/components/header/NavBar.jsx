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


// import React, { useState } from "react";
// import { Navbar, Nav, Container } from 'react-bootstrap';
// import LoginButton from '../auth/LoginButton';
// import NavLinkItem from './NavLinkItem';

// function NavBar() {
//   const [activeLink, setActiveLink] = useState('home');

//   return (
//     <Navbar className="py-4 px-5" style={{ backgroundColor: 'var(--color-blue)' }} expand="lg">
//       <Container fluid>
//         <Navbar.Brand className="fs-4 fs-sm-6" style={{ color: 'var(--color-soft-yellow)', fontFamily: 'var(--font-calligraphic)'}}>
//           Board Game Corner
//         </Navbar.Brand>
//         <Navbar.Toggle aria-controls="navbar-nav" />
//         <Navbar.Collapse id="navbar-nav">
//           <Nav className="d-flex align-items-center ml-auto justify-content-end w-100">
//             <NavLinkItem label="Αρχική" link="home" activeLink={activeLink} setActiveLink={setActiveLink} />
//             <NavLinkItem label="Επιτραπέζια Παιχνίδια" link="games" activeLink={activeLink} setActiveLink={setActiveLink} />
//             <NavLinkItem label="Παιχνιδοκαφέ" link="cafe" activeLink={activeLink} setActiveLink={setActiveLink} />
//             <LoginButton />
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// }

// export default NavBar;

// import React, { useState } from "react";
// import { Navbar, Nav, Container } from "react-bootstrap";
// import { useLocation } from "react-router-dom";
// import LoginButton from "../auth/LoginButton";
// import NavLinkItem from "./NavLinkItem";

// function NavBar() {
//   const location = useLocation();
//   const [activeLink, setActiveLink] = useState(location.pathname);

//   return (
//     <Navbar className="py-4 px-5" style={{ backgroundColor: "var(--color-blue)" }} expand="lg">
//       <Container fluid>
//         <Navbar.Brand
//           className="fs-4 fs-sm-6"
//           style={{ color: "var(--color-soft-yellow)", fontFamily: "var(--font-calligraphic)" }}
//         >
//           Board Game Corner
//         </Navbar.Brand>
//         <Navbar.Toggle aria-controls="navbar-nav" />
//         <Navbar.Collapse id="navbar-nav">
//           <Nav className="d-flex align-items-center ml-auto justify-content-end w-100">
//             <NavLinkItem label="Αρχική" link="home" activeLink={activeLink} setActiveLink={setActiveLink} />
//             <NavLinkItem label="Επιτραπέζια Παιχνίδια" link="game" activeLink={activeLink} setActiveLink={setActiveLink} />
//             <NavLinkItem label="Παιχνιδοκαφέ" link="gamecafes" activeLink={activeLink} setActiveLink={setActiveLink} />
//             <LoginButton />
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// }

// export default NavBar;
