import React, { useEffect, useState } from "react";
import LogoImg from "../assets/logonobg.png";
import "../styles/login.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router";
import { useUserData } from "../context/userContext";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const { setUserData } = useUserData();

  const [inputData, setInputData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [inputErrors, setInputErrors] = useState({
    username: null,
    email: null,
    password: null,
    generalError: null
  });

  const changeUsername = (e)=> {
    setInputData({ ...inputData, username: e.target.value })
    if (e.target.value.length > 0 && e.target.value.length < 5) {
      setInputErrors((prev) => ({
        ...prev,
        username: "Hey! Username must be at least 5 characters long.",
      }));
    } else {
      setInputErrors((prev) => ({ ...prev, username: null }));
    }
  }

  const changeEmail = (e)=> {
    setInputData({ ...inputData, email: e.target.value })
    if (e.target.value.length > 0 && !/\S+@\S+\.\S+/.test(e.target.value)) {
      setInputErrors((prev) => ({
        ...prev,
        email: "Oops! That doesn’t look like a valid email address.",
      }));
    } else {
      setInputErrors((prev) => ({ ...prev, email: null }));
    }
  }

  const changePassword = (e)=> {
    setInputData({ ...inputData, password: e.target.value })
    if (e.target.value.length > 0 && e.target.value.length < 6)
      setInputErrors((prev) => ({
        ...prev,
        password: "Your password must be at least 6 characters long.",
      }));
    else setInputErrors((prev) => ({ ...prev, password: null }));
  }
  
  const formSubmit = (e) => {
    e.preventDefault();
    if (!inputData.email || !inputData.password || !inputData.username) {
      setInputErrors((prev) => ({
        ...prev,
        generalError: "Required fields cannot be empty...",
      }))

      setTimeout(()=>{
        setInputErrors((prev) => ({
          ...prev,
          generalError: null,
        }))
      },2000);

      return;
    }

    axios
      .post("/users/signup", inputData, {
        withCredentials: true,
      })
      .then((res) => {
        setUserData(res.data.user);
        localStorage.setItem('userData', JSON.stringify(res.data.user)); 
        navigate("/chat");
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="page">
      <Header />
      <div className="log">
        <div className="log-container">
          <div className="left-sec">
            <div className="log-image">
              <img className="log-img" src={LogoImg} />
            </div>
          </div>
          <div className="right-sec">
            <div className="form-group">
              <form onSubmit={formSubmit}>
                <div className="title">Sign-up</div>
                <br />
                <input
                  className="log-field"
                  id="username"
                  type="text"
                  value={inputData.username}
                  placeholder="Username"
                  onChange={changeUsername}
                />
                {inputErrors.username ? (
                  <div>
                    <div className="error-message">{inputErrors.username}</div>
                    <br />
                  </div>
                ) : (
                  <br />
                )}

                <input
                  className={
                    !inputErrors.email ? "log-field" : "log-field error"
                  }
                  id="email"
                  type="text"
                  value={inputData.email}
                  placeholder="Email"
                  onChange={changeEmail}
                />
                {inputErrors.email ? (
                  <div>
                    <div className="error-message">{inputErrors.email}</div>
                    <br />
                  </div>
                ) : (
                  <br />
                )}
                
                <input
                  className={
                    !inputErrors.password ? "log-field" : "log-field error"
                  }
                  id="password"
                  type="password"
                  value={inputData.password}
                  placeholder="Password"
                  onChange={changePassword}
                />
                {inputErrors.password ? (
                  <div>
                    <div className="error-message">{inputErrors.password}</div>
                    <br />
                  </div>
                ) : (
                  <br />
                )}
                {
                  inputErrors.generalError?(
                    <div>
                      <div className="error-message">{inputErrors.generalError}</div>
                      <br/>
                    </div>
                  ):(<></>)
                }
                
                <button
                  className={`log-field ${
                    Object.values(inputErrors).some
                    ((error) => error !== null) ? 'btn' : 'btn gold'}`
                  }
                  disabled={Object.values(inputErrors).some(
                    (error) => error !== null
                  )}
                >
                  Continue
                </button>
                <br />
                <div className="line" />
                <div className="title">Have an account?</div>
                <br />
                <Link className={"home-btn"} to="/login">
                  Login
                </Link>
              </form>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Signup;
