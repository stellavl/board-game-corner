import { useState } from 'react';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import OrangeButton from '../components/common/OrangeButton';
import axiosInstance from '../config/axiosConfig';
import { toast } from 'react-toastify';

const ReservationDetailsPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const reservation = location.state;
    const { gameCafe, boardGame, players, date, time } = reservation;

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

    const formatDateToISO = (dateStr) => {
        // expects 'DD-MM-YYYY', returns 'YYYY-MM-DD'
        const [day, month, year] = dateStr.split('-');
        return `${year}-${month}-${day}`;
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

 const handleReservationClick = async () => {
        if (validateForm()) {
            const reservationData = {
                date: formatDateToISO(date),
                time: time,
                players_no: players,
                customer_first_name: formData.firstName,
                customer_last_name: formData.lastName,
                customer_email: formData.email,
                customer_phone: formData.phone,
                board_game_id: boardGame?.id,
                board_game_cafe_id: gameCafe?.id
            };
            try {
                const response = await axiosInstance.post(`/api/reservations`, reservationData);
                if (response.status === 201) {
                    toast.success("Η κράτηση καταχωρήθηκε με επιτυχία!",{ position: 'top-center' });
                    navigate("/"); // Redirect to home after successful reservation
                } else {
                    toast.error(response.data.error || "Σφάλμα κατά την καταχώρηση της κράτησης.",{ position: 'top-center' });
                }
            } catch (error) {
                toast.error("Σφάλμα δικτύου. Δοκιμάστε ξανά.",{ position: 'top-center' });
            }
        }
    };

    return (
        <Container className="my-4">
            <Row className="justify-content-center">
                <Col xs={12} md={6} lg={4}>
                    <Card className="text-center text-white p-2" style={{ backgroundColor: 'var(--color-orange)' }}>
                        <Card.Body>
                            <Card.Title className="fw-bold mb-1">
                                {gameCafe?.name } | {gameCafe?.city}
                            </Card.Title>
                            <Card.Text className="fst-italic">
                                {boardGame?.name === "Θα επιλέξω στο κατάστημα" ? "Δεν έχει επιλεγεί επιτραπέζιο" : boardGame?.name }
                            </Card.Text>
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