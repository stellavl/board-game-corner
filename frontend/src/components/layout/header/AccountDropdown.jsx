import React, { useState, useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AccountDropdown = ({ userId, onLogout }) => {
  const [isProfileHovered, setIsProfileHovered] = useState(false);
  const [isLogoutHovered, setIsLogoutHovered] = useState(false);
  const navigate = useNavigate();

  const handleProfileClick = () => {
    if (userId) {
      navigate(`/profile/${userId}`);
    } else {
      toast.error('Ο χρήστης δεν είναι διαθέσιμος.', { position: 'top-center' });
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