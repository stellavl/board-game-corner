import React, { useState } from "react";
import reservationsData from "../../data/reservationsData";
import { Table, Container, Button } from "react-bootstrap";
import { BsCalendar, BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { formatDateRangeForFilter } from "../utils/formatDateRangeForFilter";
import { handleDateNavigation } from "../utils/handleDateNavigation";

const ReservationsTab = () => {
    const today = new Date();

    const [filter, setFilter] = useState("all");
    const [currentDate, setCurrentDate] = useState(new Date());

    const handleDateChange = (direction) => {
        const newDate = handleDateNavigation(currentDate, filter, direction);
        setCurrentDate(newDate);
    };

    const filterReservations = (reservations) => {
        return reservations.filter(reservation => {
            const reservationDate = new Date(`${reservation.date.split('/')[1]}/${reservation.date.split('/')[0]}/${reservation.date.split('/')[2]}`);

            switch (filter) {
                case "year":
                    return reservationDate.getFullYear() === currentDate.getFullYear();
                case "month":
                    return reservationDate.getFullYear() === currentDate.getFullYear() &&
                        reservationDate.getMonth() === currentDate.getMonth();
                case "week":
                    const weekStart = new Date(currentDate);
                    weekStart.setDate(currentDate.getDate() - ((currentDate.getDay() + 6) % 7));
                    const weekEnd = new Date(weekStart);
                    weekEnd.setDate(weekStart.getDate() + 6);
                    return reservationDate >= weekStart && reservationDate <= weekEnd;
                case "day":
                    return reservationDate.toDateString() === currentDate.toDateString();
                default:
                    return true;
            }
        });
    };
    
    const pendingReservations = reservationsData.filter(reservation => {
        const reservationDate = new Date(reservation.date);
        return reservation.status === 'Αναμονή για επιβεβαίωση' && reservationDate >= today;
    });

    const confirmedReservationsAll = reservationsData.filter(reservation => {
        const reservationDate = new Date(reservation.date);
        return reservation.status === 'Εγκρίθηκε' && reservationDate >= today;
    });

    const confirmedReservations = filterReservations(confirmedReservationsAll);

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

            {/* Date Tabs */}
            <div className="mb-3">
                <Button variant={filter === "all" ? "secondary" : "outline-secondary"} className="mx-1" onClick={() => setFilter("all")}>Όλα</Button>
                <Button variant={filter === "year" ? "secondary" : "outline-secondary"} className="mx-1" onClick={() => setFilter("year")}>Έτος</Button>
                <Button variant={filter === "month" ? "secondary" : "outline-secondary"} className="mx-1" onClick={() => setFilter("month")}>Μήνας</Button>
                <Button variant={filter === "week" ? "secondary" : "outline-secondary"} className="mx-1" onClick={() => setFilter("week")}>Εβδομάδα</Button>
                <Button variant={filter === "day" ? "secondary" : "outline-secondary"} className="mx-1" onClick={() => setFilter("day")}>Ημέρα</Button>
            </div>

            {filter !== "all" && (
                <h6 className="text-muted d-flex align-items-center justify-content-center py-2">
                    <Button 
                        variant="outline-secondary" 
                        size="sm" 
                        className="me-2"
                        onClick={() => handleDateChange(-1)}
                        disabled={currentDate <= new Date()}
                    >
                        <BsChevronLeft />
                    </Button>
                    <BsCalendar className="me-2" /> {formatDateRangeForFilter(filter, currentDate)}
                    <Button 
                        variant="outline-secondary" 
                        size="sm" 
                        className="ms-2"
                        onClick={() => handleDateChange(1)}
                    >
                        <BsChevronRight />
                    </Button>
                </h6>
            )}

            {confirmedReservations.length === 0 ? (
                <h6 className="text-danger">Δεν υπάρχουν επιβεβαιωμένες κρατήσεις για αυτήν την περίοδο.</h6>
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
