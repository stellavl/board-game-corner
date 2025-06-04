import { Row, Col } from "react-bootstrap";
import BoardGameCheckBox from "./BoardGameCheckBox";
import updateBoardGameList from "../utils/handleLists"; 
import { FaStar, FaRegStar } from "react-icons/fa"; 

const BoardGameOverview = ({ boardGame }) => {

    //TODO: Replace with actual state management for favorite and score
    const isBoardGameFavorite = false; 
    const isBoardGameWantToPlay = false;
    const isBoardGameHavePlayed = false;

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
                    <h2
                        className="text-center fw-bold flex-grow-1 m-0"
                        style={{
                            color: "var(--color-orange)",
                            minWidth: "100%", 
                            wordBreak: "break-word",
                            whiteSpace: "normal",
                        }}
                    >
                        {boardGame.name}
                    </h2>

                    {/* FavoriteStar component */}
                    <div onClick={() => updateBoardGameList('is_favorite', boardGame.id, isBoardGameFavorite)} className="ms-4 me-5" style={{ cursor: "pointer" }}>
                        {isBoardGameFavorite ? (
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
                        checked={isBoardGameWantToPlay}
                        onChange={() => updateBoardGameList('is_want_to_play', boardGame.id, isBoardGameWantToPlay)}
                        className="me-4 text-nowrap"
                    />
                    <BoardGameCheckBox 
                        checkboxText="Έχω παίξει"
                        checked={isBoardGameHavePlayed}
                        onChange={() => updateBoardGameList('is_have_played', boardGame.id, isBoardGameHavePlayed)}
                        className="text-nowrap"
                    />
                </Col>
            </Row>

            {/* Display the number of board game cafes */}
            <Row className="mb-1">
                <Col className="d-flex justify-content-center align-items-center">
                    <p className="text-center text-nowrap" style={{ color: "var(--color-orange)" }}>
                        Διαθέσιμο σε{' '}
                        <span
                            className="fw-bold fs-6 p-1 rounded"
                            style={{ color: "var(--color-soft-yellow)", backgroundColor: "var(--color-orange)" }}>
                            {boardGame.cafesWithBoardGame.length}
                        </span>
                        {' '}παιχνιδοκαφέ
                    </p>
                </Col>
            </Row>
        </>
    );
};

export default BoardGameOverview;