import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import HomePage from '../../pages/HomePage';
import BoardGamesPage from '../../pages/BoardGamesPage';
import BoardGameCafesPage from '../../pages/BoardGameCafesPage';

const validRoutes = ["/home", "/boardgames", "/boardgamecafes"];

const Main = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [lastValidRoute, setLastValidRoute] = useState(() => {
    return validRoutes.includes(location.pathname) ? location.pathname : "/home";
  });

  useEffect(() => {
    if (validRoutes.includes(location.pathname)) {
      setLastValidRoute(location.pathname);
    } else {
      navigate(lastValidRoute, { replace: true });
    }
  }, [location.pathname, navigate, lastValidRoute]);

  return (
    <Routes>
      <Route path="/home" element={<HomePage />} />
      <Route path="/boardgames" element={<BoardGamesPage />} />
      <Route path="/boardgamecafes" element={<BoardGameCafesPage />} />
    </Routes>
  );
};

export default Main;