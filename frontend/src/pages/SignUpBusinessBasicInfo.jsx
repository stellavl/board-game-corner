import React, { useState } from "react";
import { Container, Card, Form, Row, Col, Image } from "react-bootstrap";
import OrangeButton from "../components/common/OrangeButton";
import { useNavigate } from "react-router-dom";

const SignUpBusinessBasicInfo = () => {
    const [formData, setFormData] = useState({
        cafeName: "",
        city: "",
        address: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({});
    const [photoPreview, setPhotoPreview] = useState(null);
    const navigate = useNavigate();

    const validateForm = () => {
        let newErrors = {};

        if (!formData.cafeName) newErrors.cafeName = "Το όνομα του παιχνιδοκαφέ σας είναι υποχρεωτικό.";
        if (!formData.city) newErrors.city = "Η πόλη είναι υποχρεωτική.";
        if (!formData.address) newErrors.address = "Το τηλέφωνο είναι υποχρεωτικό.";

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
        const { name, value, type, files } = e.target;
        if (type === "file") {
            const file = files[0];
            if (file) {
                setFormData({ ...formData, photo: file });
                setPhotoPreview(URL.createObjectURL(file));
            }
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log("Sign Up Data:", formData);
            sessionStorage.setItem("completedBasicInfo", "true"); 
            navigate('/signup/business/board-games');
        }
    };

    return (
        <>
         <Row>
                <Col md={2} className="ms-5 mt-3">
                </Col>
                <Col md={8}>
                    <h3 className="text-center my-4" style={{ color: "var(--color-gray-purple)" }}>Δημιουργία Προφίλ Παιχνιδοκαφέ</h3>
                </Col>
        </Row>
        <Container className="d-flex justify-content-center">
            <Card className="p-4 border-2" style={{ borderColor: "var(--color-orange)", backgroundColor: "var(--color-soft-yellow)", width: "55rem" }}>
            <h4 className="mb-4 pb-3" style={{ color: "var(--color-orange)", borderBottom: "2px solid var(--color-orange)" }}>Βασικές Πληροφορίες:</h4>                
            <Form onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Όνομα Καταστήματος:</Form.Label>
                                <Form.Control type="text" name="cafeName" value={formData.cafeName} onChange={handleChange} style={{ backgroundColor: "transparent", borderColor: "var(--color-orange)" }} />
                                {errors.cafeName && <div className="text-danger">{errors.cafeName}</div>}
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Πόλη:</Form.Label>
                                <Form.Control type="text" name="city" value={formData.city} onChange={handleChange} style={{ backgroundColor: "transparent", borderColor: "var(--color-orange)" }} />
                                {errors.city && <div className="text-danger">{errors.city}</div>}
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Διεύθυνση:</Form.Label>
                                <Form.Control type="text" name="address" value={formData.address} onChange={handleChange} style={{ backgroundColor: "transparent", borderColor: "var(--color-orange)" }} />
                                {errors.address && <div className="text-danger">{errors.address}</div>}
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Τηλέφωνο Επικοινωνίας:</Form.Label>
                                <Form.Control type="text" name="phone" value={formData.phone} onChange={handleChange} style={{ backgroundColor: "transparent", borderColor: "var(--color-orange)" }}/>
                                {errors.phone && <div className="text-danger">{errors.phone}</div>}
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                       <Col md={6}>
                            <Form.Group>
                                <Form.Label>Email:</Form.Label>
                                <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} style={{ backgroundColor: "transparent", borderColor: "var(--color-orange)" }}/>
                                {errors.email && <div className="text-danger">{errors.email}</div>}
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Κωδικός Πρόσβασης:</Form.Label>
                                <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} style={{ backgroundColor: "transparent", borderColor: "var(--color-orange)" }}/>
                                {errors.password && <div className="text-danger">{errors.password}</div>}
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                      <Col md={6}>
                            <Form.Group>
                                <Form.Label>Επανάληψη Κωδικού Πρόσβασης:</Form.Label>
                                <Form.Control type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} style={{ backgroundColor: "transparent", borderColor: "var(--color-orange)" }}/>
                                {errors.confirmPassword && <div className="text-danger">{errors.confirmPassword}</div>}
                            </Form.Group>
                        </Col>
                        <Col md={6} className="d-flex align-items-end">
                            <Form.Group>
                                <Form.Label>Ανέβασμα Φωτογραφίας:</Form.Label>
                                <Form.Control type="file" name="photo" accept="image/*" onChange={handleChange} style={{ backgroundColor: "transparent", borderColor: "var(--color-orange)" }}/>
                                {photoPreview && (
                                    <div className="mt-4 d-flex justify-content-center">
                                        <Image src={photoPreview} alt="Uploaded" fluid style={{ maxHeight: "15rem" }} />
                                    </div>
                                )}
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="d-flex justify-content-center">
                        <Col md={6} className="d-flex justify-content-center">
                            <OrangeButton text="Συνέχεια" onClick={handleSubmit} />
                        </Col>
                    </Row>
                </Form>
            </Card>
        </Container>
    </>
    );
};

export default SignUpBusinessBasicInfo;