import React from 'react'
import styles from "./Header.module.css"

function Header() {
  return (
    <div className={styles.header}>
      <h1 className={styles.title}>
        کاروان زیارتی صاحب الزمان (عج)
      </h1>
      <p className={styles.disc}>
        برگزار کننده تور های زیارتی و تفریحی داخلی و خارجی
      </p>
    </div>
  )
}

export default Header
