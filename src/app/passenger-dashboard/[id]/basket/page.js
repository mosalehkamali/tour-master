"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function CartPage() {
  const router = useRouter();
  const [cartTours, setCartTours] = useState([]);
  const params = useParams();
  const id = params?.id;

  useEffect(() => {
    if (!id) return;
    async function fetchCart() {
      try {
        const res = await fetch(`/api/travelers/basket/${id}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "خطا در دریافت سبد خرید");
        }

        if (!Array.isArray(data.carts)) {
          throw new Error("مشکلی در ساختار داده برگشتی");
        }
        console.log(data.carts);

        setCartTours(data.carts);
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "خطا!",
          text: err.message,
        });
      }
    }

    fetchCart();
  }, [id]);

  const handleRemove = async (tourId) => {
    const result = await Swal.fire({
      title: "آیا مطمئنی؟",
      text: "این تور از سبد خریدت حذف می‌شود!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "بله، حذف کن!",
      cancelButtonText: "نه، بی‌خیال!",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch("/api/travelers/basket/remove", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tourId }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "خطایی رخ داد");
      }

      await Swal.fire({
        icon: "success",
        title: "حذف شد!",
        text: "تور با موفقیت از سبد خرید حذف شد.",
        confirmButtonText: "باشه",
      });

      setCartTours((prev) =>
        prev.filter((item) => item.tour._id.toString() !== tourId)
      );
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "خطا",
        text: err.message || "مشکلی در حذف تور پیش آمد.",
        confirmButtonText: "باشه",
      });
    }
  };

  const handlePayment = (tour) => {
    alert(`پرداخت برای تور ${tour.name} انجام شد!`);
    setCartTours(cartTours.filter((t) => t.id !== tour.id));
  };

  return (
    <div className="cart-page">
      <h1>سبد خرید</h1>
      {cartTours.length === 0 ? (
        <p>سبد خرید شما خالی است.</p>
      ) : (
        <div className="cart-items">
          {cartTours.map((tour) => (
            <div key={tour._id} className="cart-item">
              <div className="item-image">
                <img src={tour.tour.image} alt={tour.tour.name} />
              </div>
              <div className="item-details">
                <h2 className="item-name">{tour.tour.name}</h2>
                <p className="item-description">{tour.tour.description}</p>
                <p className="item-price">
                  {tour.tour.price.toLocaleString()} تومان
                </p>
                <div className="button-container">
                  <button
                    className="remove-btn"
                    onClick={() => handleRemove(tour.tour._id)}
                  >
                    حذف از سبد خرید
                  </button>
                  <button className="payment-btn">
                    <Link
                      style={{ color: "#fff", width: "100%" }}
                      href={`/passenger-dashboard/${id}/basket/payment/${tour.tour._id}`}
                    >
                      پرداخت
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        .cart-page {
          max-width: 1200px;
          margin: 0 auto;
          padding: 1rem;
          direction: rtl;
        }
        h1 {
          text-align: center;
          color: hsl(219, 77%, 60%);
          margin-bottom: 1.5rem;
        }
        .cart-items {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .cart-item {
          display: flex;
          align-items: center;
          background: #fff;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          padding: 1rem;
        }
        .item-image {
          flex: 0 0 150px;
          margin-left: 1rem;
        }
        .item-image img {
          width: 150px;
          height: 100px;
          object-fit: cover;
          border-radius: 10px;
        }
        .item-details {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .item-name {
          font-size: 1.3rem;
          font-weight: bold;
          color: #333;
        }
        .item-description {
          font-size: 1rem;
          color: #666;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          line-clamp: 1;
          -webkit-box-orient: vertical;
        }
        .item-price {
          font-size: 1.1rem;
          font-weight: 600;
          color: #000;
        }
        .button-container {
          display: flex;
          gap: 0.5rem;
        }
        .remove-btn,
        .payment-btn {
          flex: 1;
          padding: 0.5rem;
          border: none;
          border-radius: 20px;
          cursor: pointer;
          font-size: 1rem;
          transition: background 0.3s;
        }
        .remove-btn {
          background: #e74c3c;
          color: #fff;
        }
        .remove-btn:hover {
          background: #c0392b;
        }
        .payment-btn {
          background: linear-gradient(
            45deg,
            hsl(219, 77%, 60%),
            hsl(132, 76%, 59%)
          );
          color: #fff;
        }
        .payment-btn:hover {
          background: linear-gradient(
            45deg,
            hsl(132, 76%, 59%),
            hsl(219, 77%, 60%)
          );
        }
        @media (max-width: 768px) {
          .cart-item {
            flex-direction: column;
            text-align: center;
          }
          .item-image {
            margin-bottom: 1rem;
          }
          .item-details {
            align-items: center;
          }
          .button-container {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}
