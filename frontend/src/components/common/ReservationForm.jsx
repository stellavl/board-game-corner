import React, { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import Select from 'react-select';
import OrangeButton from './OrangeButton';
import boardGames from '../../data/boardGames';
import gameCafes from '../../data/boardGameCafes';
import timeSlots from '../../data/timeslots';
import { useNavigate } from "react-router-dom";

const ReservationForm = ({ showGameCafe = true, showBoardGame = true, boardGameTitle, cafeName }) => {
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    gameCafe: "",
    boardGame: showBoardGame ? "" : boardGameTitle,
    players: "",
    date: "",
    time: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (name, value) => {
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
      const formattedDate = formData.date.split("-").reverse().join("-");
      const formattedFormData = { 
        ...formData, 
        date: formattedDate,
        boardGame: showBoardGame ? formData.boardGame : boardGameTitle, 
        gameCafe: showGameCafe ? formData.gameCafe : cafeName 
      };
      const queryParams = new URLSearchParams(formattedFormData);
      console.log("Form Data:", formattedFormData);
      navigate(`/reservation-details?${queryParams}`);
    }
  };

  const boardGameOptions = [
    { value: "Θα επιλέξω στο κατάστημα", label: "Θα επιλέξω στο κατάστημα" },
    ...boardGames.map(game => ({ value: game.name, label: game.name }))
  ];

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
        <Row className="g-3 row-cols-1 row-cols-lg-auto justify-content-center flex-nowrap">
          {showGameCafe && (
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
                  options={gameCafes.map(cafe => ({ value: cafe.name, label: `${cafe.name}(${cafe.city})` }))}
                  onChange={(selectedOption) => handleChange("gameCafe", selectedOption ? selectedOption.value : "")}
                  isInvalid={!!errors.gameCafe}
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
          {showBoardGame && (
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
                  onChange={(selectedOption) => handleChange("boardGame", selectedOption ? selectedOption.value : "")}
                  isInvalid={!!errors.boardGame}
                  placeholder="Επιτραπέζιο"
                  styles={{ 
                    container: (provided) => ({ ...provided, maxWidth: "100%" }),
                    placeholder: (provided) => ({ ...provided, textAlign: 'left' }),
                    singleValue: (provided) => ({ ...provided, textAlign: 'left' }),
                    menu: (provided) => ({ ...provided, textAlign: 'left' }),
                    option: (provided) => ({ ...provided, textAlign: 'left' })
                  }}
                />
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
                isInvalid={!!errors.time}
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