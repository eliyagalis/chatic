import React from 'react'
import '../styles/login.css';

const Footer = () => {
  
  const linkedinpng = 'https://www.pikpng.com/pngl/b/53-533330_linkedin-logo-png-logo-linked-in-png-clipart.png';
  const githubpng = 'https://cdn.iconscout.com/icon/free/png-256/free-github-logo-icon-download-in-svg-png-gif-file-formats--70-flat-social-icons-color-pack-logos-432516.png?f=webp&w=256';

  return (
    <div className='footer'>
        <div className='footer-content'>
            <div className='title'>chatic</div>
            <div>Secured chat app🔒</div>
            <br/>
            <div>Created by Eliya Galis</div>
            <div className='footer-links'>
                <a href='https://github.com/eliyagalis'>
                  <img className='footer-images' src={githubpng} />
                </a>
                <a href='https://www.linkedin.com/in/eliya-galis/'>
                  <img className='footer-images' src={linkedinpng} />
                </a>
            </div>
        </div>
    </div>
  )
}

export default Footer