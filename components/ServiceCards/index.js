import { useState } from "react";
import styled from "styled-components";
import StarRating from "../StarRating";
import useLocalStorageState from "use-local-storage-state";

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

export default function ServiceProvider({
  id,
  firstName,
  lastName,
  skills,
  needs,
  email,
  phone,
}) {
  const [showContactInfo, setShowContactInfo] = useState(false);
  const [isRated, setIsRated] = useLocalStorageState(`isRated-${id}`, {
    defaultValue: false,
  });
  const [rating, setRating] = useLocalStorageState(`rating-${id}`, {
    defaultValue: 0,
  });

  const toggleContactInfo = () => {
    setShowContactInfo(!showContactInfo);
  };

  const handleRating = () => {
    if (!isRated) {
      setIsRated(true);
      setRating(rating);
      alert("You have successfully rated!");
    } else {
      alert("You have already rated.");
    }
  };

  return (
    <ServiceProviderWrapper>
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
        <StarRating rating={rating} setRating={setRating} isRated={isRated} />
        {!isRated && <button onClick={handleRating}>Rate Me</button>}
      </div>

      {showContactInfo && (
        <ServiceDetails>
          <p>
            <strong>Email:</strong> {email}
          </p>
          <p>
            <strong>Phone:</strong> {phone}
          </p>
        </ServiceDetails>
      )}

      <ServiceButton type="button" onClick={toggleContactInfo}>
        {showContactInfo ? "Hide Contact" : "Show Contact"}
      </ServiceButton>
    </ServiceProviderWrapper>
  );
}
