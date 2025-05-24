import { useState, useEffect } from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import { useLocation, useNavigate } from 'react-router-dom';
import OrangeButton from "../components/common/OrangeButton";
import BackButton from "../components/common/BackButton";
import ConfirmationModal from "../components/common/ConfirmationModal";
import BoardGameSelectBar from "../components/common/BoardGameSelectBar";
import axiosInstance from '../config/axiosConfig';
import { Spinner } from 'react-bootstrap'; 
import { toast } from 'react-toastify';
import { searchBoardGames } from '../components/utils/searchBoardGames';
import BoardGameCards from "../components/common/BoardGameCards";

const SignUpBusinessBoardGames = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true); 
    const [displayedBoardGames, setDisplayedBoardGames] = useState([]);
    const [totalElements, setTotalElements] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 8;
    const [searchText, setSearchText] = useState('');
    const [addedGames, setAddedGames] = useState([]);    
    const [showModal, setShowModal] = useState(false);

    const isAdded = (boardGame) => addedGames.some(g => g.bgg_id === boardGame.bgg_id);

    const handleActionClick = (boardGame) => {
        if (isAdded(boardGame)) {
            setAddedGames(addedGames.filter(g => g.id !== boardGame.id));
        } else {
            setAddedGames([...addedGames, boardGame]);
        }
    };

    const fetchHotBoardGames = async (page = 1, size = 8) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `api/hot-games?currentPage=${page}&pageSize=${size}`
      );
      setDisplayedBoardGames(response.data.boardGames);
      setTotalElements(response.data.totalElements);
    } catch (error) {
      toast.error(error, { position: 'top-center' });
      setDisplayedBoardGames([]);
      setTotalElements(0);
    } finally {
      setLoading(false); 
    }
  };

  const fetchBoardGames = async (searchText = '', page = 1, size = 8) => {
    setLoading(true);
    try {
      const { boardGames, totalElements } = await searchBoardGames(searchText, page, size);
      setDisplayedBoardGames(boardGames);
      setTotalElements(totalElements);
    } catch (error) {
      toast.error(error?.response?.data?.error || "Προέκυψε σφάλμα", { position: 'top-center' });
    } finally {
      setLoading(false);
    }
  };

  
    const handlePageChange = async (page) => {
        setCurrentPage(page);

        if (searchText) {
            fetchBoardGames(searchText, page, pageSize);
        return;
        } else {
            fetchHotBoardGames(page, pageSize);
        }
     };

  const handleSubmit = (e) => {
        e.preventDefault();
        setShowModal(true);
    };

    const handleConfirm = async () => {
        setShowModal(false);

        // Retrieve basic info and photo from sessionStorage
        const basicInfo = JSON.parse(sessionStorage.getItem("adminBasicInfo") || "{}");
        const photoBase64 = sessionStorage.getItem("adminPhoto");

        // Prepare FormData for file upload
        const formData = new FormData();
        Object.entries(basicInfo).forEach(([key, value]) => {
            formData.append(key, value);
        });

        if (photoBase64) {
            const arr = photoBase64.split(',');
            const mime = arr[0].match(/:(.*?);/)[1];
            const bstr = atob(arr[1]);
            let n = bstr.length;
            const u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            const blob = new Blob([u8arr], { type: mime });
            formData.append("photo", blob, "photo.jpg");
        }
        formData.append("bggIds", JSON.stringify(addedGames.map(g => g.bgg_id)));

        try {
            const response = await axiosInstance.post("/api/admins", formData);
            const userId = response.data.userId;
            const loginRes = await axiosInstance.post("/api/login", {
                email: formData.get("email"),
                password: formData.get("password"),
                role: "ADMIN"
            });
            const token = loginRes.data.token;
            localStorage.setItem("authToken", token);
            axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            sessionStorage.removeItem("adminBasicInfo");
            sessionStorage.removeItem("adminPhoto");
            navigate(`/admin/${userId}`);
        } catch (error) {
            toast.error(error?.response?.data?.error || "Προέκυψε σφάλμα κατά την εγγραφή", { position: 'top-center' });
        }
    };

  const handleClearSearch = () => {
    setSearchText('');
    setCurrentPage(1); 
    fetchHotBoardGames(1, pageSize);
  };  

  useEffect(() => {
    if (searchText) {
      fetchBoardGames(searchText, currentPage, pageSize);
    } else {
         fetchHotBoardGames(currentPage, pageSize);
    }
  }, [searchText, currentPage, pageSize]);

  return (
    <>
    <Row className="align-items-center">
        <Col md={2} className="ms-5 mt-3">
            <BackButton />
        </Col>
        <Col md={8}>
            <h3 className="text-center my-4" style={{ color: "var(--color-gray-purple)" }}>
                Δημιουργία Προφίλ Παιχνιδοκαφέ
            </h3>
        </Col>
    </Row>
    <Container className="d-flex justify-content-center">
        <Card className="p-4 border-2" style={{ borderColor: "var(--color-orange)", backgroundColor: "var(--color-soft-yellow)", width: "55rem" }}>
            <h4 className="mb-4 pb-3" style={{ color: "var(--color-orange)", borderBottom: "2px solid var(--color-orange)" }}>
                Πληροφορίες για επιτραπέζια:
            </h4>    
        <Row className='mb-5'>
            <Col md={12} xs={12}>
            <BoardGameSelectBar   
                searchText={searchText}
                setSearchText={setSearchText}
                onClearSearch={handleClearSearch}
            />
            </Col>    
        </Row>
            <Col sm={12} className="mt-4 mt-lg-0">
            {loading ? (
                <div className="text-center">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
                </div>
            ) : (
                <BoardGameCards 
                    headerText={"Προσθέστε τα επιτραπέζια που διαθέτετε:"} 
                    boardGames={displayedBoardGames} 
                    totalElements={totalElements}
                    currentPage={currentPage}
                    handlePageChange={handlePageChange}
                    itemsPerPage={pageSize}
                    showActionButton={true}
                    isAdded={isAdded}
                    onActionClick={handleActionClick}
                />
            )}
            </Col>
            <Row className="d-flex justify-content-center mt-2">
                <Col md={6} className="d-flex justify-content-center">
                    <OrangeButton 
                        onClick={handleSubmit}
                        text="Ολοκλήρωση"
                    />
                </Col>
            </Row>
            </Card>
        </Container>
            <ConfirmationModal 
                show={showModal} 
                handleClose={() => setShowModal(false)} 
                handleConfirm={handleConfirm} 
                message={`Έχετε προσθέσει τα ${addedGames.length} παρακάτω επιτραπέζια:`} 
                addedGames={addedGames}
            />
    </>
    );
};

export default SignUpBusinessBoardGames;