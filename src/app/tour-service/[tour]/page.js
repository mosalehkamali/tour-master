"use client"
import React, { useEffect, useState } from "react";
import styles from "@/styles/Tour.module.css";
import Image from "next/image";
import Swal from 'sweetalert2';
import { FaCoins } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";
import { GiArchiveRegister } from "react-icons/gi";
import { useRouter } from 'next/navigation';
import { useGlobal } from "../GlobalContext";

function tour({ params }) {
  const router = useRouter();
  const {toggleModal} = useGlobal()

  const tourId = params.tour;
  const [tour, setTour] = useState([]);
  const [loading, setLoading] = useState(true);
 const [user, setUser] = useState();

 useEffect(()=>{
  async function fetchTourInfo() {
    try {
      const res = await fetch(`/api/tour/${tourId}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'خطا در دریافت اطلاعات تور');
      }
      setTour(data.tour)
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'خطا!',
        text: err.message,
      });
    } finally {
      setLoading(false);
    }
  }

  if (tourId) {
    fetchTourInfo();
  }

 },[tourId])

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


  const addToCarts =async ()=>{
    if(!user ){
      return  Swal.fire({
        icon: 'info',
        title: 'ابتدا وارد حساب کاربری خود شوید!',
        showCancelButton: true,
        confirmButtonText: 'اوکی',
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
         return toggleModal()
        } 
      });
    }
    try {
      const response = await fetch('/api/travelers/basket/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tourId }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error || "خطایی رخ داده است");
      }
  
       Swal.fire({
      title: 'تور به سبد خرید شما اضافه شد!',
      text: 'می‌خوای ادامه بدی یا بری به سبد خرید؟',
      icon: 'success',
      showCancelButton: true,
      confirmButtonText: 'اوکی',
      cancelButtonText: 'مشاهده سبد خرید',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        // ✅ رفرش صفحه با useRouter
        router.refresh();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // 📦 ریدایرکت به صفحه سبد خرید
        router.push(`/passenger-dashboard/${user}/basket`);
      }
    });
  
      return true;
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'خطا!',
        text: err.message,
      });
  
      return false;
    }
  
  }
  

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
           <FaCoins />    شروع قیمت از : {tour.price?.toLocaleString()} تومان
        </h4>
        <h4 className={styles.box}>
        <FaCalendarAlt />  تاریخ سفر: {tour.date}
        </h4>
        <button onClick={addToCarts} className={styles.registerBtn}>
        <GiArchiveRegister />  ثبت نام
        </button>
      </div>
      
    </div>
  );
}

export default tour;
