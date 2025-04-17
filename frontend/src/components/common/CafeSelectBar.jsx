import React, { useState } from 'react';
import Select from 'react-select';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'; 
import allBoardGameCafes from '../../data/boardGameCafes';

const CafeSelectBar = ({ boardGameCafes= allBoardGameCafes }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [selectedCafe, setSelectedCafe] = useState(null);
    const [searchText, setSearchText] = useState('');
    const navigate = useNavigate(); 

    const cafeOptions = boardGameCafes
        .filter(cafe => cafe.name.toLowerCase().includes(searchText.toLowerCase()))
        .map(cafe => ({
            value: cafe.id,
            label: cafe.name + ' | ' + cafe.city
        }));

    const handleSearchClick = () => {
        if (selectedCafe) {
            boardGameCafes.forEach(cafe => {
                if (cafe.id === selectedCafe.value) {
                    navigate(`/boardgamecafes/${cafe.city}/${cafe.name}`);
                }
            });
        }
    };

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    const handleCafeSelect = (selectedOption) => {
        setSelectedCafe(selectedOption);
    };

    const handleInputChange = (newValue) => {
        setSearchText(newValue);
    };

    return (
        <div className="d-flex justify-content-center mb-3">
            <Select
                options={searchText.length >= 2 ? cafeOptions : []} 
                placeholder="Αναζήτηση παιχνιδοκαφέ"
                onChange={handleCafeSelect}
                onInputChange={handleInputChange}
                isSearchable
                menuIsOpen={searchText.length >= 2}
                styles={{
                    container: (provided) => ({
                        ...provided,
                        width: '20rem',
                    }),
                    control: (provided, state) => ({
                        ...provided,
                        backgroundColor: "var(--color-soft-yellow)",
                        borderColor: "var(--color-orange)",
                        borderWidth: "1px",
                        boxShadow: state.isFocused ? "0 0 5px var(--color-orange)" : "none",
                        "&:hover": { borderColor: "var(--color-orange)" }
                    }),
                    singleValue: (provided) => ({
                        ...provided,
                        color: "var(--color-orange)"
                    }),
                    placeholder: (provided) => ({
                        ...provided,
                        color: "var(--color-orange)"
                    }),
                    dropdownIndicator: (provided) => ({
                        ...provided,
                        color: searchText.length < 2 ? "var(--color-soft-yellow)" : 'var(--color-orange)',
                    }),
                    indicatorSeparator: (provided) => ({
                        ...provided,
                        backgroundColor: searchText.length < 2 ? "var(--color-soft-yellow)" : 'var(--color-orange)',
                    }),
                    menu: (provided) => ({
                        ...provided,
                        backgroundColor: "var(--color-soft-yellow)",
                        borderColor: "var(--color-orange)"
                    }),
                    option: (provided, state) => ({
                        ...provided,
                        backgroundColor: state.isSelected ? "var(--color-soft-orange)" : "var(--color-soft-yellow)",
                        color: "var(--color-orange)",
                        cursor: 'pointer',
                        "&:hover": { 
                            backgroundColor: "var(--color-orange)", 
                            color: "var(--color-soft-yellow)" 
                        }
                    })
                }}
                isDisabled={false}
            />
            <Button
                style={{
                    backgroundColor: selectedCafe
                        ? isHovered 
                            ? 'var(--color-soft-yellow)' 
                            : 'var(--color-orange)' 
                        : 'var(--color-gray-purple)', 
                    border: selectedCafe ? '1px solid var(--color-orange)': '1px solid var(--color-gray-purple)',
                    cursor: selectedCafe ? 'pointer' : 'not-allowed', 
                }}
                className="rounded-end ms-2"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleSearchClick}
                disabled={!selectedCafe}
            >
                <FontAwesomeIcon
                    icon={faSearch}
                    size="lg"
                    color={selectedCafe ? (isHovered ? 'var(--color-orange)' : 'var(--color-soft-yellow)') : 'var(--color-soft-yellow)'}
                />
            </Button>
        </div>
    );
};

export default CafeSelectBar;
