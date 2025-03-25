import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import CitiesCards from  '../components/common/CitiesCards'
import CafeSelectBar from '../components/common/CafeSelectBar';

const BoardGameCafesPage = () => {
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
                    <CafeSelectBar/>
                </Col>      
            </Row>

            <CitiesCards text="Διάλεξε πόλη:"/>

        </Container>
    );
};

export default BoardGameCafesPage;