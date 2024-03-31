import React from "react";
import style from "./assets/Footer.module.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer>
      <div className={style.footerUp}>
        <div className={style.footerUpStart}>
          <div className={style.logo}>
            <img src="src\compnents\Footer\assets\image\logo.svg" alt="" />
          </div>
          <div className={style.address}>
            <div>
              <img
                src="src\compnents\Footer\assets\image/Icon.svg"
                alt="no Icon"
              />
              <p>ibrahem.atat2003@gmail.com</p>
            </div>
            <div>
              <img
                src="src\compnents\Footer\assets\image/Icon (1).svg"
                alt="no Icon"
              />
              <p>+972569603629</p>
            </div>
            <div>
              <img
                src="src\compnents\Footer\assets\image/Icon (2).svg"
                alt="no Icon"
              />
              <p>Somewhere in the World</p>
            </div>
          </div>
        </div>
        <div className={style.footerUpEnd}>
          <div className={style.socialMedia}>
            <h2>social profiles</h2>
            <div>
              <a href="https://www.facebook.com/Ibrahem.Atatri">
                {" "}
                <img
                  src="src\compnents\Footer\assets\image/Button (1).svg"
                  alt="no Icon"
                />
              </a>
              <a href="">
                <img
                  src="src\compnents\Footer\assets\image/Button.svg"
                  alt="no Icon"
                />
              </a>
              <a href="https://www.linkedin.com/in/ibrahem-atatri-965504234/">
                <img
                  src="src\compnents\Footer\assets\image/Button (2).svg"
                  alt="no Icon"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className={style.footerBottom}>
        <p>© 2023 Skillbridge. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
