import React, { useState } from "react";
import Link from "next/link";
import { categories } from "@/lib/data";
import styled from "styled-components";

const buttonStyle = {
  backgroundColor: "#3498db",
  color: "white",
  padding: "10px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  width: "100%",
  textAlign: "left",
};

const selectedButtonStyle = {
  ...buttonStyle,
  backgroundColor: "#4CAF50",
};

const subcategoryStyle = {
  backgroundColor: "#f2f2f2",
  padding: "8px",
  margin: "5px 0",
  borderRadius: "5px",
};

const CenteredButton = styled.button`
  display: block;
  margin: 20px auto;
  padding: 15px 30px;
  border-radius: 8px;
  background-color: darkorange;
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 1.2em;
  text-decoration: none;
  text-align: center;
  outline: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ff7f00;
    text-decoration: none;
  }
`;

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory((prevSelectedCategory) =>
      prevSelectedCategory === categoryId ? null : categoryId
    );
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        position: "relative",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        ServiceCircle
      </h1>
      <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
        Find your perfect Service-Match
      </h3>
      <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
        {categories.map((category) => (
          <li key={category.id} style={{ marginBottom: "10px" }}>
            <button
              onClick={() => handleCategoryClick(category.id)}
              style={
                selectedCategory === category.id
                  ? selectedButtonStyle
                  : buttonStyle
              }
            >
              {category.name}
            </button>
            {selectedCategory === category.id && (
              <ul
                style={{
                  listStyleType: "none",
                  paddingLeft: "20px",
                  margin: 0,
                }}
              >
                {category.subcategories.map((subcategory) => (
                  <li key={subcategory.id} style={subcategoryStyle}>
                    <Link href={`/Categories/${subcategory.id}`}>
                      {subcategory.name} &rarr;
                    </Link>{" "}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
      <Link href="/dashboard/services/create">
        <CenteredButton>
          <span>Make a Service Offer</span>
        </CenteredButton>
      </Link>
    </div>
  );
};

export default App;