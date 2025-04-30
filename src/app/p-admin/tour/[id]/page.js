// app/tour/[id]/page.js
"use client";

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import { RiFileExcel2Fill } from "react-icons/ri";
const XLSX = require("xlsx");

const TourDetailsWrapper = styled.div`
  max-width: 900px;
  margin: 40px auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px) saturate(200%);
  -webkit-backdrop-filter: blur(10px) saturate(200%);
  background-color: rgba(206, 207, 210, 0.89);
`;

const TourTitle = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

const InfoBlock = styled.div`
  margin-bottom: 20px;
`;

const InfoLabel = styled.span`
  font-weight: bold;
  margin-right: 10px;
`;

const InfoValue = styled.span`
  color: #555;
`;

const PassengerList = styled.div`
  margin-top: 30px;
`;

const PassengerCard = styled.div`
  background-color: white;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const Button = styled.button`
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
const TourDetailsPage = ({ params }) => {
  const { id } = params;
  const [tourDetails, setTourDetails] = useState();
  const [debts, setDebts] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchTourDetails = async () => {
      const res = await fetch(`/api/tour/${id}`);
      const data = await res.json();
      setTourDetails(data);
    };

    fetchTourDetails();
  }, [id]);

  if (!tourDetails) {
    return <p>Loading...</p>;
  }

  const { tour } = tourDetails;

  const passengers = tour.travelers;

  const exportExcel = async () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(passengers);

    XLSX.utils.book_append_sheet(wb, ws, "sheet1");
    XLSX.writeFile(wb, `${tour.name}.xlsx`);
  };

  const getDebt = async (travelerId) => {
    try {
      const res = await fetch(`/api/travelers/userTours/${travelerId}/`);
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "خطا در دریافت اطلاعات");

      data.tours.map((tour) => {
        const tourId = tour._id;
        if (tourId.toString() === id) {
          setDebts(tour.remainingDebt);
        }
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <TourDetailsWrapper>
      <TourTitle>{tour.name}</TourTitle>
      <Button onClick={exportExcel}>
        دانلود فایل اکسل <RiFileExcel2Fill />
      </Button>

      <PassengerList>
        <h2>مسافران</h2>
        {passengers.map((passenger) => (
          <PassengerCard key={passenger._id}>
            <InfoBlock>
              <InfoLabel>نام و نام خانوادگی:</InfoLabel>
              <InfoValue>{`${passenger.name}`}</InfoValue>
            </InfoBlock>
            <InfoBlock>
              <InfoLabel>کدملی:</InfoLabel>
              <InfoValue>{passenger.personalId}</InfoValue>
            </InfoBlock>
            <InfoBlock>
              <InfoLabel>تاریخ تولد:</InfoLabel>
              <InfoValue>{passenger.birthDate}</InfoValue>
            </InfoBlock>
            <InfoBlock>
              <InfoLabel>جنسیت:</InfoLabel>
              <InfoValue>{passenger.gender === "man" ? "مرد" : "زن"}</InfoValue>
            </InfoBlock>
            <InfoBlock>
              <InfoLabel>شماره تلفن:</InfoLabel>
              <InfoValue>{passenger.phone}</InfoValue>
            </InfoBlock>
            <InfoBlock>
              <InfoLabel>آدرس:</InfoLabel>
              <InfoValue>{passenger.address}</InfoValue>
            </InfoBlock>
            <InfoBlock>
              <InfoLabel>بدهی:</InfoLabel>
              <InfoValue onLoad={getDebt(passenger._id)}>
                {debts?.toLocaleString()}
              </InfoValue>
            </InfoBlock>
          </PassengerCard>
        ))}
      </PassengerList>
    </TourDetailsWrapper>
  );
};

export default TourDetailsPage;
