import React from 'react';
import { Form, Card } from 'react-bootstrap';
import OrangeButton from './OrangeButton';

const BoardGameFilters = () => {
        return (
            <Card 
            className="p-3 rounded border-2" 
            style={{ borderColor: "#E95C2F" }}
        >
            <Card.Body>
                <h5 className="mb-3">Φίλτρα</h5>
                <Form>
                    {/* Κατηγορία (Category) */}
                    <Form.Group className="mb-3">
                        <Form.Label>Κατηγορία</Form.Label>
                        <Form.Control as="select">
                            <option>Όλες</option>
                            <option>Περιπέτειες</option>
                            <option>Στρατηγικής</option>
                            <option>Οικογενειακά</option>
                        </Form.Control>
                    </Form.Group>

                    {/* Διάρκεια (Duration) */}
                    <Form.Group className="mb-3">
                        <Form.Label>Διάρκεια</Form.Label>
                        <Form.Control as="select">
                            <option>Όλες</option>
                            <option>10-30 λεπτά</option>
                            <option>30-60 λεπτά</option>
                            <option>60+ λεπτά</option>
                        </Form.Control>
                    </Form.Group>

                    {/* Παίκτες (Players) */}
                    <Form.Group className="mb-3">
                        <Form.Label>Παίκτες</Form.Label>
                        <Form.Control as="select">
                            <option>Όλοι</option>
                            <option>1-2</option>
                            <option>2-4</option>
                            <option>4+</option>
                        </Form.Control>
                    </Form.Group>

                    {/* Ηλικία (Age) */}
                    <Form.Group className="mb-3">
                        <Form.Label>Ηλικία</Form.Label>
                        <Form.Control as="select">
                            <option>Όλες</option>
                            <option>3+</option>
                            <option>6+</option>
                            <option>12+</option>
                        </Form.Control>
                    </Form.Group>

                    <div className="d-flex justify-content-center">
                        <OrangeButton text="Εφαρμογή" size="btn-md" />
                    </div>
                
                </Form>
            </Card.Body>
        </Card>
    );
};

export default BoardGameFilters;
