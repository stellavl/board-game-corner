import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';

const BoardGameSelectBar = ({ 
    isSearchButtonVisible = true, 
    searchText,
    setSearchText,
    onClearSearch,
}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [temporaryText, setTemporaryText] = useState(searchText || '');
    
    const handleSearchClick = async () => {
        try {
            if (location.pathname == '/home') {
                navigate(`/boardgames?searchText=${encodeURIComponent(temporaryText)}`);
            } else {
                setSearchText(temporaryText); 
            }
        } catch (error) {
            toast.error(error, { position: 'top-center' });
        } 
    };

    const handleInputChange = (event) => {
        setTemporaryText(event.target.value);
    };

    const handleClearSearch = () => {
        setTemporaryText('');
        setSearchText('');
        if (onClearSearch) onClearSearch();
    };

    useEffect(() => {
        setTemporaryText(searchText || '');
    }, [searchText]);

    return (
        <div className="d-flex justify-content-center align-items-center">
            <div style={{ position: 'relative', width: '18rem' }}>
                <input
                    type="text"
                    placeholder={"Αναζήτηση επιτραπεζίων"}
                    value={temporaryText}
                    onChange={handleInputChange}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && temporaryText.length >= 3) {
                            handleSearchClick();
                        }
                    }}
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
                            {temporaryText && (
                    <span
                        style={{
                            position: 'absolute',
                            right: '0.75rem',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            cursor: 'pointer',
                            color: 'var(--color-orange)',
                            zIndex: 2,
                        }}
                        onClick={handleClearSearch}
                        aria-label="Clear search"
                        title="Καθαρισμός αναζήτησης"
                    >
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                )}
            </div>
            {isSearchButtonVisible && (
                <Button
                    style={{
                        backgroundColor: temporaryText.length >= 3
                            ? 'var(--color-orange)'
                            : 'var(--color-gray-purple)',
                        border: temporaryText.length >= 3 ? '1px solid var(--color-orange)' : '2px solid var(--color-gray-purple)',
                        cursor: temporaryText.length >= 3 ? 'pointer' : 'not-allowed',
                    }}
                    className="rounded-end ms-2"
                    onClick={handleSearchClick}
                    disabled={temporaryText.length < 3}
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
