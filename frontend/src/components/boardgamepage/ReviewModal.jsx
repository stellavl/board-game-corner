import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FaStar, FaRegStar } from "react-icons/fa";

const ReviewModal = ({ show, handleClose, handleSubmit, newReview, setNewReview, handleRatingChange }) => {
    return (
      <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
          <Modal.Title style={{ color: "var(--color-gray-purple)" }}>Πρόσθεσε Κριτική</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
              <Form.Label style={{ color: "var(--color-gray-purple)", textDecoration: "underline" }}>Κριτική</Form.Label>
              <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Γράψε την κριτική σου..."
                  value={newReview.text}
                  onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                  required
                  style={{ color: "var(--color-gray-purple)" }}
              />
              </Form.Group>
  
              <Form.Group className="mb-3">
              <Form.Label style={{ color: "var(--color-gray-purple)", textDecoration: "underline" }}>Αξιολόγηση</Form.Label>
              <div className="d-flex">
                  {[...Array(5)].map((_, i) => (
                  i < newReview.rating ? (
                      <FaStar
                      key={i}
                      className="cursor-pointer star-icon"
                      style={{ color: "var(--color-orange)", fontSize: "1.5rem" }} // Adjust the size as needed
                      onClick={() => handleRatingChange(i + 1)}
                      />
                  ) : (
                      <FaRegStar
                      key={i}
                      className="cursor-pointer star-icon"
                      style={{ color: "var(--color-orange)", fontSize: "1.5rem" }} // Adjust the size as needed
                      onClick={() => handleRatingChange(i + 1)}
                      />
                  )
                  ))}
              </div>
              </Form.Group>

            <div className="d-flex justify-content-center">
                <Button variant="primary" type="submit" style={{ backgroundColor: "var(--color-orange)", borderColor: "var(--color-orange)"}}>
                    Υποβολή Κριτικής
                </Button>
            </div>

        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ReviewModal;