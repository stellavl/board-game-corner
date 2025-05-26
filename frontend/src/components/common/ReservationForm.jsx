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
  const [playersRange, setPlayersRange] = useState({ min: 1, max: undefined });
  const [playersDisabled, setPlayersDisabled] = useState(true);

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

    const fieldError = validateFields({ [name]: value });
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: fieldError[name] || ""
  }));
  };

    const validateFields = (fields) => {
      const errors = {};
      const entries = fields ? Object.entries(fields) : Object.entries(formData);

      entries.forEach(([name, value]) => {
        if (name === "gameCafe" && !cafeFromCafePage && !value) errors.gameCafe = "Επίλεξε ένα παιχνιδοκαφέ.";
        if (name === "boardGame" && !gameFromGamePage && !value) errors.boardGame = "Επίλεξε ένα επιτραπέζιο.";
        if (name === "players") {
          if (!value) {
            errors.players = "Πρόσθεσε αριθμό παικτών.";
          } else {
            const num = parseInt(value, 10);
            if (playersRange.min !== undefined && num < playersRange.min) {
              errors.players = `Ο αριθμός παικτών πρέπει να είναι τουλάχιστον ${playersRange.min}.`;
            } else if (playersRange.max !== undefined && num > playersRange.max) {
              errors.players = `Ο αριθμός παικτών δεν μπορεί να ξεπερνά το ${playersRange.max}.`;
            }
          }
        }
        if (name === "date") {
          if (!value) errors.date = "Επίλεξε ημερομηνία.";
          else if (value < today) errors.date = "Δεν μπορείς να επιλέξεις παρελθοντική ημερομηνία.";
        }
        if (name === "time" && !value) errors.time = "Επίλεξε ώρα.";
      });

      return errors;
    };

  const updatePlayersRange = (selectedGame) => {
    if (!selectedGame || selectedGame === "Θα επιλέξω στο κατάστημα") {
      setPlayersRange({ min: 1, max: undefined });
      setPlayersDisabled(false);
      return;
    }
    // If selectedGame is a string, find the object in cafeBoardGames
    let gameObj = typeof selectedGame === "object" ? selectedGame : cafeBoardGames.find(g => g.name === selectedGame);
    if (gameObj && typeof gameObj.min_players === "number" && typeof gameObj.max_players === "number") {
      setPlayersRange({ min: gameObj.min_players, max: gameObj.max_players });
      setPlayersDisabled(false);
    } else {
      setPlayersRange({ min: 1, max: undefined });
      setPlayersDisabled(true);
    }
  };

  useEffect(() => {
    if (gameFromGamePage) {
      updatePlayersRange(gameFromGamePage);
    } else if (formData.boardGame) {
      updatePlayersRange(formData.boardGame);
    } else {
      setPlayersDisabled(true);
      setPlayersRange({ min: 1, max: undefined });
    }
    // eslint-disable-next-line
  }, [formData.boardGame, gameFromGamePage, cafeBoardGames]);

 
  const handleSubmit = () => {
    const newErrors = validateFields();
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
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
                  min={playersRange.min}
                  max={playersRange.max}
                  disabled={playersDisabled}
                />
                {errors.players && playersRange.max && (
                  <div className="form-text" style={{ color: 'var(--color-gray-purple)' }}>
                    Επιτρεπτός αριθμός: {playersRange.min} - {playersRange.max}
                  </div>
                )}
                {errors.players && !playersRange.max && (
                  <div className="form-text" style={{ color: 'var(--color-gray-purple)' }}>
                   Επιλέξε πλήθος παικτών.
                  </div>
                )}
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