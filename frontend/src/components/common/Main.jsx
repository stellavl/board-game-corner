import React, { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate, matchPath } from "react-router-dom";
import HomePage from "../../pages/HomePage";
import BoardGamesPage from "../../pages/BoardGamesPage";
import BoardGameCafesPage from "../../pages/BoardGameCafesPage";
import SpecificBoardGamePage from "../../pages/SpecificBoardGamePage";

const validRoutePatterns = [
  "/home",
  "/boardgames",
  "/boardgamecafes",
  "/boardgames/:boardGameName", // Dynamic route
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
    <div style={{ minHeight: "350px" }}>

      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/boardgames" element={<BoardGamesPage />} />
        <Route path="/boardgamecafes" element={<BoardGameCafesPage />} />
        <Route path="/boardgames/:boardGameName" element={<SpecificBoardGamePage />} />
      </Routes>
      </div>
  );
};

export default Main;