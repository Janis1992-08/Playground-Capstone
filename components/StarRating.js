import React from "react";

const StarRating = ({ rating, setRating }) => {
  const starStyle = (isRated) => ({
    cursor: "pointer",
    color: isRated ? "gold" : "gray",
  });

  return (
    <div>
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <span
            key={ratingValue}
            style={starStyle(ratingValue <= rating)}
            onClick={() => setRating(ratingValue)}
          >
            &#9733;
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;
