import React, { useEffect, useState } from 'react';
import LogoImg from '../assets/logo.png';
import '../styles/login.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Signup = () => {
    const [inputData, setInputData] = useState({ firstname: "", lastname: "", email: "", password: "", });
    
    const formSubmit = (e)=> {
        e.preventDefault();
        console.log(inputData);
    }

    return (
    <div className='page'>
      <Header />
      <div className='log'>
          <div className='log-container'>
            <div className='log-left-sec'>
                <div className='log-image'>
                    <img className='log-img' src={LogoImg}/>
                </div>
            </div>
            <div className='log-right-sec'>
                <div className='form-group'>
                    <form onSubmit={formSubmit}>
                <div className='title'>Sign-up</div>
                <input className='log-field' id="firstname" type="text" value={inputData.firstname} placeholder='First name' onChange={(e)=>setInputData({...inputData, firstname: e.target.value})}/>
                <br/>

                <input className='log-field' id="lastname" type="text" value={inputData.lastname} placeholder='Last name'
                onChange={(e)=>setInputData({...inputData, lastname: e.target.value})}/>
                <br/>

                <input className='log-field' id="email" type="text" value={inputData.email} placeholder='Email'
                onChange={(e)=>setInputData({...inputData, email: e.target.value})}/>
                <br/>
            
                <input className='log-field' id="password" type="password" value={inputData.password} placeholder='Password'
                onChange={(e)=>setInputData({...inputData, password: e.target.value})}/>
                <br/>

                <button className='log-field btn gold'>Continue</button>
                <br/>
                <div className='line'/>
                <div className='title'>Have an account?</div>
                <button className='log-field btn'>Log in</button>
            </form>
                </div>
            </div>
        
        </div>
        <Footer />
        </div>
    </div>
  )
}

export default Signup;