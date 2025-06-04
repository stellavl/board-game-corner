import { Row, Col } from "react-bootstrap";
import BoardGameCheckBox from "./BoardGameCheckBox";
import updateBoardGameList from "../utils/handleLists"; 
import { FaStar, FaRegStar } from "react-icons/fa"; 
import { useState, useEffect } from "react";
import axiosInstance from '../../config/axiosConfig';
import { toast } from "react-toastify";

const BoardGameOverview = ({ boardGame }) => {

    const [isBoardGameFavorite, setIsBoardGameFavorite] = useState(false);
    const [isBoardGameWantToPlay, setIsBoardGameWantToPlay] = useState(false);
    const [isBoardGameHavePlayed, setIsBoardGameHavePlayed] = useState(false);

    const score = 4.5; // Default score

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem("authToken");
        
        if (!userId || !token) {
            toast.error('Πρέπει να συνδεθείτε για να πραγματοποιήσετε αυτήν την ενέργεια.', {
                position: 'top-center'
            });
            return;
        }

        const fetchUserBoardGameStatus = async () => {
            try {
                const response = await axiosInstance.get(`/api/user-lists/${userId}/${boardGame.id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    }
                );
                const data = response.data;
                setIsBoardGameFavorite(Boolean(data.is_favorite));
                setIsBoardGameWantToPlay(Boolean(data.is_want_to_play));
                setIsBoardGameHavePlayed(Boolean(data.is_have_played));
            } catch (error) {
                const errorMessage = error.response?.data?.error || 'Αποτυχία εύρεσης λίστας παιχνιδιών.';
                toast.error(errorMessage, { position: 'top-center' });
            }
    };

    fetchUserBoardGameStatus();
  }, [boardGame]);

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
                    <div onClick={() => updateBoardGameList('is_favorite', boardGame.id, isBoardGameFavorite, setIsBoardGameFavorite)} className="ms-4 me-5" style={{ cursor: "pointer" }}>
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
                        onChange={() => updateBoardGameList('is_want_to_play', boardGame.id, isBoardGameWantToPlay, setIsBoardGameWantToPlay)}
                        className="me-4 text-nowrap"
                    />
                    <BoardGameCheckBox 
                        checkboxText="Έχω παίξει"
                        checked={isBoardGameHavePlayed}
                        onChange={() => updateBoardGameList('is_have_played', boardGame.id, isBoardGameHavePlayed, setIsBoardGameHavePlayed)}
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