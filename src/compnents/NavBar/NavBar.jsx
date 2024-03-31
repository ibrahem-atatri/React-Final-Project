import React, { useContext, useState } from "react";
import style from "./assets/NavBar.module.css";
import { Link } from "react-router-dom";
import AuthInformation from "../authInformation/AuthInformation";
import authStyle from "../authInformation/assets/AuthInformation.module.css";
import { userContext } from "../../../context/User";
import { Bounce, toast } from "react-toastify";
function NavBar() {
  // const [showAuthInformation,setShowAuthInformation] = useState(false);
  const { showAuthInformation } = useContext(userContext);
  const { setShowAuthInformation } = useContext(userContext);
  const { userToken } = useContext(userContext);

  function dropDownAuthInformation(e) {
    setShowAuthInformation(!showAuthInformation);
  }

  function logInAlert() {
    toast.info("Log in to access the cart", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  }

  return (
    <>
      {/*  */}
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary md-75 "
        onClick={(e) => {
          if (showAuthInformation == true) {
            setShowAuthInformation(false);
          }
        }}
      >
        <div className="container">
          {/*  */}
          <Link
            className="navbar-brand d-flex  align-items-center gap-3"
            to="/"
          >
            <img src="src\compnents\NavBar\assets\logo.svg" alt="not found" />
            <span>IA SHOP</span>
          </Link>
          {/*  */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          {/*  */}
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-5">
              <li className="nav-item ">
                <Link className="nav-link " to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link " to="/products">
                  Products
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link " to="/aboutus">
                  About Us
                </Link>
              </li>
            </ul>
            {/*  */}

            <div className="d-flex gap-3 me-5 ms-5">
              <Link
                className="btn btn-outline-success "
                to={userToken ? "/cart" : ""}
                onClick={() => {
                  if (userToken) {
                  } else logInAlert();
                }}
              >
                <img
                  src="src\compnents\NavBar\assets\shopping-cart.svg"
                  alt=""
                />
              </Link>
              <button
                className="btn btn-outline-success auth "
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  dropDownAuthInformation();
                }}
              >
                <img src="src\compnents\NavBar\assets\user.svg" alt="" />
              </button>
              {showAuthInformation ? <AuthInformation /> : null}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
