import { useState, useEffect } from "react";
import { Container, Form, Row, Col, Image } from "react-bootstrap";
import OrangeButton from "../common/OrangeButton";

const InfoTab = ({ cafeData }) => {
    const [formData, setFormData] = useState({
        cafeName: "",
        city: "",
        address: "",
        email: "",
        phone: "",
        photo: null,
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (cafeData) {
            setFormData({
                cafeName: cafeData.name || "",
                city: cafeData.city || "",
                address: cafeData.address || "",
                email: cafeData.email || "", 
                phone: cafeData.phone_number || "",
                photo: cafeData.photo || null,
            });
        }
    }, []);

    function getPhotoSrc(photo) {
    if (!photo) return "";
    if (typeof photo === "string") {
        return process.env.NODE_ENV !== 'production'
            ? `http://localhost:5000/uploads/${photo}`
            : `/uploads/${photo}`;
    }
    return URL.createObjectURL(photo);
}

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

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === "file") {
            const file = files[0];
            if (file) {
                setFormData({ ...formData, photo: file });
            }
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log("Sign Up Data:", formData);
        }
    };

    return (
        <>
            <Container className="d-flex justify-content-center wide-container col-md-6">    
                <Form onSubmit={handleSubmit}>
                    <Row className="mb-3 align-content-center">
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Όνομα Καταστήματος:</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    name="cafeName" 
                                    value={formData.cafeName} 
                                    onChange={handleChange} 
                                    style={{ backgroundColor: "transparent", borderColor: "var(--color-orange)" }} 
                                    className="text-secondary"
                                />
                                {errors.cafeName && <div className="text-danger">{errors.cafeName}</div>}
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Πόλη:</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    name="city" 
                                    value={formData.city} 
                                    onChange={handleChange} 
                                    style={{ backgroundColor: "transparent", borderColor: "var(--color-orange)" }} 
                                    className="text-secondary"
                                />
                                {errors.city && <div className="text-danger">{errors.city}</div>}
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Διεύθυνση:</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    name="address" 
                                    value={formData.address} 
                                    onChange={handleChange} 
                                    style={{ backgroundColor: "transparent", borderColor: "var(--color-orange)" }} 
                                    className="text-secondary"
                                />
                                {errors.address && <div className="text-danger">{errors.address}</div>}
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Τηλέφωνο Επικοινωνίας:</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    name="phone" 
                                    value={formData.phone} 
                                    onChange={handleChange} 
                                    style={{ backgroundColor: "transparent", borderColor: "var(--color-orange)" }} 
                                    className="text-secondary"
                                />
                                {errors.phone && <div className="text-danger">{errors.phone}</div>}
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                       <Col md={6}>
                            <Form.Group>
                                <Form.Label>Email:</Form.Label>
                                <Form.Control 
                                    type="email" 
                                    name="email" 
                                    value={formData.email} 
                                    onChange={handleChange} 
                                    style={{ backgroundColor: "transparent", borderColor: "var(--color-orange)" }} 
                                    className="text-secondary"
                                />
                                {errors.email && <div className="text-danger">{errors.email}</div>}
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="d-flex justify-content-center mt-1">
                        <Col md={6} className="d-flex justify-content-center">
                            <p style={{ color: "var(--color-orange)", textDecoration: "underline" }}>Αλλαγή κωδικού</p>
                        </Col>
                    </Row>

                    {formData.photo && (
                        <Row className="d-flex justify-content-center mt-3">
                            <Col md={6} className="d-flex justify-content-center">
                             <Image 
                                    src={formData.photo}
                                    alt={formData.name}
                                    fluid
                                    style={ {display: 'block'} }
                                    // onLoad={() => setImageLoaded(true)}
                                    // style={{ display: imageLoaded ? 'block' : 'none' }}
                                />
                          
                            </Col>
                        </Row>
                    )}

                    <Row className="d-flex justify-content-center mt-3">
                        <Col md={6} className="d-flex justify-content-center">
                            <OrangeButton
                                text={formData.photo ? "Αλλαγή εικόνας" : "Προσθήκη εικόνας"}
                                onClick={() => document.getElementById("photoUpload").click()}
                            />
                        </Col>
                    </Row>

                    <input
                        type="file"
                        id="photoUpload"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={handleChange}
                    />

                    <Row className="d-flex mt-3 justify-content-center">
                        <Col md={6} className="d-flex justify-content-center">
                            <button type="submit" className="btn btn-success">
                                Αποθήκευση Αλλαγών
                            </button>   
                        </Col>
                    </Row>
                </Form>
        </Container>
    </>
    );
};

export default InfoTab;