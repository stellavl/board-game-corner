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
        transform: 'scale(1.05)'
    };

    const handleCardClick = (cityName) => {
        const translatedCityName = transliterateGreekToEnglish(cityName);
        console.log(`Navigating to /boardgamecafes/city=${translatedCityName}`);
        navigate(`/boardgamecafes/city=${translatedCityName}`);
    };

    return (
        <Container className='d-flex flex-column justify-content-center align-items-center mt-5' style={{ maxWidth: '900px' }}>
            <Row className='mb-4'>
                <Col>
                    <h1 className='text-center' style={{ color: 'var(--color-orange)' }}>
                    Παιχνιδοκαφέ
                    </h1>
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
            <Row className='mt-2'>
                {boardGameCities.map((cafe, index) => (
                    <Col key={`${cafe.city}-${index}`} md={4} xs={6} className='mb-4'>
                        <Card 
                            style={cardStyle} 
                            onMouseEnter={e => e.currentTarget.style.transform = cardHoverStyle.transform}
                            onMouseLeave={e => e.currentTarget.style.transform = 'none'}
                            onClick={() => handleCardClick(cafe.city)}
                        >
                            <Card.Body className="text-center">
                                <Card.Title>{cafe.city}</Card.Title>
                                <Card.Text>Εντοπίστηκαν {cafe.cafes} καταστήματα</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default BoardGameCafesPage;