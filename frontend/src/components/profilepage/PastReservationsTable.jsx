import React, { useState } from "react";
import { Table, Button, Pagination } from "react-bootstrap";
import { BsCalendar, BsChevronLeft, BsChevronRight } from "react-icons/bs";

const PAGE_SIZE = 5; 

const PastReservationsTable = ({ pastReservations }) => {
    const [filter, setFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [currentDate, setCurrentDate] = useState(new Date());

    const filterReservations = (filterType) => {
        setFilter(filterType);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const filteredPastReservations = pastReservations.filter((reservation) => {
        const reservationDate = new Date(
            `${reservation.date.split('/')[1]}/${reservation.date.split('/')[0]}/${reservation.date.split('/')[2]}`
        );
    
        switch (filter) {
            case "year":
                return reservationDate.getFullYear() === currentDate.getFullYear();
            case "month":
                return (
                    reservationDate.getFullYear() === currentDate.getFullYear() &&
                    reservationDate.getMonth() === currentDate.getMonth()
                );
            case "week":
                const weekStart = new Date(currentDate);
                weekStart.setDate(currentDate.getDate() - ((currentDate.getDay() + 6) % 7)); // Monday-starting week
                const weekEnd = new Date(weekStart);
                weekEnd.setDate(weekStart.getDate() + 6);
                return reservationDate >= weekStart && reservationDate <= weekEnd;
            case "day":
                return reservationDate.toDateString() === currentDate.toDateString();
            default:
                return true;
        }
    });
    

    const getDateRangeText = () => {
        const monthNames = [
            "Ιανουάριος", "Φεβρουάριος", "Μάρτιος", "Απρίλιος", "Μάιος", "Ιούνιος",
            "Ιούλιος", "Αύγουστος", "Σεπτέμβριος", "Οκτώβριος", "Νοέμβριος", "Δεκέμβριος"
        ];
    
        switch (filter) {
            case "year":
                return `${currentDate.getFullYear()}`;
            case "month":
                return `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
            case "week":
                const weekStart = new Date(currentDate);
                weekStart.setDate(currentDate.getDate() - ((currentDate.getDay() + 6) % 7)); // Monday-starting week
                const weekEnd = new Date(weekStart);
                weekEnd.setDate(weekStart.getDate() + 6);
                return `${weekStart.toLocaleDateString("el-GR")} - ${weekEnd.toLocaleDateString("el-GR")}`;
            case "day":
                return `${currentDate.toLocaleDateString("el-GR")}`;
            default:
                return "";
        }
    };
    
    const handleDateNavigation = (direction) => {
        const newDate = new Date(currentDate);
    
        switch (filter) {
            case "year":
                newDate.setFullYear(newDate.getFullYear() + direction);
                break;
            case "month":
                newDate.setMonth(newDate.getMonth() + direction);
                break;
            case "week":
                newDate.setDate(newDate.getDate() + direction * 7);
                break;
            case "day":
                newDate.setDate(newDate.getDate() + direction);
                break;
            default:
                return;
        }
    
        if (newDate > new Date()) return; 
    
        setCurrentDate(newDate);
    };    
        
    const totalPages = Math.ceil(filteredPastReservations.length / PAGE_SIZE);
    const paginatedReservations = filteredPastReservations.slice(
        (currentPage - 1) * PAGE_SIZE,
        currentPage * PAGE_SIZE
    );    

    return (
        <>
            <h4 className="mb-3"><strong>Προηγούμενες κρατήσεις:</strong></h4>

            <div className="mb-3">
                <Button variant={filter === "all" ? "secondary" : "outline-secondary"} className="mx-1" onClick={() => filterReservations("all")}>Όλα</Button>
                <Button variant={filter === "year" ? "secondary" : "outline-secondary"} className="mx-1" onClick={() => filterReservations("year")}>Έτος</Button>
                <Button variant={filter === "month" ? "secondary" : "outline-secondary"} className="mx-1" onClick={() => filterReservations("month")}>Μήνας</Button>
                <Button variant={filter === "week" ? "secondary" : "outline-secondary"} className="mx-1" onClick={() => filterReservations("week")}>Εβδομάδα</Button>
                <Button variant={filter === "day" ? "secondary" : "outline-secondary"} className="mx-1" onClick={() => filterReservations("day")}>Ημέρα</Button>
            </div>           

            {filter !== "all" && (
                <h6 className="text-muted d-flex align-items-center justify-content-center py-2">
                    <Button 
                        variant="outline-secondary" 
                        size="sm" 
                        className="me-2"
                        onClick={() => handleDateNavigation(-1)}
                    >
                        <BsChevronLeft />
                    </Button>
                    <BsCalendar className="me-2" /> {getDateRangeText()}
                    <Button 
                        variant="outline-secondary" 
                        size="sm" 
                        className="ms-2"
                        onClick={() => handleDateNavigation(1)}
                        disabled={currentDate >= new Date()}
                    >
                        <BsChevronRight />
                    </Button>
                </h6>
            )}


            {filteredPastReservations.length === 0 ? (
                <h6 className="text-danger">Δεν υπάρχουν προηγούμενες κρατήσεις για αυτήν την περίοδο.</h6>
            ) : (
            
                <Table
                    hover
                    className="bg-transparent"
                    style={{
                        border: '2px solid var(--color-orange)',
                        backgroundColor: 'var(--color-soft-yellow)'
                    }}
                >
                    <thead style={{
                        backgroundColor: 'var(--color-orange)',
                        borderBottom: '2px solid var(--color-orange)'
                    }}>
                        <tr>
                            <th style={{ color: 'var(--color-gray-purple)' }}>Παιχνιδοκαφέ</th>
                            <th style={{ color: 'var(--color-gray-purple)' }}>Ημερομηνία</th>
                            <th style={{ color: 'var(--color-gray-purple)' }}>Ώρα</th>
                            <th style={{ color: 'var(--color-gray-purple)' }}>Παίκτες</th>
                            <th style={{ color: 'var(--color-gray-purple)' }}>Επιτραπέζιο</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedReservations.map((reservation, index) => (
                            <tr key={index}>
                                <td style={{ color: "var(--color-gray-purple)" }}>{reservation.cafe}</td>
                                <td style={{ color: "var(--color-gray-purple)" }}>{reservation.date}</td>
                                <td style={{ color: "var(--color-gray-purple)" }}>{reservation.time}</td>
                                <td style={{ color: "var(--color-gray-purple)" }}>{reservation.players}</td>
                                <td style={{ color: "var(--color-gray-purple)" }}>{reservation.boardGame}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
             {/* Pagination Controls */}
             {totalPages > 1 && (
                    <Pagination className="justify-content-center mt-3">
                        <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />

                        {currentPage > 2 && (
                            <>
                                <Pagination.Item onClick={() => handlePageChange(1)}>1</Pagination.Item>
                                {currentPage > 3 && <Pagination.Ellipsis />}
                            </>
                        )}

                        {currentPage > 1 && (
                            <Pagination.Item onClick={() => handlePageChange(currentPage - 1)}>{currentPage - 1}</Pagination.Item>
                        )}

                        <Pagination.Item active>{currentPage}</Pagination.Item>

                        {currentPage < totalPages && (
                            <Pagination.Item onClick={() => handlePageChange(currentPage + 1)}>{currentPage + 1}</Pagination.Item>
                        )}

                        {currentPage < totalPages - 1 && (
                            <>
                                {currentPage < totalPages - 2 && <Pagination.Ellipsis />}
                                <Pagination.Item onClick={() => handlePageChange(totalPages)}>
                                    {totalPages}
                                </Pagination.Item>
                            </>
                        )}

                        <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
                    </Pagination>
                )}
        </>
    );
};

export default PastReservationsTable;