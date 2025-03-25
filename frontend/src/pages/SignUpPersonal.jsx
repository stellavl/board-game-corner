import React, { useState } from "react";
import { Container, Card, Form, Row, Col } from "react-bootstrap";
import OrangeButton from "../components/common/OrangeButton";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { validatePersonalData } from "../components/utils/validations";

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

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validatePersonalData(formData);  
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
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