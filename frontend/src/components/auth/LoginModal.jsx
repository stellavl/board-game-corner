import { React, useState } from 'react';
import { Modal, Button, Form, Alert, Spinner, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import OrangeButton from '../common/OrangeButton';
import { loginPersonal, loginAdmin } from '../utils/handleLogin';
import { useNavigate } from 'react-router-dom';

const LoginModal = ({ showLoginModal, setShowLoginModal, setIsLoggedIn, setShowSignUpModal, setUserId }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [backendError, setBackendError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setValidationErrors({ ...validationErrors, [e.target.name]: '' });
  };

  const validateLoginForm = () => {
    const fieldErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email) {
      fieldErrors.email = 'Το email είναι υποχρεωτικό.';
    } else if (!emailRegex.test(formData.email)) {
      fieldErrors.email = 'Χρησιμοποιήστε μία έγκυρη διεύθυνση email.';
    }

    if (!formData.password) {
      fieldErrors.password = 'Ο κωδικός είναι υποχρεωτικός.';
    }

    return fieldErrors;
  };

  const handleLoginSubmit = async () => {
    const validationErrors = validateLoginForm();
    if (Object.keys(validationErrors).length > 0) {
      setValidationErrors(validationErrors);
      return;
    }
  
    setIsSubmitting(true);
    setValidationErrors({});
    setBackendError(null);
  
    let result;
    if (activeTab === 'personal') {
      result = await loginPersonal(formData);
    } else if (activeTab === 'professional') {
      result = await loginAdmin(formData);
    }
  
    if (activeTab === 'personal') {
      if (result.success) {
        setIsLoggedIn(true);
        setUserId(result.userId);
        setShowLoginModal(false);
      } else {
        setBackendError(result.error);
      }
    }
    else if (activeTab === 'professional') {
      if (result.success) {
        setShowLoginModal(false);
        navigate(`/admin/${result.adminId}`);
      } else {
        setBackendError(result.error);
      }
    }
    setIsSubmitting(false);
  };

  const handleSignUpClick = () => {
    setShowLoginModal(false);
    setShowSignUpModal(true);
  };

  return (
    <>
      <Modal show={showLoginModal} onHide={() => setShowLoginModal(false)} centered>
        <Modal.Header closeButton style={{ backgroundColor: 'var(--color-soft-yellow)', color: 'var(--color-gray-purple)' }}>
          <Modal.Title>Σύνδεση</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: 'var(--color-soft-yellow)' }}>
          
          <div className="d-flex justify-content-center mb-4">
            <div 
              onClick={() => setActiveTab('personal')}
              style={{
                color: 'var(--color-orange)',
                cursor: 'pointer',
                textDecoration: activeTab === 'personal' ? 'underline' : 'none',
                marginRight: '10px'
              }}
            >
              Προσωπικό Προφίλ
            </div>
            <div style={{ color: 'var(--color-orange)', margin: '0 10px' }}>|</div>
            <div 
              onClick={() => setActiveTab('professional')}
              style={{
                color: 'var(--color-orange)',
                cursor: 'pointer',
                textDecoration: activeTab === 'professional' ? 'underline' : 'none',
                marginLeft: '10px'
              }}
            >
              Επαγγελματικό Προφίλ
            </div>
          </div>

            {backendError && <Alert variant="danger" onClose={() => setBackendError(null)} dismissible>{backendError}</Alert>}
            {validationErrors.form && <Alert variant="danger">{validationErrors.form}</Alert>}
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label style={{ color: 'var(--color-gray-purple)' }}>
                {activeTab === 'personal' ? 'Προσωπικό Email' : 'Επαγγελματικό Email'}
              </Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder={`Εισάγετε το ${activeTab === 'personal' ? 'προσωπικό' : 'επαγγελματικό'} email σας`}
                value={formData.email}
                onChange={handleChange}
                disabled={isSubmitting}
                isInvalid={!!validationErrors.email}
                style={{ backgroundColor: "transparent", borderColor: 'var(--color-orange)' }}
              />
              <Form.Control.Feedback type="invalid">
                {validationErrors.email}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="position-relative">
              <Form.Label style={{ color: 'var(--color-gray-purple)' }}>
                {activeTab === 'personal' ? 'Προσωπικός Κωδικός' : 'Επαγγελματικός Κωδικός'}
              </Form.Label>
              <div style={{ position: 'relative' }}>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder={`Εισάγετε τον ${activeTab === 'personal' ? 'προσωπικό' : 'επαγγελματικό'} κωδικό σας`}
                  value={formData.password}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  isInvalid={!!validationErrors.password}
                  style={{ backgroundColor: "transparent", borderColor: "var(--color-orange)", paddingRight: '3.5rem' }}
                />
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '2rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    cursor: 'pointer',
                    color: '#555',
                  }}
                />
                <Form.Control.Feedback
                  type="invalid"
                  className="position-absolute"
                  style={{ bottom: '-1.5rem' }}
                >
                  {validationErrors.password}
                </Form.Control.Feedback>
              </div>
            </Form.Group>
            <Button
              variant="link"
              className="pt-1 text-secondary text-decoration-none float-end"
            >
              Ξέχασα τον κωδικό μου
            </Button>
            <Row className="mt-5 align-items-center">
              <Col className="d-flex justify-content-center">
                <OrangeButton
                  text={isSubmitting ? <Spinner as="span" animation="border" size="sm" /> : 'Σύνδεση'}
                  size="btn-md"
                  onClick={handleLoginSubmit}
                  disabled={isSubmitting}
                >
                </OrangeButton>
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
    </>
  );
};

export default LoginModal;