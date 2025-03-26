import React, { useState } from 'react';
import Select from 'react-select';
import defaultBoardGames from '../../data/boardGames';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const BoardGameSelectBar = ({ boardGames, isSearchButtonVisible = true, onGameSelect }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [selectedGame, setSelectedGame] = useState(null);
    const [searchText, setSearchText] = useState('');
    const navigate = useNavigate();

    const boardGameList = boardGames || defaultBoardGames;

    const boardGameOptions = boardGameList  
        .filter(game => game.name.toLowerCase().includes(searchText.toLowerCase()))
        .map(game => ({
            value: game.id,
            label: game.name
        }));

    const handleSearchClick = () => {
        if (selectedGame) {
            navigate(`/boardgames/${selectedGame.label}`);
        }
    };

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    const handleGameSelect = (selectedOption) => {
        setSelectedGame(selectedOption);
        if (onGameSelect) {
            onGameSelect(selectedOption);
        }
    };

    const handleInputChange = (newValue) => {
        setSearchText(newValue);
    };

    const handleClearSelection = () => {
        setSelectedGame(null);
        setSearchText('');
        if (onGameSelect) {
            onGameSelect(null);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center">
            <div style={{ position: 'relative', width: '18rem' }}>
                <Select
                    options={searchText.length >= 2 ? boardGameOptions : []}
                    placeholder="Αναζήτηση επιτραπεζίων"
                    onChange={handleGameSelect}
                    onInputChange={handleInputChange}
                    isSearchable
                    value={selectedGame}
                    menuIsOpen={searchText.length >= 2}
                    styles={{
                        container: (provided) => ({
                            ...provided,
                            width: '100%',
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
                            color: "var(--color-orange)",
                            textAlign: "left",  // Left align selected value
                        }),
                        placeholder: (provided) => ({
                            ...provided,
                            color: "var(--color-orange)",
                            textAlign: "left", // Left align placeholder text
                        }),
                        input: (provided) => ({
                            ...provided,
                            textAlign: "left", // Ensure input text is left-aligned
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
                            textAlign: "left", // Left align dropdown options
                            cursor: 'pointer',
                            "&:hover": {
                                backgroundColor: "var(--color-orange)",
                                color: "var(--color-soft-yellow)"
                            }
                        })
                    }}
                    isDisabled={false}
                />
                {selectedGame && (
                    <button
                        onClick={handleClearSelection}
                        style={{
                            position: 'absolute',
                            right: '35px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                        }}
                    >
                        <FontAwesomeIcon icon={faTimes} color="var(--color-orange)" />
                    </button>
                )}
            </div>
            {isSearchButtonVisible && (
                <Button
                    style={{
                        backgroundColor: selectedGame
                            ? isHovered
                                ? 'var(--color-soft-yellow)'
                                : 'var(--color-orange)'
                            : 'var(--color-gray-purple)',
                        border: selectedGame ? '1px solid var(--color-orange)' : '1px solid var(--color-gray-purple)',
                        cursor: selectedGame ? 'pointer' : 'not-allowed',
                    }}
                    className="rounded-end ms-2"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleSearchClick}
                    disabled={!selectedGame}
                >
                    <FontAwesomeIcon
                        icon={faSearch}
                        size="lg"
                        color={selectedGame ? (isHovered ? 'var(--color-orange)' : 'var(--color-soft-yellow)') : 'var(--color-soft-yellow)'}
                    />
                </Button>
            )}
        </div>
    );
};

export default BoardGameSelectBar;
