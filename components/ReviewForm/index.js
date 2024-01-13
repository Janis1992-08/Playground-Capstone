import { useState } from "react";
import styled from "styled-components";
import useSWR from "swr";

const SubmitReviewButton = styled.button`
  background-color: ${(props) => props.reviewButtonColor || "#2ecc71"};
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
`;

export default function ReviewForm({ card }) {
  const { mutate } = useSWR("/api/providers");

  const handleSubmit = (event) => {
    event.preventDefault();
    onAddReview(card._id, event.target.review.value); // Pass the review text directly
    event.target.review.value = ""; // Reset the input field
  };
  console.log(card.reviews);

  async function onAddReview(providerId, review) {
    console.log("Review to be sent:", review);
    try {
      const url = `/api/providers/${providerId}`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ review }),
      });

      if (response.ok) {
        const updatedData = await response.json();

        mutate();
        return updatedData; // Return the updated data
      } else {
        console.error("Error updating provider:", response.statusText);
        const errorMessage = await response.text(); // Extract error message from response
        console.error("Detailed Error Message:", errorMessage);
        // You can display the error message to the user or handle it as needed
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      // You can display a generic error message to the user or handle it as needed
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="review">Write your review here:</label>
      <input id="review" minLength={3} />
      <SubmitReviewButton type="submit">Submit Review</SubmitReviewButton>
    </form>
  );
}
