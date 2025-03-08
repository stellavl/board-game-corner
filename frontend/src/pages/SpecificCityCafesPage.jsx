import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import SearchBar from '../components/common/SearchBar';
import { useLocation } from 'react-router-dom';
import boardGameCafes from '../data/boardGameCafes';
import OrangeButton from '../components/common/OrangeButton';
import BackButton from "../components/common/BackButton";
import { useNavigate } from 'react-router-dom';
import CitiesCards from  '../components/common/CitiesCards'

const SpecificCityCafesPage = () => {
    const location = useLocation();
    const city = location.state.city
    const cafes = boardGameCafes.filter(cafe => cafe.city === city);

    const navigate = useNavigate();

    const navigateToSpecificCafePage = (cafeName) => {
        navigate(`/boardgamecafes/${city}/${cafeName}`);
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
                        {city}
                        </h3>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <SearchBar placeholder="Αναζήτησε παιχνιδοκαφέ" onSearch={() => {}} />    
                    </Col>      
                </Row>
                <Row className="my-5 d-flex  w-100">
                    {cafes.map(cafe => (    
                        <Col key={cafe.id} lg={3} md={4} sm={6} xs={12} className="mb-3 d-flex">
                            <Card className="w-100 shadow-sm text-center"
                                style={{ borderColor: 'var(--color-orange)', backgroundColor: '#fff8dc', minHeight: '100%' }}>
                                
                                <Card.Body className="d-flex flex-column">
                                    <Card.Title className="fw-bold">{cafe.name}</Card.Title>
                                    
                                    <Card.Text className="text-muted small mb-1">{cafe.address}</Card.Text>

                                    <Card.Text className="fw-semibold text-dark">{cafe.phone}</Card.Text>

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
                <CitiesCards text="Διάλεξε άλλη πόλη:" currentCity={city} />
            </Container>

        </>

    );
};

export default SpecificCityCafesPage;