import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import BoardGamesContent from '../components/common/BoardGamesContent';

const BoardGamesPage = () => {

  return (
    <Container className='d-flex flex-column justify-content-center align-items-center mt-5'>
      <Row className='mb-3'>
        <Col>
          <h2 className='text-center fw-bold' style={{ color: 'var(--color-orange)'}}>
            Επιτραπέζια Παιχνίδια
          </h2>
        </Col>
      </Row>
      
      <BoardGamesContent />
      
    </Container>
  );
};

export default BoardGamesPage;