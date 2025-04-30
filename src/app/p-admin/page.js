"use client"
import React from "react";
import Link from "next/link";

const AdminPanel = () => {
  return (
    <div className="panel-container">
      <header className="panel-header">
        <h1>پنل ادمین</h1>
      </header>
      <div className="button-grid">
        <Link href="/p-admin/tour">
          <p className="panel-button">تورها</p>
        </Link>
        <Link href="/p-admin/travelers">
          <p className="panel-button">کاربران</p>
        </Link>
        <Link href="/p-admin/receipts">
          <p className="panel-button">رسیدها</p>
        </Link>
      </div>

      <style jsx>{`
        .panel-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #0d324d, #7f5a83);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          animation: fadeIn 1s ease;
        }
        .panel-header h1 {
          color: #fff;
          font-size: 2.8rem;
          margin-bottom: 2rem;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
          animation: slideDown 0.5s ease-out;
        }
        .button-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          width: 100%;
          max-width: 800px;
        }
        .panel-button {
          background: #fff;
          text-align: center;
          font-size: 1.5rem;
          color: #333;
          padding: 1rem;
          border-radius: 20px;
          text-decoration: none;
          font-weight: bold;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
          transition: transform 0.3s ease, background 0.3s ease, color 0.3s ease;
        }
        .panel-button:hover {
          transform: scale(1.05);
          background: linear-gradient(135deg, #7f5a83, #0d324d);
          color: #fff;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideDown {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @media (max-width: 768px) {
          .panel-header h1 {
            font-size: 2rem;
          }
          .panel-button {
            font-size: 1.2rem;
            padding: 0.8rem;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminPanel;
