"use client";
// app/page.js
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaTrash, FaPlus } from "react-icons/fa";
import { useRouter } from "next/navigation"; // useRouter in App Router

const TourList = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
`;

const TourCard = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled.button`
  background-color: var(--red);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    /* background-color: var(--lowBlue); */
    opacity: 70%;
  };
  transition: all .3s ease-in-out;
`;

const AddTourButton = styled(Button)`
  background-color: var(--blue);
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const TourPageLink = styled.a`
  color:var(--green);
  cursor: pointer;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 900;
`;

const HomePage = () => {
  const [tours, setTours] = useState([]);
  const router = useRouter();


  const checkAuth = () => {
    const cookies = document.cookie.split(';').reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split('=');
      acc[key] = value;
      return acc;
    }, {});

    if (!cookies.authToken) {
      router.push('/p-admin/admin-auth');
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    const fetchTours = async () => {
      const res = await fetch("/api/tour");
      const data = await res.json();
      setTours(data);
    };

    fetchTours();
  }, []);

  const handleDelete = async (id) => {
    await fetch(`/api/tour/remove/${id}`, {
      method: "DELETE",
    });
    setTours(tours.filter((tour) => tour._id !== id));
  };

  return (
    <div style={{padding:"3rem 1rem"}}>
      <AddTourButton onClick={() => router.push("/p-admin/add-tour")}>
        <FaPlus /> اضافه کردن تور جدید
      </AddTourButton>
      <TourList>
        {tours.map((tour) => (
          <TourCard key={tour._id}>
            <div>
              <TourPageLink
                onClick={() => router.push(`/p-admin/tour/${tour._id}`)}
              >
                {tour.name}
              </TourPageLink>
              <p>{tour.description}</p>
              <p>{tour.date}</p>
              <p>{tour.price}</p>
            </div>
            <Button onClick={() => handleDelete(tour._id)}>
              <FaTrash />
            </Button>
          </TourCard>
        ))}
      </TourList>
    </div>
  );
};

export default HomePage;
