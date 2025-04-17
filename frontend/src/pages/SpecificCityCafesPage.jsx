import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import boardGameCafes from '../data/boardGameCafes';
import OrangeButton from '../components/common/OrangeButton';
import BackButton from "../components/common/BackButton";
import { useNavigate, useParams } from 'react-router-dom';
import CitiesCards from  '../components/common/CitiesCards'
import CafeSelectBar from '../components/common/CafeSelectBar';

const SpecificCityCafesPage = () => {
    const { cityName } = useParams();
    const cafes = boardGameCafes.filter(cafe => cafe.city === cityName);

    const navigate = useNavigate();

    const navigateToSpecificCafePage = (cafeName) => {
        navigate(`/boardgamecafes/${cityName}/${cafeName}`);
    };

    return (
        <>
            <div className="ms-5 mt-3">
                <BackButton/>
            </div>
            <Container className='d-flex flex-column align-items-center w-75'>
                <Row>
                    <Col>
                        <h2 className='text-center fw-bold' style={{ color: 'var(--color-orange)' }}>
                        Παιχνιδοκαφέ
                        </h2>
                    </Col>
                </Row>
                <hr style={{ width: '50%', borderTop: '2px solid var(--color-orange)', margin: 'auto' }} /> 
                <Row className='mt-1 mb-3'>
                    <Col>
                        <h3 className='text-center' style={{ color: 'var(--color-orange)' }}>
                        {cityName}
                        </h3>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <CafeSelectBar boardGameCafes={cafes}/>
                    </Col>      
                </Row>
                <Row className="my-5 d-flex  w-100">
                    {cafes.map(cafe => (    
                        <Col key={cafe.id} lg={3} md={4} sm={6} xs={12} className="mb-3 d-flex">
                            <Card className="w-100 shadow-sm text-center"
                                style={{ borderColor: 'var(--color-orange)', minHeight: '100%' }}>
                                
                                <Card.Body className="d-flex flex-column">
                                    <Card.Title className="fw-bold">{cafe.name}</Card.Title>
                                    
                                    <Card.Text className="text-muted small mb-1 d-flex align-items-center justify-content-center" style={{ height: '3em' }}>
                                        {cafe.address}
                                    </Card.Text>

                                    <Card.Text className="text-muted">{cafe.phone}</Card.Text>

                                    <Card.Text className="text-dark">
                                        <span className="fw-semibold">{cafe.numberOfBoardGames}</span> διαθέσιμα επιτραπέζια
                                    </Card.Text>

                                    <div className="mt-auto">
                                        <OrangeButton text="Επέλεξε" size="btn-md" onClick={() => navigateToSpecificCafePage(cafe.name)}/>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>

            <hr style={{ width: '50%', borderTop: '2px solid var(--color-orange)', margin: 'auto' }} /> 
            
            <Container className='d-flex flex-column justify-content-center align-items-center mt-2 w-75'>
                <CitiesCards text="Διάλεξε άλλη πόλη:" currentCity={cityName} />
            </Container>

        </>

    );
};

export default SpecificCityCafesPage;