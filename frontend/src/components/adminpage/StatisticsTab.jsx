import React, { useState } from "react";
import reservationsData from "../../data/reservationsData";
import { Table, Container, Button } from "react-bootstrap";
import { BsCalendar, BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { formatDateRangeForFilter } from "../utils/formatDateRangeForFilter";
import { handleDateNavigation } from "../utils/handleDateNavigation";
import gamePlayCounts from "../../data/gamePlayCounts";

const StatisticsTab = () => {
    const today = new Date();

    const [reservationsFilter, setReservationsFilter] = useState("all");
    const [currentDate, setCurrentDate] = useState(new Date());

    const [gamesFilter, setGamesFilter] = useState("day");
    const [currentDateGames, setCurrentDateGames] = useState(new Date());

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

    const filterReservations = (reservations, filterType, date) => {
        return reservations.filter(reservation => {
            const reservationDate = new Date(`${reservation.date.split('/')[1]}/${reservation.date.split('/')[0]}/${reservation.date.split('/')[2]}`);
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

    const filterGamePlayCounts = (gamePlayCounts, filterType, date) => {
        const filteredCounts = {};
        Object.entries(gamePlayCounts).forEach(([game, entries]) => {
            const filteredEntries = entries.filter(entry => {
                const entryDate = new Date(`${entry.date.split('/')[1]}/${entry.date.split('/')[0]}/${entry.date.split('/')[2]}`);
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

    const filteredGamePlayCounts = filterGamePlayCounts(gamePlayCounts, gamesFilter, currentDateGames);

    const previousReservationsAll = reservationsData.filter(reservation => {
        const reservationDate = new Date(reservation.date);
        return reservation.status === 'Εγκρίθηκε' && reservationDate <= today;
    });

    const previousReservations = filterReservations(previousReservationsAll, reservationsFilter, currentDate);
    const gameStatsReservations = filterReservations(previousReservationsAll, gamesFilter, currentDateGames);

    gameStatsReservations.forEach(res => {
        if (!gamePlayCounts[res.boardGame]) {
            gamePlayCounts[res.boardGame] = [];
        }
    
        const existingDateEntry = gamePlayCounts[res.boardGame].find(entry => entry.date === res.date);
        if (existingDateEntry) {
            existingDateEntry.timesPlayed++;
        } else {
            gamePlayCounts[res.boardGame].push({ date: res.date, timesPlayed: 1 });
        }
    });

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

    return (
        <Container className="text-center mt-4">
            <h5 className="mb-3 text-decoration-underline" style={{ color: 'var(--color-orange)' }}>
                Στατιστικά Κρατήσεων
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
                            <th style={textStyle}>Ημερομηνία</th>
                            <th style={textStyle}>Ώρα</th>
                            <th style={textStyle}>Παίκτες</th>
                            <th style={textStyle}>Επιτραπέζιο</th>
                            <th style={textStyle}>Ονοματεπώνυμο Πελάτη</th>
                            <th style={{ ...textStyle, borderRight: '2px solid var(--color-orange)' }}>Τηλέφωνο Πελάτη</th>
                        </tr>
                    </thead>
                    <tbody>
                        {previousReservations.map((reservation, index) => (
                            <tr key={index}>
                                <td style={textStyle}>{reservation.date}</td>
                                <td style={textStyle}>{reservation.time}</td>
                                <td style={textStyle}>{reservation.players}</td>
                                <td style={textStyle}>{reservation.boardGame}</td>
                                <td style={textStyle}>{reservation.customerName}</td>
                                <td style={{ ...textStyle, borderRight: '2px solid var(--color-orange)' }}>{reservation.phoneNumber}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}

            <h5 className="mb-3 mt-5 text-decoration-underline" style={{ color: 'var(--color-orange)' }}>
                Στατιστικά Επιτραπέζιων
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
                        <th style={textStyle}>Όνομα Επιτραπέζιου</th>
                        <th style={textStyle}>Φορές που παίχτηκε</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(filteredGamePlayCounts).map(([game, entries]) => {
                        const totalTimesPlayed = entries.reduce((sum, entry) => sum + entry.timesPlayed, 0);
                        return (
                            <tr key={game}>
                                <td style={textStyle}>{game}</td>
                                <td style={textStyle}>{totalTimesPlayed}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>)}
        </Container>
    );
};

export default StatisticsTab;
