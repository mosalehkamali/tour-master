"use client"

// pages/layout.js
import React, { useState } from 'react';

export default function Layout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="container">
      {/* Header */}
      <header className="header">
        <div className="header-left">
          <h1>داشبورد مسافران</h1>
        </div>
        <div className="header-right mobile-only">
          <button className="menu-toggle" onClick={toggleMenu}>
            &#9776;
          </button>
        </div>
      </header>

      <div className="content">
        {/* Sidebar */}
        <aside className={`sidebar ${isMenuOpen ? 'open' : ''}`}>
          <nav>
            <ul className="menu">
              <li>
                <a href="#" className="menu-item" onClick={closeMenu}>
                  تورهای ثبت‌نام شده
                </a>
              </li>
              <li>
                <a href="#" className="menu-item" onClick={closeMenu}>
                  وضعیت پرداخت
                </a>
              </li>
              <li>
                <a href="#" className="menu-item" onClick={closeMenu}>
                  تنظیمات کاربر
                </a>
              </li>
            </ul>
          </nav>
        </aside>

        {/* محتوای اصلی که از صفحات دیگر به عنوان children دریافت می‌شود */}
        <main className="main" onClick={closeMenu}>
          {children}
        </main>

        {/* این overlay در حالت موبایل به عنوان پوشش (backdrop) عمل می‌کند تا در صورت کلیک خارج، منو بسته شود */}
        {isMenuOpen && <div className="overlay" onClick={closeMenu}></div>}
      </div>

      <style jsx>{`
        /* Reset */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: Arial, sans-serif;
        }
        .container {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          background: #f9f9f9;
        }

        /* Header */
        .header {
          background: #4a90e2;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 24px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          position: relative;
          z-index: 2;
        }
        .header-left h1 {
          font-size: 24px;
          transition: transform 0.3s;
          cursor: pointer;
        }
        .header-left h1:hover {
          transform: scale(1.05);
        }
        .menu-toggle {
          background: none;
          border: none;
          color: #fff;
          font-size: 28px;
          cursor: pointer;
          transition: color 0.3s;
        }
        .menu-toggle:hover {
          color: #e0e0e0;
        }

        /* Content & Sidebar */
        .content {
          display: flex;
          flex: 1;
          position: relative;
        }
        .sidebar {
          width: 250px;
          background: #fff;
          padding: 20px;
          border-right: 1px solid #ddd;
          transition: transform 0.3s ease-in-out;
        }
        .menu {
          list-style: none;
        }
        .menu li {
          margin-bottom: 20px;
        }
        .menu-item {
          display: block;
          text-decoration: none;
          color: #333;
          font-size: 18px;
          padding: 10px 15px;
          border-radius: 8px;
          transition: background 0.3s, transform 0.3s;
        }
        .menu-item:hover {
          background: #f0f0f0;
          transform: scale(1.02);
        }
        .main {
          flex: 1;
          padding: 30px;
          position: relative;
          z-index: 1;
          transition: padding 0.3s;
        }
        .overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.3);
          z-index: 1;
        }

        /* Responsive Styles */
        @media (max-width: 768px) {
          .content {
            flex-direction: column;
          }
          .sidebar {
            position: fixed;
            top: 0;
            left: 0;
            height: 100vh;
            background: #fff;
            z-index: 2;
            transform: translateX(-100%);
          }
          .sidebar.open {
            transform: translateX(0);
          }
          .main {
            padding: 20px;
            margin-top: 60px;
          }
          .mobile-only {
            display: block;
          }
        }
        @media (min-width: 769px) {
          .mobile-only {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
