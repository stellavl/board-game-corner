import React from "react";
import { Card } from "react-bootstrap";
import { FaStar, FaRegStar } from "react-icons/fa";
import { formatDateToGreek } from "../utils/formatDateToGreek"; 

const ReviewCard = ({ review }) => {
  return (
    <Card className="mb-2 border-1" style={{ backgroundColor: "var(--color-soft-orange)", borderColor: "var(--color-orange)" }}>
      <Card.Body className="p-2">
        <Card.Title className="fw-bold mb-1 fs-6" style={{ color: "var(--color-gray-purple)" }}>
          {review.name}
        </Card.Title>
        <Card.Subtitle className="text-muted m-1 small" style={{ fontSize: "0.75rem" }}>
          {formatDateToGreek(review.date)}
        </Card.Subtitle>
        <Card.Text className="mb-0" style={{ color: "var(--color-gray-purple)", fontSize: "0.9rem" }}>
          {review.text}
        </Card.Text>
        <div>
          {[...Array(5)].map((_, i) =>
            i < review.rating ? (
              <FaStar key={i} style={{ color: "var(--color-orange)", fontSize: "0.9rem" }} />
            ) : (
              <FaRegStar key={i} style={{ color: "var(--color-orange)", fontSize: "0.9rem" }} />
            )
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default ReviewCard;
