import { useState } from "react";

export default function ServiceProvider({
  id,
  firstName,
  lastName,
  skills,
  needs,
  email,
  phone,
  onDelete
}) {
  const [showContactInfo, setShowContactInfo] = useState(false);

  const toggleContactInfo = () => {
    setShowContactInfo(!showContactInfo);
  };

  return (
    <div className="service-provider">
      <h2>{firstName} {lastName}</h2>
      <p><strong>Skills:</strong> {skills}</p>
      <p><strong>Needs:</strong> {needs}</p>

      {showContactInfo && (
        <div>
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Phone:</strong> {phone}</p>
        </div>
      )}

      <button onClick={toggleContactInfo}>
        {showContactInfo ? "Hide Contact" : "Show Contact"}
      </button>
      <button onClick={() => onDelete(id)}>Delete</button>
    </div>
  );
}