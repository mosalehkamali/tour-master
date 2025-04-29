import React, { useState } from "react";
import Swal from "sweetalert2";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
const AuthModal = ({ toggleModal }) => {

  const [step, setStep] = useState(1);
  const [personalId, setpersonalId] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // بررسی اعتبار کد ملی (شبیه‌سازی شده)
  const handlepersonalIdConfirm = async () => {
    if (!personalId.trim()) {
      Swal.fire({
        icon: "error",
        title: "خطا",
        text: "لطفاً کد ملی را وارد کنید.",
      });
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${window.location.origin}/api/travelers/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ personalId }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "با موفقیت وارد شدید",
          text: "صفحه رفرش می‌شود.",
        }).then(() => {
          window.location.reload();
        });
      } else {
        setStep(2);
      }
    } catch (error) {
      console.error('Login error:', error.message);
      return { success: false, error: error.message };
    }
    setLoading(false);
    };

  // ارسال فرم ساخت حساب
  const onSubmit = async (data) => {
    setLoading(true);
    data.birthDate = data.birthDate.year+"/"+data.birthDate.month+"/"+data.birthDate.day
    data = {...data,personalId}
    
    const res = await fetch(`${window.location.origin}/api/travelers/signin`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        if (res.status === 201) {
          Swal.fire({
            icon: "success",
            title: "ثبت نام موفق",
            text: "حساب کاربری شما با موفقیت ایجاد شد.",
          }).then(() => {
            window.location.reload();
          });
        }
    
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        {loading && <div className="loading">در حال پردازش...</div>}
        {!loading && (
          <>
            {step === 1 && (
              <>
                <h2>ورود / ثبت نام</h2>
                <div className="form-group">
                  <label>کد ملی:</label>
                  <input
                    type="text"
                    value={personalId}
                    onChange={(e) => setpersonalId(e.target.value)}
                    placeholder="کد ملی"
                    className="input-field"
                  />
                </div>
                <button onClick={handlepersonalIdConfirm}>تایید</button>
              </>
            )}
            {step === 2 && (
              <>
                <h2>ساخت حساب کاربری</h2>
                {/* نمایش کد ملی در بالای فرم */}
                <div className="form-group">
                  <label>کد ملی:</label>
                  <input
                    type="text"
                    value={personalId}
                    disabled
                    className="input-field"
                  />
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-group">
                    <label>نام و نام خانوادگی:</label>
                    <input
                      type="text"
                      placeholder="نام و نام خانوادگی"
                      {...register("name", {
                        required: "نام و نام خانوادگی الزامی است.",
                      })}
                      className="input-field"
                      />
                    {errors.name && (
                      <p className="error">{errors.name.message}</p>
                    )}
                  </div>
                  <div className="form-group">
                    <label>تاریخ تولد:</label>
                    <Controller
                    className="input-field"
                      id="birthDate"
                      control={control}
                      name="birthDate"
                      rules={{ required: true }} //optional
                      render={({
                        field: { onChange, name, value },
                        fieldState: { invalid, isDirty }, //optional
                        formState: { errors }, //optional, but necessary if you want to show an error message
                      }) => (
                        <>
                          <DatePicker
                            inputClass="input-field"
                            value={value || ""}
                            onChange={(date) => {
                              onChange(date?.isValid ? date : "");
                            }}
                            calendar={persian}
                            locale={persian_fa}
                            calendarPosition="bottom-right"
                          />
                          {errors &&
                            errors[name] &&
                            errors[name].type === "required" && (
                              //if you want to show an error message
                              <span className="error">
                                تاریخ تولد خود را وارد کنید
                              </span>
                            )}
                        </>
                      )}
                    />
                  </div>
                  <div className="form-group">
                    <label>شماره تلفن:</label>
                    <input
                      type="text"
                      placeholder="شماره تلفن"
                      {...register("phone", {
                        required: "شماره تلفن الزامی است.",
                      })}
                      className="input-field"
                    />
                    {errors.phone && (
                      <p className="error">{errors.phone.message}</p>
                    )}
                  </div>
                  <div className="form-group">
                    <label>آدرس:</label>
                    <input
                      type="text"
                      placeholder="آدرس"
                      {...register("address", { required: "آدرس الزامی است." })}
                      className="input-field"
                    />
                    {errors.address && (
                      <p className="error">{errors.address.message}</p>
                    )}
                  </div>
                  <div className="form-group gender">
                    <label>
                      <input
                        type="radio"
                        value="male"
                        {...register("gender", {
                          required: "لطفاً جنسیت را انتخاب کنید.",
                        })}
                      />
                      مرد
                    </label>
                    <label>
                      <input
                        type="radio"
                        value="female"
                        {...register("gender", {
                          required: "لطفاً جنسیت را انتخاب کنید.",
                        })}
                      />
                      زن
                    </label>
                  </div>
                  {errors.gender && (
                    <p className="error">{errors.gender.message}</p>
                  )}
                  <button type="submit">تایید اطلاعات</button>
                </form>
              </>
            )}
          </>
        )}
        <button className="close-btn" onClick={toggleModal}>
          بستن
        </button>
      </div>

      <style jsx>{`
        .modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        .modal {
          background: #fff;
          padding: 2rem;
          border-radius: 20px;
          max-width: 500px;
          width: 90%;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
          text-align: right;
          direction: rtl;
          position: relative;
          max-height: 80vh;
          overflow-y: auto;
        }
        h2 {
          margin-bottom: 1rem;
          color: hsl(219.51, 77%, 60%);
        }
        .form-group {
          margin-bottom: 1rem;
          display: flex;
          flex-direction: column;
        }
        label {
          margin-bottom: 0.5rem;
          font-size: 1rem;
        }
        .input-field {
          width: 100%;
          padding: 0.8rem;
          margin: 0.3rem 0;
          border: 1px solid #ccc;
          border-radius: 10px;
          box-sizing: border-box;
        }
        .gender {
          flex-direction: row;
          justify-content: space-evenly;
          margin-top: 0.5rem;
        }
        button {
          margin-top: 1rem;
          padding: 0.8rem 2rem;
          border: none;
          background: linear-gradient(
            45deg,
            hsl(219.51, 77%, 60%),
            hsl(132.18, 76%, 59%)
          );
          color: #fff;
          border-radius: 25px;
          cursor: pointer;
          font-weight: bold;
          transition: background 0.3s;
          width: 100%;
        }
        button:hover {
          background: linear-gradient(
            45deg,
            hsl(132.18, 76%, 59%),
            hsl(219.51, 77%, 60%)
          );
          color: #fff;
        }
        .error {
          color: red;
          font-size: 0.9rem;
          margin: 0.2rem 0 0;
        }
        .loading {
          text-align: center;
          font-size: 1.1rem;
          margin-bottom: 1rem;
        }
        .close-btn {
          position: absolute;
          top: 10px;
          left: 5%;
          width: fit-content;
          background: transparent;
          border: none;
          font-size: 1rem;
          cursor: pointer;
          color: #999;
        }
      `}</style>
    </div>
  );
};

export default AuthModal;
