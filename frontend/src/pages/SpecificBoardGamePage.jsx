// pages/SpecificBoardGamePage.js
import React from "react";
import { useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";
import BackButton from "../components/common/BackButton";
import BoardGameOverview from "../components/boardgamepage/BoardGameOverview";  
import { BoardGameProvider } from "../components/context/BoardGameContext";  

const SpecificBoardGamePage = () => {
    const location = useLocation();
    const boardGame = location.state?.game;

    if (!boardGame) {
        return <h1 className="text-center mt-5">Game Not Found</h1>;
    }

    return (
        <>
            {/* Button to go back */}
            <BackButton />

            <BoardGameProvider>
                <Container className="d-flex flex-column justify-content-center align-items-center">
                    {/* BoardGameOverview will access the state from context */}
                    <BoardGameOverview boardGame={boardGame} />
                </Container>
            </BoardGameProvider>
        </>
    );
};

export default SpecificBoardGamePage;
