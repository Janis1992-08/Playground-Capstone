import React from "react";
import ServiceButton from "@/components/ServiceButton";

function EditForm({ editedCard, setEditedCard, handleSave }) {
  return (
    <div>
      <h2>
        {editedCard.firstName} {editedCard.lastName}
      </h2>
      <input
        type="text"
        required
        value={editedCard.firstName}
        onChange={(event) =>
          setEditedCard({ ...editedCard, firstName: event.target.value })
        }
      />
      <input
        type="text"
        required
        value={editedCard.lastName}
        onChange={(event) =>
          setEditedCard({ ...editedCard, lastName: event.target.value })
        }
      />
      <input
        type="text"
        required
        value={editedCard.skills}
        onChange={(event) =>
          setEditedCard({ ...editedCard, skills: event.target.value })
        }
      />

      <input
        type="text"
        required
        value={editedCard.needs}
        onChange={(event) =>
          setEditedCard({ ...editedCard, needs: event.target.value })
        }
      />

      <input
        type="email"
        required
        value={editedCard.email}
        onChange={(event) =>
          setEditedCard({ ...editedCard, email: event.target.value })
        }
      />

      <input
        type="tel"
        required
        value={editedCard.phone}
        onChange={(event) =>
          setEditedCard({ ...editedCard, phone: event.target.value })
        }
      />

      <ServiceButton type="button" onClick={handleSave}>
        Save
      </ServiceButton>
    </div>
  );
}

function ServiceProviderEdit({ editedCard, setEditedCard, handleSave }) {
  return (
    <EditForm
      editedCard={editedCard}
      setEditedCard={setEditedCard}
      handleSave={handleSave}
    />
  );
}

export default ServiceProviderEdit;
