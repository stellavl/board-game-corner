import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Offcanvas } from "react-bootstrap";  
import BackButton from "../components/common/BackButton";
import BoardGameOverview from "../components/boardgamepage/BoardGameOverview";  
import { BoardGameProvider } from "../components/context/BoardGameContext";  
import BoardGameDescription from "../components/boardgamepage/BoardGameDescription";
import BoardGameImageAndDetails from "../components/boardgamepage/BoardGameImageAndDetails";  
import Reviews from "../components/boardgamepage/Reviews";
import ReservationForm from "../components/common/ReservationForm";
import BoardGameCards from "../components/common/BoardGameCards";
import { toast } from "react-toastify";
import Spinner from 'react-bootstrap/Spinner'; 
import axiosInstance from '../config/axiosConfig';

const SpecificBoardGamePage = () => {
    const { boardGameName } = useParams();
    const [boardGame, setBoardGame] = useState(null);
    const [showReviews, setShowReviews] = useState(false);
    const [loading, setLoading] = useState(true); 
    const [suggestedGames, setSuggestedGames] = useState([]);
    const [suggestedTotal, setSuggestedTotal] = useState(0);
    const [suggestedPage, setSuggestedPage] = useState(1);
    const suggestedPageSize = 8;
    const [suggestedLoading, setSuggestedLoading] = useState(false);

    useEffect(() => {
        const fetchBoardGame = async () => {
            try {
                const response = await axiosInstance.get(`api/board-game/${boardGameName}`);
                setBoardGame(response.data);
            } catch (error) {
                toast.error(error,{ position: 'top-center' });
            } finally {
                setLoading(false); 
            }
        };
        fetchBoardGame();
    }, [boardGameName]);

    // Fetch suggested games (hot games except the current one), paginated
    useEffect(() => {
        const fetchSuggestedGames = async () => {
            setSuggestedLoading(true);
            try {
                const response = await axiosInstance.get(
                    `api/hot-games?currentPage=${suggestedPage}&pageSize=${suggestedPageSize}`
                );
                // Filter out the current game
                const filtered = response.data.boardGames.filter(
                    (game) => game.name !== boardGame?.name
                );
                setSuggestedGames(filtered);
                setSuggestedTotal(
                    boardGame
                        ? Math.max(response.data.totalElements - 1, 0)
                        : response.data.totalElements
                );
            } catch (error) {
                toast.error(error,{ position: 'top-center' });
                setSuggestedGames([]);
                setSuggestedTotal(0);
            } finally {
                setSuggestedLoading(false);
            }
        };
        if (boardGame) fetchSuggestedGames();
    }, [boardGame, suggestedPage]);

    if (loading || !boardGame) {
        return (
            <div className="text-center mt-5">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        );
    }

    // Handle the toggle of reviews visibility
    const handleShowReviews = () => setShowReviews(true);
    const handleHideReviews = () => setShowReviews(false);

    return (
        <>
            {/* Button to go back */}
            <div className="ms-5 mt-3">
                <BackButton/>
            </div>

            <BoardGameProvider>
                {/* Layout for medium (md) and smaller screens */}
                <Container className="d-flex d-md-none flex-column justify-content-center align-items-center">
                    <Row>
                        {/* BoardGameOverview comes first */}
                        <Col xs={12} className="order-1 mt-5">
                            <BoardGameOverview boardGame={boardGame} />
                        </Col>

                        {/* BoardGameImageAndDetails comes second */}
                        <Col xs={12} className="order-2">
                            <BoardGameImageAndDetails boardGame={boardGame} />
                        </Col>

                        {/* BoardGameDescription comes third */}
                        <Col xs={12} className="order-3">
                            <BoardGameDescription boardGame={boardGame} />
                        </Col>

                        {/* Reviews Button for small/medium screens */}
                        <Col xs={12} className="order-4">
                            <button onClick={handleShowReviews} className="btn w-100" style={{ backgroundColor: "var(--color-orange)", color: "var(--color-soft-yellow)" }}>
                                Show Reviews
                            </button>
                        </Col>
                    </Row>
                </Container>

                {/* Offcanvas for Reviews on small/medium screens */}
                <Offcanvas show={showReviews} onHide={handleHideReviews} placement="end">
                    <Offcanvas.Header closeButton>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Reviews />
                    </Offcanvas.Body>
                </Offcanvas>

                {/* Layout for large screens (md and above) */}
                <Container className="d-none d-md-flex flex-column justify-content-center align-items-center">
                    <Row>
                        <Col md={4} xs={6} className="mt-5">
                            <BoardGameImageAndDetails boardGame={boardGame} />
                        </Col>
                        <Col md={4} xs={6}>
                            <Row>
                                <Col>
                                    <BoardGameOverview boardGame={boardGame} />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <BoardGameDescription boardGame={boardGame} />
                                </Col>
                            </Row>
                        </Col>
                        <Col md={4} xs={12}>
                            <Reviews />
                        </Col>
                    </Row>
                </Container>

                <Container>
                    {/* Reservation Form */}
                    <Row>
                        <Container className="p-3 text-center">
                            <ReservationForm showBoardGame={false} boardGameTitle={boardGame.name} />
                        </Container>
                    </Row>

                    {/* Suggested Board Games */}
                    <Row className="mt-4" >
                        <Col className="col-9 mx-auto">    
                            {suggestedLoading ? (
                                <div className="text-center">
                                    <Spinner animation="border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </Spinner>
                                </div>
                            ) : (
                                <BoardGameCards
                                    maxHeight="350px"
                                    headerText="Εξερεύνησε άλλα επιτραπέζια:"
                                    boardGames={suggestedGames}
                                    totalElements={suggestedTotal}
                                    currentPage={suggestedPage}
                                    handlePageChange={setSuggestedPage}
                                    itemsPerPage={suggestedPageSize}
                                />
                            )}
                        </Col>
                    </Row>
                </Container>

            </BoardGameProvider>
        </>
    );
};

export default SpecificBoardGamePage;