import React from 'react';
import { Modal, Button, Card } from 'react-bootstrap';
import { X } from 'react-bootstrap-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import OrangeButton from '../common/OrangeButton';
import { useNavigate } from 'react-router-dom';

const SignupModal = ({ showModal, setShowModal, setShowLoginModal }) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    setShowModal(false);
    setShowLoginModal(true);
  };

  function handlePersonalClick() {
    setShowModal(false);
    navigate("/signup/personal");
  }

  function handleBusinessClick() {
    setShowModal(false);
    navigate("/signup/business/basic-info");
  }

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

        <h5 className="text-center mt-3" style={{ color: 'var(--color-gray-purple)' }}>
          Τι λογαριασμό θέλετε να δημιουργήσετε;
        </h5>
        <div className="d-flex justify-content-center gap-3 mt-4">
           <OrangeButton text="Προσωπικός" onClick={handlePersonalClick} />
           <OrangeButton text=" Επαγγελματικός" onClick={handleBusinessClick} />
        </div>
      </Card>
    </Modal>
  );
};

export default SignupModal;
