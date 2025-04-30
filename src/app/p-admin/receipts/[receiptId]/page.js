"use client"
import React, { useState } from "react";

const ReceiptDetailPage = () => {
  // داده‌های استاتیک مربوط به رسید
  const receiptData = {
    id: 1,
    payer: "علی رضایی",
    amount: 1500000,
    status: "در انتظار تایید",
    image: "/images/receipt-sample.jpg" // مسیر تصویر رسید
  };

  const [confirmedAmount, setConfirmedAmount] = useState(receiptData.amount);
  const [notes, setNotes] = useState(""); // توضیحات اضافه برای رسید
  const [loading, setLoading] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  // تایید رسید (شبیه‌سازی شده)
  const handleConfirm = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("رسید تایید شد!\n" + "توضیحات: " + notes);
      // در اینجا می‌توانید عملیات بعد از تایید (مثلاً به‌روزرسانی در دیتابیس) را انجام دهید.
    }, 2000);
  };

  // باز کردن مودال برای نمای کامل تصویر
  const handleImageClick = () => {
    setIsImageModalOpen(true);
  };

  // بستن مودال
  const closeModal = () => {
    setIsImageModalOpen(false);
  };

  // حذف رسید (شبیه‌سازی شده)
  const handleDelete = () => {
    if (window.confirm("آیا از حذف این رسید مطمئن هستید؟")) {
      alert("رسید حذف شد!");
      // در اینجا می‌توانید عملیات حذف از دیتابیس را اضافه کنید.
    }
  };

  return (
    <div className="receipt-detail-page">
      <h1>جزئیات رسید</h1>
      <div className="receipt-card">
        <div className="receipt-info">
          <p>
            <strong>شماره رسید:</strong> {receiptData.id}
          </p>
          <p>
            <strong>پرداخت‌کننده:</strong> {receiptData.payer}
          </p>
          <p>
            <strong>مبلغ اولیه:</strong> {receiptData.amount.toLocaleString()} تومان
          </p>
          <p>
            <strong>وضعیت:</strong> {receiptData.status}
          </p>
        </div>
        <div className="receipt-image" onClick={handleImageClick}>
          <img src={receiptData.image} alt="Receipt Image" />
        </div>
      </div>
      
      <form className="confirm-form" onSubmit={handleConfirm}>
        <label>مبلغ تایید شده:</label>
        <input
          type="number"
          value={confirmedAmount}
          onChange={(e) => setConfirmedAmount(e.target.value)}
          required
        />
        <label>توضیحات رسید:</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="توضیحات اضافی در مورد رسید..."
          rows="4"
        />
        <button type="submit" disabled={loading}>
          {loading ? "در حال تایید..." : "تایید رسید"}
        </button>
      </form>

      <button className="delete-btn" onClick={handleDelete}>
        حذف رسید
      </button>

      {isImageModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <button className="modal-close" onClick={closeModal}>
              بستن
            </button>
            <img src={receiptData.image} alt="Receipt Full View" />
          </div>
        </div>
      )}

      <style jsx>{`
        .receipt-detail-page {
          max-width: 800px;
          margin: 2rem auto;
          padding: 2rem;
          direction: rtl;
          background: #f7f7f7;
          border-radius: 15px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          animation: fadeIn 0.5s ease;
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        }
        h1 {
          text-align: center;
          color: hsl(219, 77%, 60%);
          margin-bottom: 1.5rem;
          font-size: 2rem;
        }
        .receipt-card {
          display: flex;
          flex-wrap: wrap;
          gap: 1.5rem;
          background: #fff;
          padding: 1.5rem;
          border-radius: 15px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease;
        }
        .receipt-card:hover {
          transform: translateY(-4px);
        }
        .receipt-info {
          flex: 1;
          min-width: 250px;
        }
        .receipt-info p {
          margin: 0.8rem 0;
          font-size: 1rem;
          color: #333;
        }
        .receipt-info strong {
          font-weight: 600;
        }
        .receipt-image {
          flex: 1;
          min-width: 250px;
          text-align: center;
          cursor: pointer;
        }
        .receipt-image img {
          max-width: 100%;
          border-radius: 10px;
          transition: transform 0.3s ease;
        }
        .receipt-image img:hover {
          transform: scale(1.05);
        }
        .confirm-form {
          margin-top: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          align-items: center;
        }
        .confirm-form label {
          font-size: 1.2rem;
          color: #333;
          width: 100%;
          max-width: 300px;
          text-align: center;
        }
        .confirm-form input,
        .confirm-form textarea {
          padding: 0.8rem;
          width: 100%;
          max-width: 300px;
          border: 1px solid #ccc;
          border-radius: 10px;
          font-size: 1rem;
          text-align: center;
          box-sizing: border-box;
        }
        .confirm-form textarea {
          resize: vertical;
        }
        .confirm-form button {
          padding: 1rem 2rem;
          background: linear-gradient(45deg, hsl(219, 77%, 60%), hsl(132, 76%, 59%));
          color: #fff;
          border: none;
          border-radius: 25px;
          font-size: 1.2rem;
          cursor: pointer;
          transition: transform 0.3s, box-shadow 0.3s;
          margin-top: 1rem;
        }
        .confirm-form button:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
        }
        .delete-btn {
          margin-top: 1rem;
          padding: 0.8rem 2rem;
          background: #e74c3c;
          color: #fff;
          border: none;
          border-radius: 25px;
          font-size: 1.2rem;
          cursor: pointer;
          transition: transform 0.3s, box-shadow 0.3s;
          display: block;
          margin: 1rem auto 0;
        }
        .delete-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
        }
        /* Modal styles */
        .modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        .modal-content {
          position: relative;
          max-width: 90%;
          max-height: 90%;
          animation: scaleIn 0.3s ease;
        }
        .modal-content img {
          width: 100%;
          height: auto;
          border-radius: 10px;
        }
        .modal-close {
          position: absolute;
          top: 10px;
          right: 10px;
          background: rgba(0, 0, 0, 0.5);
          border: none;
          color: #fff;
          padding: 0.5rem 1rem;
          border-radius: 5px;
          cursor: pointer;
          font-size: 1rem;
          transition: background 0.3s ease;
        }
        .modal-close:hover {
          background: rgba(0, 0, 0, 0.7);
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes scaleIn {
          from {
            transform: scale(0.8);
          }
          to {
            transform: scale(1);
          }
        }
        @media (max-width: 768px) {
          .receipt-card {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </div>
  );
};

export default ReceiptDetailPage;
