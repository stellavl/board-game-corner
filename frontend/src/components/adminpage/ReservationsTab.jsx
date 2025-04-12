import React from "react";
import reservationsData from "../../data/reservationsData";
import { Table, Container, Button } from "react-bootstrap";





const ReservationsTab = () => {
    const today = new Date();

    const pendingReservations = reservationsData.filter(reservation => {
        const reservationDate = new Date(reservation.date);
        return reservation.status === 'Αναμονή για επιβεβαίωση' && reservationDate >= today;
    });

    const confirmedReservations = reservationsData.filter(reservation => {
        const reservationDate = new Date(reservation.date);
        return reservation.status === 'Εγκρίθηκε' && reservationDate >= today;
    });

    const tableStyle = {
        border: '2px solid var(--color-orange)',
        backgroundColor: 'var(--color-soft-yellow)'
    };

    const headerStyle = {
        backgroundColor: 'var(--color-orange)',
        borderBottom: '2px solid var(--color-orange)'
    };

    const textStyle = {
        color: 'var(--color-gray-purple)'
    };

    return (
        <Container className="text-center mt-4">
            <h5 className="mb-3 text-decoration-underline" style={{ color: 'var(--color-orange)' }}>
                Περιμένουν επιβεβαίωση:
            </h5>
            {pendingReservations.length === 0 ? (
                <h6 className="text-danger">Δεν υπάρχουν εκκρεμείς κρατήσεις.</h6>
            ) : (
                <Table hover className="bg-transparent text-center" style={tableStyle}>
                    <thead style={headerStyle}>
                        <tr>
                            <th style={textStyle}>Ημερομηνία</th>
                            <th style={textStyle}>Ώρα</th>
                            <th style={textStyle}>Παίκτες</th>
                            <th style={textStyle}>Επιτραπέζιο</th>
                            <th style={textStyle}>Ονοματεπώνυμο Πελάτη</th>
                            <th style={{ ...textStyle, borderRight: '2px solid var(--color-orange)' }}>Τηλέφωνο Πελάτη</th>
                            <th style={textStyle}>Ενέργειες</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pendingReservations.map((reservation, index) => (
                            <tr key={index}>
                                <td style={textStyle}>{reservation.date}</td>
                                <td style={textStyle}>{reservation.time}</td>
                                <td style={textStyle}>{reservation.players}</td>
                                <td style={textStyle}>{reservation.boardGame}</td>
                                <td style={textStyle}>{reservation.customerName}</td>
                                <td style={{ ...textStyle, borderRight: '2px solid var(--color-orange)' }}>{reservation.phoneNumber}</td>
                                <td style={{ ...textStyle, borderLeft: '2px solid var(--color-orange)' }}>
                                    <div className="d-flex justify-content-around">
                                        <div className="me-1">
                                            <Button className="text-white btn-sm" variant="success">Επιβεβαίωση</Button>
                                        </div>
                                        <Button className="text-white btn-sm" variant="danger">Απόρριψη</Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}

            <h5 className="mb-3 mt-5 text-decoration-underline" style={{ color: 'var(--color-orange)' }}>
                Επιβεβαιωμένες κρατήσεις:
            </h5>
            {confirmedReservations.length === 0 ? (
                <h6 className="text-danger">Δεν υπάρχουν επιβεβαιωμένες κρατήσεις.</h6>
            ) : (
                <Table hover className="bg-transparent text-center" style={tableStyle}>
                    <thead style={headerStyle}>
                        <tr>
                            <th style={textStyle}>Ημερομηνία</th>
                            <th style={textStyle}>Ώρα</th>
                            <th style={textStyle}>Παίκτες</th>
                            <th style={textStyle}>Επιτραπέζιο</th>
                            <th style={textStyle}>Ονοματεπώνυμο Πελάτη</th>
                            <th style={{ ...textStyle, borderRight: '2px solid var(--color-orange)' }}>Τηλέφωνο Πελάτη</th>
                            <th style={textStyle}>Ενέργειες</th>
                        </tr>
                    </thead>
                    <tbody>
                        {confirmedReservations.map((reservation, index) => (
                            <tr key={index}>
                                <td style={textStyle}>{reservation.date}</td>
                                <td style={textStyle}>{reservation.time}</td>
                                <td style={textStyle}>{reservation.players}</td>
                                <td style={textStyle}>{reservation.boardGame}</td>
                                <td style={textStyle}>{reservation.customerName}</td>
                                <td style={{ ...textStyle, borderRight: '2px solid var(--color-orange)' }}>{reservation.phoneNumber}</td>
                                <td style={{ ...textStyle, borderLeft: '2px solid var(--color-orange)' }}>
                                    <div className="d-flex justify-content-center">
                                        <Button className="text-white btn-sm" variant="danger">Απόρριψη</Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Container>
    );
};

export default ReservationsTab;
