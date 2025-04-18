import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ReservationForm from '../components/common/ReservationForm';
import OrangeButton from '../components/common/OrangeButton';
import BoardGameSelectBar from '../components/common/BoardGameSelectBar';

const HomePage = () => {
    const navigate = useNavigate();
    const [selectedGame, setSelectedGame] = useState(null);

    const navigateToBoardGames = () => {
        navigate('/boardgames');
    };
    
    const navigateToBoardGameCafes = () => {
        navigate('/boardgamecafes');
    };

    return (
        <Container className='d-flex flex-column justify-content-center align-items-center mt-5'>
            <Row className='mb-4'>
                <Col> 
                    <h1 className='text-center fw-bold' style={{ color: 'var(--color-orange)', fontFamily: 'var(--font-calligraphic)' }}>
                        Board Game Corner
                    </h1>
                </Col>
            </Row>

            <BoardGameSelectBar />

            <Container className="p-5 text-center">
                <ReservationForm />
            </Container>

            <Row className='mt-4'>
                <Col> 
                    <h6 className='text-center' style={{ color: 'var(--color-gray-purple)' }}>
                        Δεν έχεις αποφασίσει ακόμα τι θέλεις;
                    </h6>
                    <h6 className='text-center fw-bold pt-1' style={{ color: 'var(--color-gray-purple)' }}>
                        Ανακάλυψε:
                    </h6>
                </Col>
            </Row>

            <Row className='mb-5 mt-2'>
                <Col className="text-center">
                    <OrangeButton text="Επιτραπέζια" size="btn-lg" onClick={navigateToBoardGames} />
                </Col>
                <Col className="text-center">
                    <OrangeButton text="Παιχνιδοκαφέ" size="btn-lg" onClick={navigateToBoardGameCafes} />
                </Col>
            </Row>
        </Container>
    );
};

export default HomePage;
