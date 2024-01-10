import React, { useState } from "react";
import styled from "styled-components";
import ServiceButton from "@/components/ServiceButton";

const ServiceProviderWrapper = styled.div`
  border: 1px solid #ccc;
  padding: 20px;
  margin: 10px;
  border-radius: 8px;
`;

const ServiceDetails = styled.div`
  margin-top: 10px;
`;

export default function ServiceProvider({ card }) {
  const [showContactInfo, setShowContactInfo] = useState(false);

  const toggleContactInfo = () => {
    setShowContactInfo(!showContactInfo);
  };

  return (
    <ServiceProviderWrapper key={card._id}>
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
      </div>
    </ServiceProviderWrapper>
  );
}
