import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import BoardGameDetails from './BoardGameDetails';
import boardGames from '../../data/boardGamesData';

const BoardGameCards = ({ header }) => {
  const navigate = useNavigate();

  const handleCardClick = (boardGame) => {
    const formattedName = encodeURIComponent(boardGame.name.replace(/\s+/g, "-").toLowerCase());
    navigate(`/boardgames/${formattedName}`, { state: { boardGame } }); // Pass full boardGame object in state
  };

  return (
    <div className="container-fluid">
      <h5 className="mb-3 ms-4 text-decoration-underline" style={{ color: "var(--color-gray-purple)" }}>
        {header}
      </h5>
      <div className="overflow-auto" style={{ maxHeight: "500px" }}>
      <Row className="gx-3 gy-3 flex-wrap">
      {boardGames.map((boardGame, index) => (
        <Col key={index} xs={6} md={4} xl={3} className="mb-3">
          <Card
            className="border-2 rounded-3 mx-auto"
            style={{ borderColor: "#E95C2F", cursor: "pointer" }}
            onClick={() => handleCardClick(boardGame)} // Pass entire boardGame object
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
      </div>
    </div>
  );
};

export default BoardGameCards;