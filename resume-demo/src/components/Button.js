import React from 'react';
import './GlitchButton.css';
import { FaLinkedin, FaGithub, FaEnvelope, FaPhone } from 'react-icons/fa'; // Import other icons as needed

const GlitchButton = ({ onClick, icon, children }) => {
  let IconComponent;

  switch (icon) {
    case 'LinkedIn':
      IconComponent = FaLinkedin;
      break;
    case 'GitHub':
      IconComponent = FaGithub;
      break;
    case 'Email':
      IconComponent = FaEnvelope;
      break;
    default:
      IconComponent = FaLinkedin; // Default to LinkedIn icon
  }

  return (
    <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="glitch-button" onClick={onClick}>
      <span data-text={children}><IconComponent className="button-icon" /> {children}</span>
    </a>
  );
}

export default GlitchButton;
