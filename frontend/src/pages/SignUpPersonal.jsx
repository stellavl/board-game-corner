import React, { useState } from "react";
import { Container, Card, Form, Row, Col } from "react-bootstrap";
import OrangeButton from "../components/common/OrangeButton";
import { useNavigate } from "react-router-dom";
import { validatePersonalData } from "../components/utils/validations";
import axiosInstance from "../config/axiosConfig";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginPersonal } from "../components/utils/handleLogin";

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validatePersonalData(formData);
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            try {
                await axiosInstance.post("/api/basic-users", formData);
                // Log the user in after successful signup
                const loginResponse = await loginPersonal({ email: formData.email, password: formData.password });
                if (loginResponse.success) {
                    navigate('/home');
                } else {
                    toast.error(loginResponse.error, { position: 'top-center' });
                }
            } catch (error) {
                const errorMessage = error.response?.data?.error || "Σφάλμα κατά την εγγραφή. Προσπαθήστε ξανά.";
                toast.error(errorMessage, { position: 'top-center' });
            }
        }
    };

    const fields = [
        { label: "Όνομα:", name: "firstName", type: "text" },
        { label: "Επίθετο:", name: "lastName", type: "text" },
        { label: "Email:", name: "email", type: "email" },
        { label: "Τηλέφωνο Επικοινωνίας:", name: "phone", type: "text" },
        { label: "Κωδικός Πρόσβασης:", name: "password", type: "password" },
        { label: "Επανάληψη Κωδικού Πρόσβασης:", name: "confirmPassword", type: "password" },
    ];

    return (
        <>
            <Row>
                <h3 className="text-center my-4" style={{ color: "var(--color-gray-purple)" }}>
                    Δημιουργία Λογαριασμού
                </h3>
            </Row>
            <Container className="d-flex justify-content-center">
                <Card
                    className="p-4 border-2"
                    style={{
                        borderColor: "var(--color-orange)",
                        backgroundColor: "var(--color-soft-yellow)",
                        width: "50rem"
                    }}
                >
                    <Form
                        onSubmit={handleSubmit}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                handleSubmit(e);
                            }
                        }}
                    >
                        {fields.reduce((rows, { label, name, type }, index) => {
                            if (index % 2 === 0) rows.push([]);
                            rows[rows.length - 1].push({ label, name, type });
                            return rows;
                        }, []).map((rowFields, rowIndex) => (
                            <Row className="mb-4" key={rowIndex}>
                                {rowFields.map(({ label, name, type }) => (
                                    <Col md={6} key={name}>
                                        <Form.Group>
                                            <Form.Label>{label}</Form.Label>
                                            <div style={{ position: "relative" }}>
                                                <Form.Control
                                                    type={type}
                                                    name={name}
                                                    value={formData[name]}
                                                    onChange={handleChange}
                                                    style={{ backgroundColor: "transparent", borderColor: "var(--color-orange)" }}
                                                    isInvalid={!!errors[name]}
                                                />
                                                <Form.Control.Feedback
                                                    type="invalid"
                                                    className="position-absolute mb-1"
                                                    style={{ bottom: "-1.5rem" }}
                                                >
                                                    {errors[name]}
                                                </Form.Control.Feedback>
                                            </div>
                                        </Form.Group>
                                    </Col>
                                ))}
                            </Row>
                        ))}

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