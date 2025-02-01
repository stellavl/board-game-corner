import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import SearchBar from '../components/common/SearchBar';
import BoardGameCards from '../components/common/BoardGameCards';
import BoardGameFilters from '../components/common/BoardGameFilters';
import Offcanvas from 'react-bootstrap/Offcanvas';
import OrangeButton from '../components/common/OrangeButton';

const BoardGamesPage = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleClose = () => setShowFilters(false);
  const handleShow = () => setShowFilters(true);
  const handleSearch = (term) => setSearchTerm(term);

  return (
    <Container className='d-flex flex-column justify-content-center align-items-center mt-5'>
      {/* Page Title */}
      <Row className='mb-4'>
        <Col>
          <h1 className='text-center' style={{ color: 'var(--color-orange)'}}>Επιτραπέζια Παιχνίδια</h1>
        </Col>
      </Row>

    {/* SearchBar */}
      <Row className='mb-4'>
        <Col md={12} xs={12}>
          <SearchBar placeholder="Αναζήτησε επιτραπέζια" onSearch={handleSearch} />                
        </Col>    
      </Row>

    {/* Filter Button for small screens */}
      <Row className="mb-3 d-lg-none">
        <Col className="text-center">
          <OrangeButton text="Επιλογή Φίλτρων" size="btn-md" onClick={handleShow}/>
        </Col>
      </Row>

    <Row className="w-100">
      {/* Board Game Filters */}
      <Col lg={3} className="d-none d-lg-block">
        <BoardGameFilters />
      </Col>
     {/* Board Game Cards */}
      <Col lg={9} xs={12} className="mt-4 mt-lg-0">
        <BoardGameCards header={searchTerm ? 'Αποτελέσματα Αναζήτησης:' : 'Προτεινόμενα:'} searchTerm={searchTerm} />
      </Col>
      </Row>

    {/* Offcanvas for Filters */}
      <Offcanvas show={showFilters} onHide={handleClose} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Φίλτρα</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <BoardGameFilters />
        </Offcanvas.Body>
      </Offcanvas>
    </Container>
  );
};

export default BoardGamesPage;
