import React from "react";
import { Row, Col } from "react-bootstrap";
import { useBoardGame } from "../context/BoardGameContext";
import BoardGameCheckBox from "./BoardGameCheckBox";
import { FaStar, FaRegStar } from "react-icons/fa";  // Import the star icons

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
                    <div onClick={toggleFavorite} className="ms-3" style={{ cursor: "pointer" }}>
                        {boardGameState.isFavorite ? (
                            <FaStar style={{ fontSize: "1.8rem", color: "var(--color-orange)" }} />
                        ) : (
                            <FaRegStar style={{ fontSize: "1.8rem", color: "var(--color-orange)" }} />
                        )}
                    </div>  
                </Col>
            </Row>

            {/* Checkboxes for "Έχω παίξει" and "Θέλω να παίξω" */}
            <Row className="mb-3">
                <Col className="d-flex justify-content-center align-items-center flex-column flex-sm-row">
                    <BoardGameCheckBox 
                        checkboxText="Θέλω να παίξω"
                        checked={boardGameState.wantToPlay}
                        onChange={() => handleCheckboxChange('wantToPlay')}
                        className="me-4 text-nowrap"
                    />
                    <BoardGameCheckBox 
                        checkboxText="Έχω παίξει"
                        checked={boardGameState.hasPlayed}
                        onChange={() => handleCheckboxChange('hasPlayed')}
                        className="text-nowrap"
                    />
                </Col>
            </Row>

            {/* Display the number of board game cafes */}
            <Row className="mb-1">
                <Col className="d-flex justify-content-center align-items-center">
                    <p className="text-center text-nowrap" style={{ color: "var(--color-orange)" }}>
                        Διαθέσιμο σε <span className="fw-bold fs-6 p-1 rounded" style={{ color: "var(--color-soft-yellow)", backgroundColor: "var(--color-orange)" }}>{boardGameState.boardGameCafesCount}</span> παιχνιδοκαφέ
                    </p>
                </Col>
            </Row>
        </>
    );
};

export default BoardGameOverview;