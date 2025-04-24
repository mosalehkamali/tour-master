import React from "react";
import Link from "next/link";
import styles from "@/styles/home.module.css";
import Slider from "@/components/templates/index/slider/slider";
import Desc from "@/components/templates/index/Desc";
import Button from "@mui/material/Button";
import { IoMdPhotos } from "react-icons/io";
import { MdHomeRepairService } from "react-icons/md";
import NavBar from "@/components/templates/index/navbar/Navbar";
import ZiaratCard from "@/components/modules/carts/ZiaratCard";

export default function Home() {
  const services = [
    {
      title: "سفرهای زیارتی",
      description:
        "سفرهای زیارتی ما فرصتی است تا در کنار هم لحظاتی سرشار از آرامش و معنا را تجربه کنیم. با برنامه‌ریزی دقیق و توجه به جزئیات، شما را به مقدس‌ترین و زیباترین اماکن می‌بریم تا دل‌تان را با نوری تازه روشن کنید. این سفرها فقط یک گردش نیستند؛ بلکه مسیری برای اتصال دوباره با خود و اعتقادات‌تان است. تیم ما با عشق و اشتیاق در کنارتان خواهد بود تا خاطراتی فراموش‌نشدنی برایتان بسازد. در طول مسیر، نه تنها زیارت می‌کنید، بلکه با فرهنگ و تاریخ غنی این سرزمین بیشتر آشنا می‌شوید. آماده‌اید تا با ما سفری متفاوت و الهام‌بخش را آغاز کنید؟",
    },
    {
      title: "برنامه برگزاری مراسم ها",
      description:
        "سفرهای زیارتی ما فرصتی است تا در کنار هم لحظاتی سرشار از آرامش و معنا را تجربه کنیم. با برنامه‌ریزی دقیق و توجه به جزئیات، شما را به مقدس‌ترین و زیباترین اماکن می‌بریم تا دل‌تان را با نوری تازه روشن کنید. این سفرها فقط یک گردش نیستند؛ بلکه مسیری برای اتصال دوباره با خود و اعتقادات‌تان است. تیم ما با عشق و اشتیاق در کنارتان خواهد بود تا خاطراتی فراموش‌نشدنی برایتان بسازد. در طول مسیر، نه تنها زیارت می‌کنید، بلکه با فرهنگ و تاریخ غنی این سرزمین بیشتر آشنا می‌شوید. آماده‌اید تا با ما سفری متفاوت و الهام‌بخش را آغاز کنید؟",
    },
  ];

  return (
    <div className={styles.container}>
      <NavBar />
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <section className={styles.introduction}>
            <h1>زیارت امامزادگان محی‌آباد</h1>
            <p>
              به محی‌آباد خوش آمدید، مکانی مقدس و تاریخی که آرامش روح و جان را
              برایتان به ارمغان می‌آورد.
            </p>
            <ZiaratCard/>
          </section>
        </div>
      </header>

      <main className={styles.mainContent}>
        <Desc />
        <h3 className={styles.sectionTitle}>
          <IoMdPhotos /> گالری تصاویر
        </h3>
        <Slider />

        {/* بخش خدمات */}
        <section className={styles.services}>
          <h3  className={styles.sectionTitle}><MdHomeRepairService />  خدمات ما</h3>
          <div className={styles.serviceCards}>
            {services.map((service, index) => (
              <div key={index} className={styles.card}>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <Link href={"/tour-service"}>
                <Button className={styles.suportBtn} variant="contained" disableElevation>
                  مشاهده جزئیات بیشتر
                </Button>
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* بخش تماس با ما */}
        <section className={styles.contactUs}>
          <h2>تماس با ما</h2>
          <p>برای اطلاعات بیشتر و رزرو با ما در ارتباط باشید.</p>
          <form className={styles.contactForm}>
            <input type="text" name="name" placeholder="نام شما" required />
            <input type="email" name="email" placeholder="ایمیل شما" required />
            <textarea name="message" placeholder="پیام شما" required />
            <button type="submit">ارسال پیام</button>
          </form>
        </section>
      </main>
    </div>
  );
}
