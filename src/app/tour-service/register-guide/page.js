import Image from "next/image";

export default function RegisterGuide() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>راهنمای ثبت‌نام در تورهای زیارتی</h1>

      <section style={styles.step}>
        <h2 style={styles.stepTitle}>مرحله ۱: ورود به صفحه اصلی</h2>
        <p style={styles.text}>
          پس از ورود به صفحه اصلی، دکمه ثبت نام را کلیک کنید.
        </p>
        <Image
          src="/tutorial/1.png"
          alt="مرحله اول: دکمه ورود/ثبت‌نام"
          width={250}
          height={500}
          style={styles.image}
        />
      </section>

      <section style={styles.step}>
        <h2 style={styles.stepTitle}>مرحله ۲:ورود به حساب کاربری</h2>
        <p style={styles.text}>
          پس ورود به صفحه تور ها روی دکمه ثبت نام / ورود در بالا سمت راست صفحه
          کلیک کنید
        </p>
        <Image
          src="/tutorial/2.png"
          alt="مرحله دوم: وارد کردن کد ملی"
          width={250}
          height={500}
          style={styles.image}
        />
      </section>

      <section style={styles.step}>
        <h2 style={styles.stepTitle}>مرحله ۳: ورود به حساب کاربری</h2>
        <p style={styles.text}>
          در کادر مشخص شده کدملی خود را وارد کنید و روی دکمه تایید کلیک کنید اگر
          از قبل در سایت ثبت نام کرده باشید وارد حساب کاربری خود میشوید در غیر
          این صورت وارد صفحه ساخت حساب میشوید
        </p>
        <Image
          src="/tutorial/3.png"
          alt="مرحله سوم: انتخاب سفر و ثبت‌نام"
          width={250}
          height={500}
          style={styles.image}
        />
      </section>
      <section style={styles.step}>
        <h2 style={styles.stepTitle}>مرحله4: ورود به حساب کاربری</h2>
        <p style={styles.text}>
          در صفحه کادر های خالی را پر کنید و حساب خود را ایجاد کنید و با کلیک
          روی دکمه تایید وارد حساب خود شوید
        </p>
        <Image
          src="/tutorial/4.png"
          alt="مرحله سوم: انتخاب سفر و ثبت‌نام"
          width={250}
          height={500}
          style={styles.image}
        />
      </section>

      <section style={styles.step}>
        <h2 style={styles.stepTitle}>مرحله5: انتخاب تور</h2>
        <p style={styles.text}>
          با کلیک روی تور مورد نظر خود وارد صفحه تور بشوید
        </p>
        <Image
          src="/tutorial/5.png"
          alt="مرحله سوم: انتخاب سفر و ثبت‌نام"
          width={250}
          height={500}
          style={styles.image}
        />
      </section>
      <section style={styles.step}>
        <h2 style={styles.stepTitle}>مرحله6: افزودن همراه</h2>
        <p style={styles.text}>
            اگر همراه دارید با کلیک روی دکمه افزودن همراه اطلاعات همراه خود را وارد کنید
        </p>
        <Image
          src="/tutorial/6.png"
          alt="مرحله سوم: انتخاب سفر و ثبت‌نام"
          width={250}
          height={500}
          style={styles.image}
        />
      </section>
      <section style={styles.step}>
        <h2 style={styles.stepTitle}>مرحله 7: افزودن همراه</h2>
        <p style={styles.text}>
            مشخصات همراهان خود را در کادر های مشخص شده وارد کنید با کلیک روی دکمه ثبت همراه همراه شما افروده میشود و کادر برای وارد کردن مشخصات همراه بعدی خالی میشود
        </p>
        <Image
          src="/tutorial/7.png"
          alt="مرحله سوم: انتخاب سفر و ثبت‌نام"
          width={250}
          height={500}
          style={styles.image}
        />
      </section>
      <section style={styles.step}>
        <h2 style={styles.stepTitle}>مرحله 8:ثبت نام در تور </h2>
        <p style={styles.text}>
           پس از وارد کردن همراهان با کلیک روی دکمه افزودن به سبد خرید تور را به سبد خرید خود اضافه کنید و وارد مرحله پرداخت شوید
        </p>
        <Image
          src="/tutorial/8.png"
          alt="مرحله سوم: انتخاب سفر و ثبت‌نام"
          width={250}
          height={500}
          style={styles.image}
        />
      </section>
      <section style={styles.step}>
        <h2 style={styles.stepTitle}>مرحله 9:پرداخت هزینه تور </h2>
        <p style={styles.text}>
           اول شماره کارت را کلیک روی شماره کپی کنید سپس بعد انتقال پول (از طریق همراه بانک یا عابر بانک) عکس رسید خود را بارگذاری کنید سپس دکمه تایید پرداخت را کلیک کنید
        </p>
        <Image
          src="/tutorial/9.png"
          alt="مرحله سوم: انتخاب سفر و ثبت‌نام"
          width={250}
          height={500}
          style={styles.image}
        />
      </section>
      <section style={styles.step}>
        <h2 style={styles.stepTitle}>مرحله 10:مشاهدوضعید پرداخت </h2>
        <p style={styles.text}>
          بعد بررسی رسید شما وضعیت پرداخت شما به حالت تایید شده تغییر میکند و در تور ثبت نام میشوید
        </p>
        <Image
          src="/tutorial/10.png"
          alt="مرحله سوم: انتخاب سفر و ثبت‌نام"
          width={250}
          height={500}
          style={styles.image}
        />
      </section>

      <p style={styles.finalNote}>
        در صورتی که با مشکلی مواجه شدید، با شماره 09137209275 تماس بگیرید
      </p>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "800px",
    margin: "auto",
    padding: "2rem 1rem",
    fontFamily: "sans-serif",
    direction: "rtl",
    textAlign: "right",
  },
  title: {
    textAlign: "center",
    color: "#2c3e50",
    marginBottom: "2rem",
  },
  step: {
    marginBottom: "3rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  stepTitle: {
    color: "#4a4a4a",
    marginBottom: "0.5rem",
  },
  text: {
    fontSize: "1rem",
    color: "#333",
    lineHeight: 1.8,
    marginBottom: "1rem",
  },
  image: {
    borderRadius: "12px",
    boxShadow: "0 0 12px rgba(0, 0, 0, 0.1)",
    width: "auto",
    height: "auto",
  },
  finalNote: {
    fontSize: "0.95rem",
    color: "#555",
    borderTop: "1px solid #eee",
    paddingTop: "1rem",
  },
};
