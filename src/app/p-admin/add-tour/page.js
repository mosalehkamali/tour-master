// app/add-tour/page.js
"use client";

import React, { useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

const FormWrapper = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  margin-top: 3rem;
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
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #218838;
  }
`;

const AddTourPage = () => {
  const router = useRouter();
  const [tourData, setTourData] = useState({
    name: "",
    date: "",
    price: "",
    description: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTourData({ ...tourData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setTourData({ ...tourData, image: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", tourData.name);
    formData.append("date", tourData.date);
    formData.append("price", tourData.price);
    formData.append("description", tourData.description);
    formData.append("image", tourData.image);

    try {
      const res = await fetch("/api/tour/create", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        router.push("/");
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
      <FormTitle>افزودن تور جدید</FormTitle>
      <form onSubmit={handleSubmit}>
        <p>عنوان تور</p>
        <Input
          type="text"
          name="name"
          placeholder="نام تور"
          value={tourData.name}
          onChange={handleChange}
          required
        />
        <p>تاریخ سفر</p>
        <DatePicker
        value={tourData.date}
          onChange={(date) => {
              setTourData({...tourData, date:`${date.year}/${date.month.number}/${date.day}`})
          }}
          calendar={persian}
          locale={persian_fa}
          calendarPosition="bottom-right"
        />
        <p>هزینه تور</p>
        <Input
         onWheel={(e) => e.target.blur()} 
          type="number"
          name="price"
          placeholder="هزینه تور برای هر نفر"
          value={tourData.price}
          onChange={handleChange}
          required
        />
        <p>توضیحات</p>
        <TextArea
          name="description"
          placeholder="توضیحات"
          value={tourData.description}
          onChange={handleChange}
          required
        />
        <p>تصویر</p>
        <Input
          type="file"
          name="image"
          onChange={handleFileChange}
          accept="image/*"
          required
        />
        <Button type="submit">افزودن</Button>
      </form>
    </FormWrapper>
  );
};

export default AddTourPage;
