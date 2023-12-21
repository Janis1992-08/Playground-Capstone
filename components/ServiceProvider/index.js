import React, { useState } from "react";
import styled from "styled-components";
import useLocalStorageState from "use-local-storage-state";
import ServiceButton from "@/components/ServiceButton";
import ServiceProviderEdit from "../../pages/edit";

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
  id,
  card,
  serviceCards,
  setServiceCards,
  isOnFavoritesPage,
}) {
  const [showContactInfo, setShowContactInfo] = useState(false);
  const [editedCard, setEditedCard] = useState(null);

  const toggleContactInfo = () => {
    setShowContactInfo(!showContactInfo);
  };

  function handleEditServiceCard(updatedServiceCard) {
    const updatedCards = serviceCards.map((card) =>
      card.id === updatedServiceCard.id ? updatedServiceCard : card
    );
    setServiceCards(updatedCards);
  }

  const handleEdit = (updatedServiceCard) => {
    setEditedCard(updatedServiceCard);
  };

  const handleSave = () => {
    handleEditServiceCard(editedCard);
    setEditedCard(null);
  };

  const handleDelete = (id) => {
    const updatedCards = serviceCards.filter((cards) => cards.id !== card.id);
    setServiceCards(updatedCards);
  };

  return (
    <ServiceProviderWrapper key={card.id}>
      {editedCard && editedCard.id === card.id ? (
        <ServiceProviderEdit
          editedCard={editedCard}
          setEditedCard={setEditedCard}
          handleSave={handleSave}
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
              <ServiceButton type="submit" onClick={() => handleEdit(card)}>
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
