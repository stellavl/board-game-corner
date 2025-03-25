import React, { useState } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import BackButton from '../components/common/BackButton';
import boardGameCafes from '../data/boardGameCafes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhone } from '@fortawesome/free-solid-svg-icons';
import ReservationForm from '../components/common/ReservationForm';
import BoardGamesContent from '../components/common/BoardGamesContent';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SpecificCafePage = () => {
    const { cityName, cafeName } = useParams();
    const cafe = boardGameCafes.find(cafe => cafe.name === cafeName && cafe.city === cityName);
    const [imageLoaded, setImageLoaded] = useState(false);

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
                        {!imageLoaded && <Skeleton height={150} width={150} />}
                        <Image 
                            src={`/${cafe.image}`} 
                            alt={cafe.name} 
                            fluid 
                            onLoad={() => setImageLoaded(true)}
                            style={{ display: imageLoaded ? 'block' : 'none' }}
                        />
                    </Col>
                </Row>
            </Container>

            <Container className="p-5 text-center">
                <ReservationForm showGameCafe={false} cafeName={cafe.name} />
            </Container>

            <Container className='d-flex flex-column align-items-center w-75 mt-5'>
                <h4 className="pb-3 fw-semibold text-decoration-underline" style={{ color: 'var( --color-gray-purple)' }}>
                    Διαθέσιμα Επιτραπέζια
                </h4>
                <BoardGamesContent/>
            </Container>
        </>
    );
};

export default SpecificCafePage;