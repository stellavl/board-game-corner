import { Modal, Card, Button } from 'react-bootstrap';

const ConfirmationModal = ({ show, handleClose, handleConfirm, message, addedGames = [] }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Card className="border-5 rounded-3 p-4" style={{ backgroundColor: 'var(--color-soft-yellow)', border: '5px solid var(--color-orange)' }}>
        <h5 className="text-center mt-3" style={{ color: 'var(--color-gray-purple)' }}>
          {message}
        </h5>
        {addedGames.length > 0 && (
          <ul style={{ maxHeight: 200, overflowY: 'auto', fontSize: '0.95rem', color: 'var(--color-gray-purple)' }}>
            {addedGames.map((game) => (
              <li key={game.bgg_id}>{game.name}</li>
            ))}
          </ul>
        )}
        <div className="d-flex justify-content-center gap-3">
          <Button className="btn btn-danger" onClick={handleClose}>
            Ακύρωση
          </Button>
          <Button className="btn btn-success" onClick={handleConfirm}>
            Ολοκλήρωση
          </Button>
        </div>
      </Card>
    </Modal>
  );
};

export default ConfirmationModal;