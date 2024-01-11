//import React from "react";
import ServiceButton from "@/components/ServiceButton";
import useSWR from "swr";
import { useState } from "react";

export default function EditForm({ editedCard, setEditedCard, card: { _id } }) {
  const { mutate } = useSWR(`/api/providers/${_id}`);
  const [isSaving, setIsSaving] = useState(false);

  async function handleEditServiceCard() {
    try {
      const url = `/api/providers/${_id}`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedCard),
      });

      if (response.ok) {
        const updatedData = await response.json();
        mutate(url, updatedData);
      } else {
        console.error("Error updating provider:", response.statusText);
        // Add UI feedback for the user
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      // Add UI feedback for the user
    } finally {
      setIsSaving(false);
    }
  }

  const handleSave = async (event) => {
    event.preventDefault();

    setIsSaving(true);
    await handleEditServiceCard();
    setEditedCard(null);
  };

  if (!editedCard) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSave}>
      <label htmlFor="firstName">First Name:</label>
      <input
        type="text"
        id="firstName"
        required
        value={editedCard.firstName}
        onChange={(event) =>
          setEditedCard({ ...editedCard, firstName: event.target.value })
        }
      />

      <label htmlFor="lastName">Last Name:</label>
      <input
        type="text"
        id="lastName"
        required
        value={editedCard.lastName}
        onChange={(event) =>
          setEditedCard({ ...editedCard, lastName: event.target.value })
        }
      />

      <label htmlFor="skills">Skills:</label>
      <input
        type="text"
        id="skills"
        required
        value={editedCard.skills}
        onChange={(event) =>
          setEditedCard({ ...editedCard, skills: event.target.value })
        }
      />

      <label htmlFor="needs">Needs:</label>
      <input
        type="text"
        id="needs"
        required
        value={editedCard.needs}
        onChange={(event) =>
          setEditedCard({ ...editedCard, needs: event.target.value })
        }
      />

      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        required
        value={editedCard.email}
        onChange={(event) =>
          setEditedCard({ ...editedCard, email: event.target.value })
        }
      />

      <label htmlFor="phone">Phone:</label>
      <input
        type="tel"
        id="phone"
        required
        value={editedCard.phone}
        onChange={(event) =>
          setEditedCard({ ...editedCard, phone: event.target.value })
        }
      />

      <ServiceButton type="submit" disabled={isSaving}>
        {isSaving ? "Saving..." : "Save"}
      </ServiceButton>
    </form>
  );
}
