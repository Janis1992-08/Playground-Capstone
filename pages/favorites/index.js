import ServiceProvider from "@/components/ServiceProvider";
import styled from "styled-components";
import FavoriteButton from "@/components/FavoriteButton";
import Link from "next/link";
import useSWR from "swr";
import { useRouter } from "next/router";

const Headline = styled.h1`
  color: #333;
  text-decoration: none;
  font-weight: bold;
  &:hover {
    opacity: 0.8;
  }
`;

const CardWrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding: 20px;
`;

const Card = styled.li`
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  list-style: none;
  padding: 20px;
  width: 300px;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 0 40px rgba(0, 0, 0, 0.1);
  }
`;

const FavoritesPage = ({ favorites, onToggleFavorite }) => {
  const router = useRouter();
  const { isReady } = router;
  const { data } = useSWR("/api/providers");
  if (!data || !isReady) return <div>Loading...</div>;

  const favoriteCards = data
    ? data.filter((card) => favorites.includes(card._id))
    : [];

  return (
    <>
      <Link href="/">
        <Headline> &larr; Favorites</Headline>
      </Link>

      <main>
        <CardWrapper>
          {favoriteCards.map((card) => (
            <Card key={card._id}>
              <FavoriteButton
                onClick={() => onToggleFavorite(card._id)}
                isFavorite={favorites.includes(card._id)}
              />
              <ServiceProvider
                key={card._id}
                card={card}
                isOnFavoritesPage={true}
              />
            </Card>
          ))}
        </CardWrapper>
      </main>
    </>
  );
};

export default FavoritesPage;
