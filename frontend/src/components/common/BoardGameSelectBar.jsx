import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { searchBoardGames } from '../utils/searchBoardGames';
import { toast } from 'react-toastify';

const BoardGameSelectBar = ({ isSearchButtonVisible = true, searchResults, currentSearchText, setLoading }) => {
    const [searchText, setSearchText] = useState('');

    const handleSearchClick = async () => {
        currentSearchText(searchText);
        setLoading(true);
        try {
            const { boardGames, totalElements } = await searchBoardGames(searchText);
            searchResults(boardGames, totalElements);
        } catch (error) {
           toast.error(error, { position: 'top-center' });
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (event) => {
        setSearchText(event.target.value);
    };

    return (
        <div className="d-flex justify-content-center align-items-center">
            <div style={{ position: 'relative', width: '18rem' }}>
                <input
                    type="text"
                    placeholder="Αναζήτηση επιτραπεζίων"
                    value={searchText}
                    onChange={handleInputChange}
                    style={{
                        width: '100%',
                        padding: '0.5rem',
                        border: '1px solid var(--color-orange)',
                        borderRadius: '4px',
                        backgroundColor: 'var(--color-soft-yellow)',
                        color: 'var(--color-orange)',
                        outline: 'none',
                        boxShadow: 'none',
                    }}
                />
            </div>
            {isSearchButtonVisible && (
                <Button
                    style={{
                        backgroundColor: searchText
                            ? 'var(--color-orange)'
                            : 'var(--color-gray-purple)',
                        border: searchText ? '1px solid var(--color-orange)' : '2px solid var(--color-gray-purple)',
                        cursor: searchText ? 'pointer' : 'not-allowed',
                    }}
                    className="rounded-end ms-2"
                    onClick={handleSearchClick}
                    disabled={!searchText}
                >
                    <FontAwesomeIcon
                        icon={faSearch}
                        size="lg"
                        color={'var(--color-soft-yellow)'}
                    />
                </Button>
            )}
        </div>
    );
};

export default BoardGameSelectBar;
