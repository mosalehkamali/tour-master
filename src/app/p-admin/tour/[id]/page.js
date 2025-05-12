"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import * as XLSX from "xlsx";
import Swal from "sweetalert2";

export default function AdminTourTravelersPage() {
  const { id: tourId } = useParams();
  const [tour, setTour] = useState(null);
  const [travelers, setTravelers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState({
    totalPassengers: 0,
    totalPaid: 0,
    totalDebt: 0,
  });

  useEffect(() => {
    if (!tourId) return;
    async function fetchData() {
      try {
        const res = await fetch(`/api/tour/${tourId}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "خطا در دریافت اطلاعات");
        setTour(data.tour);
        setTravelers(data.travelers);

        // محاسبه خلاصه: تعداد کل مسافران، مبلغ کل پرداخت شده و بدهی کل
        const totalPassengers = data.travelers.reduce(
          (sum, trav) => sum + (trav.companions.length + 1),
          0
        );
        const totalPaid = data.travelers.reduce(
          (sum, trav) => sum + (trav.paidSum || 0),
          0
        );
        const totalDebt = data.travelers.reduce(
          (sum, trav) => sum + (trav.debt || 0),
          0
        );
        setSummary({ totalPassengers, totalPaid, totalDebt });
      } catch (err) {
        Swal.fire({ icon: "error", title: "خطا", text: err.message });
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [tourId]);

  const downloadExcel = () => {
    if (!tour || travelers.length === 0) return;
    const rows = travelers.map((trav) => ({
      "نام مسافر": trav.name,
      "شناسه ملی": trav.personalId,
      تلفن: trav.phone,
      "تعداد افراد": trav.companions.length + 1,
      "مبلغ کل": trav.expectedTotal,
      "پرداخت شده": trav.paidSum,
      بدهی: trav.debt,
      "همراهان (نام،سن،تلفن)": trav.companions
        .map((c) => `${c.name}-${c.birthDate}-${c.phone}`)
        .join("; "),
    }));
    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "مسافران");
    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([wbout], { type: "application/octet-stream" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
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
        <div className="header-left">
          <h1 className="title">{tour.name}</h1>
        </div>
        <button className="download-btn" onClick={downloadExcel}>
          دانلود اکسل
        </button>
      </header>
    
      <section className="tour-info">
        <p>
          <strong>تاریخ:</strong> {tour.date}
        </p>
        <p>
          <strong>قیمت واحد:</strong> {tour.price?.toLocaleString()} تومان
        </p>
      </section>

      <section className="summary">
        <div className="summary-item">
          <strong>تعداد کل مسافران:</strong> {summary.totalPassengers}
        </div>
        <div className="summary-item">
          <strong>مبلغ کل پرداخت شده:</strong>{" "}
          {summary.totalPaid?.toLocaleString()} تومان
        </div>
        <div className="summary-item">
          <strong>بدهی کل:</strong> {summary.totalDebt?.toLocaleString()} تومان
        </div>
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
          {travelers.map((trav) => (
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
                      {`${c.name} (سن: ${c.birthDate}, تلفن: ${c.phone})`}
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
          font-family: "Segoe UI", Tahoma, sans-serif;
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
        .summary {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          background: #f3e5f5;
          padding: 1rem;
          border-radius: 8px;
          margin-bottom: 1rem;
        }
        .summary-item {
          flex: 1 1 200px;
          background: #d1c4e9;
          padding: 0.5rem;
          border-radius: 4px;
        }
        .tour-info {
          background: #e8eaf6;
          padding: 1rem;
          border-radius: 8px;
          margin-bottom: 1rem;
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
          background: rgba(232, 234, 246, 0.69);
        }
        .traveler-table th {
          background: #3f51b5;
          color: #fff;
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
        .loading,
        .error {
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
