import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGamepad, faClock, faUsers, faChild } from '@fortawesome/free-solid-svg-icons';
import { Card } from 'react-bootstrap';

const BoardGameDetails = ({ boardGame }) => (
  <Card.Text className="text-nowrap">
    <FontAwesomeIcon icon={faGamepad} className="me-2" />
    {boardGame.category} <br />
    <FontAwesomeIcon icon={faClock} className="me-3" />
    {boardGame.playing_time}' <br />
    <FontAwesomeIcon icon={faUsers} className="me-2" />
    {boardGame.min_players === boardGame.max_players
      ? boardGame.min_players
      : `${boardGame.min_players}-${boardGame.max_players}`} παίκτες<br />
    <FontAwesomeIcon icon={faChild} className="ms-1 me-3" />
    {boardGame.age}+
  </Card.Text>
);

export default BoardGameDetails;