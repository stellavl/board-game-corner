import React from "react";
import { Row, Col } from "react-bootstrap";
import { useBoardGame } from "../context/BoardGameContext";
import BoardGameCheckBox from "./BoardGameCheckBox";
import { FaStar, FaRegStar } from "react-icons/fa"; 

const BoardGameOverview = ({ boardGame }) => {
    const { boardGameState, handleCheckboxChange, toggleFavorite } = useBoardGame();  
    const score = 4.5; // Default score

    return (
        <>
            <Row className="mb-2">
                <Col className="d-flex justify-content-center align-items-center">

                    {/* Score Component */}
                    <div
                        className="d-flex justify-content-center align-items-center rounded-circle fw-bold fs-6 me-4"
                        style={{
                            minWidth: "60px",  
                            minHeight: "30px", 
                            backgroundColor: "var(--color-orange)",
                            color: "var(--color-soft-yellow)",
                        }}
                        >
                        {score}/5
                    </div>

                    {/* Board game name */}
                    <h1 className="text-center text-nowrap" style={{ color: "var(--color-orange)" }}>
                        {boardGame.name}
                    </h1>

                    {/* FavoriteStar component */}
                    <div onClick={toggleFavorite} className="ms-4 me-5" style={{ cursor: "pointer" }}>
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
