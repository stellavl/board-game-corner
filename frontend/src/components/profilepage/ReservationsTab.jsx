import React from "react";
import { Container } from "react-bootstrap";
import reservationsData from "../../data/reservationsData";
import PastReservationsTable from "./PastReservationsTable";
import FutureReservationsTable from "./FutureReservationsTable";

const filterReservationsByDate = (reservations) => {
    const currentDate = new Date();

    const futureReservations = reservations.filter((reservation) => {
        const reservationDate = new Date(
            `${reservation.date.split('/')[1]}/${reservation.date.split('/')[0]}/${reservation.date.split('/')[2]}`
        );
        return reservationDate > currentDate;
    });

    const pastReservations = reservations.filter((reservation) => {
        const reservationDate = new Date(
            `${reservation.date.split('/')[1]}/${reservation.date.split('/')[0]}/${reservation.date.split('/')[2]}`
        );
        return reservationDate <= currentDate;
    });

    return { futureReservations, pastReservations };
};

const ReservationsTab = () => {

    const { futureReservations, pastReservations } = filterReservationsByDate(reservationsData);

    return (
        <>
            <Container className="mt-2 p-4 text-center" style={{ color: "var(--color-gray-purple)" }}>
                <FutureReservationsTable futureReservations={futureReservations} />
            </Container>

            <Container className="p-4 text-center w-75" style={{ color: "var(--color-gray-purple)" }}>
                <PastReservationsTable pastReservations={pastReservations} />
               
            </Container>
        </>
    );
};

export default ReservationsTab;