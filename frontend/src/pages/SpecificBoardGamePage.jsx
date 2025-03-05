import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Container, Row, Col, Offcanvas } from "react-bootstrap";  
import BackButton from "../components/common/BackButton";
import BoardGameOverview from "../components/boardgamepage/BoardGameOverview";  
import { BoardGameProvider } from "../components/context/BoardGameContext";  
import BoardGameDescription from "../components/boardgamepage/BoardGameDescription";
import BoardGameImageAndDetails from "../components/boardgamepage/BoardGameImageAndDetails";  
import Reviews from "../components/boardgamepage/Reviews";
import ReservationForm from "../components/common/ReservationForm";
import BoardGameCards from "../components/common/BoardGameCards";

const SpecificBoardGamePage = () => {
    const location = useLocation();
    const boardGame = location.state?.boardGame;

    const [showReviews, setShowReviews] = useState(false);

    if (!boardGame) {
        return <h1 className="text-center mt-5">Game Not Found</h1>;
    }

    // Handle the toggle of reviews visibility
    const handleShowReviews = () => setShowReviews(true);
    const handleHideReviews = () => setShowReviews(false);

    return (
        <>
            {/* Button to go back */}
            <div className="ms-5 mt-3">
                <BackButton text="Επιστροφή στα επιτραπέζια"/>
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
                            <h5 className="mb-3 text-decoration-underline" style={{ color: 'var(--color-gray-purple)' }}>
                                Κάνε τώρα την κράτησή σου:
                            </h5>
                            <ReservationForm showBoardGame={false} boardGameTitle={boardGame.name} />
                        </Container>
                    </Row>

                    {/* Suggested Board Games */}
                    <Row className="mt-4" >
                        <Col className="col-9 mx-auto">    
                            <h5 className="mb-2 text-decoration-underline" style={{ color: 'var(--color-gray-purple)' }}> 
                                Προτεινόμενα:
                            </h5>
                            <BoardGameCards maxHeight="350px"/>
                        </Col>
                    </Row>
                </Container>

            </BoardGameProvider>
        </>
    );
};

export default SpecificBoardGamePage;
