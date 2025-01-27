import React from 'react';
import { Button } from 'react-bootstrap';
import { ChevronDown } from 'react-bootstrap-icons';

const LoginButton = () => {
  return (
    <Button
      className="login-button py-2 px-3 ms-4 fs-5 border border-1"
      style={{
        color: 'var(--color-soft-yellow)', 
        border: 'var(--color-soft-yellow)', 
        backgroundColor: 'var(--color-blue)', 
      }}
    >
      Σύνδεση 
      <ChevronDown className="ms-3"/>
    </Button>
  );
};

export default LoginButton;