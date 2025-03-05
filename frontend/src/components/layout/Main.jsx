import React, { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate, matchPath } from "react-router-dom";
import HomePage from "../../pages/HomePage";
import BoardGamesPage from "../../pages/BoardGamesPage";
import BoardGameCafesPage from "../../pages/BoardGameCafesPage";
import SpecificBoardGamePage from "../../pages/SpecificBoardGamePage";
import SpecificCityCafesPage from "../../pages/SpecificCityCafesPage";
import ScrollToTop from "../utils/ScrollToTop";

const validRoutePatterns = [
  "/home",
  "/boardgames",
  "/boardgamecafes",
  "/boardgames/:boardGameName", // Dynamic route
  "/boardgamecafes/:cityName"  // Dynamic route for specific city cafes
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
      </Routes>
    </div>
  );
};

export default Main;