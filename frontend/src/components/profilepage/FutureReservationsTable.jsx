import React from "react";
import { Table } from "react-bootstrap";
import OrangeButton from "../common/OrangeButton";

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

const FutureReservationsTable = ({ futureReservations }) => {
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
                            <th style={{ color: 'var(--color-gray-purple)', borderRight: '2px solid var(--color-orange)' }}>Κατάσταση</th>
                            <th style={{ color: 'var(--color-gray-purple)' }}>Ενέργειες</th>
                        </tr>
                    </thead>
                    <tbody>
                        {futureReservations.map((reservation, index) => (
                            <tr key={index}>
                                <td style={{ color: "var(--color-gray-purple)" }}>{reservation.cafe}</td>
                                <td style={{ color: "var(--color-gray-purple)" }}>{reservation.date}</td>
                                <td style={{ color: "var(--color-gray-purple)" }}>{reservation.time}</td>
                                <td style={{ color: "var(--color-gray-purple)" }}>{reservation.players}</td>
                                <td style={{ color: "var(--color-gray-purple)" }}>{reservation.boardGame}</td>
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