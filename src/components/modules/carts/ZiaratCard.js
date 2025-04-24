"use client";
import Link from "next/link";
import React, { useState } from "react";

const ZiaratCard = () => {
  const styles = {
    wrapper: {
      display: "flex",
      justifyContent: "center",
      marginTop: "50px",
    },
    card: {
      position: "relative",
      backgroundColor: "#e6faff",
      padding: "30px 40px",
      borderRadius: "20px",
      textAlign: "center",
      width: "320px",
      boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
      overflow: "hidden",
      transition: "transform 0.4s ease, box-shadow 0.4s ease",
    },
    cardHover: {
      transform: "scale(1.03)",
      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.25)",
    },
    lightEffect: {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      width: "150%",
      height: "150%",
      background:
        "radial-gradient(circle at 50% 50%, rgba(0, 170, 255, 0.5), transparent 60%)",
      animation: "moveLight 8s linear infinite", // تغییر انیمیشن به linear برای حرکت پیوسته
      pointerEvents: "none",
      zIndex: 0,
    },
    content: {
      position: "relative",
      zIndex: 1,
    },
    icon: {
      fontSize: "48px",
      marginBottom: "15px",
    },
    title: {
      fontSize: "22px",
      fontWeight: "bold",
      marginBottom: "10px",
      color: "#2c3e50",
    },
    desc: {
      fontSize: "16px",
      color: "#555",
      marginBottom: "20px",
    },
    button: {
      padding: "10px 20px",
      backgroundColor: "#0097e6",
      color: "white",
      border: "none",
      borderRadius: "30px",
      cursor: "pointer",
      fontSize: "16px",
      fontWeight: "600",
      transition: "background-color 0.3s ease",
    },
  };

  const [hover, setHover] = useState(false);

  return (
    <>
      <style>
        {`
          @keyframes moveLight {
            0% {
              background-position: 20% 30%;
            }
            25% {
              background-position: 70% 20%;
            }
            50% {
              background-position: 40% 70%;
            }
            75% {
              background-position: 60% 50%;
            }
            100% {
              background-position: 20% 30%;
            }
          }
        `}
      </style>

      <div style={styles.wrapper}>
        <div
          style={{
            ...styles.card,
            ...(hover ? styles.cardHover : {}),
          }}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <div style={styles.lightEffect}></div>

          <div style={styles.content}>
            <div style={styles.icon}>🕋</div>
            <h2 style={styles.title}>ثبت‌نام سفرهای زیارتی</h2>
            <p style={styles.desc}>
              برای شرکت در سفرهای معنوی و زیارتی همین حالا ثبت‌نام کنید.
            </p>
            <Link href={"/tour-service"}>
              <button
                style={styles.button}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#007bb5")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "#0097e6")
                }
              >
                ثبت‌نام
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ZiaratCard;
