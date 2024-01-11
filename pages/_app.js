import { SWRConfig } from "swr";
import GlobalStyle from "../styles";
import useLocalStorageState from "use-local-storage-state";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((response) => response.json());

export default function MyApp({ Component, pageProps }) {
  const [serviceCards, setServiceCards] = useLocalStorageState("serviceCards", {
    defaultValue: [],
  });
  const [favorites, setFavorites] = useLocalStorageState("favorites", {
    defaultValue: [],
  });

  const { mutate } = useSWR("/api/providers/");

  function handleEditServiceCard(updatedServiceCard) {
    const updatedCards = serviceCards.map((card) =>
      card.id === updatedServiceCard.id ? updatedServiceCard : card
    );
    setServiceCards(updatedCards);
  }

  /*   function handleAddServiceCards(newServiceCard) {
    setServiceCards((prevServiceCards) => [
      ...prevServiceCards,
      newServiceCard,
    ]);
  } */

  const handleAddServiceCards = async (formData) => {
    const response = await fetch("/api/providers/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const newServiceCard = await response.json();
      setServiceCards((prevServiceCards) => [
        ...prevServiceCards,
        newServiceCard,
      ]);
    } else {
      throw new Error(`Error: ${response.statusText}`);
    }
  };

  function handleToggleFavorite(serviceCardId) {
    const isFavorite = favorites.includes(serviceCardId);
    if (isFavorite) {
      setFavorites(favorites.filter((id) => id !== serviceCardId));
    } else {
      setFavorites([...favorites, serviceCardId]);
    }
  }

  return (
    <>
      <GlobalStyle />
      <SWRConfig value={{ fetcher }}>
        <Component
          {...pageProps}
          serviceCards={serviceCards}
          setServiceCards={setServiceCards}
          handleEditServiceCard={handleEditServiceCard}
          handleAddServiceCards={handleAddServiceCards}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
        />
      </SWRConfig>
    </>
  );
}
