import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import SearchBar from '../components/common/SearchBar';
import BoardGameCards from '../components/common/BoardGameCards';
import BoardGameFilters from '../components/common/BoardGameFilters';
import Offcanvas from 'react-bootstrap/Offcanvas';
import OrangeButton from '../components/common/OrangeButton';
import { useLocation, useNavigate } from 'react-router-dom';

const BoardGamesPage = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    categories: [],
    minPlayers: 'Όλοι',
    maxPlayers: 'Όλοι',
    duration: 'Όλες',
    age: 'Όλες',
  });

  const location = useLocation();
  const navigate = useNavigate();

  const handleClose = () => setShowFilters(false);
  const handleShow = () => setShowFilters(true);
  const handleSearch = (term) => setSearchTerm(term);

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);

    const queryParams = new URLSearchParams();
    for (const key in newFilters) {
      queryParams.set(key, newFilters[key]);
    }
    navigate(`?${queryParams.toString()}`);
  };

  useEffect(() => {
      const queryParams = new URLSearchParams(location.search);
      const updatedFilters = { ...filters };
      queryParams.forEach((value, key) => {
        updatedFilters[key] = value;
      });
      setFilters(updatedFilters);
    }, [location.search]);

  const getHeaderText = () => {
    if (searchTerm || filters.categories.length > 0) {
      return 'Αποτελέσματα Αναζήτησης:';
    }
    return 'Προτεινόμενα:';
  };

  return (
    <Container className='d-flex flex-column justify-content-center align-items-center mt-5'>
      <Row className='mb-3'>
        <Col>
          <h2 className='text-center' style={{ color: 'var(--color-orange)', fontWeight: 'bold' }}>
            Επιτραπέζια Παιχνίδια
          </h2>
        </Col>
      </Row>

      <Row className='mb-4'>
        <Col md={12} xs={12}>
          <SearchBar placeholder="Αναζήτησε επιτραπέζια" onSearch={handleSearch} />                 
        </Col>    
      </Row>

      <Row className="mb-3 d-lg-none">
        <Col className="text-center">
          <OrangeButton text="Επιλογή Φίλτρων" size="btn-md" onClick={handleShow}/>
        </Col>
      </Row>

      <Row className="w-100">
        <Col lg={3} className="d-none d-lg-block">
          <BoardGameFilters onApplyFilters={handleApplyFilters} />
        </Col>

        <Col lg={9} xs={12} className="mt-4 mt-lg-0">
          <BoardGameCards header={getHeaderText()} searchTerm={searchTerm} />
        </Col>
      </Row>

      <Offcanvas show={showFilters} onHide={handleClose} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Φίλτρα</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <BoardGameFilters onApplyFilters={handleApplyFilters} />
        </Offcanvas.Body>
      </Offcanvas>
    </Container>
  );
};

export default BoardGamesPage;