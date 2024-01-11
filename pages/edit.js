import React from "react";
import ServiceButton from "@/components/ServiceButton";
import { useRouter } from "next/router";
import useSWR, { mutate } from "swr";

export default function EditForm({ editedCard, setEditedCard }) {
  const router = useRouter();

  const { id } = router.query;

  console.log("id", id);
  const { data, error } = useSWR(`/api/providers/${id}`);

  console.log("data", data);
  if (error) return <div>Failed to load</div>;

  if (!data) return <div>Loading...</div>;

  async function handleEditServiceCard() {
    const url = `/api/providers/${id}`;
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
    }
  }

  const handleSave = (event) => {
    event.preventDefault();

    handleEditServiceCard(editedCard);
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

      <ServiceButton type="submit">Save</ServiceButton>
    </form>
  );
}
