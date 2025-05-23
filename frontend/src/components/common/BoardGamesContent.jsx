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

const transformFiltersForBackend = (filters) => {
  // Duration mapping
  let minduration = null, maxduration = null;
  switch (filters.duration) {
    case '<10 λεπτά':
      minduration = 0; maxduration = 10; break;
    case '10-30 λεπτά':
      minduration = 10; maxduration = 30; break;
    case '30-60 λεπτά':
      minduration = 30; maxduration = 60; break;
    case '60+ λεπτά':
      minduration = 60; maxduration = null; break;
    default:
      minduration = null; maxduration = null;
  }

  // Age mapping
  let minAge = null;
  if (filters.age && filters.age !== 'Όλες') {
    if (filters.age === '0-3') minAge = 0;
    else minAge = parseInt(filters.age);
  }

  // Players mapping
  const parsePlayers = (val) =>
    val === 'Όλοι' ? null : val === '10+' ? 10 : Number(val);

  return {
    categories: filters.categories || [],
    minPlayers: parsePlayers(filters.minPlayers),
    maxPlayers: parsePlayers(filters.maxPlayers),
    minAge,
    minduration,
    maxduration,
  };
};

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
  const [allFilteredBoardGames, setAllFilteredBoardGames] = useState([]);

  const handleApplyFilters = async (newFilters, _filteredGames, isClear = false) => {
    setFilters(newFilters);
    setCurrentPage(1);

    if (isClear) {
      setSearchText('');
      fetchHotBoardGames(1, pageSize);
      navigate(location.pathname);
      return;
    }

    await fetchFilteredBoardGames(newFilters, 1, pageSize, searchText);

    const queryParams = new URLSearchParams();
    for (const key in newFilters) {
      queryParams.set(key, newFilters[key]);
    }
    navigate(`?${queryParams.toString()}`);
  };

  // Handle pagination change
  const handlePageChange = async (page) => {
    setCurrentPage(page);

    if (searchText) {
      fetchBoardGames(searchText, page, pageSize);
      return;
    }

    if (isFiltersActive()) {
      const startIdx = (page - 1) * pageSize;
      const endIdx = startIdx + pageSize;
      setFilteredBoardGames(allFilteredBoardGames.slice(startIdx, endIdx));
      return;
    }
    fetchHotBoardGames(page, pageSize);
  };

  // Helper to check if filters are active
  const isFiltersActive = () => (
    filters.categories.length > 0 ||
    (filters.minPlayers !== 'Όλοι' && filters.minPlayers !== null && filters.minPlayers !== undefined) ||
    (filters.maxPlayers !== 'Όλοι' && filters.maxPlayers !== null && filters.maxPlayers !== undefined) ||
    (filters.duration !== 'Όλες' && filters.duration !== undefined) ||
    (filters.age !== 'Όλες' && filters.age !== undefined)
  );

  const fetchFilteredBoardGames = async (filtersObj, page = 1, size = pageSize, searchText="") => {
    setLoading(true);
    try {
      const backendFilters = transformFiltersForBackend(filtersObj);
      const response = await axiosInstance.post('/api/board-game/filter', {
        ...backendFilters,
        searchText: searchText,
      });
      const allGames = response.data.boardGames;
      setAllFilteredBoardGames(allGames);
      setTotalElements(allGames.length);
      // Slice for current page
      const startIdx = (page - 1) * size;
      const endIdx = startIdx + size;
      setFilteredBoardGames(allGames.slice(startIdx, endIdx));
    } catch (error) {
      toast.error(error?.response?.data?.error || "Προέκυψε σφάλμα", { position: 'top-center' });
      setFilteredBoardGames([]);
      setAllFilteredBoardGames([]);
      setTotalElements(0);
    } finally {
      setLoading(false);
    }
  };

  const fetchBoardGames = async (searchText = '', page = 1, size = 8) => {
    setLoading(true);
    try {
      const { boardGames, totalElements } = await searchBoardGames(searchText, page, size);
      setFilteredBoardGames(boardGames);
      setTotalElements(totalElements);
    } catch (error) {
      toast.error(error?.response?.data?.error || "Προέκυψε σφάλμα", { position: 'top-center' });
    } finally {
      setLoading(false);
    }
  };

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
    setAllFilteredBoardGames([]);
    fetchHotBoardGames(1, pageSize);
  };  

  useEffect(() => {
    if (searchText) {
      fetchBoardGames(searchText, currentPage, pageSize);
    }
  }, [searchText, currentPage, pageSize]);

    useEffect(() => {
    if (location.state?.searchText) {
      setSearchText(location.state.searchText);
    }
  }, [location.state?.searchText]);

  useEffect(() => {
    if (!searchText && !location.state?.searchText && !isFiltersActive()) {
      fetchHotBoardGames(currentPage, pageSize);
    } else if (isFiltersActive()){
      fetchFilteredBoardGames(filters, currentPage, pageSize, searchText);
    } 
  }, [searchText, currentPage, pageSize, location.state]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const updatedFilters = {
      categories: [],
      minPlayers: 'Όλοι',
      maxPlayers: 'Όλοι',
      duration: 'Όλες',
      age: 'Όλες',
    };
    queryParams.forEach((value, key) => {
      if (key === "categories") {
        updatedFilters.categories = Array.isArray(value) ? value : [value];
      } else if (["minPlayers", "maxPlayers", "duration", "age"].includes(key)) {
        updatedFilters[key] = value;
      }
    });
    setFilters(updatedFilters);
  }, [location.search]);
  const handleClose = () => setShowFilters(false);
  const handleShow = () => setShowFilters(true);

  const getHeaderText = () => {
    if ((!searchText && filters.categories.length === 0)) {
      return `Δημοφιλή επιτραπέζια (${totalElements}):`;
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
          <BoardGameFilters onApplyFilters={handleApplyFilters} searchText={searchText} />
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
              handlePageChange={handlePageChange}
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
            <BoardGameFilters onApplyFilters={handleApplyFilters} searchText={searchText} />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default BoardGamesContent;