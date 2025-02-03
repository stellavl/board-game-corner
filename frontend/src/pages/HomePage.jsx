import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ReservationForm from '../components/homepage/ReservationFormGeneral';
import OrangeButton from '../components/common/OrangeButton'; 
import SearchBar from '../components/common/SearchBar';

const Home = () => {
    return (
        <Container className='d-flex flex-column justify-content-center align-items-center mt-5'>
            <Row className='mb-4'>
                <Col> 
                    <h1 className='text-center fw-bold' style={{ color: 'var(--color-orange)', fontFamily: 'var(--font-calligraphic)'}} >Board Game Corner</h1>
                </Col>
            </Row>
            <Row>
                <Col className="w-100">
                    <SearchBar placeholder="Αναζήτησε επιτραπέζια" />                
                </Col>      
            </Row>

            <ReservationForm />

            <Row className='mt-4'>
                <Col > 
                    <h6 className='text-center' style={{ color: 'var(--color-gray-purple)' }} >Δεν έχεις αποφασίσει ακόμα τι θέλεις;</h6>
                    <h6 className='text-center fw-bold pt-1' style={{ color: 'var(--color-gray-purple)' }} >Ανακάλυψε:</h6>
                </Col>
            </Row>
            <Row className='mb-5 mt-2'>
                <Col className="text-center">
                    <OrangeButton text="Επιτραπέζια" size="btn-lg" />
                </Col>
                <Col className="text-center">
                    <OrangeButton text="Παιχνιδοκαφέ" size="btn-lg" />
                </Col>
            </Row>
        </Container>
    );
};

export default Home;