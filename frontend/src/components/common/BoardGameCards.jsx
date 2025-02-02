import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGamepad, faClock, faUsers, faChild } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const boardGames = [
  { name: 'Catan', type: 'Στρατηγικής', duration: '60’', players: '3-4 παίκτες', age: '10+', image: '/boardgamephotos/catan.png' },
  { name: 'Risk', type: 'Στρατηγικής', duration: '120’', players: '2-6 παίκτες', age: '10+', image: '/images/risk.jpg' },
  { name: 'Monopoly', type: 'Οικονομικό', duration: '90’', players: '2-6 παίκτες', age: '8+', image: '/images/monopoly.jpg' },
  { name: 'Carcassonne', type: 'Τακτικής', duration: '45’', players: '2-5 παίκτες', age: '7+', image: '/images/carcassonne.jpg' },
  { name: 'Ticket to Ride', type: 'Στρατηγικής', duration: '45-60’', players: '2-5 παίκτες', age: '8+', image: '/images/ticket_to_ride.jpg' },
  { name: 'Pandemic', type: 'Στρατηγικής', duration: '45’', players: '2-4 παίκτες', age: '8+', image: '/images/pandemic.jpg' },
  { name: 'Clue', type: 'Μυστήριο', duration: '45’', players: '3-6 παίκτες', age: '8+', image: '/images/clue.jpg' },
  { name: 'Splendor', type: 'Οικονομικό', duration: '30’', players: '2-4 παίκτες', age: '10+', image: '/images/splendor.jpg' },
  { name: '7 Wonders', type: 'Στρατηγικής', duration: '30’', players: '3-7 παίκτες', age: '10+', image: '/images/7wonders.jpg' },
];

const BoardGameCards = ({ header }) => {
  const navigate = useNavigate(); // Initialize navigation

  const handleCardClick = (game) => {
    const formattedName = encodeURIComponent(game.name.replace(/\s+/g, "-").toLowerCase());
    navigate(`/boardgames/${formattedName}`, { state: { game } }); // Pass full game object in state
  };

  return (
    <div className="container-fluid">
      <h5 className="mb-3 ms-4 text-decoration-underline" style={{ color: "var(--color-gray-purple)" }}>
        {header}
      </h5>
      <div className="overflow-auto" style={{ maxHeight: "500px" }}>
      <Row className="gx-3 gy-3 flex-wrap">
      {boardGames.map((game, index) => (
        <Col key={index} xs={6} md={4} xl={3} className="mb-3">
          <Card
            className="border-2 rounded-3 mx-auto"
            style={{ borderColor: "#E95C2F", cursor: "pointer" }}
            onClick={() => handleCardClick(game)} // Pass entire game object
          >
            <Card.Img
              variant="top"
              src={game.image}
              alt={game.name}
              className="card-img-top img-fluid mt-2"
              style={{ height: '120px', objectFit: 'contain' }}
            />
            <Card.Body style={{ color: 'var(--color-gray-purple)' }}>
              <Card.Title><strong>{game.name}</strong></Card.Title>
              <Card.Text>
                <FontAwesomeIcon icon={faGamepad} className="ms-1 me-2" />
                {game.type} <br />
                <FontAwesomeIcon icon={faClock} className="ms-1 me-3" />
                {game.duration} <br />
                <FontAwesomeIcon icon={faUsers} className="ms-1 me-2" />
                {game.players} <br />
                <FontAwesomeIcon icon={faChild} className="ms-2 me-3" />
                {game.age}
              </Card.Text>
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