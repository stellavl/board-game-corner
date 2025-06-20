import { useState, useEffect } from "react";
import { Container, Row, Col, Spinner, Card, Button, Pagination } from "react-bootstrap";
import axiosInstance from "../../config/axiosConfig";
import { toast } from "react-toastify";
import OrangeButton from "../common/OrangeButton";

const BoardGamesTab = ({ cafeId }) => {
  const [displayedBoardGames, setDisplayedBoardGames] = useState([]);
  const [allBoardGames, setAllBoardGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [boardGamesToBeDeleted, setBoardGamesToBeDeleted] = useState([]);
  const pageSize = 8;

  const handleActionClick = (boardGame) => {
    setBoardGamesToBeDeleted((prev) =>
      prev.includes(boardGame.id)
        ? prev.filter((id) => id !== boardGame.id)
        : [...prev, boardGame.id]
    );
  };

  const handleSaveChanges = () => {
    //TO DO: Implement the logic to save the changes
    console.log("IDs to delete:", boardGamesToBeDeleted);
  };

    const handleAddBoardGames = () => {
    //TO DO: Implement the logic to add new board games
    console.log("Add new board games clicked");
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    const startIdx = (page - 1) * pageSize;
    const endIdx = startIdx + pageSize;
    setDisplayedBoardGames(allBoardGames.slice(startIdx, endIdx));
  };

  const fetchBoardGames = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("authToken");
      const response = await axiosInstance.get(
        `/api/board-game-cafes/id/${cafeId}/board-games`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAllBoardGames(response.data.boardGames);
    } catch (err) {
      toast.error(err, { position: "top-center" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBoardGames();
  }, [cafeId]);

  useEffect(() => {
    setCurrentPage(1);
    setDisplayedBoardGames(allBoardGames.slice(0, pageSize));
  }, [allBoardGames]);

  if (loading)
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "200px" }}
      >
        <Spinner
          animation="border"
          role="status"
          style={{ color: "var(--color-orange)" }}
        >
          <span className="visually-hidden">Φόρτωση...</span>
        </Spinner>
      </div>
    );

  const totalPages = Math.ceil(allBoardGames.length / pageSize);

  return (
    <>
      <Container className="mt-4">
       <Row className="justify-content-center mb-3">
          <Col xs="auto">
            <h5 style={{ color: "var(--color-gray-purple)", textDecoration: "bold" }}>
              Σύνολο ({allBoardGames.length})
            </h5>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col xs={12} md={10}>
            <Row className="gx-3 gy-3 flex-wrap">
              {displayedBoardGames.map((boardGame) => (
                <Col xs={6} md={4} xl={3} key={boardGame.id} className="mb-3">
                  <Card
                    className="border-2 rounded-3 mx-auto"
                    style={{
                      borderColor: "var(--color-orange)",
                      maxWidth: "180px",
                      backgroundColor: boardGamesToBeDeleted.includes(boardGame.id)
                        ? 'var(--bs-success-bg-subtle, #d1e7dd)'
                        : "white",
                    }}
                  >
                    <Card.Img
                      variant="top"
                      src={boardGame.image}
                      alt={boardGame.name}
                      className="card-img-top img-fluid mt-2"
                      style={{ height: "120px", objectFit: "contain" }}
                    />
                    <Card.Body style={{ color: "var(--color-gray-purple)", flex: 1 }}>
                      <Card.Title
                        style={{
                          fontSize: "1.2rem",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        <strong>{boardGame.name}</strong>
                      </Card.Title>
                      <div className="d-grid mt-3">
                        <Button
                          variant="danger"
                          onClick={() => handleActionClick(boardGame)}
                        >
                          Αφαίρεση
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
            {/* Pagination Controls */}
            {totalPages > 1 && (
              <Pagination className="justify-content-center mt-3">
                <Pagination.Prev
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                />

                {currentPage > 2 && (
                  <>
                    <Pagination.Item onClick={() => handlePageChange(1)}>1</Pagination.Item>
                    {currentPage > 3 && <Pagination.Ellipsis />}
                  </>
                )}

                {currentPage > 1 && (
                  <Pagination.Item onClick={() => handlePageChange(currentPage - 1)}>
                    {currentPage - 1}
                  </Pagination.Item>
                )}

                <Pagination.Item active>{currentPage}</Pagination.Item>

                {currentPage < totalPages && (
                  <Pagination.Item onClick={() => handlePageChange(currentPage + 1)}>
                    {currentPage + 1}
                  </Pagination.Item>
                )}

                {currentPage < totalPages - 1 && (
                  <>
                    {currentPage < totalPages - 2 && <Pagination.Ellipsis />}
                    <Pagination.Item onClick={() => handlePageChange(totalPages)}>
                      {totalPages}
                    </Pagination.Item>
                  </>
                )}
                <Pagination.Next
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage >= totalPages}
                />
              </Pagination>
            )}
            <div className="d-flex justify-content-between align-items-center mt-3">
              <OrangeButton
                onClick={handleAddBoardGames}
                text="Προσθήκη νέων επιτραπέζιων"
              />
              <Button
                variant="success"
                onClick={handleSaveChanges}
                disabled={boardGamesToBeDeleted.length === 0}
              >
                Αποθήκευση αλλαγών
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default BoardGamesTab;