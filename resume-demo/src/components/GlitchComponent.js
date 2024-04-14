import React from 'react';
import './GlitchText.scss'; // Import your SCSS file
import { FaGithub, FaLinkedin, FaFileAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import { FaLocationDot } from "react-icons/fa6";

const GlitchText = () => {
  return (
    <div id="app">
      <div id="wrapper">
        <h1 className="glitch" data-text="Arpit Ladole">Arpit Ladole</h1>
        <span className="sub">Devops Engineer</span>
        <div className="links-container">
          <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
            <FaGithub className="icon" />
            <span className="link-text">https://github.com/arpitklin</span>
          </a>
          <a href="https://www.linkedin.com/in/arpitladole/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="icon" />
            <span className="link-text">https://www.linkedin.com/in/arpitladole/</span>
            </a>
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
            <FaFileAlt className="icon" />
            <span className="link-text">Resume</span>
          </a>
          <a>
            <FaPhone className="icon" />
            <span className="link-text">+91 820-806-9358</span>
          </a>
          <a>
            <FaEnvelope className="icon" />
            <span className="link-text">arpitladole4@gmail.com</span>
          </a>
          <a>
            <FaLocationDot className="icon" />
            <span className="link-text">Pune, India</span>
          </a>  
        </div>
      </div>
    </div>
  );
}

export default GlitchText;
