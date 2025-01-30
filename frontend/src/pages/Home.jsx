import React, { useState } from 'react';
import { Container, Row, Col, Button, InputGroup, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import ReservationForm from '../components/home/ReservationFormGeneral';
import OrangeButton from '../components/common/OrangeButton'; 

const Home = () => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <Container className='d-flex flex-column justify-content-center align-items-center mt-5'>
            <Row className='mb-4'>
                <Col> 
                    <h1 className='text-center fw-bold' style={{ color: 'var(--color-orange)', fontFamily: 'var(--font-calligraphic)'}} >Board Game Corner</h1>
                </Col>
            </Row>
            <Row>
                <Col className="w-100">
                    <InputGroup className="mb-3 mx-auto w-100">
                        <FormControl
                            placeholder="Αναζήτησε επιτραπέζια"
                            aria-label="Search"
                            className="rounded-start form-control-md"
                        />
                <Button 
                    style={{
                        backgroundColor: isHovered ? 'var(--color-soft-yellow)' : 'var(--color-orange)',
                        border: isHovered ? '2px solid var(--color-orange)' : '2px solid var(--color-orange)',
                    }}
                    className="rounded-end"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    >
                    <FontAwesomeIcon 
                        icon={faSearch} 
                        size="lg"  
                        color={isHovered ? 'var(--color-orange)' : 'var(--color-soft-yellow)'} 
                    />

                </Button>                
                    </InputGroup>
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