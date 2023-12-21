import React, { useState } from "react";
import styled from "styled-components";

const StarWrapper = styled.div`
  display: inline-block;
  font-size: 20px;
  cursor: pointer;
`;

// Genauer Analysieren
const StarRating = ({ rating, setRating }) => {
  const [hoverRating, setHoverRating] = useState(0);

  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
  };

  const handleStarHover = (selectedRating) => {
    setHoverRating(selectedRating);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const stars = Array.from({ length: 5 }, (_, index) => index + 1);

  return (
    <div>
      {stars.map((star) => (
        <StarWrapper
          key={star}
          onClick={() => handleStarClick(star)}
          onMouseEnter={() => handleStarHover(star)}
          onMouseLeave={handleMouseLeave}
        >
          {star <= (hoverRating || rating) ? "⭐️" : "☆"}
        </StarWrapper>
      ))}
    </div>
  );
};

export default StarRating;
