import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import MainPage from "./pages/MainPage";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import axios from "axios";
import { UserDataProvider } from "./context/userContext";

axios.defaults.baseURL = "http://localhost:8080/api/v1";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  // </StrictMode>,

  <>
    <UserDataProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<HomePage />} path="/" />
          <Route element={<Signup />} path="/signup" />
          <Route element={<Login />} path="/login" />

          <Route element={<MainPage />} path="/chat" />
        </Routes>
      </BrowserRouter>
    </UserDataProvider>
  </>
);
