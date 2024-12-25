import React from 'react'
import { Link } from 'react-router'

const Header = ({children}) => {
  return (
    <div className='header'>  
        <Link to="/" className='header-title'>chatic</Link>      
        <div>
            {children}
        </div>
    </div>
  )
}

export default Header