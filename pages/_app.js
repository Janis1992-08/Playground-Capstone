import GlobalStyle from "../styles";
import useLocalStorageState from "use-local-storage-state";

export default function App({ Component, pageProps }) {
  const [serviceCards, setServiceCards] = useLocalStorageState("serviceCards", {
    defaultValue: [],
  });

  const handleServiceCardsChange = (newServiceCards) => {
    setServiceCards(newServiceCards);
  };

  return (
    <>
      <GlobalStyle />
      <Component
        {...pageProps}
        serviceCards={serviceCards}
        setServiceCards={setServiceCards}
        onServiceCardsChange={handleServiceCardsChange}
      />
    </>
  );
}
