import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const OrangeButton = ({ text }) => {
  return (
      <button 
          className="btn"
          style={{
              color: 'var(--color-soft-yellow)',
              backgroundColor: 'var(--color-orange)',
          }}
      >
          {text}
      </button>
  );
};

export default OrangeButton;