import React from 'react';
import { Modal, Button, Card } from 'react-bootstrap';
import OrangeButton from './OrangeButton';

const ConfirmationModal = ({ show, handleClose, handleConfirm, message }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Card className="border-5 rounded-3 p-4" style={{ backgroundColor: 'var(--color-soft-yellow)', border: '5px solid var(--color-orange)' }}>
        <h5 className="text-center mt-3" style={{ color: 'var(--color-gray-purple)' }}>
          Επιβεβαίωση
        </h5>
        <p className="text-center mt-3">{message}</p>
        <div className="d-flex justify-content-center gap-3 mt-4">
          <OrangeButton text="Ακύρωση" onClick={handleClose} />
          <OrangeButton text="Επιβεβαίωση" onClick={handleConfirm} />
        </div>
      </Card>
    </Modal>
  );
};

export default ConfirmationModal;