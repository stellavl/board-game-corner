import { React, useState } from 'react';
import { Modal, Button, Form, Alert, Spinner, Nav } from 'react-bootstrap';
import useLoginForm from '../hooks/useLoginForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const LoginModal = ({ showModal, setShowModal }) => {
  const { formData, handleChange, isSubmitting, error, handleSubmit } = useLoginForm();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)} centered>
      <Modal.Header closeButton style={{ backgroundColor: 'var(--color-soft-yellow)' }}>
        <Modal.Title>Σύνδεση</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: 'var(--color-soft-yellow)' }}>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email</Form.Label>
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
            <Form.Label>Κωδικός πρόσβασης</Form.Label>
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
              className="p-1 text-secondary text-decoration-none float-end"
            >
              Ξέχασα τον κωδικό μου
            </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: 'var(--color-soft-yellow)', justifyContent: 'center' }}>
        <Button
          onClick={() => handleSubmit(() => setShowModal(false))}
          disabled={isSubmitting}
          style={{ backgroundColor: 'var(--color-orange)', border: 'var(--color-orange)' }}
        >
          {isSubmitting ? <Spinner as="span" animation="border" size="sm" /> : 'Σύνδεση'}
        </Button>
        <div className="d-flex justify-content-center mt-2">
          <span>Δεν έχετε λογαριασμό; </span>
          <Nav.Link to="/signup" className="btn btn-link p-0" style={{ color: 'var(--color-orange)' }}>
            Εγγραφή
          </Nav.Link>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default LoginModal;