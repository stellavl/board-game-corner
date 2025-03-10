import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import OrangeButton from '../components/common/OrangeButton';

const ReservationDetailsPage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const gameCafe = queryParams.get('gameCafe');
    const boardGame = queryParams.get('boardGame');
    const players = queryParams.get('players');
    const date = queryParams.get('date');
    const time = queryParams.get('time');

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
        if (value.trim() !== "") {
            setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
        }
    };

    const validateForm = () => {
        let newErrors = {};

        if (!formData.firstName) newErrors.firstName = "Το όνομα είναι υποχρεωτικό.";
        if (!formData.lastName) newErrors.lastName = "Το επίθετο είναι υποχρεωτικό.";
        if (!formData.phone) {
            newErrors.phone = "Το τηλέφωνο είναι υποχρεωτικό.";
        } else if (!/^\d{10}$/.test(formData.phone)) {
            newErrors.phone = "Το τηλέφωνο πρέπει να αποτελείται από 10 ψηφία.";
        }
        if (!formData.email) {
            newErrors.email = "Το email είναι υποχρεωτικό.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Το email δεν είναι έγκυρο.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleReservationClick = () => {
        if (validateForm()) {
            // TODO: SAVE RESERVATION DATA IN DATABASE
            console.log("Reservation Data:", formData);
        }
    };

    return (
        <Container className="my-4">
            <Row className="justify-content-center">
                <Col xs={12} md={6} lg={4}>
                    <Card className="text-center text-white p-2" style={{ backgroundColor: 'var(--color-orange)' }}>
                        <Card.Body>
                            <Card.Title className="fw-bold mb-1">{gameCafe} | Αθήνα</Card.Title>
                            <Card.Text className="fst-italic">{boardGame}</Card.Text>
                            <Row className="justify-content-center">
                                <Col xs="auto">{date}</Col>
                                <Col xs="auto">{time}</Col>
                                <Col xs="auto">{players} παίκτες</Col>
                            </Row>
                        </Card.Body>
                    </Card>
                    <p className="mt-1 text-end" style={{ color: 'var(--color-orange)' }}> 
                        Επεξεργασία
                    </p>
                </Col>
            </Row>

            <Container>
                <Row className="justify-content-center">
                    <Col xs={12} md={10} lg={8}>
                        <Card className="border mt-4" style={{ borderColor: 'var(--color-orange)' }}>
                            <Card.Body>
                                <Card.Title className="text-center fw-bold pb-3" style={{ color: 'var(--color-orange)' }}>
                                    Στοιχεία Κράτησης:
                                </Card.Title>

                                <Form>
                                    <Row className="g-3">
                                        <Col md={6}>
                                            <Form.Group>
                                                <Form.Label>Όνομα</Form.Label>
                                                <Form.Control 
                                                    type="text" 
                                                    name="firstName" 
                                                    value={formData.firstName} 
                                                    onChange={handleChange} 
                                                    isInvalid={!!errors.firstName} 
                                                />
                                                <div className="invalid-feedback">
                                                    {errors.firstName}
                                                </div>
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group>
                                                <Form.Label>Επίθετο</Form.Label>
                                                <Form.Control 
                                                    type="text" 
                                                    name="lastName" 
                                                    value={formData.lastName} 
                                                    onChange={handleChange} 
                                                    isInvalid={!!errors.lastName} 
                                                />
                                                <div className="invalid-feedback">
                                                    {errors.lastName}
                                                </div>
                                            </Form.Group>
                                        </Col>

                                        <Col md={6}>
                                            <Form.Group>
                                                <Form.Label>Τηλέφωνο Επικοινωνίας</Form.Label>
                                                <Form.Control 
                                                    type="text" 
                                                    name="phone" 
                                                    value={formData.phone} 
                                                    onChange={handleChange} 
                                                    isInvalid={!!errors.phone} 
                                                />
                                                <div className="invalid-feedback">
                                                    {errors.phone}
                                                </div>
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group>
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control 
                                                    type="email" 
                                                    name="email" 
                                                    value={formData.email} 
                                                    onChange={handleChange} 
                                                    isInvalid={!!errors.email} 
                                                />
                                                <div className="invalid-feedback">
                                                    {errors.email}
                                                </div>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <div className="mt-4 text-center">
                                        <OrangeButton text="ΚΡΑΤΗΣΗ" onClick={handleReservationClick} />
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
};

export default ReservationDetailsPage;