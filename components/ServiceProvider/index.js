import { useState } from "react";
import styled from "styled-components";
import EditForm from "@/pages/edit";
import router from "next/router";

const ServiceProviderWrapper = styled.div`
  border: 1px solid #ccc;
  padding: 20px;
  margin: 10px;
  border-radius: 8px;
`;

const ServiceButton = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
`;

const ServiceDetails = styled.div`
  margin-top: 10px;
`;

const DeleteButton = styled.button`
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
`;

export default function ServiceProvider({ card, isOnFavoritesPage }) {
  const [showContactInfo, setShowContactInfo] = useState(false);
  const [editedCard, setEditedCard] = useState(null);

  const toggleContactInfo = () => {
    setShowContactInfo(!showContactInfo);
  };

  const handleEdit = (updatedServiceCard) => {
    try {
      setEditedCard({ ...updatedServiceCard, _id: card._id });
    } catch (error) {
      console.error("Error setting edited card:", error);
    }
  };

  async function handleDelete(id) {
    const url = `/api/providers/${id}`;
    try {
      const response = await fetch(url, {
        method: "DELETE",
      });

      if (response.ok) {
        await response.json(); // Ensure the response is fully read

        router.reload(); // Reload the page
      } else {
        console.error(`Error: ${response.status}`);
      }
    } catch (error) {
      console.error("An error occurred during the delete request:", error);
    }
  }

  return (
    <ServiceProviderWrapper key={card._id}>
      {editedCard?._id === card._id ? (
        <EditForm
          editedCard={editedCard}
          setEditedCard={setEditedCard}
          card={card}
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
              <DeleteButton
                type="button"
                onClick={() => handleDelete(card._id)}
              >
                Delete
              </DeleteButton>
            </>
          )}
        </div>
      )}
    </ServiceProviderWrapper>
  );
}
