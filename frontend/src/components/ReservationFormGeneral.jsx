import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import OrangeButton from './OrangeButton'; 

const ReservationForm = () => {
  return (
    <Container className="p-3">
      <h6 className="mb-3" style={{ color: 'var(--color-gray-purple)' }}>Κάνε τώρα την κράτησή σου:</h6>
      <Container className="p-4 rounded" style={{ backgroundColor: 'var(--color-soft-orange)', border: '2px solid var(--color-orange)' }}>
        <Row className="g-2">
          <Col md={2}>
            <Form.Select>
              <option>Παιχνιδοκαφέ</option>
            </Form.Select>
          </Col>
          <Col md={2}>
              <Form.Select type="text">
                <option>Επιτραπέζιο</option>
              </Form.Select>
          </Col>
          <Col md={2}>
            <Form.Control type="number" placeholder="Πλήθος παικτών" />
          </Col>
          <Col md={2}>
            <Form.Control type="date"/>
          </Col>
          <Col md={2}>
            <Form.Select>
              <option>Ώρα</option>
            </Form.Select>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col className="text-center">
            <OrangeButton text="ΣΥΝΕΧΕΙΑ"/>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default ReservationForm;
