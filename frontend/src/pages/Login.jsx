import React, { useState } from "react";
import LogoImg from "../assets/logo.png";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Link, useNavigate } from "react-router";
import Message from "../components/Message";
import axios from "axios";
import { useUserData } from "../context/userContext";

const Login = () => {
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { setUserData } = useUserData();

  const formSubmit = (e) => {
    e.preventDefault();
    if (!inputData.email || !inputData.password)
      alert("invalid email or password");
    axios
      .post("/users/singup", inputData)
      .then((res) => {
        setUserData(res.data);
        navigate("/chat");
      })
      .catch((error) => console.log(error));
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
                <div className="title">Log In</div>
                <br />
                <input
                  className="log-field"
                  id="email"
                  type="text"
                  value={inputData.email}
                  placeholder="Email"
                  onChange={(e) =>
                    setInputData({ ...inputData, email: e.target.value })
                  }
                />
                <br />

                <input
                  className="log-field"
                  id="password"
                  type="password"
                  value={inputData.password}
                  placeholder="Password"
                  onChange={(e) =>
                    setInputData({ ...inputData, password: e.target.value })
                  }
                />
                <br />

                <button className="log-field btn gold">Continue</button>
                <br />
                <div className="line" />
                <div className="title">Don't have an account?</div>
                <br />
                <Link className="home-btn" to="/signup">
                  Sign Up
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

export default Login;
