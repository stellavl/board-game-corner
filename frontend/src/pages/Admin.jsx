import React, { useState } from "react";
import { useParams } from "react-router-dom";
import boardGameCafes from "../data/boardGameCafes";
import { Row, Col, Button } from "react-bootstrap";
import BackButton from "../components/common/BackButton";
import ReservationsTab from "../components/adminpage/ReservationsTab";
import InfoTab from "../components/adminpage/InfoTab";
import BoardGamesTab from "../components/adminpage/BoardGamesTab";
import StatisticsTab from "../components/adminpage/StatisticsTab";

const Admin = () => {
    const { id } = useParams();
    const cafe = boardGameCafes.find((cafe) => cafe.id === parseInt(id));
    const [activeTab, setActiveTab] = useState("reservations");

    return (
        <>
            {cafe ? (
                <>
                    <Row className="ms-5 mt-4">
                        <Col xs="auto">
                            <BackButton text="Έξοδος από το προφίλ διαχειριστή" />
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
                        {activeTab === "boardGames" && <BoardGamesTab />}
                    {activeTab === "statistics" && <StatisticsTab />}
                </>
            ) : (
                <p>Cafe not found</p>
            )}
        </>
    );
};

export default Admin;
