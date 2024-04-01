import React, { useContext, useEffect, useState } from "react";
import style from "./assets/AuthInformation.module.css";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../../../context/User";
import axios from "axios";
import { object, string } from "yup";
import logo from "./assets/image/logo.svg"
import userIcon from "./assets/image/user.svg"
import tickIcon from "./assets/image/tick-circle.png"
function AuthInformation() {
  // const [showLogInInformation,setShowLogInInformation] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  // start log in code
  const { setUserToken, setUserName } = useContext(userContext);
  const { userToken } = useContext(userContext);
  const { userName } = useContext(userContext);
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [loader, setLoader] = useState(false);

  //start yub code
  const [validationError, setValidationError] = useState({
    email: "",
    password: "",
  });

  const validateData = async () => {
    const RegisterSchema = object({
      email: string().email().required(),
      password: string().min(4).max(16).required(),
    });

    try {
      await RegisterSchema.validate(user, { abortEarly: false });
      setValidationError({
        email: "",
        password: "",
      });
      return true;
    } catch (error) {
      const errors = {};
      error.inner.forEach((err) => {
        errors[err.path] = err.message;
      });
      setValidationError(errors);

      return false;
    }
  };
  // end yub code
  function handleInput(e) {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  }

  async function handleForm(e) {
    e.preventDefault();
    const validate = await validateData();

    if (validate) {
      setLoader(true);
      try {
        const { data } = await axios({
          method: "post",
          url: `${import.meta.env.VITE_URL}/auth/signin`,
          data: user,
        });
        localStorage.setItem("userToken", data.token);
        setUserToken(localStorage.getItem("userToken"));

        setUser({
          email: "",
          password: "",
        });
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
        }, 2000);
        navigate("/");
      } catch (error) {
        setError(error.response.data.message);
      } finally {
        setLoader(false);
      }
    }
  }
  // end log in code

  // start log out code
  const logout = () => {
    navigate("/");
    setUserName(null);
    setUserToken(null);
    localStorage.removeItem("userToken");
    setError("");
  };
  // end log out code

  // success code
  if (isSuccess)
    return (
      <div
        className={style.body}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className={style.success}>
          <img
            src={tickIcon}
            alt="not found"
          />
          <p>Log In Account Successfull!</p>
        </div>
      </div>
    );
  // if the user has been log in code
  if (userToken != null)
    return (
      <div
        className={style.body}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className={style.afterLogIn}>
          <div className={style.userInformation}>
            <img
              src={userIcon}
              alt="not found"
            />
            <h4>{userName}</h4>
          </div>
          <button
            onClick={() => {
              logout();
            }}
          >
            Log Out
          </button>
        </div>
      </div>
    );
  // if there error code
  //   if(error) return(
  //       <div className={style.body} onClick={(e)=>{
  //           e.stopPropagation();

  //         }}>
  //   <form className={style.logIn} onSubmit={handleForm} >
  //        <img src="src\compnents\NavBar\assets\logo.svg" alt="" />
  //        <div>
  //   <label htmlFor="email">Email</label>
  //   <input
  //     type="email"
  //     name="email"
  //     value={user.email}
  //     onChange={handleInput}
  //   />
  //   </div>
  //   <p>{validationError.userName}</p>
  //   <div>
  //   <label htmlFor='password'>Password</label>
  //   <input
  //     type="password"
  //     name="password"
  //     value={user.password}
  //     onChange={handleInput}
  //   />
  //   </div>
  //   <p>{validationError.password}</p>

  //   <button type="submit" disabled={!loader?null:'disabled'} >{!loader?'sign in':'wait...'}</button>
  //   <div>
  //       <Link className={style.link} to="/register">Register |</Link>
  //       <Link className={style.link} to='/forgetpassword'> forget password</Link>
  //   </div>

  //   <p>{error}</p>
  // </form>

  //       </div>
  //   )

  return (
    <div
      className={style.body}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <form className={style.logIn} onSubmit={handleForm}>
        <img src={logo} alt="logo" />
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleInput}
          />
        </div>
        <p>{validationError.email}</p>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleInput}
          />
        </div>
        <p>{validationError.password}</p>

        <button type="submit" disabled={!loader ? null : "disabled"}>
          {!loader ? "sign in" : "wait..."}
        </button>
        <div>
          <Link className={style.link} to="/register">
            Register |
          </Link>
          <Link className={style.link} to="/forgetpassword">
            {" "}
            forget password
          </Link>
        </div>
        <p>{error}</p>
      </form>
    </div>
  );
}

export default AuthInformation;
