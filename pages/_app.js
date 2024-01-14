import { SWRConfig } from "swr";
import GlobalStyle from "../styles";
import useLocalStorageState from "use-local-storage-state";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { FiSun, FiMoon } from "react-icons/fi";
import { lightTheme, darkTheme } from "../styles";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((response) => response.json());

const SwitchLabel = styled.label`
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

export default function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = useState("light");
  const [favorites, setFavorites] = useLocalStorageState("favorites", []);
  const { data } = useSWR("/api/providers", fetcher);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "light";
    setTheme(storedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  async function handleToggleFavorite(serviceCardId) {
    const isFavorite = favorites.includes(serviceCardId);
    if (isFavorite) {
      const response = await fetch(`/api/providers/${serviceCardId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setFavorites(favorites.filter((id) => id !== serviceCardId));
      }
    } else {
      const response = await fetch(`/api/providers/${serviceCardId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isFavorite: true }),
      });
      if (response.ok) {
        setFavorites([...favorites, serviceCardId]);
      }
    }
  }

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyle />
      <SWRConfig value={{ fetcher }}>
        <Component
          {...pageProps}
          toggleTheme={toggleTheme}
          theme={theme}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
        />
        <SwitchLabel onClick={toggleTheme}>
          {theme === "light" ? <FiSun /> : <FiMoon />}
          <SwitchInput
            type="checkbox"
            checked={theme === "dark"}
            onChange={toggleTheme}
          />
        </SwitchLabel>
      </SWRConfig>
    </ThemeProvider>
  );
}
