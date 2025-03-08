import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import BackButton from '../components/common/BackButton';
import boardGameCafes from '../data/boardGameCafes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhone } from '@fortawesome/free-solid-svg-icons';
import ReservationForm from '../components/common/ReservationForm';

const SpecificCafePage = () => {
    const { cityName, cafeName } = useParams();
    const cafe = boardGameCafes.find(cafe => cafe.name === cafeName && cafe.city === cityName);

    if (!cafe) {
        return <h1 className="text-center mt-5">Cafe Not Found</h1>;
    }

    return (
        <>
            <div className="ms-5 mt-3">
                <BackButton />
            </div>
            <Container className='d-flex flex-column align-items-center w-75'>
                <Row className="d-flex align-items-center">
                    <Col xs={12} md={6} className="text-center mb-4 mb-md-0">
                        <h2 className='fw-bold' style={{ color: 'var(--color-orange)' }}>
                            {cafe.name}
                        </h2>
                        <h3 style={{ color: 'var(--color-orange)' }}>
                            {cafe.city}
                        </h3>
                        <div className='fw-semibold text-muted text-center pt-3'>
                            <div className='d-inline-block text-start'>
                                <FontAwesomeIcon icon={faMapMarkerAlt} /> <span className="ms-1">{cafe.address}</span>
                                    <br />
                                <FontAwesomeIcon icon={faPhone} /> <span className="ms-1">{cafe.phone}</span>
                            </div>
                        </div>
                    </Col>
                    <Col xs={12} md={6} className="text-center">
                        <Image 
                            src={`/${cafe.image}`} 
                            alt={cafe.name} 
                            fluid 
                        />
                    </Col>
                </Row>
            </Container>
            <Container className='d-flex flex-column align-items-center w-75 mt-5'>
                <ReservationForm showGameCafe={false} />
            </Container>
        </>
    );
};

export default SpecificCafePage;