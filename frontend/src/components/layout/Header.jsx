import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <nav className="navbar navbar-expand-lg navbar-custom">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/home">Αρχική</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/board-games">Επιτραπέζια Παιχνίδια</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/game-cafe">Παιχνιδοκαφέ</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">Σύνδεση</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;