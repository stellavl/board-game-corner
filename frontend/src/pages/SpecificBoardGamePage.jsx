// pages/SpecificBoardGamePage.js
import React from "react";
import { useLocation } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";  // Import Col from react-bootstrap
import BackButton from "../components/common/BackButton";
import BoardGameOverview from "../components/boardgamepage/BoardGameOverview";  
import { BoardGameProvider } from "../components/context/BoardGameContext";  
import BoardGameDescription from "../components/boardgamepage/BoardGameDescription";
import BoardGameImageAndDetails from "../components/boardgamepage/BoardGameImageAndDetails";  // Import the new component

const SpecificBoardGamePage = () => {
    const location = useLocation();
    const boardGame = location.state?.boardGame;

    if (!boardGame) {
        return <h1 className="text-center mt-5">Game Not Found</h1>;
    }

    return (
        <>
            {/* Button to go back */}
            <BackButton />

            <BoardGameProvider>
                <Container className="d-flex flex-column justify-content-center align-items-center">
                    
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
                        {/* Add review component here */}
                        </Col>
                    </Row>
                    
                </Container>

            </BoardGameProvider>
        </>
    );
};

export default SpecificBoardGamePage;
