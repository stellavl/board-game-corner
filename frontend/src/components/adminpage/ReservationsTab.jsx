import { useState, useEffect } from "react";
import { Table, Container, Button, Spinner } from "react-bootstrap";
import { BsCalendar, BsChevronLeft, BsChevronRight, BsChevronUp, BsChevronDown } from "react-icons/bs";
import { formatDateRangeForFilter } from "../utils/formatDateRangeForFilter";
import { handleDateNavigation } from "../utils/handleDateNavigation";
import axiosInstance from "../../config/axiosConfig";
import { toast } from "react-toastify";
import { handleUpArrowClick, handleDownArrowClick } from "../utils/handleTableSorting";

const ReservationsTab = () => {
    const today = new Date();

    const [filter, setFilter] = useState("all");
    const [currentDate, setCurrentDate] = useState(new Date());
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);

    // Sorting state for confirmed and pending reservations
    const [confirmedSort, setConfirmedSort] = useState({ key: null, direction: null });
    const [pendingSort, setPendingSort] = useState({ key: null, direction: null });

    // Track which reservation is being updated
    const [updatingId, setUpdatingId] = useState(null);

    const handleDateChange = (direction) => {
        const newDate = handleDateNavigation(currentDate, filter, direction);
        setCurrentDate(newDate);
    };

    const fetchReservations = async () => {
        setLoading(true);
        try {
            const userId = localStorage.getItem("userId");
            const authToken = localStorage.getItem("authToken");
            const response = await axiosInstance.get(
                `/api/reservations/admin/${userId}`,
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );
            setReservations(response.data);
        } catch (err) {
            toast.error(err, {position: "top-center"});
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReservations();
    }, []);

    const handleUpdateStatus = async (reservationId, status) => {
        setUpdatingId(reservationId);
        try {
            const authToken = localStorage.getItem("authToken");
            await axiosInstance.put(
                `/api/reservations/${reservationId}/status`,
                { status },
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );
            toast.success(`Η κράτηση ενημερώθηκε σε: ${status}`, { position: "top-center" });
            await fetchReservations();
        } catch (err) {
            toast.error(err?.response?.data?.error || err.message, { position: "top-center" });
        } finally {
            setUpdatingId(null);
        }
    };

    if (loading) {
        return (
            <Container className="text-center mt-4">
                <Spinner animation="border"/>
            </Container>
        );
    }

    const parseReservationDate = (dateStr) => {
        // Expects dd-mm-yyyy
        const [day, month, year] = dateStr.split('-');
        return new Date(`${year}-${month}-${day}T00:00:00`);
    };

    const filterReservations = (reservations) => {
        return reservations.filter(reservation => {
            const reservationDate = parseReservationDate(reservation.date);

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
    
    const pendingReservationsAll = reservations.filter(reservation => {
        const reservationDate = parseReservationDate(reservation.date);
        return reservation.status === 'Αναμονή για επιβεβαίωση' && reservationDate >= today;
    });

    const confirmedReservationsAll = reservations.filter(reservation => {
        const reservationDate = parseReservationDate(reservation.date);
        return reservation.status === 'Εγκρίθηκε' && reservationDate >= today;
    });

    const pendingReservations = pendingReservationsAll;
    const confirmedReservations = filterReservations(confirmedReservationsAll);

    // Table headers for sorting
    const pendingHeaders = [
        { label: "Ημερομηνία", key: "date" },
        { label: "Ώρα", key: "time" },
        { label: "Παίκτες", key: "players_no" },
        { label: "Επιτραπέζιο", key: "board_game_name" },
        { label: "Ονοματεπώνυμο Πελάτη", key: "customer_full_name" },
        { label: "Τηλέφωνο Πελάτη", key: "customer_phone" }
    ];
    const confirmedHeaders = pendingHeaders;

    // Add full name property for sorting
    const pendingReservationsWithFullName = pendingReservations.map(r => ({
        ...r,
        customer_full_name: `${r.customer_first_name} ${r.customer_last_name}`
    }));
    const confirmedReservationsWithFullName = confirmedReservations.map(r => ({
        ...r,
        customer_full_name: `${r.customer_first_name} ${r.customer_last_name}`
    }));

    // Apply sorting
    let sortedPendingReservations = pendingReservationsWithFullName;
    if (pendingSort.key && pendingSort.direction) {
        if (pendingSort.direction === "asc") {
            sortedPendingReservations = handleUpArrowClick(pendingReservationsWithFullName, pendingSort.key);
        } else {
            sortedPendingReservations = handleDownArrowClick(pendingReservationsWithFullName, pendingSort.key);
        }
    }
    let sortedConfirmedReservations = confirmedReservationsWithFullName;
    if (confirmedSort.key && confirmedSort.direction) {
        if (confirmedSort.direction === "asc") {
            sortedConfirmedReservations = handleUpArrowClick(confirmedReservationsWithFullName, confirmedSort.key);
        } else {
            sortedConfirmedReservations = handleDownArrowClick(confirmedReservationsWithFullName, confirmedSort.key);
        }
    }

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
            {sortedPendingReservations.length === 0 ? (
                <h6 className="text-danger">Δεν υπάρχουν εκκρεμείς κρατήσεις.</h6>
            ) : (
                <Table hover className="bg-transparent text-center" style={tableStyle}>
                    <thead style={headerStyle}>
                        <tr>
                            {pendingHeaders.map((header, idx) => (
                                <th key={header.key} style={idx === pendingHeaders.length - 1 ? { ...textStyle, borderRight: '2px solid var(--color-orange)' } : textStyle}>
                                    {header.label}
                                    <span style={{ cursor: "pointer", marginLeft: 4 }}>
                                        <BsChevronUp
                                            size={14}
                                            onClick={() => setPendingSort({ key: header.key, direction: "asc" })}
                                            style={{ color: pendingSort.key === header.key && pendingSort.direction === "asc" ? "var(--color-orange)" : "#aaa" }}
                                        />
                                        <BsChevronDown
                                            size={14}
                                            onClick={() => setPendingSort({ key: header.key, direction: "desc" })}
                                            style={{ color: pendingSort.key === header.key && pendingSort.direction === "desc" ? "var(--color-orange)" : "#aaa" }}
                                        />
                                    </span>
                                </th>
                            ))}
                            <th style={textStyle}>Ενέργειες</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedPendingReservations.map((reservation, index) => (
                            <tr key={index}>
                                <td style={textStyle}>{reservation.date}</td>
                                <td style={textStyle}>{reservation.time}</td>
                                <td style={textStyle}>{reservation.players_no}</td>
                                <td style={textStyle}>{reservation.board_game_name}</td>
                                <td style={textStyle}>{reservation.customer_full_name}</td>
                                <td style={{ ...textStyle, borderRight: '2px solid var(--color-orange)' }}>{reservation.customer_phone}</td>
                                <td style={{ ...textStyle, borderLeft: '2px solid var(--color-orange)' }}>
                                    <div className="d-flex justify-content-around">
                                        <div className="me-1">
                                            <Button
                                                className="text-white btn-sm"
                                                variant="success"
                                                disabled={updatingId === reservation.id}
                                                onClick={() => handleUpdateStatus(reservation.id, "Εγκρίθηκε")}
                                            >
                                                {updatingId === reservation.id ? <Spinner size="sm" animation="border" /> : "Επιβεβαίωση"}
                                            </Button>
                                        </div>
                                        <Button
                                            className="text-white btn-sm"
                                            variant="danger"
                                            disabled={updatingId === reservation.id}
                                            onClick={() => handleUpdateStatus(reservation.id, "Απορρίφθηκε")}
                                        >
                                            {updatingId === reservation.id ? <Spinner size="sm" animation="border" /> : "Απόρριψη"}
                                        </Button>
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

            {sortedConfirmedReservations.length === 0 ? (
                <h6 className="text-danger">Δεν υπάρχουν επιβεβαιωμένες κρατήσεις για αυτήν την περίοδο.</h6>
            ) : (
                <Table hover className="bg-transparent text-center" style={tableStyle}>
                    <thead style={headerStyle}>
                        <tr>
                            {confirmedHeaders.map((header, idx) => (
                                <th key={header.key} style={idx === confirmedHeaders.length - 1 ? { ...textStyle, borderRight: '2px solid var(--color-orange)' } : textStyle}>
                                    {header.label}
                                    <span style={{ cursor: "pointer", marginLeft: 4 }}>
                                        <BsChevronUp
                                            size={14}
                                            onClick={() => setConfirmedSort({ key: header.key, direction: "asc" })}
                                            style={{ color: confirmedSort.key === header.key && confirmedSort.direction === "asc" ? "var(--color-orange)" : "#aaa" }}
                                        />
                                        <BsChevronDown
                                            size={14}
                                            onClick={() => setConfirmedSort({ key: header.key, direction: "desc" })}
                                            style={{ color: confirmedSort.key === header.key && confirmedSort.direction === "desc" ? "var(--color-orange)" : "#aaa" }}
                                        />
                                    </span>
                                </th>
                            ))}
                            <th style={textStyle}>Ενέργειες</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedConfirmedReservations.map((reservation, index) => (
                            <tr key={index}>
                                <td style={textStyle}>{reservation.date}</td>
                                <td style={textStyle}>{reservation.time}</td>
                                <td style={textStyle}>{reservation.players_no}</td>
                                <td style={textStyle}>{reservation.board_game_name}</td>
                                <td style={textStyle}>{reservation.customer_full_name}</td>
                                <td style={{ ...textStyle, borderRight: '2px solid var(--color-orange)' }}>{reservation.customer_phone}</td>
                                <td style={{ ...textStyle, borderLeft: '2px solid var(--color-orange)' }}>
                                    <div className="d-flex justify-content-center">
                                        <Button
                                            className="text-white btn-sm"
                                            variant="danger"
                                            disabled={updatingId === reservation.id}
                                            onClick={() => handleUpdateStatus(reservation.id, "Απορρίφθηκε")}
                                        >
                                            {updatingId === reservation.id ? <Spinner size="sm" animation="border" /> : "Απόρριψη"}
                                        </Button>
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