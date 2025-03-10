import React, { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate, matchPath } from "react-router-dom";
import HomePage from "../../pages/HomePage";
import BoardGamesPage from "../../pages/BoardGamesPage";
import BoardGameCafesPage from "../../pages/BoardGameCafesPage";
import SpecificBoardGamePage from "../../pages/SpecificBoardGamePage";
import SpecificCityCafesPage from "../../pages/SpecificCityCafesPage";
import SpecificCafePage from "../../pages/SpecificCafePage";
import ScrollToTop from "../utils/ScrollToTop";
import ReservationDetailsPage from "../../pages/ReservationDetailsPage";

const validRoutePatterns = [
  "/home",
  "/boardgames",
  "/boardgamecafes",
  "/boardgames/:boardGameName", // Dynamic route
  "/boardgamecafes/:cityName",  // Dynamic route for specific city cafes
  "/boardgamecafes/:cityName/:cafeName",  // Dynamic route for specific board game cafes
  "/reservation-details"
];

const isValidRoute = (pathname) => {
  return validRoutePatterns.some((pattern) => matchPath(pattern, pathname));
};

const Main = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isValidRoute(location.pathname)) {
      navigate("/home", { replace: true }); // Redirect invalid routes
    }
  }, [location.pathname, navigate]);

  return (
    <div style={{ minHeight: "400px" }}>
    <ScrollToTop />
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/boardgames" element={<BoardGamesPage />} />
        <Route path="/boardgamecafes" element={<BoardGameCafesPage />} />
        <Route path="/boardgames/:boardGameName" element={<SpecificBoardGamePage />} />
        <Route path="/boardgamecafes/:cityName" element={<SpecificCityCafesPage />} />
        <Route path="/boardgamecafes/:cityName/:cafeName" element={<SpecificCafePage/>} />
        <Route path="/reservation-details" element={<ReservationDetailsPage />} />
      </Routes>
    </div>
  );
};

export default Main;