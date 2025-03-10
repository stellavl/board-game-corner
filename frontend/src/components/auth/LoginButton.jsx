import React, { useState } from 'react';
import { Button, Stack, Dropdown } from 'react-bootstrap';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal'; 
import AccountDropdown from '../layout/header/AccountDropdown';

const LoginButton = () => {
  const [isDropdownButtonHovered, setIsDropdownButtonHovered] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('Στέλλα');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setDropdownOpen(false); 
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen); 
  };

  return (
    <>
      <Dropdown show={dropdownOpen} onToggle={toggleDropdown}> {}
        <Dropdown.Toggle
          as={Button}
          variant="link"
          className="py-2 px-3 fs-5 d-flex align-items-center justify-content-center text-nowrap text-decoration-none"
          style={{
            color: 'var(--color-soft-yellow)',
            borderColor: isDropdownButtonHovered ? 'var(--color-orange)' : 'var(--color-soft-yellow)',
            backgroundColor: isDropdownButtonHovered ? 'var(--color-orange)' : 'var(--color-blue)',
            width: '150px',
            height: '50px',
          }}
          onMouseEnter={() => setIsDropdownButtonHovered(true)}
          onMouseLeave={() => setIsDropdownButtonHovered(false)}
          onClick={() => {
            if (!isLoggedIn) {
              setShowLoginModal(true);
            } else {
              toggleDropdown(); 
            }
          }}
        >
          <Stack direction="horizontal" gap={2} className="w-100 justify-content-center">
            <span className="text-truncate" style={{ maxWidth: '100px' }}>
              {isLoggedIn ? userName : 'Σύνδεση'}
            </span>
          </Stack>
        </Dropdown.Toggle>

        {isLoggedIn && <AccountDropdown userName={userName} onLogout={handleLogout} />}
      </Dropdown>

      <LoginModal
        showLoginModal={showLoginModal}
        setShowLoginModal={setShowLoginModal}
        setIsLoggedIn={setIsLoggedIn}
        setShowSignUpModal={setShowSignupModal}
      />
      <SignupModal
        showModal={showSignupModal}
        setShowModal={setShowSignupModal}
        setShowLoginModal={setShowLoginModal}
      />
    </>
  );
};

export default LoginButton;
