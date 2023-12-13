import { useState } from "react";
import Link from "next/link";
import ServiceProvider from "@/components/ServiceCard";
import styled from "styled-components";
import { serviceProviders } from "@/lib/data.js";
import { filterProviders } from "@/components/FilterService";

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

export default function ServiceCards() {
  const [skillsFilter, setSkillsFilter] = useState("");
  const [needsFilter, setNeedsFilter] = useState("");
  const [isFiltering, setIsFiltering] = useState(false);

  const handleToggleFilter = () => {
    setIsFiltering(!isFiltering);
  };

  const filteredProviders = filterProviders(
    serviceProviders,
    skillsFilter,
    needsFilter
  );

  const uniqueSkills = [
    ...new Set(serviceProviders.flatMap((provider) => provider.skills)),
  ];
  const uniqueNeeds = [
    ...new Set(serviceProviders.flatMap((provider) => provider.needs)),
  ];

  return (
    <>
      <Header>
        <Link href="/">
          <BackLink>&larr; Web Development</BackLink>
        </Link>
      </Header>

      <main>
        <button onClick={handleToggleFilter}>
          {isFiltering ? "Hide Filters" : "Show Filters"}
        </button>
        {isFiltering && (
          <>
            <div>
              <label>Skills:</label>
              <select
                value={skillsFilter}
                onChange={(e) => setSkillsFilter(e.target.value)}
              >
                <option value="">All Skills</option>
                {uniqueSkills.map((skill) => (
                  <option key={skill} value={skill}>
                    {skill}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Needs:</label>
              <select
                value={needsFilter}
                onChange={(e) => setNeedsFilter(e.target.value)}
              >
                <option value="">All Needs</option>
                {uniqueNeeds.map((need) => (
                  <option key={need} value={need}>
                    {need}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}

        <CardWrapper>
          {filteredProviders.map((provider) => (
            <Card key={provider.id}>
              <ServiceProvider
                firstName={provider.firstName}
                lastName={provider.lastName}
                skills={provider.skills}
                needs={provider.needs}
                email={provider.email}
                phone={provider.phone}
              />
            </Card>
          ))}
        </CardWrapper>
      </main>
    </>
  );
}
