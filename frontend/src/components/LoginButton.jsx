import React, { useState } from 'react';
import { Button, Stack } from 'react-bootstrap';
import { ChevronDown } from 'react-bootstrap-icons';

const LoginButton = () => {
  // State to manage hover effect
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Button
      className="py-2 px-3 ms-4 fs-5 border border-1"
      style={{
        color: 'var(--color-soft-yellow)',
        border: isHovered ? 'var(--color-orange)' : 'var(--color-soft-yellow)',
        backgroundColor: isHovered ? 'var(--color-orange)' : 'var(--color-blue)',
      }}
      // Event handlers to manage hover state
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Stack direction="horizontal" gap={3}>
        <span>Σύνδεση</span>
        <ChevronDown />
      </Stack>
    </Button>
  );
};

export default LoginButton;
