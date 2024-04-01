import React from "react";
import style from "./assets/NotFound.module.css";
import { Link } from "react-router-dom";
import logo from "./assets/image/logo.svg"
function NotFound() {
  return (
    <div className={style.notFoundBody}>
      <div>
        <img src={logo} alt="logo" />
        <p>This page does not exist. Enjoy shopping on the page</p>
        <Link className={style.link} to="/">
          Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
