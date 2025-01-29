import React, { useState } from 'react';
import { Button, Stack, Modal, Form, Spinner, Alert } from 'react-bootstrap';
import { ChevronDown } from 'react-bootstrap-icons';
import LoginModal from './LoginModal';

const LoginButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button 
        className="py-2 px-3 ms-4 fs-5 border" onClick={() => setShowModal(true)}
        style={{
        color: 'var(--color-soft-yellow)',
        border: isHovered ? 'var(--color-orange)' : 'var(--color-soft-yellow)',
        backgroundColor: isHovered ? 'var(--color-orange)' : 'var(--color-blue)',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Stack direction="horizontal" gap={2}>
          <span>Σύνδεση</span>
          <ChevronDown className="mt-1" />
        </Stack>
      </Button>

      <LoginModal showModal={showModal} setShowModal={setShowModal} />

    </>
  );
};

export default LoginButton;