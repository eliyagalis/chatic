import React from 'react'
import '../styles/home.css';
import { Link } from 'react-router';
import Header from '../components/Header';
import lockImg from '../assets/goldlock.png';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <div className='page home'>
      <Header>
          <Link className='home-btn' to="/login">Login</Link>
          <Link className='home-btn' to="/signup">Sign Up</Link>
      </Header>
      <br/>
      <div className='main-section'>
        <div className='section-container'>
          <div className='home-left-sec'>
            <img className='lock-image' src={lockImg}/>
          </div>
          <div className='home-right-sec'>
            <div className='home-sec-text'>
              Your privacy is valued.
              <br/>
              With <b>chatic</b> it's safe!
            </div>
              <p className='home-sec-p'>Experience seamless conversations with 
                a chat app designed with your security in mind.
                Chatic ensures your messages remain private, always. 
                Share texts, files, and connect without worry, 
                knowing your communication is safeguarded with 
                cutting-edge security protocols.</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default HomePage