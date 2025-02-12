import React from "react";
import { Card, Col } from "react-bootstrap";
import BoardGameDetails from "./BoardGameDetails";

const BoardGameCard = ({ boardGame, handleCardClick }) => {
  return (
    <Col xs={6} md={4} xl={3} className="mb-3">
      <Card
        className="border-2 rounded-3 mx-auto flip-card"
        style={{ borderColor: "var(--color-orange)", cursor: "pointer", maxWidth: '180px', perspective: '1000px' }}
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
  );
};

export default BoardGameCard;
