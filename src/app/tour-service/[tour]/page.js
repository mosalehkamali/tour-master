import React from "react";
import styles from "@/styles/Tour.module.css";
import Image from "next/image";
import Form from "@/components/templates/tour-service/tour/Form";
import tourModel from "base/models/Tour";
import connectToDB from "base/configs/db";
import { FaCoins } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";
import { GiArchiveRegister } from "react-icons/gi";

async function tour({ params }) {
  await connectToDB();
  const tourId = params.tour;
  const tour = JSON.parse(
    JSON.stringify(await tourModel.findOne({ _id: tourId }))
  );
  
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
            <p className={styles.tourDisc}>{tour.description}</p>
          </div>
        </div>
      </div>
      <div className={styles.btnsContainer}>
        <h4 className={styles.box}>
           <FaCoins />    شروع قیمت از : {tour.price.toLocaleString()} تومان
        </h4>
        <h4 className={styles.box}>
        <FaCalendarAlt />  تاریخ سفر: {tour.date}
        </h4>
        <button className={styles.registerBtn}>
        <GiArchiveRegister />  ثبت نام
        </button>
      </div>
      
    </div>
  );
}

export default tour;
