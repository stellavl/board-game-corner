import React from "react";
import { Card, Row, Col, Pagination } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import usePagination from "../../hooks/usePagination"; 
import BoardGameDetails from "./BoardGameDetails";
import boardGames from "../../data/boardGames";

const BoardGameCards = ({ header, itemsPerPage = 8 }) => {
  const navigate = useNavigate();

  const { currentPage, currentItems, totalPages, handlePageChange } = usePagination(
    boardGames, itemsPerPage
  );

  const handleCardClick = (boardGame) => {
    const formattedName = encodeURIComponent(boardGame.name.replace(/\s+/g, "-").toLowerCase());
    navigate(`/boardgames/${formattedName}`, { state: { boardGame } });
  };

  return (
    <div className="container-fluid">
      <h5 className="mb-3 ms-4 text-decoration-underline" style={{ color: "var(--color-gray-purple)" }}>
        {header}
      </h5>
      
      <Row className="gx-3 gy-3 flex-wrap">
        {currentItems.map((boardGame, index) => (
          <Col key={index} xs={6} md={4} xl={3} className="mb-3">
            <Card
              className="border-2 rounded-3 mx-auto"
              style={{ borderColor: "var(--color-orange)", cursor: "pointer", maxWidth: '180px' }}
              onClick={() => handleCardClick(boardGame)}
            >
              <Card.Img
                variant="top"
                src={boardGame.image}
                alt={boardGame.name}
                className="card-img-top img-fluid mt-2"
                style={{ height: '120px', objectFit: 'contain' }}
              />
              <Card.Body style={{ color: 'var(--color-gray-purple)' }}>
                <Card.Title><strong>{boardGame.name}</strong></Card.Title>
                <BoardGameDetails boardGame={boardGame} />
              </Card.Body>
            </Card>
          </Col>
        ))}
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
          <Pagination.Item onClick={() => handlePageChange(currentPage - 1)}>
            {currentPage - 1}
          </Pagination.Item>
        )}

        <Pagination.Item active>{currentPage}</Pagination.Item>

        {currentPage < totalPages && (
          <Pagination.Item onClick={() => handlePageChange(currentPage + 1)}>
            {currentPage + 1}
          </Pagination.Item>
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
