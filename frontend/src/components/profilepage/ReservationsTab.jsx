import { useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import axiosInstance from "../../config/axiosConfig"; 
import PastReservationsTable from "./PastReservationsTable";
import FutureReservationsTable from "./FutureReservationsTable";
import { toast } from "react-toastify"; 

const filterReservationsByDate = (reservations) => {
    const currentDate = new Date();
    const futureReservations = reservations.filter((reservation) => {
        const [day, month, year] = reservation.date.split('-');
        const reservationDate = new Date(`${year}-${month}-${day}T${reservation.time}`);
        return reservationDate > currentDate;
    });

    const pastReservations = reservations.filter((reservation) => {
        const [day, month, year] = reservation.date.split('-');
        const reservationDate = new Date(`${year}-${month}-${day}T${reservation.time}`);
        return reservationDate <= currentDate;
    });

    return { futureReservations, pastReservations };
};

const ReservationsTab = () => {
    const [futureReservations, setFutureReservations] = useState([]);
    const [pastReservations, setPastReservations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const userId = localStorage.getItem("userId");
                const authToken = localStorage.getItem("authToken");
                const response = await axiosInstance.get(
                    `/api/reservations/basic-user/${userId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${authToken}`,
                        },
                    }
                );
                const { futureReservations, pastReservations } = filterReservationsByDate(response.data);
                setFutureReservations(futureReservations);
                setPastReservations(pastReservations);
            } catch (err) {
                toast.error( err, {position: "top-center"});
            } finally {
                setLoading(false);
            }
        };
        fetchReservations();
    }, []);

    if (loading) return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "200px" }}>
            <Spinner animation="border" role="status" variant="primary">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    );
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