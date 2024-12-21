import React from 'react'
import Login from './Login';
import Register from './Register';
export default function Header() {
  return (
 
  <div className="header">
      <div className="logo">CompanyLogo</div>
      <nav className="navbar">
        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#services">Services</a></li>
          <li> <Register/></li>
          <li> <Login/></li>
         
        </ul>
      </nav>
    </div>

  )
}
