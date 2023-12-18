import styled from "styled-components";
import React from "react";

const Button = styled.button`
  background-color: ${(props) => (props.isFavorite ? "yellow" : "white")};
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.isFavorite ? "yellow" : "#f0f0f0")};
  }
`;

export default function FavoriteButton({ isFavorite, onClick }) {
  return (
    <Button isFavorite={isFavorite} onClick={onClick}>
      {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
    </Button>
  );
}
