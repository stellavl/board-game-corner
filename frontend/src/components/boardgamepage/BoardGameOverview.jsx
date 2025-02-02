import React from "react";
import { Row, Col } from "react-bootstrap";
import { useBoardGame } from "../context/BoardGameContext";
import BoardGameCheckBox from "./BoardGameCheckBox";  

const BoardGameOverview = ({ boardGame }) => {
    const { boardGameState, handleCheckboxChange, toggleFavorite } = useBoardGame();  // Access the context

    return (
        <>
            {/* Display the board game name */}
            <Row className="mb-2">
                <Col className="d-flex justify-content-center align-items-center">
                    <h1 className="text-center" style={{ color: "var(--color-orange)" }}>
                        {boardGame.name}
                    </h1>

                    {/* FavoriteStar component */}
                    <div onClick={toggleFavorite} className="ms-2" style={{ cursor: "pointer" }}>                    
                        <span style={{ fontSize: "2rem", color: boardGameState.isFavorite ? "var(--color-orange)" : "var(--color-gray-purple)" }}>
                            ★
                        </span>
                    </div>
                </Col>
            </Row>

            {/* Checkboxes for "Έχω παίξει" and "Θέλω να παίξω" */}
            <Row className="mb-3">
                <Col className="d-flex justify-content-center align-items-center">
                    <BoardGameCheckBox 
                        checkboxText="Θέλω να παίξω"
                        checked={boardGameState.wantToPlay}
                        onChange={() => handleCheckboxChange('wantToPlay')}
                        className="me-4"
                    />
                    <BoardGameCheckBox 
                        checkboxText="Έχω παίξει"
                        checked={boardGameState.hasPlayed}
                        onChange={() => handleCheckboxChange('hasPlayed')}
                    />
                </Col>
            </Row>

            {/* Display the number of board game cafes */}
            <Row className="mb-4">
                <Col className="d-flex justify-content-center align-items-center">
                    <p className="text-center" style={{ color: "var(--color-orange)" }}>
                        Διαθέσιμο σε <span className="fw-bold fs-6 p-1 rounded" style={{ color: "var(--color-soft-yellow)", backgroundColor: "var(--color-orange)" }}>{boardGameState.boardGameCafesCount}</span> παιχνιδοκαφέ
                    </p>
                </Col>
            </Row>
        </>
    );
};

export default BoardGameOverview;
