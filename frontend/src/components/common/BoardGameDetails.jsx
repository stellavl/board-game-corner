import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGamepad, faClock, faUsers, faChild } from '@fortawesome/free-solid-svg-icons';
import { Card } from 'react-bootstrap';

const BoardGameDetails = ({ boardGame }) => (
  <Card.Text className="text-nowrap">
    <FontAwesomeIcon icon={faGamepad} className="ms-1 me-2" />
    {boardGame.type} <br />
    <FontAwesomeIcon icon={faClock} className="ms-1 me-3" />
    {boardGame.duration} <br />
    <FontAwesomeIcon icon={faUsers} className="ms-1 me-2" />
    {boardGame.players} <br />
    <FontAwesomeIcon icon={faChild} className="ms-2 me-3" />
    {boardGame.age}
  </Card.Text>
);

export default BoardGameDetails;
