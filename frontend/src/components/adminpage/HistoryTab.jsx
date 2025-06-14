import { useState, useEffect } from "react";
import { Table, Container, Button, Spinner } from "react-bootstrap";
import { BsCalendar, BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { formatDateRangeForFilter } from "../utils/formatDateRangeForFilter";
import { handleDateNavigation } from "../utils/handleDateNavigation";
import axiosInstance from "../../config/axiosConfig";
import { toast } from "react-toastify";
import { BsChevronUp, BsChevronDown } from "react-icons/bs";
import { handleUpArrowClick, handleDownArrowClick } from "../utils/handleTableSorting";

const HistoryTab = () => {
    const today = new Date();

    const [reservationsFilter, setReservationsFilter] = useState("all");
    const [currentDate, setCurrentDate] = useState(new Date());

    const [gamesFilter, setGamesFilter] = useState("day");
    const [currentDateGames, setCurrentDateGames] = useState(new Date());

    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);

    const [reservationSort, setReservationSort] = useState({ key: null, direction: null });
    const [gameSort, setGameSort] = useState({ key: null, direction: null });

    const reservationHeaders = [
        { label: "Ημερομηνία", key: "date" },
        { label: "Ώρα", key: "time" },
        { label: "Παίκτες", key: "players_no" },
        { label: "Επιτραπέζιο", key: "board_game_name" },
        { label: "Ονοματεπώνυμο Πελάτη", key: "customer_full_name" },
        { label: "Τηλέφωνο Πελάτη", key: "customer_phone" }
    ];
    const gameHeaders = [
        { label: "Όνομα Επιτραπέζιου", key: "game" },
        { label: "Φορές που παίχτηκε", key: "timesPlayed" }
    ]; 

    useEffect(() => {
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
                toast.error("Σφάλμα κατά τη λήψη κρατήσεων", { position: "top-center" });
            } finally {
                setLoading(false);
            }
        };
        fetchReservations();
    }, []);

    const handleReservationsDateChange = (direction) => {
        const newDate = handleDateNavigation(currentDate, reservationsFilter, direction);
        if (newDate > new Date()) return;
        setCurrentDate(newDate);
    };

    const handleGamesDateChange = (direction) => {
        const newDate = handleDateNavigation(currentDateGames, gamesFilter, direction);
        if (newDate > new Date()) return;
        setCurrentDateGames(newDate);
    };

    const parseReservationDate = (dateStr) => {
        // Expects dd-mm-yyyy
        const [day, month, year] = dateStr.split('-');
        return new Date(`${year}-${month}-${day}T00:00:00`);
    };

    const filterReservations = (reservations, filterType, date) => {
        return reservations.filter(reservation => {
            const reservationDate = parseReservationDate(reservation.date);
            switch (filterType) {
                case "year":
                    return reservationDate.getFullYear() === date.getFullYear();
                case "month":
                    return reservationDate.getFullYear() === date.getFullYear() &&
                        reservationDate.getMonth() === date.getMonth();
                case "week":
                    const weekStart = new Date(date);
                    weekStart.setDate(date.getDate() - ((date.getDay() + 6) % 7));
                    const weekEnd = new Date(weekStart);
                    weekEnd.setDate(weekStart.getDate() + 6);
                    return reservationDate >= weekStart && reservationDate <= weekEnd;
                case "day":
                    return reservationDate.toDateString() === date.toDateString();
                default:
                    return true;
            }
        });
    };

    // Only approved and past reservations
    const previousReservationsAll = reservations.filter(reservation => {
        const reservationDate = parseReservationDate(reservation.date);
        return reservation.status === 'Εγκρίθηκε' && reservationDate <= today;
    });

    const previousReservations = filterReservations(previousReservationsAll, reservationsFilter, currentDate);
    const gameStatsReservations = filterReservations(previousReservationsAll, gamesFilter, currentDateGames);

    const reservationsWithFullName = previousReservations.map(r => ({
        ...r,
        customer_full_name: `${r.customer_first_name} ${r.customer_last_name}`
    }));

    let sortedReservations = reservationsWithFullName;
    if (reservationSort.key && reservationSort.direction) {
        if (reservationSort.direction === "asc") {
            sortedReservations = handleUpArrowClick(reservationsWithFullName, reservationSort.key);
        } else {
            sortedReservations = handleDownArrowClick(reservationsWithFullName, reservationSort.key);
        }
    }

    // Build game play counts from reservations
    const buildGamePlayCounts = () => {
        const counts = {};
        gameStatsReservations.forEach(res => {
            const game = res.board_game_name;
            if (!counts[game]) counts[game] = [];
            const existingDateEntry = counts[game].find(entry => entry.date === res.date);
            if (existingDateEntry) {
                existingDateEntry.timesPlayed++;
            } else {
                counts[game].push({ date: res.date, timesPlayed: 1 });
            }
        });
        return counts;
    };

    const filterGamePlayCounts = (gamePlayCounts, filterType, date) => {
        const filteredCounts = {};
        Object.entries(gamePlayCounts).forEach(([game, entries]) => {
            const filteredEntries = entries.filter(entry => {
                const entryDate = parseReservationDate(entry.date);
                switch (filterType) {
                    case "year":
                        return entryDate.getFullYear() === date.getFullYear();
                    case "month":
                        return entryDate.getFullYear() === date.getFullYear() &&
                            entryDate.getMonth() === date.getMonth();
                    case "week":
                        const weekStart = new Date(date);
                        weekStart.setDate(date.getDate() - ((date.getDay() + 6) % 7));
                        const weekEnd = new Date(weekStart);
                        weekEnd.setDate(weekStart.getDate() + 6);
                        return entryDate >= weekStart && entryDate <= weekEnd;
                    case "day":
                        return entryDate.toDateString() === date.toDateString();
                    default:
                        return true;
                }
            });
            if (filteredEntries.length > 0) {
                filteredCounts[game] = filteredEntries;
            }
        });
        return filteredCounts;
    };

    const dynamicGamePlayCounts = buildGamePlayCounts();
    const filteredGamePlayCounts = filterGamePlayCounts(dynamicGamePlayCounts, gamesFilter, currentDateGames);

    const gamesData = Object.entries(filteredGamePlayCounts).map(([game, entries]) => ({
        game,
        timesPlayed: entries.reduce((sum, entry) => sum + entry.timesPlayed, 0)
    }));

    let sortedGamesData = gamesData;
    if (gameSort.key && gameSort.direction) {
        if (gameSort.direction === "asc") {
            sortedGamesData = handleUpArrowClick(gamesData, gameSort.key);
        } else {
            sortedGamesData = handleDownArrowClick(gamesData, gameSort.key);
        }
    }
    const isGamePlayCountsEmpty = Object.entries(filteredGamePlayCounts).every(([_, entries]) =>
        entries.length === 0
    );

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

    if (loading) {
        return (
            <Container className="text-center mt-4">
                <Spinner animation="border"/>
            </Container>
        );
    }

    return (
        <Container className="text-center mt-4">
            <h5 className="mb-3 text-decoration-underline" style={{ color: 'var(--color-orange)' }}>
                Ιστορικό Κρατήσεων
            </h5>

            <div className="mb-3">
                {["all", "year", "month", "week", "day"].map(type => (
                    <Button key={type}
                        variant={reservationsFilter === type ? "secondary" : "outline-secondary"}
                        className="mx-1"
                        onClick={() => setReservationsFilter(type)}
                    >
                        {type === "all" ? "Όλα" :
                            type === "year" ? "Έτος" :
                            type === "month" ? "Μήνας" :
                            type === "week" ? "Εβδομάδα" :
                            "Ημέρα"}
                    </Button>
                ))}
            </div>

            {reservationsFilter !== "all" && (
                <h6 className="text-muted d-flex align-items-center justify-content-center py-2">
                    <Button variant="outline-secondary" size="sm" className="me-2" onClick={() => handleReservationsDateChange(-1)}>
                        <BsChevronLeft />
                    </Button>
                    <BsCalendar className="me-2" /> {formatDateRangeForFilter(reservationsFilter, currentDate)}
                    <Button variant="outline-secondary" size="sm" className="ms-2" onClick={() => handleReservationsDateChange(1)} disabled={currentDate >= new Date()}>
                        <BsChevronRight />
                    </Button>
                </h6>
            )}

            {previousReservations.length === 0 ? (
                <h6 className="text-danger">Δεν υπάρχουν προηγούμενες κρατήσεις σε αυτήν την περίοδο.</h6>
            ) : (
                <Table hover className="bg-transparent text-center" style={tableStyle}>
                    <thead style={headerStyle}>
                        <tr>
                             {reservationHeaders.map((header, idx) => (
                                <th key={header.key} style={idx === reservationHeaders.length - 1 ? { ...textStyle, borderRight: '2px solid var(--color-orange)' } : textStyle}>
                                    {header.label}
                                    <span style={{ cursor: "pointer", marginLeft: 4 }}>
                                        <BsChevronUp
                                            size={14}
                                            onClick={() => setReservationSort({ key: header.key, direction: "asc" })}
                                            style={{ color: reservationSort.key === header.key && reservationSort.direction === "asc" ? "var(--color-orange)" : "#aaa" }}
                                        />
                                        <BsChevronDown
                                            size={14}
                                            onClick={() => setReservationSort({ key: header.key, direction: "desc" })}
                                            style={{ color: reservationSort.key === header.key && reservationSort.direction === "desc" ? "var(--color-orange)" : "#aaa" }}
                                        />
                                    </span>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {sortedReservations.map((reservation, index) => (
                            <tr key={index}>
                                <td style={textStyle}>{reservation.date}</td>
                                <td style={textStyle}>{reservation.time}</td>
                                <td style={textStyle}>{reservation.players_no}</td>
                                <td style={textStyle}>{reservation.board_game_name ?? "-"}</td>
                                <td style={textStyle}>{reservation.customer_full_name}</td>
                                <td style={{ ...textStyle, borderRight: '2px solid var(--color-orange)' }}>{reservation.customer_phone}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}

            <h5 className="mb-3 mt-5 text-decoration-underline" style={{ color: 'var(--color-orange)' }}>
                Ιστορικό Επιτραπέζιων
            </h5>

            <div className="mb-3">
                {["all", "year", "month", "week", "day"].map(type => (
                    <Button key={type}
                        variant={gamesFilter === type ? "secondary" : "outline-secondary"}
                        className="mx-1"
                        onClick={() => setGamesFilter(type)}
                    >
                        {type === "all" ? "Όλα" :
                            type === "year" ? "Έτος" :
                            type === "month" ? "Μήνας" :
                            type === "week" ? "Εβδομάδα" :
                            "Ημέρα"}
                    </Button>
                ))}
            </div>

            {gamesFilter !== "all" && (
                <h6 className="text-muted d-flex align-items-center justify-content-center py-2">
                    <Button variant="outline-secondary" size="sm" className="me-2" onClick={() => handleGamesDateChange(-1)}>
                        <BsChevronLeft />
                    </Button>
                    <BsCalendar className="me-2" /> {formatDateRangeForFilter(gamesFilter, currentDateGames)}
                    <Button variant="outline-secondary" size="sm" className="ms-2" onClick={() => handleGamesDateChange(1)} disabled={currentDateGames >= new Date()}>
                        <BsChevronRight />
                    </Button>
                </h6>
            )}
            {isGamePlayCountsEmpty ? (
                <h6 className="text-danger text-center">Δεν παίχτηκε κανένα επιτραπέζιο σε αυτήν την περίοδο.</h6>
            ) : (
            <Table hover className="bg-transparent text-center w-75 mx-auto" style={tableStyle}>
                <thead style={headerStyle}>
                    <tr>
                        {gameHeaders.map(header => (
                            <th key={header.key} style={textStyle}>
                                {header.label}
                                <span style={{ cursor: "pointer", marginLeft: 4 }}>
                                    <BsChevronUp
                                        size={14}
                                        onClick={() => setGameSort({ key: header.key, direction: "asc" })}
                                        style={{ color: gameSort.key === header.key && gameSort.direction === "asc" ? "var(--color-orange)" : "#aaa" }}
                                    />
                                    <BsChevronDown
                                        size={14}
                                        onClick={() => setGameSort({ key: header.key, direction: "desc" })}
                                        style={{ color: gameSort.key === header.key && gameSort.direction === "desc" ? "var(--color-orange)" : "#aaa" }}
                                    />
                                </span>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {sortedGamesData.map(({ game, timesPlayed }) => (
                        <tr key={game}>
                            <td style={textStyle}>{game}</td>
                            <td style={textStyle}>{timesPlayed}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>)}
        </Container>
    );
};

export default HistoryTab;
