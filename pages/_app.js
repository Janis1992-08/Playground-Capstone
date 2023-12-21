import { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme, GlobalStyles } from "../styles/GlobalStyles";
import styled from "styled-components";

// Styled component for the dark mode switch
const SwitchButton = styled.label`
  position: fixed;
  top: 10px;
  right: 10px;
  display: flex;
  align-items: center;
`;

const SwitchInput = styled.input`
  margin-left: 10px;
  appearance: none;
  width: 40px;
  height: 20px;
  background-color: #3498db;
  border-radius: 10px;
  position: relative;
  cursor: pointer;
  outline: none;

  &:before {
    content: "";
    position: absolute;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: white;
    transition: transform 0.3s ease;
    transform: ${({ checked }) =>
      checked ? "translateX(20px)" : "translateX(0)"};
  }
`;

export default function App({ Component, pageProps }) {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "light";
    setTheme(storedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyles />
      <Component {...pageProps} toggleTheme={toggleTheme} theme={theme} />
      <SwitchButton>
        Dark Mode
        <SwitchInput
          type="checkbox"
          checked={theme === "dark"}
          onChange={toggleTheme}
        />
      </SwitchButton>
    </ThemeProvider>
  );
}