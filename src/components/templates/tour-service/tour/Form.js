"use client";

import React from "react";
import styles from "./Form.module.css";
import { RegBtn, RegInput } from "@/components/modules/styled/styled";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import swal from "sweetalert";

function Form({ tour }) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const formSubmiting = async (data) => {

    const dataBody = {...data, tour}
    dataBody.birthDate = data.birthDate.year+"/"+data.birthDate.month+"/"+data.birthDate.day
     
    const res = await fetch(`${window.location.origin}/api/travelers/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataBody),
    });
    if (res.status === 201) {
      swal({
        icon: "success",
        title: "ثبت نام با موفقیت انجام شد",
        button: {
          text: "تایید",
        },
      }).then((value) => {
        if (value) {
          window.location.reload();
        }
      });
    }
  };

  return (
    <div>
      <h4 className={styles.infoTitle}>اطلاعات خود را وارد کنید</h4>
      <form
        className={styles.signinForm}
        onSubmit={handleSubmit(formSubmiting)}
      >
        <div className={styles.formInput}>
          <label htmlFor="fullName">نام و نام خانوادگی:</label>
          <RegInput
            id="fullName"
            type="text"
            placeholder=""
            {...register("name", {
              required: "نام و نام خانوادگی خود را وارد کنید",
            })}
          />
          <span className={styles.inputError}>
            {errors.fullName && errors.fullName.message}
          </span>
        </div>
        <div className={styles.formInput}>
          <label htmlFor="personalId">کد ملی:</label>
          <RegInput
            id="personalId"
            type="number"
            onWheel={(e) => e.target.blur()} 
            {...register("personalId", {
              required: "کدملی را وارد کنید",
              minLength: { value: 10, message: "کد ملی باید ده رقمی باش" },
              maxLength: { value: 10, message: "کد ملی باید ده رقمی باش" },
            })}
          />
          <span className={styles.inputError}>
            {errors.personalId && errors.personalId.message}
          </span>
        </div>
        <div className={styles.formInput}>
          <label htmlFor="birthDate">تاریخ تولد:</label>
          <Controller
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
                  inputClass={styles.datePickerInput}
                  value={value || ""}
                  onChange={(date) => {
                    onChange(date?.isValid ? date : "");
                  }}
                  calendar={persian}
                  locale={persian_fa}
                  calendarPosition="bottom-right"
                />
                {errors && errors[name] && errors[name].type === "required" && (
                  //if you want to show an error message
                  <span className={styles.inputError}>
                    تاریخ تولد خود را وارد کنید
                  </span>
                )}
              </>
            )}
          />
        </div>
        <div className={styles.formInput}>
          <label htmlFor="phone">شماره تلفن:</label>
          <RegInput
            id="phone"
            type="number"
            onWheel={(e) => e.target.blur()} 
            {...register("phone", {
              required: "شماره موبایل خود را وارد کنید",
              minLength: {
                value: 11,
                message: "شماره تلفن باید یازده رقمی باش",
              },
              maxLength: {
                value: 11,
                message: "شماره تلفن باید یازده رقمی باش",
              },
            })}
          />
          <span className={styles.inputError}>
            {errors.phone && errors.phone.message}
          </span>
        </div>
        <div className={styles.formInput}>
          <label htmlFor="address">آدرس:</label>
          <RegInput
            id="address"
            type="text"
            {...register("address", {
              required: "آدرس خود را وارد کنید",
            })}
          />
          <span className={styles.inputError}>
            {errors.address && errors.address.message}
          </span>
        </div>
            <div className={styles.formInput}>
              <label htmlFor="genderSelector">جنسیت:</label>
              <div id="genderSelector" className={styles.genderSelector}>
                <div className={styles.genderInput}>
                  <label htmlFor="man">مرد: </label>
                  <RegInput
                    id="man"
                    name="gender"
                    type="radio"
                    value="man"
                    {...register("gender")}
                  />
                </div>
                <div className={styles.genderInput}>
                  <label htmlFor="woman">زن: </label>
                  <RegInput
                    id="woman"
                    name="gender"
                    type="radio"
                    value="woman"
                    {...register("gender")}
                  />
                </div>
              </div>
            </div>
        {/* <div className={styles.formInput}>
          <label htmlFor="month">ماه سفر:</label>
          <select
            {...register("month", { required: "ماه سفر را انتخاب کنید" })}
            className={styles.datePickerInput}
            name="month"
            id="month"
          >
            <option value="" hidden>
              انتخاب کنید
            </option>
            <option value="farvardin">farvardin</option>
            <option value="ordibehesht">ordibehesht</option>
            <option value="khordad">khordad</option>
            <option value="tir">tir</option>
          </select>
          <span className={styles.inputError}>
            {errors.month && errors.month.message}
          </span>
        </div>
        <div className={styles.formInput}>
          <label htmlFor="vehicule">وسیله نقلیه:</label>
          <select
            {...register("vehicule", {
              required: "وسیله نقلیه را انتخاب کنید",
            })}
            className={styles.datePickerInput}
            name="vehicule"
            id="vehicule"
          >
            <option value="" hidden>
              انتخاب کنید
            </option>
            <option value="bus">bus</option>
            <option value="plain">plain</option>
            <option value="train">train</option>
            <option value="car">car</option>
          </select>
          <span className={styles.inputError}>
            {errors.vehicule && errors.vehicule.message}
          </span>
        </div>
        <div className={styles.formInput}>
          <label htmlFor="place">محل اسکان:</label>
          <select
            {...register("place", { required: "محل اسکان را انتخاب کنید" })}
            className={styles.datePickerInput}
            name="place"
            id="place"
          >
            <option value="" hidden>
              انتخاب کنید
            </option>
            <option value="bus">هتل</option>
            <option value="plain">حسینیه</option>
            <option value="train">مسافرخانه</option>
            <option value="car">اقامتگاه</option>
          </select>
          <span className={styles.inputError}>
            {errors.place && errors.place.message}
          </span>
        </div>
        <div className={styles.formInput}>
          <label htmlFor="food">وضعیت غذا:</label>
          <select
            {...register("food", { required: "وضعیت غذا را انتخاب کنید" })}
            className={styles.datePickerInput}
            name="food"
            id="food"
          >
            <option value="" hidden>
              انتخاب کنید
            </option>
            <option value="allMeals">سه وعده</option>
            <option value="noMeal">بدون غذا</option>
          </select>
          <span className={styles.inputError}>
            {errors.food && errors.food.message}
          </span>
        </div>
        <div className={styles.formInput}>
          <label htmlFor="payment">وضعیت پرداخت:</label>
          <select
            {...register("payment", {
              required: "وضعیت پرداخت را انتخاب کنید",
            })}
            className={styles.datePickerInput}
            name="payment"
            id="payment"
          >
            <option value="" hidden>
              انتخاب کنید
            </option>
            <option value="installments">اقساط</option>
            <option value="Criticism">نقد</option>
          </select>
          <span className={styles.inputError}>
            {errors.payment && errors.payment.message}
          </span>
        </div> */}
        <div className={styles.sininBtn}>
          <RegBtn color="blue">ثبت نام</RegBtn>
        </div>
      </form>
    </div>
  );
}

export default Form;
