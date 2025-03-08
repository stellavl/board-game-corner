import React, { useEffect } from "react";
import { Row, Pagination } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import usePagination from "../../hooks/usePagination"; 
import BoardGameCard from "./BoardGameCard";
import boardGames from "../../data/boardGames";

const BoardGameCards = ({ itemsPerPage = 8, setNumberOfBoardGames, searchTerm, filters }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const { currentPage, currentItems, totalPages, handlePageChange } = usePagination(
    boardGames, itemsPerPage
  );

  useEffect(() => {
    setNumberOfBoardGames(boardGames.length);
  }, [setNumberOfBoardGames]);

  const navigateToSpecificBoardGamePage = (boardGame) => {
    navigate(`/boardgames/${boardGame.name}`);
  };

  const getHeaderText = () => {
    if ((!searchTerm && filters.categories.length === 0) && location.pathname === '/boardgames') {
      return 'Προτεινόμενα:';
    }
    return `Αποτελέσματα (${boardGames.length}):`;
  };

  return (
    <div className="container-fluid">
      <h5 className="mb-3" style={{ color: "var(--color-gray-purple)" }}>
        {getHeaderText()}
      </h5>
      <Row className="gx-3 gy-3 flex-wrap">
        {currentItems.map((boardGame, index) => (
          <BoardGameCard key={index} boardGame={boardGame} handleCardClick={() => navigateToSpecificBoardGamePage(boardGame)}/>))}
      </Row>
      
      {/* Pagination Controls */}
      <Pagination className="justify-content-center mt-3">
        <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />

        {currentPage > 2 && (
          <>
            <Pagination.Item onClick={() => handlePageChange(1)}>1</Pagination.Item>
            {currentPage > 3 && <Pagination.Ellipsis />}
          </>
        )}

        {currentPage > 1 && (
          <Pagination.Item onClick={() => handlePageChange(currentPage - 1)}>{currentPage - 1}</Pagination.Item>
        )}

        <Pagination.Item active>{currentPage}</Pagination.Item>

        {currentPage < totalPages && (
          <Pagination.Item onClick={() => handlePageChange(currentPage + 1)}>{currentPage + 1}</Pagination.Item>
        )}

        {currentPage < totalPages - 1 && (
          <>
            {currentPage < totalPages - 2 && <Pagination.Ellipsis />}
            <Pagination.Item onClick={() => handlePageChange(totalPages)}>{totalPages}</Pagination.Item>
          </>
        )}

        <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
      </Pagination>
    </div>
  );
};

export default BoardGameCards;
