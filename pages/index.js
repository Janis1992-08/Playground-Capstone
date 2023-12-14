import React, { useState } from "react";
import Link from "next/link";
import { categories } from "@/lib/data";

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

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory((prevSelectedCategory) =>
      prevSelectedCategory === categoryId ? null : categoryId
    );
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        ServiceCircle
      </h1>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Find your perfect Service-Match
      </h2>
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
                      {subcategory.name}
                    </Link>{" "}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
