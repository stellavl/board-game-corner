import { useState, useEffect } from 'react';
import { Row, Col, Offcanvas } from 'react-bootstrap';
import BoardGameCards from './BoardGameCards';
import BoardGameFilters from './BoardGameFilters';
import OrangeButton from './OrangeButton';
import { useLocation, useNavigate } from 'react-router-dom';
import BoardGameSelectBar from './BoardGameSelectBar';
import { Spinner } from 'react-bootstrap'; 
import axiosInstance from '../../config/axiosConfig';
import { toast } from 'react-toastify';
import { searchBoardGames } from '../utils/searchBoardGames';

const BoardGamesContent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); 
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    categories: [],
    minPlayers: 'Όλοι',
    maxPlayers: 'Όλοι',
    duration: 'Όλες',
    age: 'Όλες',
  });
  const [filteredBoardGames, setFilteredBoardGames] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const pageSize = 8;

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);  
    const queryParams = new URLSearchParams();
    for (const key in newFilters) {
      queryParams.set(key, newFilters[key]);
    }
    navigate(`?${queryParams.toString()}`);
  };

  const fetchBoardGames = async (searchText = '', page = 1, size = 8) => {
    setLoading(true);
    try {
      const { boardGames, totalElements } = await searchBoardGames(searchText, page, size);
      setFilteredBoardGames(boardGames);
      setTotalElements(totalElements);
    } catch (error) {
      toast.error(error.response?.data?.error || "Προέκυψε σφάλμα", { position: 'top-center' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (location.state?.searchText) {
      setLoading(true);
      setSearchText(location.state.searchText);
      navigate(location.pathname, { replace: true, state: {} }); // clear state
    }
  }, [location.state, location.pathname, navigate]);

  useEffect(() => {
    if (searchText) {
      fetchBoardGames(searchText, currentPage, pageSize);
    }
  }, [searchText, currentPage, pageSize]);

  const fetchHotBoardGames = async (page = 1, size = 8) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `api/hot-games?currentPage=${page}&pageSize=${size}`
      );
      setFilteredBoardGames(response.data.boardGames);
      setTotalElements(response.data.totalElements);
    } catch (error) {
      toast.error(error, { position: 'top-center' });
      setFilteredBoardGames([]);
      setTotalElements(0);
    } finally {
      setLoading(false); 
    }
  };

  const handleClearSearch = () => {
    setSearchText('');
    setCurrentPage(1); 
    fetchHotBoardGames(currentPage, pageSize);
  };  

  useEffect(() => {
    // Only fetch hot games if there's no searchText and no incoming searchText from navigation
    if (!searchText && !location.state?.searchText) {
      fetchHotBoardGames(currentPage, pageSize);
    }
  }, [searchText, currentPage, pageSize, location.state]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const updatedFilters = { ...filters };
    queryParams.forEach((value, key) => {
      updatedFilters[key] = value;
    });
    setFilters(updatedFilters);
  }, [location.search]);

  //  useEffect(() => {
    // let filteredGames = boardGames;

    // if (currentSearchTerm) {
    //   filteredGames = filteredGames.filter(game =>
    //     game.name.toLowerCase().includes(currentSearchTerm.toLowerCase())
    //   );
    // }

  //   if (filters.categories.length > 0) {
  //     filteredGames = filteredGames.filter(game =>
  //       filters.categories.includes(game.category)
  //     );
  //   }

  //   if (filters.minPlayers !== 'Όλοι') {
  //     filteredGames = filteredGames.filter(game =>
  //       game.minPlayers >= parseInt(filters.minPlayers)
  //     );
  //   }

  //   if (filters.maxPlayers !== 'Όλοι') {
  //     filteredGames = filteredGames.filter(game =>
  //       game.maxPlayers <= parseInt(filters.maxPlayers)
  //     );
  //   }

  //   if (filters.duration !== 'Όλες') {
  //     filteredGames = filteredGames.filter(game =>
  //       game.duration === filters.duration
  //     );
  //   }

  //   if (filters.age !== 'Όλες') {
  //     filteredGames = filteredGames.filter(game =>
  //       game.age === filters.age
  //     );
  //   }

  //   setFilteredBoardGames(filteredGames);
  // }, [currentSearchTerm, filters]);

  const handleClose = () => setShowFilters(false);
  const handleShow = () => setShowFilters(true);

  const getHeaderText = () => {
    if ((!searchText && filters.categories.length === 0)) {
      return 'Δημοφιλή επιτραπέζια:';
    }
    return `Αποτελέσματα (${totalElements}):`; 
  };
  
  return (
    <>
      <Row className='mb-5'>
        <Col md={12} xs={12}>
          <BoardGameSelectBar   
            searchText={searchText}
            setSearchText={setSearchText}
            onClearSearch={handleClearSearch}
          />
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
          {loading ? (
            <div className="text-center">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : (
            <BoardGameCards 
              headerText={getHeaderText()} 
              boardGames={filteredBoardGames} 
              totalElements={totalElements}
              currentPage={currentPage}
              handlePageChange={setCurrentPage}
              itemsPerPage={pageSize}
            />
          )}
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
    </>
  );
};

export default BoardGamesContent;