import React from 'react'
import '../styles/home.css';
import { Link } from 'react-router';
import Header from '../components/Header';

const HomePage = () => {
  return (
    <div className='page home'>
      <Header>
          <Link className='btn' to="/login">Login</Link>
          <Link className='btn' to="/signup">Sign Up</Link>
      </Header>

      <div className='main-section'>
        <div className='section-container'></div>
      </div>
    </div>
  )
}

export default HomePage