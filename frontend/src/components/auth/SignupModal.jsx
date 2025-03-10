import React from 'react';
import { Modal, Button, Card } from 'react-bootstrap';
import { X } from 'react-bootstrap-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const SignupModal = ({ showModal, setShowModal, setShowLoginModal }) => {
  const handleBackClick = () => {
    setShowModal(false);
    setShowLoginModal(true);
  };

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Card className="border-5 rounded-3 p-4" style={{ backgroundColor: 'var(--color-soft-yellow)', border: '5px solid var(--color-orange)' }}>
        {/* Back Arrow Button */}
        <Button 
          variant="link"
          className="position-absolute top-0 start-0 m-2 p-0 text-secondary"
          onClick={handleBackClick}
        >
          <FontAwesomeIcon icon={faArrowLeft} size="lg" />
        </Button>

        {/* Close Button */}
        <Button 
          variant="link" 
          className="position-absolute top-0 end-0 m-2 p-0 text-secondary"
          onClick={() => setShowModal(false)}
        >
          <X size={30} />
        </Button>

        {/* Title and Content */}
        <h5 className="text-center mt-3" style={{ color: 'var(--color-gray-purple)' }}>
          Τι λογαριασμό θέλετε<br />να δημιουργήσετε;
        </h5>
        <div className="d-flex justify-content-center gap-3 mt-4">
          <Button
            style={{ backgroundColor: 'var(--color-orange)', border: 'none' }}
            onClick={() => console.log('Navigate to /signup/personal')}
          >
            Προσωπικός
          </Button>
          <Button
            style={{ backgroundColor: 'var(--color-orange)', border: 'none' }}
            onClick={() => console.log('Navigate to /signup/business')}
          >
            Επαγγελματικός
          </Button>
        </div>
      </Card>
    </Modal>
  );
};

export default SignupModal;
