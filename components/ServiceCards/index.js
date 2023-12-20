import React, { useState } from "react";
import StarRating from "../StarRating";

export default function ServiceProvider({
  firstName,
  lastName,
  skills,
  needs,
  email,
  phone,
}) {
  const [showContactInfo, setShowContactInfo] = useState(false);
  const [rating, setRating] = useState(0);
  const [isRated, setIsRated] = useState(false);
  const toggleContactInfo = () => {
    setShowContactInfo(!showContactInfo);
  };

  const handleRating = () => {
    if (!isRated) {
      setIsRated(true);
    } else {
      alert("You have already rated.");
    }
  };

  return (
    <div className="service-provider">
      <h2>
        {firstName} {lastName}
      </h2>
      <p>
        <strong>Skills:</strong> {skills}
      </p>
      <p>
        <strong>Needs:</strong> {needs}
      </p>

      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <StarRating rating={rating} setRating={setRating} />
        <button onClick={handleRating}>Rate Me</button>
      </div>

      {showContactInfo ? (
        <div>
          <p>
            <strong>Email:</strong> {email}
          </p>
          <p>
            <strong>Phone:</strong> {phone}
          </p>
        </div>
      ) : null}

      <button onClick={toggleContactInfo}>
        {showContactInfo ? "Hide Contact" : "Show Contact"}
      </button>
    </div>
  );
}
