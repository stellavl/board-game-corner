import React, { createContext, useContext, useState, useEffect } from 'react';

// Create context
const BoardGameContext = createContext();

// Create a provider component
export const BoardGameProvider = ({ children }) => {
    // Initialize state from localStorage if it exists, otherwise use default values
    const initialState = JSON.parse(localStorage.getItem('boardGameState')) || {
        hasPlayed: false,
        wantToPlay: false,
        boardGameCafesCount: 12,  // default
        isFavorite: false,  
    };

    const [boardGameState, setBoardGameState] = useState(initialState);

    // Handle checkbox and favorite toggling
    const handleCheckboxChange = (key) => {
        const newState = { 
            ...boardGameState,
            [key]: !boardGameState[key]
        };
        setBoardGameState(newState);
        localStorage.setItem('boardGameState', JSON.stringify(newState)); // Save to localStorage
    };

    const toggleFavorite = () => {
        const newState = { 
            ...boardGameState,
            isFavorite: !boardGameState.isFavorite
        };
        setBoardGameState(newState);
        localStorage.setItem('boardGameState', JSON.stringify(newState)); // Save to localStorage
    };

    return (
        <BoardGameContext.Provider value={{ boardGameState, handleCheckboxChange, toggleFavorite }}>
            {children}
        </BoardGameContext.Provider>
    );
};

// Custom hook to access the context
export const useBoardGame = () => useContext(BoardGameContext);
