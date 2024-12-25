import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Signup from './pages/Signup'
import Login from './pages/Login'
import MainPage from './pages/MainPage'
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import HomePage from './pages/HomePage'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  // </StrictMode>,
  <>
    <BrowserRouter>
      <Routes>
        <Route element={<HomePage/>} path="/"/>
        <Route element={<Signup/>} path="/signup"/>
        <Route element={<Login />} path="/login"/>
      </Routes>
    </BrowserRouter>
  </>
  )
