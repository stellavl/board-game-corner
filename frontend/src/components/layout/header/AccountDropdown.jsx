import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import users from '../../../data/users';

const AccountDropdown = ({ userId, onLogout }) => {
  const [isProfileHovered, setIsProfileHovered] = useState(false);
  const [isLogoutHovered, setIsLogoutHovered] = useState(false);
  const navigate = useNavigate();

  const user = users.find(user => user.id === userId);

  const handleProfileClick = () => {
    if (user) {
      navigate(`/profile/${user.firstName}-${user.lastName}`, { state: { userId } });
    }
  };  

  return (
    <Dropdown.Menu style={{ backgroundColor: 'var(--color-orange)' }}>
      <Dropdown.Item
        style={{
          color: 'var(--color-soft-yellow)',
          backgroundColor: isProfileHovered ? '#EFA77A' : 'transparent',
        }}
        onClick={handleProfileClick}
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