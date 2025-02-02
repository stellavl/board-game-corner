import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Form } from "react-bootstrap";
import OrangeButton from '../common/OrangeButton'; 

const ReservationForm = () => {
  return (
    <Container className="p-3 text-center">
      <h6 className="mb-3" style={{ color: 'var(--color-gray-purple)' }}>
        Κάνε τώρα την κράτησή σου:
      </h6>
      <Container 
        className="py-4 rounded mx-auto" 
        style={{ 
          backgroundColor: 'var(--color-soft-orange)', 
          border: '2px solid var(--color-orange)',
          maxWidth: '900px' // Optimized width for larger screens
        }}
      >
        <Row className="g-3 row-cols-1 row-cols-lg-auto justify-content-center">
          {/* For medium or smaller screens, make them full width */}
          <Col xs={8} sm={8} md={4}>
            <Form.Select className="form-control">
              <option>Παιχνιδοκαφέ</option>
            </Form.Select>
          </Col>
          <Col xs={8} sm={8} md={4}>
            <Form.Select className="form-control">
              <option>Επιτραπέζιο</option>
            </Form.Select>
          </Col>
          <Col xs={8} sm={8} md={4}>
            <Form.Control type="number" placeholder="Πλήθος παικτών" className="form-control" />
          </Col>
          <Col xs={8} sm={8} md={4}>
            <Form.Control type="date" className="form-control" />
          </Col>
          <Col xs={8} sm={8} md={4}>
            <Form.Select className="form-control">
              <option>Ώρα</option>
            </Form.Select>
          </Col>
        </Row>
        <div className="mt-4 text-center">
          <OrangeButton text="ΣΥΝΕΧΕΙΑ"/>
        </div>
      </Container>
    </Container>
  );
};

export default ReservationForm;
