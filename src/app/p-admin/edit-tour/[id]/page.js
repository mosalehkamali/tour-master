// app/add-tour/page.js
"use client";

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

const FormWrapper = styled.div`
  max-width: 600px;
  margin: 3rem auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px) saturate(200%);
  -webkit-backdrop-filter: blur(10px) saturate(200%);
  background-color: rgba(206, 207, 210, 0.89);
`;

const FormTitle = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color:var(--blue);
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color:var(--lowBlue);
  }
`;

const EditTourPage = ({ params }) => {
  const router = useRouter();
  const [tour, setTour] = useState([]);
  const [tourData, setTourData] = useState({
    name: "",
    date: "",
    price: "",
    description: "",
    image: null,
  });

  const { id } = params;
  useEffect(() => {
    const getTour = async () => {
      const res = await fetch(`/api/tour/${id}`);
      const data = await res.json();
      setTour(data.tour);
    };
    
    getTour();
  }, [id]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTourData({ ...tourData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/tour/edit/${id}`, {
        method: "PUT",
        body: JSON.stringify(tourData),
      });
      if (res.ok) {
        router.push("/p-admin");
      } else {
        alert("Failed to add tour");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while adding the tour");
    }
  };

  return (
    <FormWrapper>
      <FormTitle>ویرایش :{tour.name}</FormTitle>
      <form onSubmit={handleSubmit}>
        <p>عنوان تور: {tour.name}</p>
        <Input
          type="text"
          name="name"
          placeholder="عنوان جدید را وارد کنید"
          value={tourData.name}
          onChange={handleChange}
          required
        />
        <p>تاریخ سفر: {tour.date}</p>
        <DatePicker
          value={tourData.date}
          onChange={(date) => {
            setTourData({
              ...tourData,
              date: `${date.year}/${date.month.number}/${date.day}`,
            });
          }}
          calendar={persian}
          locale={persian_fa}
          calendarPosition="bottom-right"
        />
        <p>هزینه تور: {(tour.price)?.toLocaleString()} تومان</p>
        <Input
          onWheel={(e) => e.target.blur()}
          type="number"
          name="price"
          placeholder="مبلغ هزینه جدید را وارد کنید"
          value={tourData.price}
          onChange={handleChange}
          required
        />
        <p>توضیحات</p>
        <TextArea
          name="description"
          placeholder={tour.description}
          value={tourData.description}
          onChange={handleChange}
          required
        />
        <Button type="submit">تایید ویرایش</Button>
      </form>
    </FormWrapper>
  );
};

export default EditTourPage;
