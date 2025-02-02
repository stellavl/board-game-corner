import React, { createContext, useContext, useState } from 'react';

// Create context
const BoardGameContext = createContext();

// Create a provider component
export const BoardGameProvider = ({ children }) => {
    const [boardGameState, setBoardGameState] = useState({
        hasPlayed: false,
        wantToPlay: false,
        boardGameCafesCount: 12,  // default
        isFavorite: false,  
    });

    // Handle checkbox and favorite toggling
    const handleCheckboxChange = (key) => {
        setBoardGameState(prevState => ({
            ...prevState,
            [key]: !prevState[key]
        }));
    };

    const toggleFavorite = () => {
        setBoardGameState(prevState => ({
            ...prevState,
            isFavorite: !prevState.isFavorite
        }));
    };

    return (
        <BoardGameContext.Provider value={{ boardGameState, handleCheckboxChange, toggleFavorite }}>
            {children}
        </BoardGameContext.Provider>
    );
};

// Custom hook to access the context
export const useBoardGame = () => useContext(BoardGameContext);
