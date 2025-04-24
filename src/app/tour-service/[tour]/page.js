import React from "react";
import styles from "@/styles/Tour.module.css";
import Image from "next/image";
import Form from "@/components/templates/tour-service/tour/Form";
import tourModel from "base/models/Tour";
import connectToDB from "base/configs/db";

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
      <div>
        <h4
          style={{
            color: "var(--blue)",
            backgroundColor: "var(--gray)",
            padding: ".5rem 1rem",
            borderRadius: "1rem",
            border: "1px var(--blue) solid",
            display:"inline-block",
            margin:"0 1rem 1rem 1rem"
          }}
          className={styles.discTitle}
        >
          شروع قیمت از : {tour.price.toLocaleString()} تومان
        </h4>
      </div>
      <Form tour={tour._id} />
    </div>
  );
}

export default tour;
