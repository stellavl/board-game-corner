import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';

const AccountDropdown = ({ userName, onLogout }) => {
  const [isProfileHovered, setIsProfileHovered] = useState(false);
  const [isLogoutHovered, setIsLogoutHovered] = useState(false);

  return (
    <Dropdown.Menu style={{ backgroundColor: 'var(--color-orange)' }}>
      <Dropdown.Item
        style={{
          color: 'var(--color-soft-yellow)',
          backgroundColor: isProfileHovered ? '#EFA77A' : 'transparent',
        }}
        href="/profile"
        onMouseEnter={() => setIsProfileHovered(true)}
        onMouseLeave={() => setIsProfileHovered(false)}
      >
        Προφίλ
      </Dropdown.Item>
      <Dropdown.Item
        style={{
          color: 'var(--color-soft-yellow)',
          backgroundColor: isLogoutHovered ? '#EFA77A' : 'transparent',
        }}
        onClick={onLogout}
        onMouseEnter={() => setIsLogoutHovered(true)}
        onMouseLeave={() => setIsLogoutHovered(false)}
      >
        Αποσύνδεση
      </Dropdown.Item>
    </Dropdown.Menu>
  );
};

export default AccountDropdown;