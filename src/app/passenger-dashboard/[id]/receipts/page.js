"use client";
import React, { useEffect, useState } from "react";

const UserReceiptsPage = () => {
  // داده‌های نمونه برای رسیدهای کاربر
  const [userReceipts, setUserReceipts] = useState([]);
  useEffect(() => {
    const fetchMyReceipts = async () => {
      try {
        const res = await fetch("/api/receipts/user", {
          method: "GET",
          credentials: "include", // ⬅ کوکی ارسال میشه
        });

        if (!res.ok) {
          throw new Error("خطا در دریافت رسیدها");
        }

        const data = await res.json();
        setUserReceipts(data.receipts);

        return data.receipts;
      } catch (error) {
        console.error("خطا:", error);
        return [];
      }
    };
    fetchMyReceipts();
  }, []);

  // تعیین کلاس وضعیت برای رنگ‌بندی
  const getStatusClass = (status) => {
    if (status === "confirmed") return "status confirmed";
    return "status pending";
  };

  return (
    <div className="dashboard-page">
      <h1>رسیدهای پرداختی شما</h1>
      <div className="receipts-container">
        {userReceipts.map((receipt, index) => (
          <div key={index} className="receipt-card">
            <p>
              <strong>نام تور:</strong> {receipt.tour.name}
            </p>
            <p>
              <strong>مبلغ پرداختی:</strong> {receipt.amount.toLocaleString()}{" "}
              تومان
            </p>
            <p>
              <strong>توضیحات:</strong> {receipt.decription}
            </p>
            <p>
              <strong>وضعیت پرداخت:</strong>{" "}
              <span className={getStatusClass(receipt.status)}>
                {receipt.status === "paid" ? "در انتظار تایید" : "تایید شده"}
              </span>
            </p>
          </div>
        ))}
      </div>

      <style jsx>{`
        .dashboard-page {
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
        .receipt-card p {
          margin: 0.5rem 0;
          font-size: 1rem;
          color: #333;
        }
        .receipt-card strong {
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
          .receipt-card p {
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

export default UserReceiptsPage;
