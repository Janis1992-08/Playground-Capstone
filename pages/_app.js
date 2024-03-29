import { SWRConfig } from "swr";
import GlobalStyle from "../styles";
import useLocalStorageState from "use-local-storage-state";

const fetcher = (url) => fetch(url).then((response) => response.json());

export default function MyApp({ Component, pageProps }) {
  const [serviceCards, setServiceCards] = useLocalStorageState("serviceCards", {
    defaultValue: [],
  });
  const [favorites, setFavorites] = useLocalStorageState("favorites", {
    defaultValue: [],
  });

  function handleEditServiceCard(updatedServiceCard) {
    const updatedCards = serviceCards.map((card) =>
      card.id === updatedServiceCard.id ? updatedServiceCard : card
    );
    setServiceCards(updatedCards);
  }

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
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
        />
      </SWRConfig>
    </>
  );
}
