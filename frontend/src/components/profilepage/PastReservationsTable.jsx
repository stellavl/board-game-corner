import { useState } from "react";
import { Table, Button, Pagination } from "react-bootstrap";
import { BsCalendar, BsChevronLeft, BsChevronRight, BsChevronUp, BsChevronDown } from "react-icons/bs";

const PAGE_SIZE = 5; 

const headers = [
    { label: "Παιχνιδοκαφέ", key: "board_game_cafe_name" },
    { label: "Ημερομηνία", key: "date" },
    { label: "Ώρα", key: "time" },
    { label: "Παίκτες", key: "players_no" },
    { label: "Επιτραπέζιο", key: "board_game_name" }
];

const PastReservationsTable = ({ pastReservations }) => {
    const [filter, setFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [sort, setSort] = useState({ key: null, direction: null });

    const filterReservations = (filterType) => {
        setFilter(filterType);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const filteredPastReservations = pastReservations.filter((reservation) => {
        const [day, month, year] = reservation.date.split('-').map(Number);
        const reservationDate = new Date(year, month - 1, day);

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
                weekStart.setHours(0, 0, 0, 0);
                const weekEnd = new Date(weekStart);
                weekEnd.setDate(weekStart.getDate() + 6);
                weekEnd.setHours(23, 59, 59, 999);
                return reservationDate >= weekStart && reservationDate <= weekEnd;
            case "day":
                return reservationDate.toDateString() === currentDate.toDateString();
            default:
                return true;
        }
    });

    // Sorting logic
    let sortedReservations = filteredPastReservations;
    if (sort.key && sort.direction) {
        sortedReservations = [...filteredPastReservations].sort((a, b) => {
            let aValue = a[sort.key];
            let bValue = b[sort.key];

            // Special handling for date and time
            if (sort.key === "date") {
                const [ad, am, ay] = aValue.split('-').map(Number);
                const [bd, bm, by] = bValue.split('-').map(Number);
                aValue = new Date(ay, am - 1, ad);
                bValue = new Date(by, bm - 1, bd);
            } else if (sort.key === "time") {
                // Compare as time strings (hh:mm)
                aValue = aValue;
                bValue = bValue;
            } else if (sort.key === "players_no") {
                aValue = Number(aValue);
                bValue = Number(bValue);
            }

            if (aValue < bValue) return sort.direction === "asc" ? -1 : 1;
            if (aValue > bValue) return sort.direction === "asc" ? 1 : -1;
            return 0;
        });
    }

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
        
    const totalPages = Math.ceil(sortedReservations.length / PAGE_SIZE);
    const paginatedReservations = sortedReservations.slice(
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

            {sortedReservations.length === 0 ? (
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
                            {headers.map((header, idx) => (
                                <th
                                    key={header.key}
                                    style={{ color: 'var(--color-gray-purple)' }}
                                >
                                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 2 }}>
                                        {header.label}
                                        <span>
                                            <BsChevronUp
                                                size={14}
                                                onClick={() => setSort({ key: header.key, direction: "asc" })}
                                                style={{
                                                    color: sort.key === header.key && sort.direction === "asc" ? "var(--color-orange)" : "#aaa",
                                                    cursor: "pointer"
                                                }}
                                            />
                                            <BsChevronDown
                                                size={14}
                                                onClick={() => setSort({ key: header.key, direction: "desc" })}
                                                style={{
                                                    color: sort.key === header.key && sort.direction === "desc" ? "var(--color-orange)" : "#aaa",
                                                    cursor: "pointer"
                                                }}
                                            />
                                        </span>
                                    </span>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedReservations.map((reservation, index) => (
                            <tr key={index}>
                                <td style={{ color: "var(--color-gray-purple)" }}>{reservation.board_game_cafe_name}</td>
                                <td style={{ color: "var(--color-gray-purple)" }}>{reservation.date}</td>
                                <td style={{ color: "var(--color-gray-purple)" }}>{reservation.time}</td>
                                <td style={{ color: "var(--color-gray-purple)" }}>{reservation.players_no}</td>
                                <td style={{ color: "var(--color-gray-purple)" }}>{reservation.board_game_name}</td>
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