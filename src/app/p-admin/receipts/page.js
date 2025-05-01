export const dynamic = "force-dynamic";
"use client"
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ReceiptsPage = () => {
  // داده‌های نمونه برای رسیدها
  const [receiptsData ,setReceiptsData] =useState([]) 
  useEffect(()=>{
    const fetchAllReceipts = async () => {
        try {
          const res = await fetch("/api/receipts");
      
          if (!res.ok) {
            const data = await res.json();
            throw new Error(data.error || "خطا در دریافت رسیدها");
          }
      
          const data = await res.json();
          setReceiptsData(data.receipts)
          console.log(receiptsData);
          
        } catch (err) {
          console.error("Error fetching receipts:", err);
          Swal.fire("خطا", err.message, "error");
          return [];
        }
      };
      fetchAllReceipts()
  },[])

  // تابع کمکی برای تعیین کلاس وضعیت
  const getStatusClass = (status) => {
    if (status === "confirmed") return "status confirmed";
    if (status === "rejected") return "status rejected";
    return "status pending"; // برای "در انتظار تایید"
  };

  return (
    <div className="receipts-page">
      <h1>لیست رسیدها</h1>
      <div className="receipts-container">
        {receiptsData.map((receipt,index) => (
            <Link href={`/p-admin/receipts/${receipt._id}`}>

          <div key={receipt._id} className="receipt-card">
            <div className="receipt-details">
              <p className="receipt-id">
                <strong>شماره رسید:</strong> {index+1}
              </p>
              <p className="receipt-payer">
                <strong>پرداخت‌کننده:</strong> {receipt.traveler.name}
              </p>
              <p className="receipt-amount">
                <strong>مبلغ:</strong> {receipt.amount.toLocaleString()} تومان
              </p>
              <p className="receipt-tour">
                <strong>نام تور:</strong> {receipt.tour?.name}
              </p>
              <p className="receipt-status">
                <strong>وضعیت پرداخت:</strong>{" "}
                <span className={getStatusClass(receipt.status)}>
                  {receipt.status === "paid"?"در انتظار تایید":"تایید شده"}
                </span>
              </p>
            </div>
          </div>
            </Link>
        ))}
      </div>

      <style jsx>{`
        .receipts-page {
          padding: 2rem;
          direction: rtl;
          background: #f4f4f4;
          min-height: 100vh;
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        }
        h1 {
          text-align: center;
          color: hsl(219, 77%, 60%);
          margin-bottom: 2rem;
          font-size: 2rem;
        }
        .receipts-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
        }
        .receipt-card {
          background: #fff;
          border-radius: 15px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          padding: 1.5rem;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          cursor: pointer;
        }
        .receipt-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
        }
        .receipt-details p {
          margin: 0.5rem 0;
          font-size: 1rem;
          color: #333;
        }
        .receipt-details strong {
          font-weight: 600;
        }
        .status {
          margin-right: 0.5rem;
          padding: 0.2rem 0.6rem;
          border-radius: 5px;
          font-weight: bold;
        }
        .confirmed {
          color: #155724;
          background-color: #d4edda;
        }
        .rejected {
          color: #721c24;
          background-color: #f8d7da;
        }
        .pending {
          color: #856404;
          background-color: #fff3cd;
        }
        @media (max-width: 768px) {
          .receipt-card {
            padding: 1rem;
          }
          .receipt-details p {
            font-size: 0.9rem;
          }
          h1 {
            font-size: 1.8rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ReceiptsPage;
