import { useState } from "react";
import { Table } from "react-bootstrap";
import { BsChevronUp, BsChevronDown } from "react-icons/bs";
import OrangeButton from "../common/OrangeButton";
import { handleUpArrowClick, handleDownArrowClick } from "../utils/handleTableSorting";

const getStatusClass = (status) => {
    switch (status) {
        case "Αναμονή για επιβεβαίωση":
            return "bg-warning text-dark";
        case "Εγκρίθηκε":
            return "bg-success text-white";
        case "Απορρίφθηκε":
            return "bg-danger text-white";
        default:
            return "bg-secondary text-white";
    }
};

const headers = [
    { label: "Παιχνιδοκαφέ", key: "board_game_cafe_name" },
    { label: "Ημερομηνία", key: "date" },
    { label: "Ώρα", key: "time" },
    { label: "Παίκτες", key: "players_no" },
    { label: "Επιτραπέζιο", key: "board_game_name" },
    { label: "Κατάσταση", key: "status" }
];

const FutureReservationsTable = ({ futureReservations }) => {
    const [sort, setSort] = useState({ key: null, direction: null });

    let sortedReservations = futureReservations;
    if (sort.key && sort.direction) {
        if (sort.direction === "asc") {
            sortedReservations = handleUpArrowClick(futureReservations, sort.key);
        } else {
            sortedReservations = handleDownArrowClick(futureReservations, sort.key);
        }
    }

    return (
        <>
            <h4 className="mb-3"><strong>Προσεχείς κρατήσεις:</strong></h4>
            {futureReservations.length === 0 ? (
                <h6 className="text-danger">Δεν υπάρχουν προσεχείς κρατήσεις.</h6>
            ) : (
                <Table
                    hover
                    className="bg-transparent"
                    style={{
                        border: '2px solid var(--color-orange)',
                        backgroundColor: 'var(--color-soft-yellow)',
                        minWidth: 1100
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
                                    style={{
                                        color: 'var(--color-gray-purple)',
                                        borderRight: idx === headers.length - 1 ? '2px solid var(--color-orange)' : undefined,
                                        whiteSpace: 'nowrap',
                                        minWidth: 140 
                                    }}
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
                            <th style={{ color: 'var(--color-gray-purple)', minWidth: 120 }}>Ενέργειες</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedReservations.map((reservation, index) => (
                            <tr key={index}>
                                <td style={{ color: "var(--color-gray-purple)" }}>{reservation.board_game_cafe_name}</td>
                                <td style={{ color: "var(--color-gray-purple)" }}>{reservation.date}</td>
                                <td style={{ color: "var(--color-gray-purple)" }}>{reservation.time}</td>
                                <td style={{ color: "var(--color-gray-purple)" }}>{reservation.players_no}</td>
                                <td style={{ color: "var(--color-gray-purple)" }}>{reservation.board_game_name}</td>
                                <td style={{ color: "var(--color-gray-purple)", borderRight: '2px solid var(--color-orange)' }}>
                                    <span className={`badge ${getStatusClass(reservation.status)}`}>
                                        {reservation.status}
                                    </span>
                                </td>
                                <td>
                                    {reservation.status === "Απορρίφθηκε" ? (
                                        <div className="d-flex justify-content-around">
                                            <OrangeButton text="Διαγραφή" size="btn-sm" />
                                        </div>
                                    ) : (
                                        <div className="d-flex justify-content-around">
                                            <div className="mx-2">
                                                <OrangeButton text="Επεξεργασία" size="btn-sm" />
                                            </div>
                                            <div className="mx-2">
                                                <OrangeButton text="Ακύρωση" size="btn-sm" />
                                            </div>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    );
};

export default FutureReservationsTable;