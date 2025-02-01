import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const OrangeButton = ({ text, size }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <button 
            className={`btn ${size}`}
            style={{
                color: isHovered ? 'var(--color-orange)' : 'var(--color-soft-yellow)',
                backgroundColor: isHovered ? 'inherit' : 'var(--color-orange)',                
                border: isHovered ? '2px solid var(--color-orange)' : '2px solid var(--color-orange)',
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {text}
        </button>
    );
};

export default OrangeButton;