import React, { useState, useRef, useEffect } from "react";
import { Card } from "react-bootstrap";
import { FaStar, FaRegStar } from "react-icons/fa";
import { formatDateToGreek } from "../utils/formatDateToGreek"; 

const ReviewCard = ({ review, isExpanded, onReadMoreToggle }) => {
  const [isTruncated, setIsTruncated] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    const textElement = textRef.current;
    if (textElement && textElement.scrollHeight > textElement.clientHeight) {
      setIsTruncated(true);
    } else {
      setIsTruncated(false);
    }
  }, [review.text]);

  return (
    <Card 
      className="mb-2 border-1 d-flex flex-column justify-content-center"
      style={{ 
        backgroundColor: "var(--color-soft-orange)", 
        borderColor: "var(--color-orange)", 
        minHeight: isExpanded ? "unset" : "9rem", 
        maxHeight: isExpanded ? "unset" : "20vh", 
      }}
    >
      <Card.Body className="p-2 d-flex flex-column justify-content-center">
        <div className="text-center">
          <Card.Title className="fw-bold mb-1 fs-6" style={{ color: "var(--color-gray-purple)" }}>
            {review.name}
          </Card.Title>
          <Card.Subtitle className="text-muted m-1 small" style={{ fontSize: "0.75rem" }}>
            {formatDateToGreek(review.date)}
          </Card.Subtitle>
        </div>

        <div className="d-flex align-items-center justify-content-center flex-grow-1">
          <Card.Text 
            ref={textRef} 
            className="mb-0 text-muted small text-center"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: isExpanded ? "unset" : 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {review.text}
          </Card.Text>
        </div>

        {/* Read More / Show Less */}
        {isTruncated && !isExpanded && (
          <button onClick={onReadMoreToggle} className="btn btn-link p-0 text-center" style={{ fontSize: "0.75rem", color: "var(--color-orange)" }}>
            Read More
          </button>
        )}
        {isExpanded && (
          <button onClick={onReadMoreToggle} className="btn btn-link p-0 text-center" style={{ fontSize: "0.75rem", color: "var(--color-orange)" }}>
            Show Less
          </button>
        )}

        {/* Star Ratings - Always at the bottom */}
        <div className="mt-auto text-center">
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
