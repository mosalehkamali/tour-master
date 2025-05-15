"use client";
import React, { useEffect, useState } from "react";
import BankCard from "@/components/modules/carts/BankCart"; // فرض کنید کامپوننت BankCard از قبل ساخته شده است
import { useParams, useRouter } from "next/navigation";
import Swal from "sweetalert2";

const PaymentPage = () => {
  const params = useParams();
  const router = useRouter();
  const traveler = params.id;
  const tour = params.tour;

  // داده‌های تور جهت پرداخت (بدون توضیحات)
  const [tourInfo,setTourInfo] =useState({}) 
  const [userInfo,setUserInfo] =useState({}) 
 
  useEffect(()=>{
  async function fetchTourInfo() {
    try {
      const res = await fetch(`/api/tour/${tour}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'خطا در دریافت اطلاعات تور');
      }
      setTourInfo(data.tour)
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'خطا!',
        text: err.message,
      });
    } 
  }

  if (tour) {
    fetchTourInfo();
  }

 },[tour])


 //گرفتن اطلاعات کاربر
  useEffect(()=>{
  async function fetchTravelerInfo() {
    try {
      const res = await fetch("/api/travelers/getme");
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'خطا در دریافت اطلاعات کاربر');
      }
      setUserInfo(data)
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'خطا!',
        text: err.message,
      });
    } 
  }

  if (traveler) {
    fetchTravelerInfo();
  }
  
},[traveler])

//مبلغ کل بدهی شخص
const [debt, setDebt] = useState();
useEffect(()=>{
  function calDebt(){
    userInfo.carts?.map((cart)=>{
      if (cart.tour.toString() === tour.toString()) {
        const population =(cart.companions.length + 1)
        const debt = tourInfo.price * population;
        setDebt({debt,population});
      }
    })
  }
  calDebt()
},[userInfo])

  // مدیریت فایل رسید پرداخت
  const [receipt, setReceipt] = useState(null);

  // هندل تغییر فایل دریافت شده
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setReceipt(e.target.files[0]);
    }
  };

  // عملیات نهایی پرداخت 
  const handlePaymentConfirmation = async () => {
    if (!receipt) {
      return Swal.fire("خطا", "لطفاً تصویر رسید را انتخاب کنید", "error");
    }
  
    const formData = new FormData();
    formData.append("traveler", traveler);
    formData.append("tour", tour);
    formData.append("status", "paid");
    formData.append("description", "رسید ثبت‌شده توسط کاربر");
    formData.append("image", receipt);
  
    try {
      const res = await fetch("/api/receipts/create", {
        method: "POST",
        body: formData,
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        throw new Error(data.error || "خطایی در ثبت رسید رخ داد");
      }
  
      Swal.fire({
        icon: "success",
        title: "رسید با موفقیت ثبت شد",
        confirmButtonText: "دیدن وضعیت پرداخت",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push(`/passenger-dashboard/${traveler}/receipts`);
        } else {
          router.refresh();
        }
      });
    } catch (err) {
      console.error(err);
      Swal.fire("خطا", err.message, "error");
    }
  };

  return (
    <div className="payment-page">
      <div className="container">
        <h1 className="page-title">پرداخت هزینه سفر</h1>
        <div className="tour-info">
          <h2 className="tour-name">{tourInfo.name}</h2>
          <p className="tour-date">
            <strong>تاریخ تور:</strong> {tourInfo.date}
          </p>
          <p className="tour-price">
            <strong>قیمت:</strong> {debt?.debt.toLocaleString()} تومان برای {debt?.population} نفر
          </p>
        </div>

        <div className="card-section">
          <h3 className="section-title">اطلاعات پرداخت به شماره کارت</h3>
          <p style={{color:"var(--red)"}}>(با کلیک 👇 شماره کارت را کپی کنید)</p>
          <BankCard />
        </div>

        <div className="upload-section">
          <h3 className="section-title">بارگذاری عکس رسید پرداخت</h3>
          <label htmlFor="receipt-upload" className="upload-label">
            {receipt ? receipt.name : "انتخاب فایل"}
          </label>
          <input
            id="receipt-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="upload-input"
          />
        </div>

        <button className="confirm-btn" onClick={handlePaymentConfirmation}>
          تأیید و پرداخت
        </button>
      </div>

      <style jsx>{`
        .payment-page {
          background: linear-gradient(135deg, #fdfbfb, #ebedee);
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 2rem;
        }
        .container {
          background: #fff;
          border-radius: 20px;
          padding: 2rem;
          max-width: 600px;
          width: 100%;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
          animation: fadeIn 1s ease-out;
        }
        .page-title {
          text-align: center;
          color: hsl(219, 77%, 60%);
          margin-bottom: 1.5rem;
          font-size: 2rem;
        }
        .tour-info {
          border: 1px solid #ddd;
          border-radius: 15px;
          padding: 1rem;
          margin-bottom: 1.5rem;
          transition: transform 0.3s ease;
          cursor: pointer;
        }
        .tour-info:hover {
          transform: scale(1.02);
        }
        .tour-name {
          margin: 0 0 0.5rem;
          font-size: 1.5rem;
          color: #333;
        }
        .tour-date,
        .tour-price {
          margin: 0.3rem 0;
          font-size: 1rem;
          color: #555;
        }
        .card-section,
        .upload-section {
          margin-bottom: 1.5rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .section-title {
          margin-bottom: 0.5rem;
          font-size: 1.2rem;
          color: hsl(132, 76%, 59%);
        }
        .upload-label {
          display: inline-block;
          padding: 0.8rem 1.2rem;
          background: linear-gradient(
            45deg,
            hsl(219, 77%, 60%),
            hsl(132, 76%, 59%)
          );
          color: #fff;
          border-radius: 25px;
          cursor: pointer;
          transition: background 0.3s, transform 0.3s;
        }
        .upload-label:hover {
          background: linear-gradient(
            45deg,
            hsl(132, 76%, 59%),
            hsl(219, 77%, 60%)
          );
          transform: scale(1.05);
        }
        .upload-input {
          display: none;
        }
        .confirm-btn {
          display: block;
          width: 100%;
          padding: 1rem;
          background: linear-gradient(
            45deg,
            hsl(219, 77%, 60%),
            hsl(132, 76%, 59%)
          );
          border: none;
          border-radius: 30px;
          color: #fff;
          font-size: 1.2rem;
          cursor: pointer;
          transition: background 0.3s, transform 0.3s;
        }
        .confirm-btn:hover {
          background: linear-gradient(
            45deg,
            hsl(132, 76%, 59%),
            hsl(219, 77%, 60%)
          );
          transform: scale(1.02);
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
        @media (max-width: 768px) {
          .container {
            padding: 1.5rem;
          }
          .page-title {
            font-size: 1.8rem;
          }
          .tour-info {
            padding: 0.8rem;
          }
          .confirm-btn {
            font-size: 1rem;
          }
          .section-title {
            font-size: 1.1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default PaymentPage;
