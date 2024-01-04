import React, { useState } from "react";
import styled from "styled-components";
import ServiceButton from "@/components/ServiceButton";
import EditForm from "@/pages/edit";

const DeleteButton = styled.button`
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
`;

const ServiceProviderWrapper = styled.div`
  border: 1px solid #ccc;
  padding: 20px;
  margin: 10px;
  border-radius: 8px;
`;

const ServiceDetails = styled.div`
  margin-top: 10px;
`;

export default function ServiceProvider({
  card,
  serviceCards,
  setServiceCards,
  isOnFavoritesPage,
  handleEditServiceCard,
}) {
  const [showContactInfo, setShowContactInfo] = useState(false);
  const [editedCard, setEditedCard] = useState(null);

  const toggleContactInfo = () => {
    setShowContactInfo(!showContactInfo);
  };

  const handleEdit = (updatedServiceCard) => {
    setEditedCard(updatedServiceCard);
  };

  const handleDelete = () => {
    const updatedCards = serviceCards.filter((cards) => cards.id !== card.id);
    setServiceCards(updatedCards);
  };

  return (
    <ServiceProviderWrapper key={card.id}>
      {editedCard && editedCard.id === card.id ? (
        <EditForm
          editedCard={editedCard}
          setEditedCard={setEditedCard}
          handleEditServiceCard={handleEditServiceCard}
        />
      ) : (
        <div>
          <h2>
            {card.firstName} {card.lastName}
          </h2>
          <p>
            <strong>Skills:</strong> {card.skills}
          </p>
          <p>
            <strong>Needs:</strong> {card.needs}
          </p>

          {showContactInfo && (
            <ServiceDetails>
              <p>
                <strong>Email:</strong> {card.email}
              </p>
              <p>
                <strong>Phone:</strong> {card.phone}
              </p>
            </ServiceDetails>
          )}

          <ServiceButton type="button" onClick={toggleContactInfo}>
            {showContactInfo ? "Hide Contact" : "Show Contact"}
          </ServiceButton>
          <br></br>

          {!isOnFavoritesPage && (
            <>
              <ServiceButton onClick={() => handleEdit(card)}>
                Edit
              </ServiceButton>
              <DeleteButton type="button" onClick={() => handleDelete(card.id)}>
                Delete
              </DeleteButton>
            </>
          )}
        </div>
      )}
    </ServiceProviderWrapper>
  );
}
