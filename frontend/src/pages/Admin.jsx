import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Row, Col, Button, Spinner } from "react-bootstrap";
import OrangeButton from "../components/common/OrangeButton";
import ReservationsTab from "../components/adminpage/ReservationsTab";
import InfoTab from "../components/adminpage/InfoTab";
import BoardGamesTab from "../components/adminpage/BoardGamesTab";
import StatisticsTab from "../components/adminpage/StatisticsTab";
import axiosInstance from '../config/axiosConfig';

const Admin = () => {
    const { id } = useParams();
    const [cafe, setCafe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState("reservations");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCafe = async () => {
            try {
                setLoading(true);
                setError(null);
                const token = localStorage.getItem("authToken");
                const response = await axiosInstance.get(`/api/admins/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setCafe(response.data);
            } catch (err) {
                setError("Δεν βρέθηκε το παιχνιδοκαφέ ή υπήρξε σφάλμα.");
            } finally {
                setLoading(false);
            }
        };
        fetchCafe();
    }, [id]);

    const handleLogout = () => {
        localStorage.removeItem("authToken"); 
        navigate("/home");
    };

    if (loading) return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "200px" }}>
            <Spinner animation="border" role="status" style={{ color: "var(--color-orange)" }}>
                <span className="visually-hidden">Φόρτωση...</span>
            </Spinner>
        </div>
    );
    if (error) return <p>{error}</p>;

    return (
        <>
            {cafe ? (
                <>
                    <Row className="ms-5 mt-4">
                        <Col xs="auto">
                            <OrangeButton
                                text="Έξοδος από το προφίλ διαχειριστή"
                                onClick={handleLogout}
                            />                        
                        </Col>
                        <Col xs="auto" className="ms-auto me-5">
                            <Button variant="outline-secondary" className="text-nowrap">
                                Προβολή σαν επισκέπτης
                            </Button>
                        </Col>
                    </Row>   
                    <Row className="align-items-center">
                        <Col className="d-flex flex-column justify-content-center align-items-center">
                            <h2 className="text-center fw-bold" style={{ color: "var(--color-orange)" }}>
                                Admin Page
                            </h2>
                            <h4 className="text-center" style={{ color: "var(--color-gray-purple)" }}>
                                {cafe.name} - {cafe.city}
                            </h4>
                        </Col>  
                    </Row>
                    {/* Tabs */}
                    <div className="text-center mt-5 mb-2">
                        {["reservations", "info", "boardGames", "statistics"].map((tab) => (
                            <a
                                key={tab}
                                href="#"
                                className={`mx-3 ${ 
                                    activeTab === tab ? "text-decoration-underline" : "text-decoration-none"
                                }`}
                                style={{ color: "var(--color-gray-purple)" }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setActiveTab(tab);
                                }}
                            >
                                {tab === "reservations"
                                    ? "Κρατήσεις"
                                    : tab === "info"
                                    ? "Πληροφορίες"
                                    : tab === "boardGames"
                                    ? "Επιτραπέζια"
                                    : "Στατιστικά"}
                            </a>
                        ))}
                    </div>
                    <hr className="mx-auto mt-2" style={{ width: "25%", border: "1px solid var(--color-orange" }} />
                        {/* Render the active tab */}
                        {activeTab === "reservations" && <ReservationsTab />}
                        {activeTab === "info" && <InfoTab cafeData={cafe} />}
                        {activeTab === "boardGames" && <BoardGamesTab cafeId={cafe.cafe_id} />}
                    {activeTab === "statistics" && <StatisticsTab />}
                </>
            ) : (
                <p>Cafe not found</p>
            )}
        </>
    );
};


export default Admin;
