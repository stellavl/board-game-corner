import { Card, Col, Button } from "react-bootstrap";
import BoardGameDetails from "./BoardGameDetails";

const BoardGameCard = ({ boardGame, handleCardClick, isAdded=false, onActionClick, showActionButton=false }) => {

  const cardStyle = {
    borderColor: "var(--color-orange)",
    cursor: "pointer",
    maxWidth: '180px',
    perspective: '1000px',
    transition: 'transform 0.3s ease-in-out',
    backgroundColor: isAdded ? 'var(--bs-success-bg-subtle, #d1e7dd)' : 'white'
  };

  const cardHoverStyle = {
    transform: 'scale(1.05)',
  };

  const titleStyle = {
    fontSize: '1.2rem',  
    whiteSpace: 'nowrap', 
    overflow: 'hidden',  
    textOverflow: 'ellipsis',
  };

    return (
      <Col xs={6} md={4} xl={3} className="mb-3">
        <Card
          className="border-2 rounded-3 mx-auto flip-card"
          style={cardStyle}
          onClick={() => handleCardClick(boardGame)}
          onMouseEnter={e => e.currentTarget.style.transform = cardHoverStyle.transform}
          onMouseLeave={e => e.currentTarget.style.transform = 'none'}
        >
          <Card.Img
            variant="top"
            src={boardGame.image}
            alt={boardGame.name}
            className="card-img-top img-fluid mt-2"
            style={{ height: '120px', objectFit: 'contain' }}
          />
          <Card.Body style={{ color: 'var(--color-gray-purple)', flex: 1 }}>
            <Card.Title style={titleStyle}>
              <strong>{boardGame.name}</strong>
            </Card.Title>
            <BoardGameDetails boardGame={boardGame} />
            {showActionButton && (
              <div className="d-grid mt-3">
                {isAdded ? (
                  <Button
                    variant="danger"
                    onClick={e => { e.stopPropagation(); onActionClick(boardGame); }}
                  >
                    Αφαίρεση
                  </Button>
                ) : (
                  <Button
                    variant="success"
                    onClick={e => { e.stopPropagation(); onActionClick(boardGame); }}
                  >
                    Προσθήκη
                  </Button>
                )}
              </div>
            )}
          </Card.Body>
        </Card>
      </Col>
    );
  };

export default BoardGameCard;