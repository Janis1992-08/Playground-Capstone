import { useState } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { categories } from "@/lib/data";
import Link from "next/link";
import ServiceProvider from "@/components/ServiceCards";

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin: 20px;
`;

const InputField = styled.input`
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const SelectField = styled.select`
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  padding: 8px 15px;
  border-radius: 5px;
  border: none;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
`;

const BackLink = styled.a`
  display: inline-block;
  padding: 5px 10px;
  border-radius: 5px;
  background-color: #007bff;
  color: #fff;
  text-decoration: none;
  margin-bottom: 20px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
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

export default function CreateServiceCardForm() {
  const initialFormData = {
    firstName: "",
    lastName: "",
    skills: "",
    needs: "",
    email: "",
    phone: "",
    category: "",
    subcategory: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [serviceCards, setServiceCards] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newServiceCard = { ...formData, id: uuidv4() };
    setServiceCards([...serviceCards, newServiceCard]);
    setFormData(initialFormData);
  };

  const handleDelete = (id) => {
    setServiceCards(cards => cards.filter(card => card.id !== id));
  };

  return (
    <>
      <Link href="/">
        <BackLink>&larr; Back to Categories</BackLink>
      </Link>

      <FormWrapper onSubmit={handleSubmit}>
        <Button type="submit">Create Service Card</Button>
      </FormWrapper>

      {serviceCards.map((provider) => (
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
    </>
  );
}