import React from "react";

const ModernCard = ({ title, onDetailsClick }) => {
  return (
    <div style={styles.card}>
      <h2 style={styles.title}>{title}</h2>
      <button style={styles.button} onClick={onDetailsClick}>
        مشاهده جزئیات
      </button>
    </div>
  );
};

const styles = {
  card: {
    minHeight:"191px",
    background: "linear-gradient(135deg, #f0f4f8, #dfe7ec)",
    borderRadius: "20px",
    padding: "20px",
    textAlign: "right",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
    maxWidth: "300px",
    margin: "auto",
    color: "#333333",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    position: "relative",
    display:"flex",
    flexDirection:"column",
    justifyContent:"space-between"

  },
  title: {
    marginBottom: "20px",
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: "#333333", // رنگ تیره برای فونت
  },
  button: {
    backgroundColor: "#4caf50",
    color: "#ffffff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "30px",
    cursor: "pointer",
    fontWeight: "bold",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    transition: "background-color 0.3s ease, box-shadow 0.3s ease",
  },
  buttonHover: {
    backgroundColor: "#66bb6a",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",
  },
};

export default ModernCard;
