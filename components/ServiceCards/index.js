import { useState } from "react";

export default function ServiceProvider({
  firstName,
  lastName,
  skills,
  needs,
  email,
  phone,
}) {
  const [showContactInfo, setShowContactInfo] = useState(false);

  const toggleContactInfo = () => {
    setShowContactInfo(!showContactInfo);
  };

  return (
    <div className="service-provider">
      <h2>
        {firstName} {lastName}
      </h2>
      <h4>
        <strong>Skills:</strong> {skills}
      </h4>
      <h4>
        <strong>Needs:</strong> {needs}
      </h4>

      {showContactInfo ? (
        <div>
          <h5>
            <strong>Email:</strong> {email}
          </h5>
          <h6>
            <strong>Phone:</strong> {phone}
          </h6>
        </div>
      ) : null}

      <button onClick={toggleContactInfo}>
        {showContactInfo ? "Hide Contact" : "Show Contact"}
      </button>
    </div>
  );
}
