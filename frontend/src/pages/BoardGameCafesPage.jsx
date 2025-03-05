import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/common/SearchBar';
import boardGameCities from '../data/boardGameCities.js';
import { transliterate as transliterateGreekToEnglish } from 'transliteration';

const BoardGameCafesPage = () => {
    const navigate = useNavigate();

    const cardStyle = {
        backgroundColor: 'var(--color-soft-orange)',
        border: '2px solid var(--color-orange)',
        transition: 'transform 0.3s ease-in-out'
    };

    const cardHoverStyle = {
        transform: 'scale(1.05)',
        cursor: 'pointer'
    };

    const handleCardClick = (cityName) => {
        const translatedCityName = transliterateGreekToEnglish(cityName);
        navigate(`/boardgamecafes/city=${translatedCityName}`, { state: { city: cityName } });
    };

    return (
        <Container className='d-flex flex-column justify-content-center align-items-center mt-5 w-75'>
            <Row className='mb-3'>
                <Col>
                    <h2 className='text-center fw-bold' style={{ color: 'var(--color-orange)'}}>
                    Παιχνιδοκαφέ
                    </h2>
                </Col>
            </Row>
            <Row>
                <Col>
                    <SearchBar placeholder="Αναζήτησε παιχνιδοκαφέ" onSearch={() => {}} />    
                </Col>      
            </Row>
            <Row className='mt-4'>
                <Col>
                    <h5 
                        className='text-center text-decoration-underline' 
                        style={{ color: 'var(--color-gray-purple)' 
                        }}>
                        Διάλεξε πόλη:
                    </h5>  
                </Col>      
            </Row>
            <Row className='mt-2' >
                {boardGameCities.map((cafe, index) => (
                    <Col key={`${cafe.city}-${index}`} md={4} xs={6} className='mb-4'>
                        <Card 
                            style={cardStyle} 
                            onMouseEnter={e => {
                                e.currentTarget.style.transform = cardHoverStyle.transform;
                                e.currentTarget.style.cursor = cardHoverStyle.cursor;
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.transform = 'none';
                                e.currentTarget.style.cursor = 'default';
                            }}
                            onClick={() => handleCardClick(cafe.city)}
                        >
                            <Card.Body className="text-center">
                                <Card.Title>{cafe.city}</Card.Title>
                                <Card.Text>Εντοπίστηκαν <strong>{cafe.cafes}</strong> καταστήματα</Card.Text>                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default BoardGameCafesPage;