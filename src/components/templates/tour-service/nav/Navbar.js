"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaUser } from "react-icons/fa";
import { RiShoppingCartLine } from "react-icons/ri";

const Header = ({ toggleModal }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    async function getCookie() {
      // کوکی‌ها رو از document.cookie می‌خونیم
      const cookies = document.cookie.split("; ");

      for (let cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split("=");

        if (cookieName === "user") {
          setIsAuthenticated(cookieValue);
          const res = await fetch("/api/travelers/getme");
          const data = await res.json();
          setUser(data);
          setCartCount(data.carts.length);
          
        } else {
          setIsAuthenticated(false);
        }
      }
    }
    getCookie();
  }, []);

  return (
    <header className="header">
      <div className="container">
        <nav className="nav">
          {isAuthenticated ? (
            <div className="auth-info">
              <Link href={`/passenger-dashboard/${user._id}`} style={{display:"flex",color:"#000",marginRight:"1rem",gap:".5rem"
              }} className="user">
                <FaUser className="user-icon" size={20} />
                <span className="user-name">{user.name}</span>
              </Link>
              <Link href={`/passenger-dashboard/${user._id}/basket`}>
                <p className="cart-button">
                  <RiShoppingCartLine size={24} />
                  {cartCount > 0 && (
                    <span className="cart-count">{cartCount}</span>
                  )}
                </p>
              </Link>
            </div>
          ) : (
            <div className="auth-buttons">
              <div onClick={toggleModal}>
                <p className="btn">ورود / ثبت نام</p>
              </div>
            </div>
          )}
        </nav>
      </div>

      <style jsx>{`
        .auth-buttons {
          cursor: pointer;
          user-select: none;
        }
        .header {
          position: fixed;
          top: 0;
          width: 100%;
          background-color: #ffffffb6; /* پس‌زمینه نیمه‌شفاف */
          padding: 10px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          z-index: 999;
          backdrop-filter: blur(10px); /* تاری پس‌زمینه برای جلوه زیباتر */
          transition: background-color 0.3s ease;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        .container {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
        }
        .nav {
          display: flex;
          align-items: center;
        }
        .auth-info {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 80vw;
        }
        .user-icon {
          margin-right: 0.5rem;
        }
        .user-name {
          font-size: 1.1rem;
          font-weight: bold;
        }
        .cart-button {
          position: relative;
          margin-left: 1rem;
          color: #fff;
          background: var(--blue);
          width: 3rem;
          height: 3rem;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 50%;
          text-decoration: none;
          transition: background-color 0.3s ease;
        }
        .cart-button:hover {
          background: var(--green);
        }
        .cart-count {
          position: absolute;
          top: 0px;
          right: 0px;
          background: red;
          color: #fff;
          font-size: 0.8rem;
          padding: 0 5px;
          border-radius: 50%;
        }
        .btn {
          font-size: 1.1rem;
          margin-left: 1rem;
          padding: 0.5rem 1rem;
          border-radius: 25px;
          text-decoration: none;
          color: #fff;
          background: hsl(219.51, 77%, 60%);
          transition: background 0.3s, color 0.3s;
          font-weight: 600;
        }
        .btn:hover {
          color: hsl(219.51, 77%, 60%);
          background: #fff;
        }
        @media (max-width: 768px) {
          .container {
            flex-direction: column;
            align-items: center;
          }
          .nav {
            margin-top: 1rem;
          }
          .btn {
            margin: 0.5rem;
          }
          .auth-info {
            gap: 3rem;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;
