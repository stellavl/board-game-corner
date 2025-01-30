import React from "react";
import { Navbar, Container } from 'react-bootstrap';

function Footer() {

  return (
    <Navbar className="py-4" style={{ backgroundColor: 'var(--color-blue)' }} expand="lg">
        <Container className="text-center justify-content-center">
            <span style={{ color: 'var(--color-soft-yellow)'}} >© 2025 Board Game Corner</span>
        </Container>
    </Navbar>
      );
    }
    
    export default Footer;