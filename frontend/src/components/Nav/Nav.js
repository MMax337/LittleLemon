
import logo from '../../assets/Logo.svg'

import NavList from './NavList'
import './Nav.css'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';



const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation(); // Get the location object

  // // Close the menu when the location changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const desktopNav = () => {
    return (
      <nav className='desktop-nav'>
        <div className='nav-top-logo'>
        <a href='/'>
          <img src={logo} alt='logo'></img>
        </a>
        </div>
        <div className='top-nav'>
          <NavList />
        </div>
    </nav>
    )
  }

  const mobileNav = () => {
    return (
      <nav className='mobile-nav'>
      <div className='hamburger'>
        <div className='nav-top-logo'>
        <a href='/'>
          <img src={logo} alt='logo'></img>
        </a>
        </div>
        <button className={`hamburger-button ${menuOpen ? 'active': ''}`} onClick={() => setMenuOpen(!menuOpen)}>
          <div className='bar'></div>
          <div className='bar'></div>
          <div className='bar'></div>
        </button>
      </div>

        <div className={`hamburger-menu ${menuOpen ? 'active': ''}`}>
          <NavList/>
        </div>
    </nav>
    )
  }


  return (
    <>
    {desktopNav()}
    {mobileNav()}
  </>
  )
}

export default Nav;