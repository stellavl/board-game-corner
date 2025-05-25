import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import OrangeButton from '../components/common/OrangeButton';
import BackButton from "../components/common/BackButton";
import { useNavigate, useParams } from 'react-router-dom';
import CitiesCards from  '../components/common/CitiesCards';
import CafeSelectBar from '../components/common/CafeSelectBar';
import axiosInstance from '../config/axiosConfig';

const SpecificCityCafesPage = () => {
    const { cityName } = useParams();
    const [cityCafes, setCityCafes] = useState([]);
    const [allCafes, setAllCafes] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCityCafes = async () => {
            setLoading(true);
            try {
                const res = await axiosInstance.get(`api/board-game-cafes/city/${cityName}`);
                setCityCafes(res.data);
            } catch (error) {
                setCityCafes([]);
            } finally {
                setLoading(false);
            }
        };
        fetchCityCafes();

        const fetchAllCafes = async () => {
            try {
                const res = await axiosInstance.get('api/board-game-cafes/all');
                setAllCafes(res.data);
            } catch (error) {
                setAllCafes([]);
            }
        };
        fetchAllCafes();
    }, [cityName]);

    const navigateToSpecificCafePage = (id) => {
        navigate(`/boardgamecafe/${id}`);
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
                        <CafeSelectBar boardGameCafes={cityCafes} loading={loading} />
                    </Col>      
                </Row>
                <Row className="my-5 d-flex  w-100">
                    {loading ? (
                        <Col className="text-center">
                            <Spinner animation="border" />
                        </Col>
                    ) : (
                        cityCafes.map(cafe => (    
                            <Col key={cafe.id} lg={3} md={4} sm={6} xs={12} className="mb-3 d-flex">
                                <Card className="w-100 shadow-sm text-center"
                                    style={{ borderColor: 'var(--color-orange)', minHeight: '100%' }}>
                                    
                                    <Card.Body className="d-flex flex-column">
                                        <Card.Title className="fw-bold">{cafe.name}</Card.Title>
                                        
                                        <Card.Text className="text-muted small d-flex align-items-center justify-content-center">
                                            {cafe.address}
                                        </Card.Text>

                                        <Card.Text className="text-muted">{cafe.phoneNumber}</Card.Text>

                                        <Card.Text className="text-dark">
                                            <span className="fw-semibold">{cafe.numberOfBoardGames}</span> διαθέσιμα επιτραπέζια
                                        </Card.Text>

                                        <div className="mt-auto">
                                            <OrangeButton text="Επέλεξε" size="btn-md" onClick={() => navigateToSpecificCafePage(cafe.id)}/>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    )}
                </Row>
            </Container>

            <hr style={{ width: '50%', borderTop: '2px solid var(--color-orange)', margin: 'auto' }} /> 
            
            <Container className='mt-2 w-50'>
                <CitiesCards text="Διάλεξε άλλη πόλη:" currentCity={cityName} cafes={allCafes} loading={loading} />
            </Container>
        </>
    );
};

export default SpecificCityCafesPage;