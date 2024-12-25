import React, { useState } from 'react'
import LogoImg from '../assets/logo.png';
import Footer from '../components/Footer';
import Header from '../components/Header';

const Login = () => {
  
  const [inputData, setInputData] = useState({ email: "", password: "", });
      
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
                    <div className='title'>Log In</div>
                    <input className='log-field' id="email" type="text" value={inputData.email} placeholder='Email'
                    onChange={(e)=>setInputData({...inputData, email: e.target.value})}/>
                    <br/>
                
                    <input className='log-field' id="password" type="password" value={inputData.password} placeholder='Password'
                    onChange={(e)=>setInputData({...inputData, password: e.target.value})}/>
                    <br/>
    
                    <button className='log-field btn gold'>Continue</button>
                    <br/>
                    <div className='line'/>
                    <div>Don't have an account?</div>
                <button className='log-field btn'>Sign up</button>
                </form>
                    </div>
                </div>
            
            </div>
            <Footer />
            </div>
        </div>
  )
}

export default Login