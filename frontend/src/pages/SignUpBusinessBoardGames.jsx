import React, { useState } from "react";
import { Container, Card, Form, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import OrangeButton from "../components/common/OrangeButton";
import BackButton from "../components/common/BackButton";
import ConfirmationModal from "../components/common/ConfirmationModal";
import BoardGameSelectBar from "../components/common/BoardGameSelectBar";

const SignUpBusinessBoardGames = () => {
    const [selectedGame, setSelectedGame] = useState(null);
    const [addedGames, setAddedGames] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const handleAddGame = () => {
        if (selectedGame && !addedGames.includes(selectedGame.value)) {
            setAddedGames([...addedGames, selectedGame.value]);
            setSelectedGame(null);
        }
    };

    const handleRemoveGame = (game) => {
        setAddedGames(addedGames.filter(g => g !== game));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowModal(true);
    };

    const handleConfirm = () => {
        setShowModal(false);
        navigate('/home');
    };

    return (
        <>
             <Row className="align-items-center">
                <Col md={2} className="ms-5 mt-3">
                    <BackButton />
                </Col>
                <Col md={8}>
                    <h3 className="text-center my-4" style={{ color: "var(--color-gray-purple)" }}>
                        Δημιουργία Προφίλ Παιχνιδοκαφέ
                    </h3>
                </Col>
            </Row>
            <Container className="d-flex justify-content-center">
                <Card className="p-4 border-2" style={{ borderColor: "var(--color-orange)", backgroundColor: "var(--color-soft-yellow)", width: "55rem" }}>
                    <h4 className="mb-4 pb-3" style={{ color: "var(--color-orange)", borderBottom: "2px solid var(--color-orange)" }}>
                        Πληροφορίες για επιτραπέζια:
                    </h4>
                    <Form onSubmit={handleSubmit}>
                        <Row className="mb-4 align-items-center">
                            <Col md={6}>
                                <Form.Label>Προσθέστε τα επιτραπέζια που διαθέτετε:</Form.Label>
                                <div className="d-flex align-items-center">
                                    <BoardGameSelectBar isSearchButtonVisible={false} onGameSelect={setSelectedGame} />
                                    <div className="ms-2">
                                        <OrangeButton
                                            onClick={handleAddGame}
                                            text="Προσθήκη"
                                            disabled={!selectedGame}
                                        />
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col>
                                <Form.Label>Έχετε ήδη προσθέσει:</Form.Label>
                                <div className="border p-2" style={{ maxHeight: "200px", overflowY: "auto" }}>
                                    {addedGames.map((game, index) => (
                                        <div key={index} className="d-flex justify-content-between align-items-center border-bottom py-1">
                                            {game}
                                            <Button variant="danger" size="sm" onClick={() => handleRemoveGame(game)}>X</Button>
                                        </div>
                                    ))}
                                </div>
                            </Col>
                        </Row>
                        <Row className="d-flex justify-content-center">
                            <Col md={6} className="d-flex justify-content-center">
                                <OrangeButton 
                                    onClick={handleSubmit}
                                    text="Ολοκλήρωση"
                                />
                            </Col>
                        </Row>
                    </Form>
                </Card>
            </Container>
            <ConfirmationModal 
                show={showModal} 
                handleClose={() => setShowModal(false)} 
                handleConfirm={handleConfirm} 
                message={`Έχετε προσθέσει ${addedGames.length} επιτραπέζια. Θέλετε να ολοκληρώσετε τη δημιουργία του λογαριασμού σας;`} 
            />
        </>
    );
};

export default SignUpBusinessBoardGames;