import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Form } from "react-bootstrap";
import OrangeButton from './OrangeButton'; 

const ReservationForm = () => {
  return (
    <Container className="p-3 text-center">
      <h6 className="mb-3" style={{ color: 'var(--color-gray-purple)' }}>
        Κάνε τώρα την κράτησή σου:
      </h6>
      <Container 
        className="py-4 rounded align-items-center" 
        style={{ 
          backgroundColor: 'var(--color-soft-orange)', 
          border: '2px solid var(--color-orange)',
          maxWidth: '900px', // Optimized width so that all form fields are in one line
        }}
      >
        <div className="d-flex flex-wrap gap-3 justify-content-center w-100">
          <Form.Select className="form-control w-auto">
            <option>Παιχνιδοκαφέ</option>
          </Form.Select>
          <Form.Select className="form-control w-auto">
            <option>Επιτραπέζιο</option>
          </Form.Select>
          <Form.Control type="number" placeholder="Πλήθος παικτών" className="form-control w-auto" />
          <Form.Control type="date" className="form-control w-auto" />
          <Form.Select className="form-control w-auto">
            <option>Ώρα</option>
          </Form.Select>
        </div>
        <div className="mt-4">
          <OrangeButton text="ΣΥΝΕΧΕΙΑ"/>
        </div>
      </Container>
    </Container>
  );
};

export default ReservationForm;
