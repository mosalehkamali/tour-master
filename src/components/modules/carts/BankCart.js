import React from "react";
import { FaRegCopy } from "react-icons/fa";
import Swal from "sweetalert2";

const BankCard = () => {
  const cardNumber = "6063 7310 7706 3684"; // شماره کارت نمونه
  const shabaNumber = "IR910600561170007876076001"; // شماره شبا نمونه
  const cardHolder = "محمد متوسلیان"; // نام صاحب کارت
  
  const handleCopy = () => {
    navigator.clipboard.writeText(cardNumber)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: "شماره کارت کپی شد",
          showConfirmButton: false,
          timer: 1000
        });
      })
      .catch(() => {
        Swal.fire({
          icon: 'error',
          title: 'خطا',
          text: 'مشکلی در کپی شماره کارت رخ داده است',
          showConfirmButton: false,
          timer: 1000
        });
      });
  };
  const handleShabaCopy = () => {
    navigator.clipboard.writeText(shabaNumber)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: "شماره شبا کپی شد",
          showConfirmButton: false,
          timer: 1000
        });
      })
      .catch(() => {
        Swal.fire({
          icon: 'error',
          title: 'خطا',
          text: 'مشکلی در کپی شماره شبا رخ داده است',
          showConfirmButton: false,
          timer: 1000
        });
      });
  };

  return (
    <div className="bank-card">
      <div className="card-header">
        <span className="bank-name">بانک قرض الحسنه مهر ایران</span>
      </div>
      <div className="card-number-wrapper" onClick={handleCopy}>
        <FaRegCopy className="copy-icon" />
        <span dir="ltr" className="card-number">{cardNumber}</span>
      </div>
      <div className="card-number-wrapper" onClick={handleShabaCopy}>
        <FaRegCopy className="copy-icon" />
        <span style={{fontSize: "1rem"}} dir="ltr" className="card-number">{shabaNumber}</span>
      </div>
      <div className="card-holder">
        {cardHolder}
      </div>

      <style jsx>{`
        .bank-card {
          width: 320px;
          height: 200px;
          background: #001f3f; /* پس‌زمینه آبی تیره */
          border-radius: 15px;
          padding: 1.5rem;
          color: #fff;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: transform 0.2s ease;
          cursor: pointer;
        }
        .bank-card:hover {
          transform: scale(1.02);
        }
        .card-header {
          font-size: 1.1rem;
          font-weight: bold;
          letter-spacing: 1px;
        }
        .card-number-wrapper {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 1.4rem;
          letter-spacing: 2px;
        }
        .card-number {
          user-select: none;
        }
        .copy-icon {
          font-size: 1.2rem;
          margin-left: 10px;
          transition: color 0.2s ease;
        }
        .copy-icon:hover {
          color: #ffc107; /* رنگ طلایی برای هاور */
        }
        .card-holder {
          text-align: right;
          font-size: 1rem;
          font-weight: 600;
          letter-spacing: 1px;
        }
        @media (max-width: 768px) {
          .bank-card {
            width: 90%;
            height: auto;
            padding: 1rem;
          }
          .card-number-wrapper {
            font-size: 1.2rem;
          }
          .card-header {
            font-size: 1rem;
          }
          .card-holder {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </div>
  );
};

export default BankCard;
