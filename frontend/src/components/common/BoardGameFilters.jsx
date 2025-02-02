import React, { useState } from "react";
import {Dropdown, Form, Card, Row, Col } from "react-bootstrap";
import OrangeButton from "./OrangeButton";

const categories = ["Περιπέτειας", "Στρατηγικής", "Οικογενειακά"];
const playerOptions = ["Όλοι", 1, 2, 3, 4, 5, 6, 7, 8, 9, "10+"];

const BoardGameFilters = ({ onApplyFilters }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [minPlayers, setMinPlayers] = useState("Όλοι");
  const [maxPlayers, setMaxPlayers] = useState("Όλοι");
  const [duration, setDuration] = useState("Όλες");
  const [age, setAge] = useState("Όλες");
  const [filtersApplied, setFiltersApplied] = useState(false); // Track if filters are applied

  const handleCategoryChange = (category) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(category)
        ? prevSelected.filter((c) => c !== category)
        : [...prevSelected, category]
    );
  };

  const handleMinPlayersChange = (e) => {
    const newMin = e.target.value;
    setMinPlayers(newMin);

    if (newMin === "Όλοι") {
      setMaxPlayers("Όλοι");
      return;
    }

    if (maxPlayers !== "Όλοι" && parseInt(maxPlayers) < parseInt(newMin)) {
      setMaxPlayers(newMin);
    }
  };

  const handleMaxPlayersChange = (e) => {
    const newMax = e.target.value;
    setMaxPlayers(newMax);

    if (newMax === "Όλοι") {
      setMinPlayers("Όλοι");
    }
  };

  const handleApplyFilters = () => {
    onApplyFilters({
      categories: selectedCategories,
      minPlayers,
      maxPlayers,
      duration,
      age,
    });

    // After applying filters, set filtersApplied to true
    setFiltersApplied(true);
  };

  const handleClearFilters = () => {
    // Reset all filters to their initial values
    setSelectedCategories([]);
    setMinPlayers("Όλοι");
    setMaxPlayers("Όλοι");
    setDuration("Όλες");
    setAge("Όλες");
    setFiltersApplied(false); // Reset filters applied state
    onApplyFilters({
      categories: [],
      minPlayers: "Όλοι",
      maxPlayers: "Όλοι",
      duration: "Όλες",
      age: "Όλες",
    });
  };

  return (
    <Card className="p-3 rounded border-2" style={{ borderColor: "#E95C2F" }}>
      <Card.Body>
        <h5 className="text-center text-decoration-underline " style={{ color: "#E95C2F" }}>
          Φίλτρα
        </h5>

        {/* Clear Filters Button - Positioned Below Filters Heading */}
        {filtersApplied && (
          <div className="text-center mb-2">
            <button
              className="btn btn-link text-secondary fs-6"
              onClick={handleClearFilters}
              style={{ textDecoration: 'none' }}
            >
              Διαγραφή Φίλτρων
            </button>
          </div>
        )}

        <Form style={{ color: 'var(--color-gray-purple)' }}>
          {/* Κατηγορία (Category) */}
          <Form.Group className="mb-2">
            <Form.Label>
              <strong>Κατηγορία</strong>
            </Form.Label>

            <Dropdown>
                <Dropdown.Toggle
                    variant="light"
                    className="w-100 text-start d-flex flex-wrap align-items-center"
                    style={{ minHeight: "38px" }} // Ensures proper alignment
                >
                    <span className="flex-grow-1">
                    {selectedCategories.length > 0 ? (
                        selectedCategories.map((category, index) => (
                        <div key={index}>{category}</div>
                        ))
                    ) : (
                        "Όλες"
                    )}
                    </span>
                </Dropdown.Toggle>
                <Dropdown.Menu style={{ maxHeight: "200px", overflowY: "auto" }}>
                    {categories.map((category) => (
                    <Form.Check
                        key={category}
                        type="checkbox"
                        label={category}
                        checked={selectedCategories.includes(category)}
                        onChange={() => handleCategoryChange(category)}
                        className="ms-3"
                    />
                    ))}
                </Dropdown.Menu>
                </Dropdown>

          </Form.Group>

          {/* Διάρκεια (Duration) */}
          <Form.Group className="mb-3">
            <Form.Label>
              <strong>Διάρκεια</strong>
            </Form.Label>
            <Form.Control as="select" value={duration} onChange={(e) => setDuration(e.target.value)}>
              <option>Όλες</option>
              <option>&lt;10 λεπτά</option>
              <option>10-30 λεπτά</option>
              <option>30-60 λεπτά</option>
              <option>60+ λεπτά</option>
            </Form.Control>
          </Form.Group>

          {/* Παίκτες (Players) */}
          <Form.Group className="mb-3">
            <Form.Label>
              <strong>Παίκτες</strong>
            </Form.Label>
            <Row>
              <Col>
                <Form.Label className="ms-1">Από:</Form.Label>
                <Form.Control as="select" value={minPlayers} onChange={handleMinPlayersChange}>
                  {playerOptions
                    .filter(
                      (option) =>
                        maxPlayers === "Όλοι" ||
                        option === "Όλοι" ||
                        option === "10+" ||
                        parseInt(option) <= parseInt(maxPlayers)
                    )
                    .map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                </Form.Control>
              </Col>
              <Col>
                <Form.Label className="ms-1">Έως:</Form.Label>
                <Form.Control as="select" value={maxPlayers} onChange={handleMaxPlayersChange}>
                  {playerOptions
                    .filter(
                      (option) =>
                        minPlayers === "Όλοι" ||
                        option === "Όλοι" ||
                        option === "10+" ||
                        parseInt(option) >= parseInt(minPlayers)
                    )
                    .map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                </Form.Control>
              </Col>
            </Row>
          </Form.Group>

          {/* Ηλικία (Age) */}
          <Form.Group className="mb-3">
            <Form.Label>
              <strong>Ηλικία</strong>
            </Form.Label>
            <Form.Control as="select" value={age} onChange={(e) => setAge(e.target.value)}>
              <option>Όλες</option>
              <option>0-3</option>
              <option>3+</option>
              <option>6+</option>
              <option>12+</option>
              <option>18+</option>
            </Form.Control>
          </Form.Group>

          <div className="d-flex justify-content-center">
            <OrangeButton text="Εφαρμογή" size="btn-md" onClick={handleApplyFilters} />
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default BoardGameFilters;
