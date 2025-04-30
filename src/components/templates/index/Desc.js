import React from "react";
import styles from "./Desc.module.css";
import Link from "next/link";
import BasicCard from "@/components/modules/carts/BasicCard"
import { FaLocationDot } from "react-icons/fa6";

function Desc() {
  return (
    <div className={styles.Desc} >
      <div className={styles.container}>
        <h3 className={styles.title}><FaLocationDot />  زیارتگاه‌های امام زاده‌های محی‌آباد کرمان</h3>
        <p className={styles.description}>
        اگر به دنبال یک تجربه معنوی و آرامش‌بخش هستید، امام زاده‌های محی‌آباد کرمان منتظر شما هستند! این اماکن مقدس با معماری زیبا و فضای سبز دلنشین، محلی عالی برای تفکر و آرامش روحی فراهم می‌کنند.
        با بازدید از این زیارتگاه‌ها، آرامش روحی و لذت بردن از تاریخ و فرهنگ غنی را همزمان تجربه کنید.
        </p>
        <div className={styles.places}>
          <BasicCard title={"امام زاده سید عبدالله از نوادگان  امام حسن المجتبی علیه السلام"}/>
          <BasicCard title={"امام زاده بی بی سکینه خاتون علیها السلام از نوادگان امام حسن المجتبی علیه السلام"}/>
          <BasicCard title={"امام زاده بی بی حبیبه خاتون علیها السلام از نوادگان  امام سجاد علیه السلام"} />
        </div>
      </div>
    </div>
  );
}

export default Desc;
