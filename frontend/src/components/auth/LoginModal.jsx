import { React, useState } from 'react';
import { Modal, Button, Form, Alert, Spinner, Row, Col } from 'react-bootstrap';
import useLoginForm from '../../hooks/useLoginForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import users from '../../data/users';

const LoginModal = ({ showLoginModal, setShowLoginModal, setIsLoggedIn, setShowSignUpModal, setUserId }) => {
  const { formData, handleChange, isSubmitting, error, handleSubmit } = useLoginForm();

  const [showPassword, setShowPassword] = useState(false);

  const handleLoginSubmit = () => {
    const user = users.find(
      (user) => user.email === formData.email && user.password === formData.password
    );

    if (user) {
      handleSubmit(() => {
        setIsLoggedIn(true);
        setUserId(user.id); 
        setShowLoginModal(false);
      });
    } else {
      handleSubmit(() => {
        throw new Error('Λάθος στοιχεία');
      });
    }
  };

  const handleSignUpClick = () => {
    setShowLoginModal(false);
    setShowSignUpModal(true);
  };

  return (
    <Modal show={showLoginModal} onHide={() => setShowLoginModal(false)} centered>
      <Modal.Header closeButton style={{ backgroundColor: 'var(--color-soft-yellow)',  color: 'var(--color-gray-purple)' }}>
        <Modal.Title>Σύνδεση</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: 'var(--color-soft-yellow)' }}>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label style={{ color: 'var(--color-gray-purple)' }}>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Εισάγετε το email σας"
              value={formData.email}
              onChange={handleChange}
              disabled={isSubmitting}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label style={{ color: 'var(--color-gray-purple)' }}>Κωδικός πρόσβασης</Form.Label>
            <div style={{ position: 'relative' }}>
              <Form.Control
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Εισάγετε τον κωδικό σας"
                value={formData.password}
                onChange={handleChange}
                disabled={isSubmitting}
                style={{ paddingRight: '40px' }}
              />
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  cursor: 'pointer',
                  color: '#555'
                }}
              />
            </div>
          </Form.Group>
          <Button
              variant="link"
              className="pt-1 text-secondary text-decoration-none float-end"
            >
              Ξέχασα τον κωδικό μου
            </Button>
        </Form>
        <Row className="mt-5 align-items-center">
        <Col className="d-flex justify-content-center">
          <Button
            onClick={handleLoginSubmit}
            disabled={isSubmitting}
            style={{ backgroundColor: 'var(--color-orange)', border: 'var(--color-orange)' }}
          >
            {isSubmitting ? <Spinner as="span" animation="border" size="sm" /> : 'Σύνδεση'}
          </Button>
          </Col>
        </Row>
        <Row className="mb-2">
          <Col>
          <div className="d-flex justify-content-center mt-2" style={{ color: 'var(--color-gray-purple)' }}>
            <span>Δεν έχετε λογαριασμό;&nbsp;</span>
            <Button variant="link" className="p-0" style={{ color: 'var(--color-orange)' }} onClick={handleSignUpClick}>
              Εγγραφή
            </Button>
          </div>
          </Col>
        </Row>
      </Modal.Body>    
    </Modal>
  );
};

export default LoginModal;