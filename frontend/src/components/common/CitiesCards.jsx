import { Row, Col, Card, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const CitiesCards = ({ text = "Διάλεξε πόλη:", currentCity, cafes = [], loading = false }) => {
    const navigate = useNavigate();
    const counts = {};
    cafes.forEach(cafe => {
        if (cafe.city) {
            counts[cafe.city] = (counts[cafe.city] || 0) + 1;
        }
    });
    const cityCounts = Object.entries(counts)
        .filter(([city]) => city !== currentCity)
        .map(([city, cafes]) => ({ city, cafes }))
        .sort((a, b) => a.city.localeCompare(b.city));

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
        navigate(`/boardgamecafes/${cityName}`, { state: { city: cityName } });
    };

    return (
        loading ? (
            <Row className='mt-4'>
                <Col className="text-center">
                    <Spinner animation="border" />
                </Col>
            </Row>
        ) : (
            <>
                <Row className='mt-4'>
                    <Col>
                        <h5 className='text-center text-decoration-underline' style={{ color: 'var(--color-gray-purple)' }}>
                            {text}
                        </h5>
                    </Col>
                </Row>
                <Row className='mt-2 mx-5'>
                    {cityCounts.map((cafe, index) => (
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
                                    <Card.Text>Εντοπίστηκαν <strong>{cafe.cafes}</strong> καταστήματα</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </>
        )
    );
};

export default CitiesCards;