"use client"

import React from "react";
import { useEffect,useState } from "react";
import styles from "./Courses.module.css";
import { PiArrowLeftFill, PiCirclesThreeFill } from "react-icons/pi";
import Link from "next/link";
import Cours from "@/components/modules/carts/Course";


 const Courses=()=> {

  const [tours, setTours]=useState([])

   useEffect(() => {
      const fetchTours = async () => {
        const res = await fetch("/api/tour");
        const data = await res.json();
        setTours(data);
      };
  
      fetchTours();
    }, []);
    
  return (
    <>
      <div className={styles.courses}>
        <div className={styles.coursesHeader}>
          <div className={styles.coursesTitle}>
            <PiCirclesThreeFill />
            <h3>سفر های زیارتی</h3>
          </div>
          <Link href={"/"} className={styles.allCoursesBtn}>
            <span>مشاهده همه تورها</span>
            <PiArrowLeftFill />
          </Link>
        </div>

        <div className={styles.lastCourses}>
          {tours.map((tour) => (
            <Cours key={tour._id} tour={tour} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Courses;
