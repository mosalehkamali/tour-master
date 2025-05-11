// // app/tour/[id]/page.js
// "use client";

// import React, { useEffect, useState } from "react";
// import styled from "styled-components";
// import { useRouter } from "next/navigation";
// import { RiFileExcel2Fill } from "react-icons/ri";
// const XLSX = require("xlsx");

// const TourDetailsWrapper = styled.div`
//   max-width: 900px;
//   margin: 40px auto;
//   padding: 20px;
//   border-radius: 8px;
//   box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
//   box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
//   backdrop-filter: blur(10px) saturate(200%);
//   -webkit-backdrop-filter: blur(10px) saturate(200%);
//   background-color: rgba(206, 207, 210, 0.89);
// `;

// const TourTitle = styled.h1`
//   text-align: center;
//   margin-bottom: 20px;
// `;

// const InfoBlock = styled.div`
//   margin-bottom: 20px;
// `;

// const InfoLabel = styled.span`
//   font-weight: bold;
//   margin-right: 10px;
// `;

// const InfoValue = styled.span`
//   color: #555;
// `;

// const PassengerList = styled.div`
//   margin-top: 30px;
// `;

// const PassengerCard = styled.div`
//   background-color: white;
//   padding: 15px;
//   margin-bottom: 10px;
//   border-radius: 8px;
//   box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
// `;

// const Button = styled.button`
//   padding: 10px;
//   background-color: #28a745;
//   color: white;
//   border: none;
//   border-radius: 5px;
//   font-size: 16px;
//   cursor: pointer;
//   &:hover {
//     background-color: #218838;
//   }
// `;
// const TourDetailsPage = ({ params }) => {
//   const { id } = params;
//   const [tourDetails, setTourDetails] = useState();
//   const [debts, setDebts] = useState("");
//   const router = useRouter();

//   useEffect(() => {
//     const fetchTourDetails = async () => {
//       const res = await fetch(`/api/tour/${id}`);
//       const data = await res.json();
//       setTourDetails(data);
//     };

//     fetchTourDetails();
//   }, [id]);

//   if (!tourDetails) {
//     return <p>Loading...</p>;
//   }

//   const { tour } = tourDetails;

//   const passengers = tour.travelers;

//   const exportExcel = async () => {
//     const wb = XLSX.utils.book_new();
//     const ws = XLSX.utils.json_to_sheet(passengers);

//     XLSX.utils.book_append_sheet(wb, ws, "sheet1");
//     XLSX.writeFile(wb, `${tour.name}.xlsx`);
//   };

//   const getDebt = async (travelerId) => {
//     try {
//       const res = await fetch(`/api/travelers/userTours/${travelerId}/`);
//       const data = await res.json();

//       if (!res.ok) throw new Error(data.error || "خطا در دریافت اطلاعات");

//       data.tours.map((tour) => {
//         const tourId = tour._id;
//         if (tourId.toString() === id) {
//           setDebts(tour.remainingDebt);
//         }
//       });
//     } catch (err) {
//       console.log(err.message);
//     }
//   };

//   return (
//     <TourDetailsWrapper>
//       <TourTitle>{tour.name}</TourTitle>
//       <Button onClick={exportExcel}>
//         دانلود فایل اکسل <RiFileExcel2Fill />
//       </Button>

//       <PassengerList>
//         <h2>مسافران</h2>
//         {passengers.map((passenger) => (
//           <PassengerCard key={passenger._id}>
//             <InfoBlock>
//               <InfoLabel>نام و نام خانوادگی:</InfoLabel>
//               <InfoValue>{`${passenger.name}`}</InfoValue>
//             </InfoBlock>
//             <InfoBlock>
//               <InfoLabel>کدملی:</InfoLabel>
//               <InfoValue>{passenger.personalId}</InfoValue>
//             </InfoBlock>
//             <InfoBlock>
//               <InfoLabel>تاریخ تولد:</InfoLabel>
//               <InfoValue>{passenger.birthDate}</InfoValue>
//             </InfoBlock>
//             <InfoBlock>
//               <InfoLabel>جنسیت:</InfoLabel>
//               <InfoValue>{passenger.gender === "man" ? "مرد" : "زن"}</InfoValue>
//             </InfoBlock>
//             <InfoBlock>
//               <InfoLabel>شماره تلفن:</InfoLabel>
//               <InfoValue>{passenger.phone}</InfoValue>
//             </InfoBlock>
//             <InfoBlock>
//               <InfoLabel>آدرس:</InfoLabel>
//               <InfoValue>{passenger.address}</InfoValue>
//             </InfoBlock>
//             <InfoBlock>
//               <InfoLabel>بدهی:</InfoLabel>
//               <InfoValue onLoad={getDebt(passenger._id)}>
//                 {debts?.toLocaleString()}
//               </InfoValue>
//             </InfoBlock>
//           </PassengerCard>
//         ))}
//       </PassengerList>
//     </TourDetailsWrapper>
//   );
// };

// export default TourDetailsPage;


"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';

export default function AdminTourTravelersPage() {
  const { id: tourId } = useParams();
  const [tour, setTour] = useState(null);
  const [travelers, setTravelers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!tourId) return;
    async function fetchData() {
      try {
        const res = await fetch(`/api/tour/${tourId}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'خطا در دریافت اطلاعات');
        setTour(data.tour);
        setTravelers(data.travelers);
      } catch (err) {
        Swal.fire({ icon: 'error', title: 'خطا', text: err.message });
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [tourId]);

  const downloadExcel = () => {
    if (!tour || travelers.length === 0) return;
    const rows = travelers.map(trav => ({
      'نام مسافر': trav.name,
      'شناسه ملی': trav.personalId,
      'تلفن': trav.phone,
      'تعداد افراد': trav.companions.length + 1,
      'مبلغ کل': trav.expectedTotal,
      'پرداخت شده': trav.paidSum,
      'بدهی': trav.debt,
      'همراهان (نام،شناسه،تلفن)': trav.companions.map(c => `${c.name}-${c.personalId}-${c.phone}`).join('; ')
    }));
    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'مسافران');
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${tour.name}.xlsx`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) return <p className="loading">در حال بارگذاری...</p>;
  if (!tour) return <p className="error">اطلاعات تور یافت نشد.</p>;

  return (
    <div className="container">
      <header className="header">
        <h1 className="title">{tour.name}</h1>
        <button className="download-btn" onClick={downloadExcel}>
          دانلود اکسل مسافران
        </button>
      </header>
      <section className="tour-info">
        <p><strong>تاریخ:</strong> {tour.date}</p>
        <p><strong>قیمت واحد:</strong> {tour.price?.toLocaleString()} تومان</p>
      </section>

      <table className="traveler-table">
        <thead>
          <tr>
            <th>نام</th>
            <th>شناسه ملی</th>
            <th>تلفن</th>
            <th>جمع افراد</th>
            <th>پرداخت شده</th>
            <th>بدهی</th>
            <th>اطلاعات همراهان</th>
          </tr>
        </thead>
        <tbody>
          {travelers.map(trav => (
            <tr key={trav.travelerId}>
              <td>{trav.name}</td>
              <td>{trav.personalId}</td>
              <td>{trav.phone}</td>
              <td>{trav.companions.length + 1}</td>
              <td>{trav.paidSum?.toLocaleString()}</td>
              <td>{trav.debt?.toLocaleString()}</td>
              <td>
                <ul className="companions-list">
                  {trav.companions.map((c, idx) => (
                    <li key={idx}>
                      {`${c.name} (شناسه: ${c.personalId}, تلفن: ${c.phone})`}
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <style jsx>{`
        .container {
          max-width: 1000px;
          margin: auto;
          padding: 1rem;
          direction: rtl;
          font-family: 'Segoe UI', Tahoma, sans-serif;
        }
        .header {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }
        .title {
          font-size: 2rem;
          color: #1a237e;
          margin: 0;
        }
        .download-btn {
          background: #1976d2;
          color: #fff;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.3s;
        }
        .download-btn:hover {
          background: #1565c0;
        }
        .tour-info {
          background: #e8eaf6;
          padding: 1rem;
          border-radius: 8px;
          margin-bottom: 1rem;
        }
        .tour-info p {
          margin: 0.3rem 0;
        }
        .traveler-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 1rem;
        }
        .traveler-table th,
        .traveler-table td {
          border: 1px solid #ddd;
          padding: 0.75rem;
          text-align: center;
           background:rgba(232, 234, 246, 0.69);
        }
        .traveler-table th {
          background: #3f51b5;
          color: white;
          position: sticky;
          top: 0;
        }
        .traveler-table tr:nth-child(even) {
          background: #f5f5f5;
        }
        .companions-list {
          list-style: none;
          padding: 0;
          margin: 0;
          text-align: left;
        }
        .companions-list li {
          padding: 0.25rem 0;
        }
        .loading, .error {
          text-align: center;
          font-size: 1.2rem;
          color: #e53935;
        }
        @media (max-width: 768px) {
          .header {
            flex-direction: column;
            align-items: flex-start;
          }
          .title {
            font-size: 1.5rem;
          }
          .download-btn {
            margin-top: 0.5rem;
            width: 100%;
          }
          .traveler-table th,
          .traveler-table td {
            padding: 0.5rem;
            font-size: 0.85rem;
          }
          .companions-list li {
            font-size: 0.8rem;
          }
        }
      `}</style>
    </div>
  );
}