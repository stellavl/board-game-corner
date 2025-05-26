import { useState, useEffect } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import Select from 'react-select';
import OrangeButton from './OrangeButton';
import timeSlots from '../../data/timeslots';
import { useNavigate } from "react-router-dom";
import classNames from 'classnames';
import axiosInstance from "../../config/axiosConfig";
import { toast } from "react-toastify";

const ReservationForm = ({ cafeFromCafePage, gameFromGamePage }) => {
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];
  const [gameCafes, setGameCafes] = useState([]);
  const [cafeBoardGames, setCafeBoardGames] = useState([]);
  const [boardGameSelectError, setBoardGameSelectError] = useState("");
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    gameCafe: cafeFromCafePage || "",
    boardGame: gameFromGamePage || "",
    players: "",
    date: "",
    time: "",
  });

  const fetchCafes = async () => {
    try {
      const res = await axiosInstance.get("api/board-game-cafes/all");
      setGameCafes(res.data);
    } catch (err) {
      setGameCafes([]);
      toast.error(err, { position: 'top-center' });
    }
  };

  useEffect(() => {
    if (!cafeFromCafePage) 
      fetchCafes();
  }, [cafeFromCafePage]);

   const fetchBoardGamesOfSpecificCafe = async (cafeId) => {
    setCafeBoardGames([]);
    setBoardGameSelectError("");
  
    if (cafeId) {
      try {
        const res = await axiosInstance.post(
          `/api/board-game-cafes/id/${cafeId}/board-games`
        );
        setCafeBoardGames(res.data.boardGames || []);
      } catch (err) {
        setCafeBoardGames([]);
        setBoardGameSelectError("Σφάλμα κατά την ανάκτηση επιτραπέζιων.");
      }
    } else {
      setBoardGameSelectError("Επιλέξτε πρώτα παιχνιδοκαφέ");
      return;
    }
  };

  useEffect(() => {
    if (cafeFromCafePage){
      fetchBoardGamesOfSpecificCafe(cafeFromCafePage.id);
    } else if (formData.gameCafe) {
      fetchBoardGamesOfSpecificCafe(formData.gameCafe.id);
    } else {
      setCafeBoardGames([]);
    }
  }, [formData.gameCafe, cafeFromCafePage]);

  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    if (typeof value === "string" && value.trim() !== "") {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };

  const validateForm = () => {
    let newErrors = {};

    if (!cafeFromCafePage && !formData.gameCafe) newErrors.gameCafe = "Επίλεξε ένα παιχνιδοκαφέ.";
    if (!gameFromGamePage && !formData.boardGame) newErrors.boardGame = "Επίλεξε ένα επιτραπέζιο.";
    if (!formData.players) newErrors.players = "Πρόσθεσε αριθμό παικτών.";
    else if (parseInt(formData.players, 10) < 1) newErrors.players = "Ο αριθμός παικτών πρέπει να είναι τουλάχιστον 1.";
    if (!formData.date) newErrors.date = "Επίλεξε ημερομηνία.";
    else if (formData.date < today) newErrors.date = "Δεν μπορείς να επιλέξεις παρελθοντική ημερομηνία.";
    if (!formData.time) newErrors.time = "Επίλεξε ώρα.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const formattedDate = formData.date.split("-").reverse().join("-");
      const reservationData = {
        ...formData,
        date: formattedDate,
        boardGame: gameFromGamePage || formData.boardGame,
        gameCafe: cafeFromCafePage || formData.gameCafe
      };
      navigate("/reservation-details", { state: reservationData });
    }
  };

  const boardGameOptions = gameFromGamePage
    ? [{ value: gameFromGamePage, label: gameFromGamePage }]
    : cafeBoardGames.length > 0
      ? [
        { value: "Θα επιλέξω στο κατάστημα", label: "Θα επιλέξω στο κατάστημα" },
        ...cafeBoardGames.map(game => ({ value: game, label: game.name }))
      ]
      : [];

  return (
    <>
      <h5 className="mb-3 text-decoration-underline" style={{ color: 'var(--color-gray-purple)' }}>
        Κάνε τώρα την κράτησή σου:
      </h5>
      <div className="d-flex justify-content-center align-items-center">
        <Container
          className="py-4 rounded"
          style={{
            backgroundColor: 'var(--color-soft-orange)',
            border: '2px solid var(--color-orange)',
            maxWidth: '80rem'
          }}
        >
          <Row className="g-3 row-cols-1 row-cols-lg-auto justify-content-center">
            {!cafeFromCafePage && (
              <Col xs={12} sm={8} md={4} lg={3}>
                <Form.Group>
                  <Form.Label
                    className="fw-bold text-start w-100"
                    style={{ color: 'var(--color-gray-purple)' }}
                  >
                    Παιχνιδοκαφέ:
                  </Form.Label>
                  <Select
                    name="gameCafe"
                    options={gameCafes.map(cafe => ({ value: cafe, label: `${cafe.name}(${cafe.city})` }))}
                    onChange={(selectedOption) => handleChange("gameCafe", selectedOption ? selectedOption.value : "")}
                    className={classNames({ 'is-invalid': !!errors.gameCafe })}
                    placeholder="Παιχνιδοκαφέ"
                    styles={{
                      container: (provided) => ({ ...provided, maxWidth: "100%" }),
                      placeholder: (provided) => ({ ...provided, textAlign: 'left' }),
                      singleValue: (provided) => ({ ...provided, textAlign: 'left' }),
                      menu: (provided) => ({ ...provided, textAlign: 'left' }),
                      option: (provided) => ({ ...provided, textAlign: 'left' })
                    }}
                  />
                  <div className="invalid-feedback" style={{ color: 'var(--color-gray-purple)' }}>
                    {errors.gameCafe}
                  </div>
                </Form.Group>
              </Col>
            )}
            {!gameFromGamePage && (
              <Col xs={12} sm={8} md={4}  lg={3}>
                <Form.Group>
                  <Form.Label
                    className="fw-bold text-start w-100"
                    style={{ color: 'var(--color-gray-purple)' }}
                  >
                    Επιτραπέζιο:
                  </Form.Label>
                  <Select
                    name="boardGame"
                    options={boardGameOptions}
                    onChange={(selectedOption) => {
                      if (!formData.gameCafe && !cafeFromCafePage) {
                        setBoardGameSelectError("Επιλέξτε πρώτα παιχνιδοκαφέ");
                        return;
                      }
                      setBoardGameSelectError("");
                      handleChange("boardGame", selectedOption ? selectedOption.value : "");
                    }}
                    className={classNames({ 'is-invalid': !!errors.boardGame || !!boardGameSelectError })}
                    placeholder="Επιτραπέζιο"
                    isDisabled={!formData.gameCafe && !cafeFromCafePage}
                    styles={{
                      container: (provided) => ({ ...provided, maxWidth: "100%" }),
                      placeholder: (provided) => ({ ...provided, textAlign: 'left' }),
                      singleValue: (provided) => ({ ...provided, textAlign: 'left' }),
                      menu: (provided) => ({ ...provided, textAlign: 'left' }),
                      option: (provided) => ({ ...provided, textAlign: 'left' })
                    }}
                  />
                  <div className="invalid-feedback" style={{ color: 'var(--color-gray-purple)' }}>
                    {errors.boardGame || boardGameSelectError}
                  </div>
                </Form.Group>
              </Col>
            )}
            <Col xs={12} sm={8} md={4} lg={2}>
              <Form.Group>
                <Form.Label
                  className="fw-bold text-start w-100 text-nowrap"
                  style={{ color: 'var(--color-gray-purple)' }}
                >
                  Πλήθος παικτών:
                </Form.Label>
                <Form.Control
                  type="number"
                  name="players"
                  placeholder="Παίκτες"
                  className="form-control w-100"
                  onChange={(e) => handleChange("players", e.target.value)}
                  isInvalid={!!errors.players}
                  min="1"
                />
                <div className="invalid-feedback" style={{ color: 'var(--color-gray-purple)' }}>
                  {errors.players}
                </div>
              </Form.Group>
            </Col>
            <Col xs={12} sm={8} md={4}>
              <Form.Group>
                <Form.Label
                  className="fw-bold text-start w-100"
                  style={{ color: 'var(--color-gray-purple)' }}
                >
                  Ημερομηνία:
                </Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  className="form-control w-100"
                  onChange={(e) => handleChange("date", e.target.value)}
                  isInvalid={!!errors.date}
                  min={today}
                />
                <div className="invalid-feedback" style={{ color: 'var(--color-gray-purple)' }}>
                  {errors.date}
                </div>
              </Form.Group>
            </Col>
            <Col xs={12} sm={8} md={4}>
              <Form.Group>
                <Form.Label
                  className="fw-bold text-start w-100"
                  style={{ color: 'var(--color-gray-purple)' }}
                >
                  Ώρα:
                </Form.Label>
                <Select
                  name="time"
                  options={timeSlots.map(time => ({ value: time, label: time }))}
                  onChange={(selectedOption) => handleChange("time", selectedOption ? selectedOption.value : "")}
                  className={classNames({ 'is-invalid': !!errors.time })}
                  placeholder="Ώρα"
                  styles={{
                    container: (provided) => ({ ...provided, maxWidth: "100%" }),
                    placeholder: (provided) => ({ ...provided, textAlign: 'left' }),
                    singleValue: (provided) => ({ ...provided, textAlign: 'left' }),
                    menu: (provided) => ({ ...provided, textAlign: 'left' }),
                    option: (provided) => ({ ...provided, textAlign: 'left' })
                  }}
                />
                <div className="invalid-feedback" style={{ color: 'var(--color-gray-purple)' }}>
                  {errors.time}
                </div>
              </Form.Group>
            </Col>
          </Row>
          <div className="mt-4 text-center">
            <OrangeButton text="ΣΥΝΕΧΕΙΑ" onClick={handleSubmit} />
          </div>
        </Container>
      </div>
    </>
  );
};

export default ReservationForm;