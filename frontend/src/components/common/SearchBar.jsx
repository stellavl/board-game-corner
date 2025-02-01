import React, { useState } from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchBar = ({ placeholder }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    return (
        <InputGroup className="mb-3 mx-auto w-100">
            <FormControl
                placeholder={placeholder}
                aria-label="Search"
                className="rounded-start form-control-md"
            />
            <Button
                style={{
                    backgroundColor: isHovered ? 'var(--color-soft-yellow)' : 'var(--color-orange)',
                    border: isHovered ? '2px solid var(--color-orange)' : '2px solid var(--color-orange)',
                }}
                className="rounded-end"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <FontAwesomeIcon
                    icon={faSearch}
                    size="lg"
                    color={isHovered ? 'var(--color-orange)' : 'var(--color-soft-yellow)'}
                />
            </Button>
        </InputGroup>
    );
};

export default SearchBar;