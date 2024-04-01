import React from "react";
import style from "./assets/Footer.module.css";
import { Link } from "react-router-dom";
import logo from "./assets/image/logo.svg"
import button1 from "./assets/image/Button1.svg"
import button from "./assets/image/Button.svg"
import button2 from "./assets/image/Button2.svg"
import icon from "./assets/image/Icon.svg"
import icon1 from "./assets/image/Icon1.svg"
import icon2 from "./assets/image/Icon2.svg"
import { Button } from "bootstrap";
function Footer() {
  return (
    <footer>
      <div className={style.footerUp}>
        <div className={style.footerUpStart}>
          <div className={style.logo}>
            <img src={logo} alt="logo" />
          </div>
          <div className={style.address}>
            <div>
              <img
                src={icon}
                alt="no Icon"
              />
              <p>ibrahem.atat2003@gmail.com</p>
            </div>
            <div>
              <img
                src={icon1}
                alt="no Icon"
              />
              <p>+972569603629</p>
            </div>
            <div>
              <img
                src={icon2}
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
                  src={button1}
                  alt="no Icon"
                />
              </a>
              <a href="">
                <img
                  src={button}
                  alt="no Icon"
                />
              </a>
              <a href="https://www.linkedin.com/in/ibrahem-atatri-965504234/">
                <img
                  src={button2}
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
