import React, { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import OrangeButton from './OrangeButton';
import boardGames from '../../data/boardGames';
import gameCafes from '../../data/boardGameCafes';
import timeSlots from '../../data/timeslots';

const ReservationForm = ({ showGameCafe = true, showBoardGame = true, boardGameTitle }) => {
  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    gameCafe: "",
    boardGame: showBoardGame ? "" : boardGameTitle,
    players: "",
    date: "",
    time: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    if (value.trim() !== "") {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };

  const validateForm = () => {
    let newErrors = {};

    if (showGameCafe && !formData.gameCafe) newErrors.gameCafe = "Επίλεξε ένα παιχνιδοκαφέ.";
    if (showBoardGame && !formData.boardGame) newErrors.boardGame = "Επίλεξε ένα επιτραπέζιο.";
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
      console.log("Form Data:", formData);
    }
  };

  // Calculate container width based on the number of active fields.
  const activeFields = [
    showGameCafe,
    showBoardGame,
    true,
    true,
    true
  ].filter(Boolean).length;

  const containerWidth = `${Math.min(220 * activeFields, 1200)}px`;

  return (
    <div className="d-flex justify-content-center align-items-center">
      <Container 
        className="py-4 rounded" 
        style={{ 
          backgroundColor: 'var(--color-soft-orange)', 
          border: '2px solid var(--color-orange)',
          maxWidth: containerWidth, 
        }}
      >
        <Row className="g-3 row-cols-1 row-cols-lg-auto justify-content-center">
          {showGameCafe && (
            <Col xs={12} sm={8} md={4} lg={3}>
              <Form.Group>
                <Form.Label 
                  className="fw-bold text-start w-100" 
                  style={{ color: 'var(--color-gray-purple)' }}
                >
                  Παιχνιδοκαφέ:
                </Form.Label>
                <Form.Select 
                  name="gameCafe" 
                  className="form-control w-100" 
                  onChange={handleChange}
                  isInvalid={!!errors.gameCafe}
                  style={{ maxWidth: "100%" }} 
                >
                  <option value="">Παιχνιδοκαφέ</option>
                  {gameCafes.map((cafe) => (
                    <option 
                      key={cafe.id} 
                      value={cafe.name}
                    >
                      {`${cafe.name}(${cafe.city})`}
                    </option>
                  ))}
                </Form.Select>
                <div className="invalid-feedback" style={{ color: 'var(--color-gray-purple)' }}>
                  {errors.gameCafe}
                </div>
              </Form.Group>
            </Col>
          )}
          {showBoardGame && (
            <Col xs={12} sm={8} md={4}>
              <Form.Group>
                <Form.Label 
                  className="fw-bold text-start w-100" 
                  style={{ color: 'var(--color-gray-purple)' }}
                >
                  Επιτραπέζιο:
                </Form.Label>
                <Form.Select 
                  name="boardGame" 
                  className="form-control w-100" 
                  onChange={handleChange}
                  isInvalid={!!errors.boardGame}
                >
                  <option value="">Επιτραπέζιο</option>
                  {boardGames.map((game) => (
                    <option key={game.id} value={game.name}>{game.name}</option>
                  ))}
                </Form.Select>
                <div className="invalid-feedback" style={{ color: 'var(--color-gray-purple)' }}>
                  {errors.boardGame}
                </div>
              </Form.Group>
            </Col>
          )}
          <Col xs={12} sm={8} md={4}>
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
                placeholder="Πλήθος παικτών" 
                className="form-control w-100" 
                onChange={handleChange} 
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
                onChange={handleChange} 
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
              <Form.Select 
                name="time"
                className="form-control w-100"
                onChange={handleChange}
                isInvalid={!!errors.time}
              >
                <option value="">Ώρα</option>
                {timeSlots.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </Form.Select>
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
  );
};

export default ReservationForm;
