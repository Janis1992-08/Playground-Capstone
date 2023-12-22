import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import ServiceProvider from "@/components/ServiceCards"; // تأكد من صحة المسار
import styled from "styled-components";
import { categories } from "@/lib/data.js";

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
  padding: 20px;
  width: 300px;
  transition: box-shadow 0.3s ease;
  &:hover {
    box-shadow: 0 0 40px rgba(0, 0, 0, 0.1);
  }
`;

const SubcategoryPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    const foundSubcategory = categories
      .flatMap((category) => category.subcategories)
      .find((sub) => sub.id === id);

    if (foundSubcategory) {
      setProviders(foundSubcategory.providers);
    }
  }, [id]);

  const handleDelete = (providerId) => {
    setProviders((prevProviders) => prevProviders.filter(provider => provider.id !== providerId));
  };

  return (
    <>
      <Header>
        <Link href="/">
          <BackLink> &larr; Back to Categories</BackLink>
        </Link>
      </Header>

      <main>
        <CardWrapper>
          {providers.map((provider) => (
            <Card key={provider.id}>
              <ServiceProvider
                id={provider.id}
                firstName={provider.firstName}
                lastName={provider.lastName}
                skills={provider.skills}
                needs={provider.needs}
                email={provider.email}
                phone={provider.phone}
                onDelete={() => handleDelete(provider.id)}
              />
            </Card>
          ))}
        </CardWrapper>
      </main>
    </>
  );
};

export default SubcategoryPage;