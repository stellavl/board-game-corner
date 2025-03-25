import React, { useState } from "react";
import { Container, Card, Form, Row, Col } from "react-bootstrap";
import OrangeButton from "../components/common/OrangeButton";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SignUpPersonal = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validateForm = () => {
        let newErrors = {};

        if (!formData.firstName) newErrors.firstName = "Το όνομα είναι υποχρεωτικό.";
        if (!formData.lastName) newErrors.lastName = "Το επίθετο είναι υποχρεωτικό.";

        if (!formData.email) {
            newErrors.email = "Το email είναι υποχρεωτικό.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Το email δεν είναι έγκυρο.";
        }

        if (!formData.phone) {
            newErrors.phone = "Το τηλέφωνο είναι υποχρεωτικό.";
        } else if (!/^\d{10}$/.test(formData.phone)) {
            newErrors.phone = "Το τηλέφωνο πρέπει να αποτελείται από 10 ψηφία.";
        }

        if (!formData.password) {
            newErrors.password = "Ο κωδικός πρόσβασης είναι υποχρεωτικός.";
        } else if (formData.password.length < 6) {
            newErrors.password = "Ο κωδικός πρέπει να έχει τουλάχιστον 6 χαρακτήρες.";
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Οι κωδικοί δεν ταιριάζουν.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log("Sign Up Data:", formData);
            navigate('/home');
        }
    };

    return (
        <>
         <Row>
            <h3 className="text-center my-4" style={{ color: "var(--color-gray-purple)" }}>Δημιουργία Λογαριασμού</h3>
        </Row>
        <Container className="d-flex justify-content-center">
            <Card className="p-4 border-2" style={{ borderColor: "var(--color-orange)", backgroundColor: "var(--color-soft-yellow)", width: "40rem" }}>
                <Form onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Όνομα:</Form.Label>
                        <div style={{ position: "relative" }}>
                            <Form.Control 
                                type="text" 
                                name="firstName" 
                                value={formData.firstName} 
                                onChange={handleChange} 
                                style={{ backgroundColor: "transparent", borderColor: 'var(--color-orange)' }}
                                isInvalid={!!errors.firstName}
                            />
                            {errors.firstName && (
                                <FontAwesomeIcon
                                    style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", color: "red" }}
                                />
                            )}
                            <Form.Control.Feedback type="invalid">
                                {errors.firstName}
                            </Form.Control.Feedback>
                        </div>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Επίθετο:</Form.Label>
                                <div style={{ position: "relative" }}>
                                    <Form.Control 
                                        type="text" 
                                        name="lastName" 
                                        value={formData.lastName} 
                                        onChange={handleChange} 
                                        style={{ backgroundColor: "transparent", borderColor: 'var(--color-orange)' }}
                                        isInvalid={!!errors.lastName}
                                    />
                                    {errors.lastName && (
                                        <FontAwesomeIcon
                                            style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", color: "red" }}
                                        />
                                    )}
                                    <Form.Control.Feedback type="invalid">
                                        {errors.lastName}
                                    </Form.Control.Feedback>
                                </div>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Email:</Form.Label>
                                <div style={{ position: "relative" }}>
                                    <Form.Control 
                                        type="email" 
                                        name="email" 
                                        value={formData.email} 
                                        onChange={handleChange} 
                                        style={{ backgroundColor: "transparent", borderColor: 'var(--color-orange)' }}
                                        isInvalid={!!errors.email}
                                    />
                                    {errors.email && (
                                        <FontAwesomeIcon
                                            style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", color: "red" }}
                                        />
                                    )}
                                    <Form.Control.Feedback type="invalid">
                                        {errors.email}
                                    </Form.Control.Feedback>
                                </div>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Τηλέφωνο Επικοινωνίας:</Form.Label>
                                <div style={{ position: "relative" }}>
                                    <Form.Control 
                                        type="text" 
                                        name="phone" 
                                        value={formData.phone} 
                                        onChange={handleChange} 
                                        style={{ backgroundColor: "transparent", borderColor: 'var(--color-orange)' }}
                                        isInvalid={!!errors.phone}
                                    />
                                    {errors.phone && (
                                        <FontAwesomeIcon
                                            style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", color: "red" }}
                                        />
                                    )}
                                    <Form.Control.Feedback type="invalid">
                                        {errors.phone}
                                    </Form.Control.Feedback>
                                </div>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Κωδικός Πρόσβασης:</Form.Label>
                                <div style={{ position: "relative" }}>
                                    <Form.Control 
                                        type="password" 
                                        name="password" 
                                        value={formData.password} 
                                        onChange={handleChange} 
                                        style={{ backgroundColor: "transparent", borderColor: 'var(--color-orange)' }}
                                        isInvalid={!!errors.password}
                                    />
                                    {errors.password && (
                                        <FontAwesomeIcon
                                            style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", color: "red" }}
                                        />
                                    )}
                                    <Form.Control.Feedback type="invalid">
                                        {errors.password}
                                    </Form.Control.Feedback>
                                </div>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Επανάληψη Κωδικού Πρόσβασης:</Form.Label>
                                <div style={{ position: "relative" }}>
                                    <Form.Control 
                                        type="password" 
                                        name="confirmPassword" 
                                        value={formData.confirmPassword} 
                                        onChange={handleChange} 
                                        style={{ backgroundColor: "transparent", borderColor: 'var(--color-orange)' }}
                                        isInvalid={!!errors.confirmPassword}
                                    />
                                    {errors.confirmPassword && (
                                        <FontAwesomeIcon
                                            style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", color: "red" }}
                                        />
                                    )}
                                    <Form.Control.Feedback type="invalid">
                                        {errors.confirmPassword}
                                    </Form.Control.Feedback>
                                </div>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="d-flex justify-content-center">
                        <Col md={6} className="d-flex justify-content-center">
                            <OrangeButton text="Δημιουργία" onClick={handleSubmit} />
                        </Col>
                    </Row>
                </Form>
            </Card>
        </Container>
    </>
    );
};

export default SignUpPersonal;