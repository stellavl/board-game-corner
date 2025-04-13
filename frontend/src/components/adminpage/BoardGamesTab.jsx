import React from "react";
import { CloseButton } from "react-bootstrap";
import boardGames from "../../data/boardGames";

const BoardGamesTab = () => {
  const handleRemove = (game) => {
    console.log("Remove game:", game);
  };

  return (
    <div className="d-flex justify-content-center">
      <div
        className="p-3 rounded"
        style={{
          backgroundColor: "#fff5cc",
          border: "2px solid var(--color-orange)",
          width: "250px",
        }}
      >
        <h5 className="text-center fw-bold" style={{ color: "var(--color-orange)" }}>
          Επιτραπέζιο
        </h5>

        <div className="mt-2 border rounded overflow-auto" style={{ maxHeight: "160px", borderColor: "var(--color-orange)" }}>
          {boardGames.map((game) => (
            <div
              key={game.id}
              className="d-flex justify-content-between align-items-center px-2 py-1 border-bottom"
            >
              <span>{game.name}</span>
              <CloseButton
                onClick={() => handleRemove(game.name)}
                className="bg-danger"
                style={{ borderRadius: "50%", width: "1.5rem", height: "1.5rem" }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BoardGamesTab;