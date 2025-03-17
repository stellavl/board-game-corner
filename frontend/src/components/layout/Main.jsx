import React, { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate, matchPath } from "react-router-dom";
import ScrollToTop from "../utils/ScrollToTop";
import HomePage from "../../pages/HomePage";
import BoardGamesPage from "../../pages/BoardGamesPage";
import BoardGameCafesPage from "../../pages/BoardGameCafesPage";
import SpecificBoardGamePage from "../../pages/SpecificBoardGamePage";
import SpecificCityCafesPage from "../../pages/SpecificCityCafesPage";
import SpecificCafePage from "../../pages/SpecificCafePage";
import ReservationDetailsPage from "../../pages/ReservationDetailsPage";
import SignUpPersonal from "../../pages/SignUpPersonal";
import SignUpBusinessBasicInfo from "../../pages/SignUpBusinessBasicInfo";
import SignUpBusinessBoardGames from "../../pages/SignUpBusinessBoardGames";
import ProfileMain from "../../pages/ProfileMain";

const validRoutePatterns = [
  "/home",
  "/boardgames",
  "/boardgamecafes",
  "/boardgames/:boardGameName", // Dynamic route
  "/boardgamecafes/:cityName",  // Dynamic route for specific city cafes
  "/boardgamecafes/:cityName/:cafeName",  // Dynamic route for specific board game cafes
  "/reservation-details",
  "/signup/personal",
  "/signup/business/basic-info",
  "/signup/business/board-games",
  "/profile"
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
    } else if (location.pathname === "/signup/business/board-games" && !sessionStorage.getItem("completedBasicInfo")) {
      navigate("/signup/business/basic-info", { replace: true }); // Redirect to basic-info if board-games is accessed directly
    }
  }, [location.pathname, navigate]);

  return (
    <div style={{ minHeight: "400px" }}>
    <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/boardgames" element={<BoardGamesPage />} />
        <Route path="/boardgamecafes" element={<BoardGameCafesPage />} />
        <Route path="/boardgames/:boardGameName" element={<SpecificBoardGamePage />} />
        <Route path="/boardgamecafes/:cityName" element={<SpecificCityCafesPage />} />
        <Route path="/boardgamecafes/:cityName/:cafeName" element={<SpecificCafePage/>} />
        <Route path="/reservation-details" element={<ReservationDetailsPage />} />
        <Route path= "/signup/personal" element={<SignUpPersonal />} />
        <Route path= "/signup/business/basic-info" element={<SignUpBusinessBasicInfo />} />
        <Route path= "/signup/business/board-games" element={<SignUpBusinessBoardGames />} />
        <Route path= "/profile" element={<ProfileMain />} />
      </Routes>
    </div>
  );
};

export default Main;