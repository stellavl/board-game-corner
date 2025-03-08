import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import BackButton from '../components/common/BackButton';
import boardGameCafes from '../data/boardGameCafes';

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
                <Row>
                    <Col>
                        <h2 className='text-center fw-bold' style={{ color: 'var(--color-orange)' }}>
                            {cafe.name}
                        </h2>
                    </Col>
                </Row>
                <hr style={{ width: '50%', borderTop: '2px solid var(--color-orange)', margin: 'auto' }} />
                <Row className='mt-1 mb-3'>
                    <Col>
                        <h3 className='text-center' style={{ color: 'var(--color-orange)' }}>
                            {cafe.city}
                        </h3>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default SpecificCafePage;