import React from "react";
import style from "./assets/NotFound.module.css";
import { Link } from "react-router-dom";
function NotFound() {
  return (
    <div className={style.notFoundBody}>
      <div>
        <img src="src\compnents\NotFound\assets\image\logo.svg" alt="logo" />
        <p>This page does not exist. Enjoy shopping on the page</p>
        <Link className={style.link} to="/">
          Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
