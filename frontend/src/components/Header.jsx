import React from 'react'
import { Link } from 'react-router'
import logo from '../assets/smalllogo.png';

const Header = ({children}) => {
  return (
    <div className='header'>
        <div className='header-logo'>
          <img className='smalllogo' src={logo} />
          <Link to="/" className='header-title'>chatic</Link>      
        </div> 
        <div>
            {children}
        </div>
    </div>
  )
}

export default Header