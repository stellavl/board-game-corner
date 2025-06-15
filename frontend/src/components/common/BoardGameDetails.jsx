import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGamepad, faClock, faUsers, faChild } from '@fortawesome/free-solid-svg-icons';
import { Card } from 'react-bootstrap';

const BoardGameDetails = ({ boardGame }) => (
  <Card.Text className="text-nowrap">
    <FontAwesomeIcon icon={faGamepad} className="me-2" />
      <span
        style={{
          display: 'inline-block',
          maxWidth: 80,
          verticalAlign: 'bottom',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }}
        title={boardGame.category}
      >
      {boardGame.category}
    </span>
    <br />
    <FontAwesomeIcon icon={faClock} className="me-3" />
     {boardGame.playing_time && boardGame.playing_time > 0 ? `${boardGame.playing_time}'` : "N/A"}
        <br />
    <FontAwesomeIcon icon={faUsers} className="me-2" />
    {
      (boardGame.min_players === 0 && boardGame.max_players === 0)
        ? "N/A"
        : (boardGame.min_players === boardGame.max_players && boardGame.min_players > 0)
          ? `${boardGame.min_players} παίκτες`
          : (boardGame.min_players > 0 && boardGame.max_players === 0)
            ? `${boardGame.min_players}+ παίκτες`
            : `${boardGame.min_players}-${boardGame.max_players} παίκτες`
    }
    <br />
    <FontAwesomeIcon icon={faChild} className="ms-1 me-3" />
    {boardGame.age}+
  </Card.Text>
);

export default BoardGameDetails;