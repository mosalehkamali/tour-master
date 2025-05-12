"use client";
import React, { useEffect, useState } from "react";
import styles from "@/styles/Tour.module.css";
import Image from "next/image";
import Swal from "sweetalert2";
import { FaCoins } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";
import { GiArchiveRegister } from "react-icons/gi";
import { useRouter } from "next/navigation";
import { useGlobal } from "../GlobalContext";

function tour({ params }) {
  const router = useRouter();
  const { toggleModal } = useGlobal();

  const tourId = params.tour;
  const [tour, setTour] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();

  useEffect(() => {
    async function fetchTourInfo() {
      try {
        const res = await fetch(`/api/tour/${tourId}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "خطا در دریافت اطلاعات تور");
        }
        setTour(data.tour);
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "خطا!",
          text: err.message,
        });
      } finally {
        setLoading(false);
      }
    }

    if (tourId) {
      fetchTourInfo();
    }
  }, [tourId]);

  useEffect(() => {
    async function getCookie() {
      // کوکی‌ها رو از document.cookie می‌خونیم
      const cookies = document.cookie.split("; ");

      for (let cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split("=");

        if (cookieName === "user") {
          setUser(cookieValue);
        } else {
          // setIsAuthenticated(false);
        }
      }
    }
    getCookie();
  }, []);

  const [passenger, setPassenger] = useState({
    name: "",
    personalId: "",
    phone: "",
    birthDate: "",
  });
  // استیت نگهدارنده لیست همراه‌ها
  const [passengers, setPassengers] = useState([]);

  // تابع تغییر مقادیر اینپوت‌ها
  const handleChange = (e) => {
    setPassenger({
      ...passenger,
      [e.target.name]: e.target.value,
    });
  };

  // تابع ثبت فرم، ذخیره اطلاعات و پاک کردن اینپوت‌ها
  const handleSubmit = (e) => {
    e.preventDefault();
    // چک کردن پر بودن فیلدها
    if (
      !passenger.name.trim() ||
      !passenger.personalId.trim() ||
      !passenger.phone.trim()
    ) {
      return;
    }
    setPassengers([...passengers, passenger]);

    // پاکسازی فرم
    setPassenger({ name: "", personalId: "", phone: "", birthDate: "" });
  };

  const addToCarts = async () => {
    if (!user) {
      return Swal.fire({
        icon: "info",
        title: "ابتدا وارد حساب کاربری خود شوید!",
        showCancelButton: true,
        confirmButtonText: "اوکی",
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          return toggleModal();
        }
      });
    }
    try {
      const response = await fetch("/api/travelers/basket/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tourId, companions: passengers }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "خطایی رخ داده است");
      }

      Swal.fire({
        title: "تور به سبد خرید شما اضافه شد!",
        text: "می‌خوای ادامه بدی یا بری به سبد خرید؟",
        icon: "success",
        showCancelButton: true,
          cancelButtonText: "ادامه و پرداخت",
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          // ✅ رفرش صفحه با useRouter
          router.refresh();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          // 📦 ریدایرکت به صفحه سبد خرید
          router.push(`/passenger-dashboard/${user}/basket/payment/${tourId}`);
        }
      });

      return true;
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "خطا!",
        text: err.message,
      });

      return false;
    }
  };

  return (
    <div className={styles.tour}>
      <div className={styles.tour__container}>
        <Image
          className={styles.tourImg}
          width={800}
          height={500}
          src={tour.image}
          alt="course-iamge"
        ></Image>
        <div className={styles.discription}>
          <h2 className={styles.tourTitle}> {tour.name}</h2>
          <div>
            <h4 className={styles.discTitle}>نکات و توضیحات سفر</h4>
            <p className={styles.tourDisc}>{tour?.description}</p>
          </div>
        </div>
      </div>
      <div className={styles.btnsContainer}>
        <h4 className={styles.box}>
          <FaCoins /> شروع قیمت از : {tour.price?.toLocaleString()} تومان
        </h4>
        <h4 className={styles.box}>
          <FaCalendarAlt /> تاریخ سفر: {tour.date}
        </h4>
        <button onClick={addToCarts} className={styles.registerBtn}>
          <GiArchiveRegister /> ثبت نام
        </button>
      </div>

      {/* // فرم همراهان مسافر */}
      <div className="container">
        <h3>افزودن همراه</h3>
        <form onSubmit={handleSubmit} className="passenger-form">
          <input
            type="text"
            name="name"
            value={passenger.name}
            onChange={handleChange}
            placeholder="نام همراه"
            className="input"
          />
          <input
            type="text"
            name="personalId"
            value={passenger.personalId}
            onChange={handleChange}
            placeholder="کدملی"
            className="input"
          />
          <input
            type="text"
            name="birthDate"
            value={passenger.birthDate}
            onChange={handleChange}
            placeholder="سن"
            className="input"
          />
          <input
            type="number"
            name="phone"
            value={passenger.phone}
            onChange={handleChange}
            placeholder="شماره تماس"
            className="input"
          />
          <button type="submit" className="submit-button">
            ثبت همراه
          </button>
        </form>

        <div className="passengers-list">
          {passengers.map((p, index) => (
            <div key={index} className="passenger-card">
              <p>نام: {p.name}</p>
              <p>کدملی: {p.personalId}</p>
              <p>تاریخ تولد: {p.birthDate}</p>
              <p>شماره تماس: {p.phone}</p>
            </div>
          ))}
        </div>

        <style jsx>{`
          .container {
            max-width: 500px;
            margin: 2rem auto;
            padding: 1rem;
          }
          .passenger-form {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            animation: fadeIn 0.5s ease-in-out;
          }
          .input {
            padding: 0.75rem;
            font-size: 1rem;
            border: 1px solid #ccc;
            border-radius: 5px;
            transition: border-color 0.3s ease;
          }
          .input:focus {
            border-color: #0070f3;
            outline: none;
          }
          .submit-button {
            padding: 0.75rem;
            font-size: 1rem;
            color: #fff;
            background: linear-gradient(45deg, #0070f3, #00d1b2);
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .submit-button:hover {
            transform: scale(1.05);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          }
          .passengers-list {
            margin-top: 2rem;
            display: grid;
            grid-template-columns: repeat(2, auto);
            gap: 1rem;
          }
          .passenger-card {
            background-color: #f4f4f4;
            padding: 1rem;
            border-radius: 5px;
            margin-bottom: 1rem;
            transition: transform 0.3s ease;
          }
          .passenger-card:hover {
            transform: translateY(-5px);
          }
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
        `}</style>
      </div>
    </div>
  );
}

export default tour;
