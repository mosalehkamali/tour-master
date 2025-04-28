"use client"
// pages/dashboard.js
import React from 'react';
    
export default function Dashboard() {
  return (
    <div>
      <section className="user-summary">
        <h2>خلاصه وضعیت شما</h2>
        <div className="cards">
          <div className="card">
            <h3>تورها</h3>
            <p>۵ تور</p>
          </div>
          <div className="card">
            <h3>پرداخت تکمیل</h3>
            <p>۸۰٪</p>
          </div>
          <div className="card">
            <h3>امتیاز کاربری</h3>
            <p>۴.۵/۵</p>
          </div>
        </div>
      </section>

      <style jsx>{`
        .user-summary {
          background: #fff;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
          animation: fadeIn 0.5s ease-in-out;
        }
        .user-summary h2 {
          margin-bottom: 20px;
          font-size: 22px;
          border-bottom: 2px solid #4a90e2;
          padding-bottom: 10px;
          color: #4a90e2;
        }
        .cards {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
        }
        .card {
          background: #f0f8ff;
          padding: 20px;
          border-radius: 8px;
          flex: 1;
          min-width: 150px;
          text-align: center;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          cursor: pointer;
        }
        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .card h3 {
          margin-bottom: 10px;
          font-size: 18px;
          color: #333;
        }
        .card p {
          font-size: 16px;
          color: #666;
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
      `}</style>
    </div>
  );
}
