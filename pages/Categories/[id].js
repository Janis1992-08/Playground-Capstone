import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import ServiceProvider from "../../components/ServiceProvider";
import styled from "styled-components";
import { categories } from "@/lib/data.js";
import FavoriteButton from "@/components/FavoriteButton";

const Header = styled.header`
  background-color: #f0f0f0;
  padding: 20px;
  text-align: center;
  border-bottom: 1px solid #ccc;
`;

const BackLink = styled.h1`
  color: #333;
  text-decoration: none;
  font-weight: bold;
  &:hover {
    opacity: 0.8;
  }
`;

const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding: 20px;
`;

const Card = styled.div`
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  width: 300px;
  position: relative;
  text-align: center;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 0 40px rgba(0, 0, 0, 0.1);
  }
`;
const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FilterControls = styled.div`
  display: flex;
  align-items: center;
`;

const FilterLabel = styled.label`
  margin-right: 10px;
`;

const FilterInput = styled.input`
  margin-right: 10px;
`;
const SubcategoryPage = ({
  serviceCards,
  setServiceCards,
  favorites,
  onToggleFavorite,
}) => {
  const [filterType, setFilterType] = useState("all");
  const [filterValue, setFilterValue] = useState("");
  const router = useRouter();
  const { id } = router.query;

  // Find the subcategory based on the ID in the categories
  const foundSubcategory = categories
    .flatMap((category) => category.subcategories)
    .find((sub) => sub.id === id);

  if (!foundSubcategory) {
    return <div>Unterkategorie nicht gefunden</div>;
  }

  const handleFilterTypeChange = (newFilterType) => {
    setFilterType(newFilterType);
    setFilterValue("");
  };

  const filteredServiceCards = serviceCards.filter(
    (card) => card.subcategory === foundSubcategory.name
  );

  const filteredProviders = filteredServiceCards.filter((provider) => {
    if (filterType === "all") {
      return (
        provider.skills.toLowerCase().includes(filterValue.toLowerCase()) ||
        provider.needs.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    return provider[filterType]
      .toLowerCase()
      .includes(filterValue.toLowerCase());
  });

  return (
    <>
      <Header>
        <HeaderWrapper>
          <Link href="/">
            <BackLink> &larr; {foundSubcategory.name}</BackLink>
          </Link>
        </HeaderWrapper>
        <FilterControls>
          <FilterLabel>
            Filter by:
            <select
              value={filterType}
              onChange={(e) => handleFilterTypeChange(e.target.value)}
            >
              <option value="all"> All</option>
              <option value="skills"> Skills</option>
              <option value="needs"> Needs</option>
            </select>
          </FilterLabel>
          <FilterInput
            type="text"
            placeholder={`Enter ${
              filterType === "all"
                ? "skills or needs"
                : filterType.toLowerCase()
            }...`}
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
          />
        </FilterControls>
      </Header>

      <main>
        <CardWrapper>
          {filteredProviders.map((card) => (
            <Card key={card.id}>
              <FavoriteButton
                onClick={() => onToggleFavorite(card.id)}
                isFavorite={favorites.includes(card.id)}
              />
              <ServiceProvider
                key={card.id}
                card={card}
                serviceCards={serviceCards}
                setServiceCards={setServiceCards}
              />
            </Card>
          ))}
        </CardWrapper>
      </main>
    </>
  );
};

export default SubcategoryPage;
