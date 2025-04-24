"use client"

import React, { useState } from 'react';
import styles from "./Navbar.module.css"
import classNames from 'classnames';

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>صاحب الزمان (عج)</div>
      <div className={classNames(styles.navLinks, { [styles.active]: menuOpen })}>
        <a href="#home">صفحه اصلی</a>
        <a href="#about">درباره ما</a>
        <a href="#services">خدمات</a>
        <a href="#gallery">گالری</a>
        <a href="#contact">تماس با ما</a>
      </div>
      <div className={styles.hamburger} onClick={handleToggle}>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
      </div>
    </nav>
  );
};

export default NavBar;
